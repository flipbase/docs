# Integrate the Flipbase player

The Flipbase Player can be integrated following the same steps as the Recorder. The Player utilizes HTML5 technology.

### How to integrate the Player?

To show the Flipbase Player you have to integrate the code as shown below and replace the ‘player_id’ parameter with your own unique PlayerId.

```html
<head>
  ...
  <!--
    Load the JavaScript Player library in the HTML head section of your page
  -->
  <!-- For Flipbase internal use only! -->
  <script src="//cdn.flipbase.com/player.latest.js"></script>
  <!-- For the latest major player update -->
  <script src="//cdn.flipbase.com/player.v2.js"></script>
  <!-- For a specific patch -->
  <script src="//cdn.flipbase.com/player.v2.0.1.js"></script>
</head>

<!--
  Place the HTML video element(s) in the body and pass it a data-video-id(s). These
  id's can be the video_id that you can also use for the selector.
-->
... <video type="flipbase" data-video-id="xxxx-xxxx-xxxxxx-xxxx-xxxx"></video>
<video type="flipbase" data-video-id="xxxx-xxxx-xxxxxx-xxxx-xxxx"></video> ...

<!-- Initialize the Player and provide your 'player_id' -->
<script>
  // First instance of player
  var player1 = new FlipbasePlayer({
    selector: "flipbase-player-video-element-xxxx-xxxx-xxxxxx-xxxx-xxxx",
    player_id: "xxxx-xxxx-xxxxxx-xxxx-xxxx",
    video_id: "xxxx-xxxx-xxxxxx-xxxx-xxxx",
    theme: "flipbase" // optional
  });

  // Second instance of player
  var player2 = new FlipbasePlayer({
    selector: "flipbase-player-video-element-xxxx-xxxx-xxxxxx-xxxx-xxxx",
    player_id: "xxxx-xxxx-xxxxxx-xxxx-xxxx",
    video_id: "xxxx-xxxx-xxxxxx-xxxx-xxxx",
    theme: "plain" // optional
  });

  // Load the Flipbase player(s) manually
  player1.mount();
  player2.mount();

  // Remove the Flipbase player(s) from the DOM
  player1.unmount();
  player2.unmount();
</script>
```

### Secure mode

When collections have enabled `secure_mode` all videos that are stored in that collection need to be loaded using the Flipbase player.js along with a signature property. You can read on how to create this signature [here](/api/overview.md#using-the-signature-with-the-flipbase-playerjs). For EACH video element you need to generate a seperate signature.

```html
...
<video
  type="flipbase"
  data-video-id="xxxx-xxxx-xxxxxx-xxxx-xxxx"
  data-signature="<SIGNATURE_VIDEO1>"
></video>
<video
  type="flipbase"
  data-video-id="xxxx-xxxx-xxxxxx-xxxx-xxxx"
  data-signature="<SIGNATURE_VIDEO2>"
></video>
...
```

##### Using the signature with the Flipbase Player.js

Just create a signature the way you do with any API request, but append the elements you've used in the `StringToSign` in querystring like style to the signature. NOTE: the URI-encoded path should equal: '/api/videos/<VIDEO_ID>' when creating signatures to be used along with the video player.

    SignatureString = 'signature=<SIGNATURE>&' +
      'api_key=<FLIPBASE_API_KEY>&' +
      'date=<DATE>'

Add this `signature` to each Flipbase HTML video element on the page;

    <video type="flipbase" data-video-id="786553529-a24e-22ae-cca6-891861f7895" data-signature="<SIGNATURE_STRING>"></video>

### Player themes

If you want to provide a theme to add basic color configuration to the player you can do so by providing an optional 'theme' attribute
when initializing the player. We accept a string value pointing to one of our predefined themes:

- Plain (default) -> theme: "plain"
- Flipbase -> theme: "flipbase"
- Ocean -> theme: "ocean"

or an object containing with the following color attributes:

```
theme: {
  primaryColor: "#00020f",
  buttonColor: "#FFF",
  secondaryColor: "#D8E1E5"
}
```
