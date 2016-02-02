# Flipbase player

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
<video type="flipbase" data-video-id="786553529-a24e-22ae-cca6-891861f7895" />

<!--  Initialize the Player and provide your 'playerId'  -->
<script>
    Flipbase.player({
        playerId: "xxxx-xxxxx-xxxxxx-xxxxxxx"
    });
</script>
```

### Player settings

Maximum width or height (deprecated)

You are able to set the maximum height OR width (in pixels) of the Player. Please provide this setting as a number, not as a string. By default the height is 640 pixels and width is 360 pixels.
