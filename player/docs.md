<script src="https://cdn.flipbase.com/player/latest/player.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js"></script>

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
  <!-- For the latest major player update -->
  <script src="https://cdn.flipbase.com/player/v2/player.min.js"></script>
  <!-- For a specific patch -->
  <script src="https://cdn.flipbase.com/player/v2.0.1/player.min.js"></script>
</head>

<!--
  Place the a video element(s) where you want to show the video player.
-->
<div id="video-player-element"></div>

<!-- Initialize the Player and provide your 'player_id' -->
<script>
  const player = new FlipbasePlayer({
    video_id: '5120293b-583b-4534-90dc-0f44cd51705e',
    player_id: '95f4d94b-86c0-4e4a-b23d-484158efd1a4',
    selector: 'video-player-element'
  })

  // Load the Flipbase player(s) manually
  player.mount();

  // Remove the Flipbase player(s) from the DOM
  setTimeout(function () {
    player.unmount();  
  }, 50000)
</script>
```

The code above will result in this:

<div id="video-player-element"></div>
<script>
  var player = new FlipbasePlayer({
    video_id: '5120293b-583b-4534-90dc-0f44cd51705e',
    player_id: '95f4d94b-86c0-4e4a-b23d-484158efd1a4',
    selector: 'video-player-element'
  })
  player.mount();
</script>

### Secure mode

When collections have enabled `secure_mode` all videos that are stored in that collection need to be loaded using the Flipbase player.js along with a signature property. You can read on how to create this signature [here](/api/overview.md#using-the-signature-with-the-flipbase-playerjs). For EACH video element you need to generate a seperate signature.

##### Using the signature with the Flipbase Player.js

Just create a signature the way you do with any API request, but append the elements you've used in the `StringToSign` in querystring like style to the signature. NOTE: the URI-encoded path should equal: '/api/videos/<VIDEO_ID>' when creating signatures to be used along with the video player.

    SignatureString = 'signature=<SIGNATURE>&' +
      'api_key=<FLIPBASE_API_KEY>&' +
      'date=<DATE>'

Add this `signature` property to the options object literal when invoking the FlipbasePlayer function;

```html
<!-- Initialize the Player and provide your 'player_id' -->
<script>
  const player = new FlipbasePlayer({
    signature: "<SIGNATURE_STRING>"
    video_id: '5120293b-583b-4534-90dc-0f44cd51705e',
    player_id: '95f4d94b-86c0-4e4a-b23d-484158efd1a4',
    selector: 'video-player-element'
  });

  // Load the Flipbase player(s) manually
  player.mount();
</script>
```
