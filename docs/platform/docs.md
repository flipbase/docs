---
hide_table_of_contents: true
---

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
<iframe id="flipbase-iframe" src="https://app.flipbase.com?lang=nl" allow="microphone; camera;" frameborder="none" width="100%" height="100%"></iframe>
```

| Language | Locale (case sensitive)|
|----|----|
| English US | en_us |
| English UK | en_uk |
| German | de |
| French | fr_fr |
| Simplified Chinese | zh_cn |
| Dutch | nl |

#### Customize look & feel

If you would like to integrate the Flipbase platform as a white-label solution into your software, we offer multiple customizations. For each partner, Flipbase can customize multiple settings like font, hiding the navigation menu items and changing primary and secondary colors.

For each partner Flipbase can create a preset configuration which will automatically be loaded once the platform is initialised with `?partner=<your_partner_name>` in the querystring.

```html
<iframe id="flipbase-iframe" src="https://app.flipbase.com?partner=<partner_name>" allow="microphone; camera;" frameborder="none" width="100%" height="100%"></iframe>
```

#### Authenticate users

If you want to prevent your end users having to login twice in your software, we offer an authentication mechanism. Please see the API reference.

```html
<iframe id="flipbase-iframe" src="https://app.flipbase.com?partner=<partner_name>" allow="microphone; camera;" frameborder="none" width="100%" height="100%"></iframe>
<script>
  var FLIPBASE_ORIGIN = "https://app.flipbase.com";

  // Get the iframe by its id
  var win = document.getElementById("flipbase-iframe").contentWindow;

  // 1. Optionally listen for app.flipbase.com to be loaded and ready to receive a message
  window.addEventListener('message', function (event) {

    // Ignore anything that did not come from the Flipbase iframe. Without this
    // check any frame or window on the page can send you a "ready".
    if (event.origin !== FLIPBASE_ORIGIN) return;

    // 2. Make API request to fetch JWT token
    var tokenReceivedFromAPI = {
      "token": "some.token",
      "expires_at": 1535707034000,
      "created_at": 1535447834718
    }

    // 3. Send the JWT token stringified to the iframe. Name the target origin
    //    explicitly — "*" would hand the token to whatever happens to be in
    //    the frame, which is the finding a security reviewer will open with.
    if (event.data === "ready") {
      win.postMessage(JSON.stringify(tokenReceivedFromAPI), FLIPBASE_ORIGIN);
    }

    // 4. You will receive a notification once the JWT token has been stored in the
    // application. Note that this is not the same as successful authentication: if the
    // token is invalid or expired you still receive 'success', but the user sees a login screen.
    if (event.data === "success") {
      console.log('Token received and user logged in.');
    }

  }, false)
</script>
```

`expires_at` and `created_at` are milliseconds since the Unix epoch — see
[Authentication](../api/v1/authentication.md#authenticate-using-json-web-tokens).
