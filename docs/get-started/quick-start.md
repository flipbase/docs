---
hide_table_of_contents: true
---

# Quick start

Record a video and play it back, in two pages of HTML. No build step, no
framework.

## Before you start

You need an `api_key`, an `api_secret` and a sandbox organization. Ask us and
you will have them within one working day — the secret is only ever used
server-side, to sign requests.

You also need a **recorder id** and a **player id**. Both are configuration
objects we create for you; they decide things like branding, retention and which
collection videos land in.

## 1. Record

Place an element, load the recorder, point it at your recorder id.

```html
<script src="https://app.flipbase.com/recorder/recorderv2/recorder.js"></script>

<div id="recorder"></div>

<script>
  FlipbaseV2.recorder({
    selector: 'recorder',
    recorderId: 'your-recorder-id',
    onSubmit: function (video) {
      // The only thing you have to keep.
      console.log('video UUID:', video.uuid);
    },
  });
</script>
```

The recorder handles camera permission, the viewfinder, retakes and the upload.
When the candidate submits, your callback receives a **video UUID**.

:::caution Serve this over HTTPS

Browsers only grant camera access on a secure origin. Over plain HTTP the camera
is never offered and the recorder falls back to file upload. `localhost` counts
as secure, so local development is fine.

:::

## 2. Store the UUID

Save it against whatever record it belongs to — a candidate, an application, a
job. That UUID is the whole join between your data and ours.

```sql
UPDATE applications SET video_uuid = $1 WHERE id = $2;
```

## 3. Play it back

Later, hand the same UUID to the player.

```html
<script
  src="https://cdn.flipbase.com/player/v3.0.0-alpha.0/player.min.js"
  integrity="sha384-PI5oUTsHmcski3Je6b8t0TL9QRlCTVxtI7zPD0GE/Ng4rOmD9Y2y7SgfuCsYQnJ0"
  crossorigin="anonymous"
></script>

<div id="player"></div>

<script>
  new FlipbasePlayer({
    selector: 'player',
    video_id: 'the-uuid-you-stored',
    player_id: 'your-player-id',
  }).mount();
</script>
```

That is the entire surface area.

## What to read next

- **[Data flow](../concepts/data-flow.md)** — how the pieces fit, and what we
  never see.
- **[Integration patterns](../concepts/integration-patterns.md)** — custom
  element and npm, and when each is the better choice.
- **[Signatures](../concepts/signatures.md)** — the example above plays a
  *published* video. Anything private needs a server-generated signature, which
  is what you want for a candidate's answer.
- **Browser support** — listed on each component's own page, because it is the
  one thing that differs by version.

## A note on versions

The player URL above pins an exact version with an integrity hash. Keep it that
way. A version path never changes once published, so the bytes you test against
are the bytes your candidates get.

`/player/latest/` exists and moves on its own. It is convenient right up until
the morning it is not.
