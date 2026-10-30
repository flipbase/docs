# Deploying the docs site

`docs.flipbase.com` is a Docusaurus build in an S3 bucket behind CloudFront.
`.github/workflows/deploy.yml` builds and deploys it on every push to `master`,
and on manual dispatch.

This file is in `infra/` rather than `docs/` on purpose: `docs/` is the
Docusaurus content directory, so anything put there is published on the public
site.

## What is where

Everything below was read from account `435557921244`, not assumed.

| | |
|---|---|
| AWS account | `435557921244` |
| Region | `eu-central-1` (`get-bucket-location` on the bucket) |
| Bucket | `docs.flipbase.com` |
| CloudFront distribution | `E371TMZJQHNA9D` (comment "Docusaurus site", alias `docs.flipbase.com`) |
| Public URL | https://docs.flipbase.com |

There is **one** docs environment. Account `435557921244` has no second docs
bucket and no second distribution serving docs; `docs.stg.flipbase.com` resolves
to `18.185.109.250` and answers on neither port 80 nor 443, and
`docs-staging.flipbase.com` serves an unrelated non-Docusaurus page. See
[Adding a staging site](#adding-a-staging-site) if one is wanted.

## Required repository configuration

The workflow reads everything about its target from a GitHub Environment, so
none of it is written into the workflow file. **The `production` environment
does not exist in this repository yet** — this repo has no environments, no
repository secrets and no repository variables — so the workflow will stop at
its "Check the environment is configured" step until the following is set.

Settings → Environments → **New environment**, named `production`:

Environment **variables**:

| Name | Value |
|---|---|
| `S3_BUCKET` | `docs.flipbase.com` |
| `CLOUDFRONT_DISTRIBUTION_ID` | `E371TMZJQHNA9D` |
| `PUBLIC_URL` | `https://docs.flipbase.com` |
| `AWS_REGION` | `eu-central-1` (optional — the workflow defaults to this) |

Environment **secrets**:

| Name | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | access key for the deploy principal |
| `AWS_SECRET_ACCESS_KEY` | its secret |

The names match `flipbase/player`, `flipbase/recorder` and
`flipbase/admin-dashboard`, which all carry `AWS_ACCESS_KEY_ID` and
`AWS_SECRET_ACCESS_KEY` as environment secrets on `staging` and `production`
environments. Nothing is inherited from the organisation: the Slack and deploy
variables moved from org level to repo level in October 2026, and a repo that
does not define its own has none.

## Required AWS permissions

The `github-actions` IAM user in `435557921244` is the principal the sibling
repositories deploy as. As of 2026-10-30 it has two attached policies —
`admin-dashboard-deploy` and `test-policy-s3-full-access` — and **neither grants
anything on `docs.flipbase.com` or on distribution `E371TMZJQHNA9D`**. Its keys
will authenticate and then fail on `s3:ListBucket`, which is the same wall the
player publish workflow hit (see `flipbase/player` PR #144).

`iam simulate-principal-policy` for that user returns `implicitDeny` for
`s3:ListBucket` and `s3:PutObject` on the docs bucket and for
`cloudfront:CreateInvalidation` on the distribution.

`infra/docs-deploy-policy.json` is the policy to attach. It is
`admin-dashboard-deploy` with the docs bucket and distribution substituted, and
it is derived from the four calls the workflow actually makes:

| Call | Needs |
|---|---|
| `aws s3 sync` (diffing against the bucket) | `s3:ListBucket` on the bucket |
| `aws s3 sync` (upload, replace, prune) | `s3:GetObject`, `s3:PutObject`, `s3:DeleteObject` on `/*` |
| `aws cloudfront create-invalidation` | `cloudfront:CreateInvalidation` on the distribution |
| `aws cloudfront wait invalidation-completed` | `cloudfront:GetInvalidation` on the distribution |

Deliberately absent: no `s3:PutObjectAcl` (nothing passes `--acl`), no multipart
actions (the largest file in a docs build is well under the 8 MB threshold), no
`cloudfront:ListDistributions` (the id is configuration, never discovered).
Object actions are scoped to this bucket only.

All six actions return `allowed` under this document via
`iam simulate-custom-policy`, against the real bucket and distribution ARNs.

```bash
aws iam create-policy \
  --policy-name docs-deploy \
  --policy-document file://infra/docs-deploy-policy.json

aws iam attach-user-policy \
  --user-name github-actions \
  --policy-arn arn:aws:iam::435557921244:policy/docs-deploy
```

A role assumed through GitHub OIDC, scoped on `sub` to
`repo:flipbase/docs:environment:production`, would be better than long-lived
keys — as `flipbase/player` PR #144 already recommends for the player and
recorder. That is one change across all four repositories, not something to
invent here.

## Retiring CodeBuild

The current deploy is CodePipeline `docs-flipbase-pipeline` → CodeBuild
`docs-flipbase-build`, reading `buildspec.yml` from this repository. It works:
it deployed `2aa18ab` (PR #60) on 2026-10-30 at 09:41 CET.

`buildspec.yml` is **kept** for now, so both paths exist for one cycle. Remove
it only after a dispatched production run of `deploy.yml` has gone green,
in this order:

1. Attach the IAM policy and set the `production` environment up, as above.
2. Dispatch `deploy.yml` by hand against `master` (Actions → Deploy → Run
   workflow). It builds, syncs, invalidates, and then fetches
   https://docs.flipbase.com back and asserts the served HTML names the bundle
   that run built. A green run means the whole path works, not just the upload.
3. Disable the pipeline's trigger so one merge does not deploy twice — set
   `DetectChanges` to `false` on the Source action, or delete the trigger.
4. Then, in a separate PR, delete `buildspec.yml`, and delete the pipeline and
   the CodeBuild project.

Note for whoever does step 3: the pipeline's Source action is configured with
`BranchName: "main"`, a branch that does not exist on the remote. Its V2 git
trigger is what supplies `master`, and executions do succeed, so this is stale
configuration rather than a live fault — but it is misleading if you go looking
for which branch deploys.

## Adding a staging site

Not required for the above, and nothing in this repository depends on it. If a
staging docs site is wanted:

1. Create bucket `docs.stg.flipbase.com` in `eu-central-1`, private, with
   Origin Access Control — matching how `docs.flipbase.com` is fronted.
2. Create a CloudFront distribution with that bucket as origin, alias
   `docs.stg.flipbase.com`, a certificate covering it, and the same
   default-root-object setting as production.
3. Repoint the `docs.stg.flipbase.com` DNS record, which currently points at
   `18.185.109.250`, at the new distribution.
4. Add a `staging` environment in this repository with the same four variables
   and two secrets, pointing at the new bucket and distribution, and extend the
   `docs-deploy` policy to cover them.
5. Add `staging` to `deploy.yml`'s `push:` branches. The `workflow_dispatch`
   input already offers it.

Note that `docusaurus.config.ts` hardcodes `url: 'https://docs.flipbase.com'`,
which is baked into canonical links and the sitemap at build time. A staging
site built as-is would advertise production URLs; that needs an environment
-dependent `url` before step 5.

## Known gap, not fixed here

Directory URLs below the root return 403 on direct entry: the origin is the S3
REST endpoint, which serves objects by exact key and has no directory-index
behaviour, so `/player/v2/docs/` is not an object. It is hidden by Docusaurus
hydrating into a single-page app — once the homepage has loaded, clicking a link
never asks the server for HTML — so only refresh, bookmarks, shared links and
crawlers break. A viewer-request CloudFront Function fixes it at the edge while
keeping the bucket private. That change is not part of this one.
