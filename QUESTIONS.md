# Open questions from Bram's docs review

Everything in this file is something the documentation currently gets wrong,
contradicts itself about, or does not say — and that **could not be settled from
the player repo, the recorder repo, or the live CDN**. Nothing here has been
guessed at in the published docs; each item is either left as it was or marked
"not documented" on the page.

This file lives at the repo root, so Docusaurus does not publish it.

Numbering follows the review (`flipbase-docs-review.html`).

---

## 1. Privacy and GDPR — the most serious item (C1, C2)

**Does the stored submission IP stay raw?**

The Videos response documents `ip_address: "217.111.106.53"`, unhashed, next to
`user_agent` and `referer`. The GDPR page says "ip address are hashed before
they are stored". Those two sentences are about different data — the GDPR
sentence sits under the *player* bullet list, so it is about view statistics,
not about the submission record — but as written a privacy officer reads them as
a contradiction.

What was done: the GDPR page now says explicitly that the hashing claim is about
view statistics and that the video record's `ip_address` is the submission's own
IP as returned by the API. The Data flow page no longer says "we never see your
candidate data" flat out; it now says what the integration does and does not
send us, and lists the submission metadata that a video record does carry.

**The hashing sentence was kept as it stood. It has not been verified.** I could
not reach the API with credentials, so:

- [ ] Are player view-statistics IPs actually hashed before storage? With what,
      and is it salted?
- [ ] Is the `ip_address` on a video record stored raw, as the example implies?
- [ ] If it is raw: is that intentional, is it in the DPA, and should the docs
      say how long it is kept?

If the answer to the first one is "not any more" or "not exactly", the sentence
needs to come out of the GDPR page, and that is a decision I should not make
alone.

**Also unresolved (C1):** which combination of the collection's `secure_mode`,
the collection's `allowed_privacy` and the video's `privacy` actually requires a
playback signature. The Data flow page now names all three and says the rule is
not documented, rather than implying the old "private by default" one-liner is
the whole story.

- [ ] What is the real rule?
- [ ] What are the valid values of `allowed_privacy` and of collection `type`?
      (`public`, `private`, `employer_branding` appear in examples; no list
      exists.)

---

## 2. Webhooks — the biggest partner gap (U1)

The page was headings and a response copied from Collections. The cloned
material is gone and the page now states plainly what is missing. None of it was
invented.

- [ ] What body does Flipbase POST, for `pages.submitted` and for anything else?
- [ ] Is the call signed? How does a partner verify it came from us?
- [ ] Are there list / update / delete endpoints?
- [ ] Retries and timeouts when the partner endpoint is down?
- [ ] **Is there an event for "video finished encoding"?** This is the one that
      matters commercially: without it Bram polls every video until
      `encoding_state` is `finished`.
- [ ] What does `POST /api/organizations/:id/webhooks` return?

---

## 3. Signature date format and lifetime (C3)

Authentication contradicts itself on the same page:

- the StringToSign table says the Date is ISO 8601, example `2016-08-08T09:04:29Z`
- the headers table says `Date` and `X-Flipbase-Date` must be in an RFC 2616 format

Both cannot be right, because the StringToSign must use the identical value sent
in the header. Signatures fail silently on exactly this, so I did not pick a
side.

- [ ] Which format does the server actually parse?
- [ ] Does it accept both?
- [ ] **How long does a signature stay valid?** Not stated anywhere. Partners
      need this to decide whether to cache one.

---

## 4. Member roles (C4)

The Members page prose lists `owner`, `publisher` and `spectator`. The request
and response examples on the same page both send `"roles": ["director"]`.

Left untouched: making the example match the prose would be a guess if the prose
is the stale half.

- [ ] What is the actual set of valid role values?
- [ ] Is `director` one of them?
- [ ] Is `roles` always an array, and can it hold more than one?

---

## 5. Which endpoint paths accept an API key (C5)

One half of this was demonstrable and is fixed: the Employer Branding delete
page said `DELETE /users/me`, which does not exist; it now points at
`DELETE /api/user/me`, which the User page documents.

The rest is not demonstrable:

- [ ] Authentication's example signs `DELETE /api/videos/<VIDEO_ID>`. Bram
      reports API keys are refused on unscoped paths and that he has to use
      `/api/organizations/:id/videos/:id`. Which is right?
- [ ] The player signature path is documented as `/api/videos/<VIDEO_ID>`.
      Does that still hold, given the above?
- [ ] Is there a general rule — partner keys only on organization-scoped
      paths — that the Authentication page should state once?

---

## 6. Default retention (C6)

Collections shows `delete_after_days` as 365 in the create response and 90 in
the read response. They are two different example collections, so it is not
strictly a contradiction, but the default is nowhere.

- [ ] What is `delete_after_days` when you do not set it?
- [ ] Is there a per-video override, and what is its field name? (The GDPR page
      says retention can be set per video; no endpoint documents it.)

---

## 7. Recorder callback — ANSWERED, no action needed

Recorded here because the review asked and the answer is now in the docs.

Settled from the recorder source and from the live bundle, which are
byte-identical in this area:

- The option is `callback`. **There is no `onSubmit`** — the quick start's
  `onSubmit: function (video) { video.uuid }` registered nothing and never
  fired. Both `onSubmit` and `.uuid` appear zero times in the shipped bundle.
- It is invoked as `callback(output, element)`:
  `cb.call(this, output, state.el)` in `src/utils/handleCallback.js`, and the
  same expression minified in the live file.
- `output` is a **string**, not an object: the video UUID by default, or the
  embed code when `output: 'embedCode'` is set. The recorder page's claim that
  the embed code arrives as a *second* argument was wrong.
- `element` is the DOM node the recorder was mounted into.
- `callback` also accepts a string, treated as the name of a function on
  `window`.
- `window.Flipbase` and `window.FlipbaseV2` are **the same object**
  (`window.Flipbase = window.FlipbaseV2` in the bundle), so both spellings work.

---

## 8. Recorder CDN path — one decision for Joris (B3)

Verified: the two live URLs serve the identical file (same MD5), and the
single-segment path is a 403.

```
200  cdn.flipbase.com/recorder/recorder/recorderv2/recorder.js
403  cdn.flipbase.com/recorder/recorderv2/recorder.js
200  app.flipbase.com/recorder/recorderv2/recorder.js
```

Both pages now use the doubled CDN path and both say in so many words that the
repeated segment is deliberate, because Bram is right that someone will
otherwise "fix" it and break their embed.

- [ ] **Should we add a `/recorder/recorderv2/` alias on the CDN?** Not done —
      this is a CDN change, not a docs change, and it is your call. If it is
      added, both pages should switch to the short path and the notes come out.

---

## 9. Partner-key and JWT flow (partner gaps 1 and 2)

None of this is documented and none of it is inferable from the repos.

- [ ] A partner key belongs to no organization. The docs assume otherwise
      (`GET /user/organizations`). Does this deserve its own page?
- [ ] `POST /api/auth/jwt_token` with `{ apiKey, apiSecret }` — Bram uses this
      body; the page documents only signature-authenticated and
      username/password. Is the apiKey/apiSecret body supported and stable?
- [ ] (`expires_at` units are now documented as milliseconds, read off the
      thirteen-digit example. Confirm that is right.)

---

## 10. Organizations and collections (partner gaps 3–6)

- [ ] Which licence flags exist? `recorder_license`,
      `candidate_screening_license`, `pages_license`, a `licenses[]` array —
      only `employer_branding_license` is documented.
- [ ] Which does a partner organization need, and in what order?
- [ ] Is `PATCH /organizations/:id` supported? Only `PUT` is documented.
- [ ] Is there a delete-organization endpoint? One exists in the page source but
      is commented out.
- [ ] `GET /organizations/:id/collections` — undocumented, and Bram reports it
      returns 422 for a brand-new organization. Is that intended?
- [ ] Collection fields `recorder_output` and `disable_auto_deletion` — real,
      supported, documentable? (`recorder_output: "id"` does appear in the
      Videos response example.)

---

## 11. Video states and response shape (partner gap 7)

- [ ] What are the possible values of `encoding_state` and `outputs[].state`?
      A list of these is the single most useful thing that could be added for a
      partner who is polling.
- [ ] Bram reports the single-video response is sometimes under `data` and
      sometimes under `data.data`. Is that real, and which is correct?

---

## 12. Signed URL lifetime (partner gap 8)

The docs now say file and thumbnail URLs are signed and short-lived, citing the
`expires=3600` visible in the example URLs.

- [ ] Is 3600 seconds a guarantee or just what the examples happen to show?
      (`multi_parts` shows 7200.)

---

## 13. CSP for uploads (M5)

Integration patterns now says the recorder uploads straight to signed storage
URLs and that the storage origin must be in `connect-src` — true from the
`signed_upload_url` in the documented video response. It deliberately does not
name a host.

- [ ] What is the stable storage origin, per environment, that a partner should
      put in their policy?

---

## 14. Recorder teardown (partner gap 10)

- [ ] Bram reports the recorder throws if you remove it inside its own callback,
      and that `destroy()` can throw while an upload is in progress — enough to
      take down a React page. Confirm, and we document the safe pattern. Not
      documented on a report alone.

---

## 15. Deprecation and end-of-life (M6)

- [ ] The two deprecated API pages say "deprecated per 01-08-2019" and are still
      published, seven years on. Are those endpoints still live?
- [ ] How long do player v1 and v2 stay on the CDN? `/player/latest/` and
      `/player/v2/` still serve v2.
- [ ] Is there an end-of-life date for recorder v1?

---

## 16. Staging for API and recorder (M4)

Only the player documents a staging environment (`cdn.stg.flipbase.com` /
`app.stg.flipbase.com`).

- [ ] Is there a staging API host partners can be given?
- [ ] Is there a staging recorder bundle? (Note separately: both recorder
      bundles on the staging CDN are built as `production` and point at
      `app.flipbase.com` — that is a recorder-repo bug, not a docs one.)
- [ ] Do sandbox credentials work against staging, production, or both?
