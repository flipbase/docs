## Getting started

In order to use the Recorder app, place the HTML-code in your code, as shown below.

```html
<!--  Load the JavaScript Recorder library  -->
<script src="//app.flipbase.com/recorder.js" ></script>

<!-- Place an HTML input element at the spot were you would like to show the Recorder -->
<form>
    <input type="flipbase"/>
</form>

<!--  Initialize the Recorder and provide your 'recorderId' -->
<script>
      Flipbase.recorder({
          recorderId: "your_unique_recorderId"
      });
</script>
```