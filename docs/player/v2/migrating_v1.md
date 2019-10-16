# Migrate from player v1 to v2

### Why is it better?
We have rewritten the player application entirely. At the short term the only noticable changes the way you integrate the player into your webpage, plus the changed user interface. However, under the hood we have endless possibilities to enrich, customise and integrate the video playback user experience seemlessly into your website or web app.

### What has changed?
- We host now at a different domain and path: `https://cdn.flipbase.com/player/v2/player.min.js`
- We expose a different constructor you need to use to instantiate the player: `FlipbasePlayer`.
- Can you add and remove the player from the DOM using the `mount` and `unmount` methods; so you can control when to render the player and when to remove it.
- Web components support: optionally, you can also add the exposed custom HTML elements: `<flipbase-player></flipbase-player>`
- Support for fullscreen videos

### What about v1?**
Player v1 will keep on working until 31th December 2020 and will then be deprecated.
