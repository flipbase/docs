# Integrate the Flipbase player

The Player can be integrated following the same steps as the Recorder. The Player utilizes HTML5 technology, a Flash based player will be used if HTML5 video playback is not supported.

### How to integrate the Player?

To show the Flipbase Player you have to integrate the code as shown below and replace the ‘playerId’ parameter with your own unique PlayerId.

```html
<head>
    ...
    <!--  Load the JavaScript Player library in the HTML head tag of your page -->
    <script src="//app.flipbase.com/player.js" ></script>
    ...
</head>

<!-- Place the HTML video element somehwere in the body where you want to show the video -->
<video type="flipbase" data-video-id="786553529-a24e-22ae-cca6-891861f7895"></video>
<video type="flipbase" data-video-id="a24e-22ae-cca6-891861f7895-78653529"></video>

<!--  Initialize the Player and provide your 'playerId'  -->
<script>
    var videoPlayers = Flipbase.player({
      playerId: "xxxx-xxxxx-xxxxxx-xxxxxxx"
    });

    // When one of the video players is not instantly invisible, because it is placed in a tab that is not yet visible, we need to re-render all instances.
    videoPlayers.reload();
</script>
```

### Secure mode

When collections have enabled `secure_mode` all videos that are held in that collection needs to be loaded using the Flipbase player.js along with a signature property. You can read how to create this signature [here](/api/overview.md#using-the-signature-with-the-flipbase-playerjs). For EACH video element you need to generate a seperate signature.

```html
  ...
    <video type="flipbase" data-video-id="786553529-a24e-22ae-cca6-891861f7895" data-signature="<SIGNATURE_VIDEO1>"></video>
    <video type="flipbase" data-video-id="a24e-22ae-cca6-891861f7895-78653529" data-signature="<SIGNATURE_VIDEO2>"></video>
  ...
```

##### Using the signature with the Flipbase Player.js

Just create a signature the way you do with any API request, but append the elements you've used in the `StringToSign` in querystring like style to the signature. NOTE: the URI-encoded path should equal: '/api/videos/<VIDEO_ID>' when creating signatures to be used along with the video player.

    SignatureString = 'signature=<SIGNATURE>&' +
      'api_key=<FLIPBASE_API_KEY>&' +
      'date=<DATE>'

Add this `signature` to each Flipbase HTML video element on the page;

    <video type="flipbase" data-video-id="786553529-a24e-22ae-cca6-891861f7895" data-signature="<SIGNATURE_STRING>"></video>

##### Show and control a single video player
It is also possible to just render a single video player. Then it is recommended to use the `elementId` option. Please be aware that in case the `elementId` is used, the `reload` option no longer can works on this video player node. You can safely remove the video element from the DOM and re-create a new DOM elment with the same attributes as shown below and then invoke the `Flipbase.player` function again (with the same options).

```html
<video type="flipbase" id="video" data-video-id="786553529-a24e-22ae-cca6-891861f7895"></video>
<script>
    Flipbase.player({
      elementId: "video",
      playerId: "xxxx-xxxxx-xxxxxx-xxxxxxx"
    });
</script>
```

### Player settings

Maximum width or height (deprecated)

You are able to set the maximum height OR width (in pixels) of the Player. Please provide this setting as a number, not as a string. By default the height is 640 pixels and width is 360 pixels.
