<script src="//app.flipbase.com/recorder.js"></script>
<script type="text/javascript" src="//use.typekit.net/uvu0omm.js"></script>
<script>try{Typekit.load();}catch(e){}</script>

<img src="https://flipbase.com/wp-content/uploads/2017/09/Flipbase-logo_RGB-01-uai-720x297.png" width="200" style="margin: auto  0px;"/>

# Flipbase developer documentation

This documentation is meant for implementation partners who want to use the recorder, player or both.

Flipbase enables you to add whitelabel video recording and playback capabilities to your website, web application or recruitment-system.

# Integrate Flipbase recorder
## Prerequisities

- Flipbase recorder_id

{% method %}
## Configuration  {#recorder-configuration}
In order to use the Recorder app, place the HTML-code in your code, as shown below. The recorder.js application is based on a HTML `<input type="flipbase"/>` element and the JavaScript recorder.js library.

The code above will result into this:

<div>
  <input type="flipbase" style="display:none;"/>
</div>
<script>
  Flipbase.recorder({
    recorderId: '9eaf41fd-4f3f-4fdb-b8ca-de84eeaed407',
  });
</script>

{% sample lang="js" %}
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

{% endmethod %}


## Multiple recorder instances



# Integrate Flipbase player
## Prerequisities

- Flipbase player_id
- Flipbase video_id (recorded or uploaded using the Flipbase recorder)

## Configuration
## Multiple player instances

# Integrate Flipbase platform

### Prerequisities

- Flipbase API account with an api_key and api_secret
- Flipbase Employer Branding Partner License

{% method %}
** Getting started**

Copy and paste the iframe within a page on your webpage as an iframe. This will load the Flibpase the platform.

{% sample lang="js" %}
```html
<iframe id="flipbase-iframe" src="https://app.flipbase.com" allow="microphone; camera;" frameborder="none" width="100%" height="100%"></iframe>
```
{% endmethod %}

{% method %}
**Change the default language of the platform**

The overwrite the Flipbase default language, you can change the default language that is used to load the Flipbase platform. By default the platform will be presented in English.

{% sample lang="js" %}
```html
<iframe id="flipbase-iframe" src="https://app.flipbase.com?lang=es" allow="microphone; camera;" frameborder="none" width="100%" height="100%"></iframe>
```
{% endmethod %}

{% method %}
**Customize look & feel**

If you would like to integrate the video platform as a whitelabel solution into your software, we offer multiple customizations. For each partner Flipbase can customize multiple settings, like font, hiding navigation menu items and change primary and secondary colours.

For each partner Flipbase can create a preset configuration which will automatically be loaded once the platform is Initialized with the `?partner=<your_parter_name>` in the querystring.

{% sample lang="js" %}
```html
<iframe id="flipbase-iframe" src="https://app.flipbase.com?partner=<partner_name>" allow="microphone; camera;" frameborder="none" width="100%" height="100%"></iframe>
```
{% endmethod %}

{% method %}
## Authenticate users automatically
If you want to prevent your end users to login in twice in your platform, to also use the Flipbase platform, we offer an authentication mechanism. Please also see the API reference

{% sample lang="js" %}
```html
<iframe id="flipbase-iframe" src="https://app.flipbase.com?partner=lumesse" allow="microphone; camera;" frameborder="none" width="100%" height="100%"></iframe>
<script>
  // Get the iframe by its id
  var win = document.getElementById("flipbase-iframe").contentWindow;

  // 1. Optional listen for the app.flipbase.com to be loaded and ready to receive a message
  window.addEventListener('message', function (event) {

    // 2. Make API request to fetch JWT token
    var fakeTokenReceivedFromAPI = {
      "token": "some.token",
      "expires_at": 1535707034000,
      "created_at": 1535447834718
    }

    // 3. send JWT token stringified to the iframe
    if (event.data === "ready") {
      win.postMessage(JSON.stringify(fakeTokenReceivedFromAPI), "\*");
    }

    // 4. you will receive a notification if the JWT token has been stored in the application.
    // Please know; this is something else then successfully authentication! If the JWT token
    // is invalid or expired you will still receive the 'success' message, but the user will see a login screen
    if (event.data === "success") {
      console.log('Token is successfully received and user is succesfully logged in!');
    }

  }, false)
</script>
```
{% endmethod %}
