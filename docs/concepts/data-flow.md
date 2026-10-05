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

**We never see your candidate data.** No name, no email, no application. The
recorder uploads a video and returns an identifier; the player takes an
identifier and plays a video. Everything that makes it a *person* stays in your
system.

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
[Organizations](organizations.md) and [Collections](collections.md).

## Private and published videos

A video is private by default: playing it needs a signature your server
generates. Publishing a video removes that requirement and makes it accessible
to anyone with the URL.

For recruitment this usually means private — a candidate's video answer should
not be a public link. See [Signatures](signatures.md) for how authenticated
playback works, and [GDPR](gdpr.md) for what that implies for consent and
retention.
