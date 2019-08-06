<script src="//app.flipbase.com/recorder.js"></script>

# Integrate the Flipbase recorder

- [Getting started](#getting-started)
- [Settings](#settings)
- [Multiple recorders on a single page](#multiple-recorders-on-a-single-page)
- [What you should know before you implement the recorder](#limitations)
- [Browser support](#browser-support)

## Gettings started

In order to use the Recorder app, place the HTML-code in your code, as shown below. The recorder.js application is based on a HTML `<input type="flipbase"/>` element and the JavaScript recorder.js library.

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

The code above will result into this:

<div>
  <input type="flipbase" style="display:none;"/>
</div>
<script>
  Flipbase.recorder({
    recorderId: '9eaf41fd-4f3f-4fdb-b8ca-de84eeaed407',
  });
</script>

When the user has succesfully saved the video, the `input` node will be provided with a videoId, as shown below:

```html
<form>
    <input type="flipbase" value="63341990-a44e-11e3-bdf9-891861f38674"/>
</form>
```

To playback videos you will need to store the videoId in your database. The videoId is a ['Universally Unique IDentifier'](https://www.ietf.org/rfc/rfc4122.txt), better known as UUID. Using the videoId and the Player application you will be able to playback the recorded video.

## Settings

Except the `recorderId` options, all parameters listed below are optional.

Parameter | Type | Description
--- | --- | --- |
recorderId | String | UUID provided by Flipbase. This is the only mandatory setting.
duration | Number | Maximum duration in seconds of a single take. `30` is default.
selector | String | The element ID to create the recorder application for (only necessary when using multiple recorder instances on a single page).
primaryColor | String | Change the color of most prominent buttons. Color in HEX format.
secondaryColor | String | Color in HEX format.
backgroundColor | String | Change the background color of the application. Color in HEX format.
textColor | String | Change the color of the text. Color in HEX format.
locale | String | [Here](#supported-languages) can you find a list of all supported locales. The values `nl_nl` and `en_us` are deprecated.
maxWidth | Number | By default the recorder application will fill up it's parentNode. However, if you want to make sure the height or width of the interface does not exceed a certain number of pixels you can provide it using these 2 properties. Please note, that the recorder ALWAYS keep the 16:9 aspect ratio, even if you provide other dimensions using the maxWidth and maxHeight properties. The application will always choose to most conservative width and height dimension.
maxHeight | Number | See `maxWidth` description.
output | String | Using the output property you can change what the application will output and insert into the input element. Leaving the output undefined will make sure the application inserts a UUID into the `<input type="flipbase" />` element. However, if you set it embedCode the application will 1) set a embedCode as value of the `<input type="flipbase" />` element and 2) will provide the embed code as second argument when invoking the callback function (if provided). Change the default output (the video id) to `embedCode` to receive an actual iframe which can be embedded on an external page.
outputOptions | Object | Object literal with `pageName` as mandatory property. Flipbase will provide you with the proper `pageName` value.
callback | Function | Once the user saves a video this callback will be triggered. The callback function will be invoked with 2 arguments: the videoId and the output (depending on)

An example of a fully customized recorder can look something like this:

````JavaScript
Flipbase.recorder({
  recorderId: 'xxxxxxxx-xxxxx-xxxxx-xxxxx-xxxxxxxxx',
  duration: 15, // 15 seconds video max
  primaryColor: '#aeb00a', // green button background color
  secondaryColor: '#e0e0e0', // ligt grayish text color of the button
  backgroundColor: '#242b3c', // dark blueish interface background
  textColor: '#FFFFFF', // text color
  locale: 'en-US', // Use English instead of default Dutch
  showFAQButton: false, // Hides the default FAQ button
  maxWidth: 500,
  maxHeight: 400,
  // The callback is triggered everytime the video is saved or updated
  callback: function (id, output) {
    alert('The video has been saved to our server. The video UUID you should store in your database is: ' + id);
    console && console.info && console.info('The video UUID you should store in your database is: ' + id);
  }
});
````
## Multiple recorders on a single page

```html

<input id="recorder1"/>

<script>
  var rec1 = Flipbase.recorder({
    recorderId: "your_unique_recorderId"
    selector: 'recorder1', // !! required when creating multiple instances on 1 page
    primaryColor: '#aeb00a',
    showFAQButton: false,
    secondaryColor: '#e0e0e0',
    backgroundColor: '#242b3c',
    textColor: '#FFFFFF'
  });

  // Invoke the `destroy` method if you want to close the pop-up or tab in which you showed the recorder
  rec1.destroy()
</script>

<!-- Add a second recorder instance -->
<input id="recorder2"/>

<script>
  var rec2 = Flipbase.recorder({
    recorderId: "your_unique_recorderId"
    selector: 'recorder2'
  });

  // Invoke the `destroy` method if you want to close the pop-up or tab in which you showed the recorder
  rec2.destroy()
</script>
```
<div>
  <div style="width: 49%; float: left;">
    <h4>Recorder 1</h4>
    <input id="recorder1" style="display:none;"/>
  </div>
  <div style="width: 49%; float:right;">
    <h4>Recorder 2</h4>
    <input id="recorder2" style="display:none;"/>
  </div>
  <div style="clear: both;"></div>
</div>
<script>
  var recorder1 = Flipbase.recorder({
    recorderId: '9eaf41fd-4f3f-4fdb-b8ca-de84eeaed407',
    selector: 'recorder1',
    primaryColor: '#aeb00a',
    showFAQButton: false,
    secondaryColor: '#e0e0e0',
    backgroundColor: '#242b3c',
    textColor: '#FFFFFF',
  });
  var recorder2 = Flipbase.recorder({
    recorderId: '9eaf41fd-4f3f-4fdb-b8ca-de84eeaed407',
    selector: 'recorder2',
  });
</script>

## Check if upload is in progress

To check if the user is currently uploading a video we have implemented to `isUploading` method that is returned by the `Flipbase.recorder` function. *Note*: this method is only returned when the `Flipbase.recorder` function is invoked with the `selector` property. Please note that `isUploading` only returns true when the user is *uploading* video; it will return false when the user is *recording* a video. See also the example below.

```html
<div>
  <input id="recorder1"/>
</div>
<script>
  var recorder = Flipbase.recorder({
    recorderId: '9eaf41fd-4f3f-4fdb-b8ca-de84eeaed407',
    selector: 'recorder1', // required to use the `isUploading` method
  });

  console.log("Is user uploading a video?", recorder.isUploading()) // false

  setTimeout(function ( ) {
    console.log("Is user uploading a video?", recorder.isUploading()) // true if user started uploading
  }, 30000)
</script>
```

## Limitations

What you should know before implementating the recorder interface:

* We strongly advice you to make sure that the recorder interface is not smaller then **244 pixels** wide, in all cases (even on mobile phones).

* The recorder is fully responsive and automatically fills up the parent element node. If you do not want this, please use a [`maxWidth` setting](settings.md).

* Caution: if the `parentNode` element of the recorder is a `table` node, this `table` needs to have a minimum width. Otherwise, it’s not possible to record a video using the webcam.

** Why a minimum width of 244 pixels?!**
Well, that's because of Flash. The Flash Player will automatically deny all access to the microphone and webcam if the interface is smaller then 244 pixels wide. If the interface is smaller than 244 pixels wide, there is not enough room for the Flash Player to show the access dialogue to the user to accept microphone and webcam access. Therefore Flash will automatically block all access and it is not possible to record a video using the webcam. This access dialogue looks something like this:

![Flash access dialogue](/assets/images/flash-access-dialogue.png "Flash access dialogue")

** Responsive by design**

The recorder application interface will always keep a 16:9 aspect ratio. By default the recorder.js interface will always fill up its parent element. Besides the recorder interface is fully responsive.

## Browser support

Flipbase is supported in the browsers listed below. We differentiate recording functionality using the webcam (which requires Flash) and video upload functionality (which is used on smartphones and tablets, when Flash is not supported). Video upload functionality uses HTML5 and therefore is not supported on older browsers.

##### Supported languages
Below you will find a list of all supported languages and their `locale` configuration property values.

- Dutch: nl-NL, nl-BE, nl
- English: en-US, en-GB, en-AU, en-CA, en-NZ, en-JM, en-ZA, en-IE, en
- German: de, DE, de-CH, de-AT, de-LU, de-LI
- Spanish: es, es-ES, es-CR, es-GT, es-PA, es-DO, es-MX, es-VE, es-CO, es-PE, es-CL, es-EC, es-UY, es-PY, es-BO, es-SV, es-HN, es-NI, es-PR
- Portugues: pt, pt-PT
- Portuguese Brazil: pt-BR
- French: fr, fr-BE, fr-CA, fr-MC, fr-CH, fr-LU, fr-FR
- Italian: it, it-IT, it-CH
- Turkish: tr, tr-TR
- Czech: cz, cz-CZ
- Thai: th
- Arabic: ar, ar-SA, ar-IQ, ar-EG, ar-LY, ar-DZ, ar-MA, ar-TN, ar-OM, ar-YE, ar-SY, ar-JO, ar-LB, ar-KW, ar-AE, ar-BH, ar-QA
- Polish: pl
- Slovakian: sk
- Ukranian: uk
- Russian: ru
- Indonesian: id
- Simplified Chinese: zh-CN
- Japanese: ja

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
