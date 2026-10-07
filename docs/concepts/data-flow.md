---
hide_table_of_contents: true
---

# Data flow

Flipbase is two browser components and an API. Nothing else moves between you
and us, and the shape below is the whole of it.

```
Candidate's browser                    Your system
┌─────────────────┐                   ┌──────────────────┐
│    Recorder     │                   │  Your database   │
│                 │  1. video UUID    │                  │
│  camera ──────► ├──────────────────►│  candidate row   │
└────────┬────────┘                   └────────┬─────────┘
         │                                     │
         │ 2. upload                           │ 3. video UUID
         ▼                                     ▼
┌─────────────────┐                   ┌──────────────────┐
│ Flipbase storage│◄──────────────────┤      Player      │
│    + API        │   4. metadata     │                  │
└─────────────────┘                   └──────────────────┘
```

1. The recorder captures a video in the candidate's browser and uploads it to
   Flipbase. When it finishes, your callback receives a **video UUID**.
2. You store that UUID against whatever record it belongs to — a candidate, an
   application, a job. Flipbase does not know what that record is, and does not
   need to.
3. Later, you hand the same UUID to the player.
4. The player asks the API for that video's metadata and renders it.

## What this means in practice

**The UUID is the only thing you have to keep.** It is the join between your
data and ours. If you store nothing else, the integration still works.

**Your candidate record stays in your system.** The integration passes a UUID
and a video file, not a person: the recorder uploads a video and returns an
identifier, the player takes an identifier and plays a video. We are not sent
the name, the email address or the application that UUID belongs to, and the
join between them exists only on your side.

That is a statement about what the components exchange, not a claim that a video
carries no personal data. A video record carries technical metadata about the
submission, and the API returns it:

| Field        | What it is                                        |
| ------------ | ------------------------------------------------- |
| `ip_address` | The IP the recording was submitted from           |
| `user_agent` | The submitting browser's user-agent string        |
| `referer`    | The page the recorder was embedded in             |

Under GDPR an IP address is personal data, so treat a video response as
containing some even though you never sent us a name. See
[Videos](../api/v1/videos.md) for the full response and
[GDPR](gdpr.md) for what we process and why.

Two other routes do carry names and email addresses, and they are not part of
the recorder-plus-player integration described here: Employer Branding **pages**
collect form fields, and **members** are real user accounts with an email
address.

**The two components do not talk to each other.** They share a data model, not a
runtime. You can use the recorder without the player, or the player without the
recorder.

## Where videos live

A video belongs to a **collection**, and a collection belongs to an
**organization**.

| Level            | What it is                                                   |
| ---------------- | ------------------------------------------------------------ |
| **Organization** | Usually one per customer. Groups collections.                |
| **Collection**   | A group of videos sharing security, privacy and retention settings. |
| **Video**        | One recording, identified by a UUID.                         |

Settings live on the collection rather than the video, so retention and privacy
are decided once for a group rather than per upload. See
[Organizations](../api/v1/organizations.md) and
[Collections](../api/v1/collections.md) in the API reference.

## Private, published and secure mode

Three settings decide whether a video plays without a signature, and they sit at
different levels. It is worth knowing all three names before you debug a player
that shows nothing.

| Setting           | Lives on     | What it does                                                                 |
| ----------------- | ------------ | ---------------------------------------------------------------------------- |
| `secure_mode`     | Collection   | Turns signed playback on for the collection.                                  |
| `allowed_privacy` | Collection   | Which privacy values a video in this collection may take.                     |
| `privacy`         | Video        | `private` or `public` for that one recording.                                 |

A private video needs a signature your server generates; publishing one removes
that requirement and makes it playable by anyone with the URL. For recruitment
that usually means private — a candidate's answer should not be a public link.

:::caution The exact rule is not documented yet

Which combination of `secure_mode`, `allowed_privacy` and `privacy` requires a
signature is not written down anywhere in these docs, and we would rather say so
than guess on your behalf. Ask us for the collection configuration that matches
what you are building, and we will document the rule here once it is confirmed.

:::

See [Collections](../api/v1/collections.md) for where the two collection
settings are set, [Authentication](../api/v1/authentication.md) for how a
playback signature is built, and [GDPR](gdpr.md) for what this implies for
consent and retention.
