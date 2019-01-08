# Integrate Flipbase platform

### Prerequisites
- Flipbase API account with an `api_key` and `api_secret`
- Flipbase Employer Branding Partner License

#### Getting started

Copy and paste the iframe within a page on your webpage as an iframe. This will load the Flipbase the platform.

```html
<iframe id="flipbase-iframe" src="https://app.flipbase.com" allow="microphone; camera;" frameborder="none" width="100%" height="100%"></iframe>
```

#### Change the default language of the platform

To overwrite the Flipbase default language, you can change the language that is used to load the Flipbase platform. By default the platform will be presented in English.

```html
<iframe id="flipbase-iframe" src="https://app.flipbase.com?lang=es" allow="microphone; camera;" frameborder="none" width="100%" height="100%"></iframe>
```

#### Customize look & feel

If you would like to integrate the Flipbase platform as a white-label solution into your software, we offer multiple customizations. For each partner, Flipbase can customize multiple settings like font, hiding the navigation menu items and changing primary and secondary colors.

For each partner Flipbase can create a preset configuration which will automatically be loaded once the platform is initialised with the `?partner=<your_parter_name>` in the querystring.

```html
<iframe id="flipbase-iframe" src="https://app.flipbase.com?partner=<partner_name>" allow="microphone; camera;" frameborder="none" width="100%" height="100%"></iframe>
```

#### Authenticate users

If you want to prevent your end users having to login twice in your software, we offer an authentication mechanism. Please see the API reference.

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
