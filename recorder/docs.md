# Flipbase recorder

In order to use the Recorder app, place the HTML-code in your code, as shown below. The recorder.js application is based on a HTML `<input type="flipbase"/>` element and the JavaScript recorder.js library.

```html
<!--  Load the JavaScript Recorder library  -->
<script src="//app.flipbase.com/recorder.js" ></script>

<!-- Place an HTML input element at the spot were you would like to show the Recorder -->
<form>
    <input type="flipbase"/>
</form>

<!--  Initialize the Recorder and provide your 'recorderId' -->
<?php $timestamp = date("c"); ?>

<script>
    Flipbase.recorder({
      recorderId: "YOUR_RECORDER_ID",
      hash: <?php
        echo hash_hmac('sha256', $timestamp, '<YOUR_RECORDER_SECRET>', true);
      ?>,
      date: <?php 
        echo $timestamp
      ?>
    });
</script>
```

When the user has succesfully saved the video, the `input` node will be provided with a videoId, like shown below:

```html
<form>
    <input type="flipbase" value="63341990-a44e-11e3-bdf9-891861f38674"/>
</form>
````

To playback video’s you will need to store the videoId in your database. The videoId is an ['Universally Unique IDentifier'](https://www.ietf.org/rfc/rfc4122.txt), better known as UUID. Using the videoId and the Player application you will be able to playback to recorded video.

## Settings

Except the `recorderId` options, all parameters listed below are optional. 

Parameter | Type | Description
--- | --- | ---
recorderId | String | UUID provided by Flipbase. This is the only mandatory setting.
duration | Number | Maximum duration in seconds of a single take. `30` is default. 
primaryColor | String | Change the color of most prominent buttons. Color in HEX format.
secondaryColor | String | Color in HEX format.
backgroundColor | String | Change the background color of the application. Color in HEX format.
textColor | String | Change the color of the text. Color in HEX format.
locale | String | Supported locales are `en-US` and `nl-NL`. The values `nl_nl` and `en_us` are deprecated, but will work until the next release in 2016. 
maxWidth | Number | By default the recorder application will fill up it's parentNode. However, if you want to make sure the height or width of the interface does not exceed a certain number of pixels you can provide it using these 2 properties. Please note, that the recorder ALWAYS keep the 16:9 aspect ratio, even if you provide other dimensions using the maxWidth and maxHeight properties. The application will always choose to most conservative width and height dimension.
maxHeight | Number | See `maxWidth` description.
output | String | Using the output property you can change what the application will output and insert into the input element. Leaving the output undefined will make sure the application inserts a UUID into the `<input type="flipbase" />` element. However, if you set it embedCode the application will 1) set a embedCode as value of the `<input type="flipbase" />` element and 2) will provide the embed code as second argument when invoking the callback function (if provided). Change the default output (the video id) to `embedCode` to receive an actual iframe which can be embedded on an external page.
outputOptions | Object | Object literal with `pageName` as mandatory property. Flipbase will provide you with the proper `pageName` value.
callback | Function | Once the user saves a video this callback will be triggered. The callback function will be invoked with 2 arguments: the videoId and the output (depending on)


## Example

````JavaScript
Flipbase.recorder({
  recorderId: 'xxxxxxxx-xxxxx-xxxxx-xxxxx-xxxxxxxxx',
  primaryColor: '#aeb00a', // green button background color
  secondaryColor: '#e0e0e0', // ligt grayish text color of the button
  backgroundColor: '#242b3c', // dark blueish interface background
  textColor: '#FFFFFF', // text color
  locale: navigator.language || navigator.userLanguage, // Change thelanguage based on the users' browser default language
  showFAQButton: false, // Hides the default FAQ button
  maxWidth: 500,
  callback: function (id, output) {
    alert('The video has been saved to our server. The video UUID you should store in your database is: ' + id);
    console && console.info && console.info('The video UUID you should store in your database is: ' + id);
  }
});
````
<div>
  <input type="flipbase" style="display:none;"/>
</div>
<script src="//app.flipbase.com/recorder.js" ></script>
<script>
  Flipbase.recorder({
    recorderId: '9eaf41fd-4f3f-4fdb-b8ca-de84eeaed407',
    primaryColor: '#aeb00a',
    showFAQButton: false,
    locale: getLanguage(),
    secondaryColor: '#e0e0e0',
    backgroundColor: '#242b3c',
    textColor: '#FFFFFF',
    maxWidth: 500,
    callback: function (id, output) {
      alert('The video has been saved to our server. The video UUID you should store in your database is: ' + id);
      console && console.info && console.info('The video UUID you should store in your database is: ' + id);
    }
  });

  function getLanguage() {
    var lang = (navigator.language || navigator.userLanguage);
    console && console.info && console.info('Recorder language will be changed to: ' + lang);
    return lang;
  }
</script>


## Limitations

What you should know before implementating the recorder interface:

* We strongly advice you to make sure that in in all cases (even on mobile phones), the recorder interface is not smaller then **244 pixels** wide.

* The recorder is fully responsive and automatically fills up the parent element node. If you do not want this, please use a [`maxWidth` setting](settings.md). 

* Caution: if the `parentNode` element of the recorder is a `table` node, this `table` needs to have a minimum width. Otherwise, it’s not possible to record a video using the webcam.

** Why a minimum width of 244 pixels?!**
Well, that's because of Flash. The Flash Player will automatically deny all access to the microphone and webcam if the interface is smaller then 244 pixels wide. If the interface is smaller than 244 pixels wide, there is not enough room for the Flash Player to show the access dialogue to the user to accept microphone and webcam access. Therefore Flash will automatically block all access and it is not possible to record a video using the webcam. This access dialogue looks something like this:

![Flash access dialogue](/assets/images/flash-access-dialogue.png "Flash access dialogue")

** Responsive by design**

The recorder application interface will always keep a 16:9 aspect ratio. By default the recorder.js interface will always fill up it's parent element. Besides the recorder interface is fully responsive.

## Reference

Instance API
- destroy: destroy an instance

## Browser support

Flipbase is supported in the browsers listed below. We differentiate recording functionality using the webcam (which requires Flash) and video upload functionality (which is used on smartphones and tablets, when Flash is not supported). Video upload functionality uses HTML5 and therefore is not supported on older browsers.

##### Webcam
* IE7 +
* Chrome 24.0+
* Firefox 16.0+
* Safari 4+
* Opera 10.6+

##### Mobile
* Android browser 4.1+
* Chrome for Android 46+
* iOS safari 7.1+

##### Upload
* Safari iOS 7.1+
* Android 4.0+
* Internet Explorer 10+
* Chrome 35.0+
* Firefox 31.0+
* Safari 5.1+
* Opera 25+