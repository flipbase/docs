---
hide_table_of_contents: true
---

# Integration patterns

There is more than one way to put the components on a page. They differ in how
much control you get and how much of your stack has to know about Flipbase.

## Script tag

Load the library from the CDN and call it. Works in any page, whatever it is
built with — including server-rendered templates and systems where you cannot
add a build step.

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
    video_id: 'a235717a-ed85-4487-a38a-4772769bb842',
    player_id: 'your-player-id',
  }).mount();
</script>
```

**Pin an exact version, and pin it with `integrity`.** The hash is published in
each version's `manifest.json`. A pinned version means the bytes you tested
against are the bytes your candidates get — a version path never changes once
published.

:::caution

Avoid `/player/latest/`. It moves without warning, which means a release can
change the player inside your product on a day you were not expecting one.

:::

## Custom element

The same library also registers `<flipbase-player>`. Useful where markup is
easier to generate than script — a CMS, a template, an email-style builder.

```html
<script src="https://cdn.flipbase.com/player/v3.0.0-alpha.0/player-web-component.min.js" defer></script>

<flipbase-player
  video-id="a235717a-ed85-4487-a38a-4772769bb842"
  player-id="your-player-id"
  locale="nl"
></flipbase-player>
```

Attributes carry strings only. Anything structured — subtitle cues, for example
— is set as a property instead:

```js
document.querySelector('flipbase-player').subtitles = [{ language: 'en', cues }];
```

## Which to choose

| Situation                                        | Pattern        |
| ------------------------------------------------ | -------------- |
| An ATS or CMS where you can only add markup       | Custom element |
| A server-rendered app with no build step          | Script tag     |
| You cannot deploy on our release cadence          | Script tag, pinned |

## Where the components run

Both mount into an element you provide, in the page's own document — not in an
iframe. They inherit your fonts and layout, and your CSS can reach them through
documented class names.

The practical consequence is that a Content Security Policy has to allow the
CDN. If your page sends CSP headers, `cdn.flipbase.com` needs to be in
`script-src`, and `app.flipbase.com` in `connect-src`.
