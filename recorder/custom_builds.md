# Custom builds per recorder instance

****To consider:****
- All instances on a single HTML page can use same server side generated hash;
  but when sign the hash with a recorder_secret, and therefore we need to create multiple hashes for multiple instances!!!!


****Basic behaviour****
- Multiple recorders instance on the same page can be loaded, even using different configurations
- It's possible to overwrite all configurations loaded from the server, manually!
- If you want to use multiple instances on 1 page, then you need to bind each recorder instance to a HTML element using the `selector` property in the configuration


## Basic usage

```html
<!--  Load the JavaScript Recorder library  -->
<script src="//app.flipbase.com/recorder.xxxxx1.js" ></script>

<!-- Place an HTML input element at the spot were you would like to show the Recorder -->
<form>
    <input type="flipbase"/>
</form>

<?php
  $date = date("c");
?>
<script> 
  // Create new recorder instance: adds a instance to Flipbase.recorders array
  // All additional configuration properties provided is this config will overwrite all 
  // configurations settings that are provided by the server. The configs will be matched based on // recorderId.
  var recorder = Flipbase.recorder({
    recorderId: 'xxx-xxx-xxx',
    hash: <?php echo hash_hmac('sha256', $date, '<YOUR_RECORDER_SECRET>', true); ?>,
    date: <?php echo $date; ?>,
    backgroundColor: '#FFF0000' // this will overwrite the server side added config
    initialize: true
  });

  // Init when intialize: false is used, we can init all instances later that are added!
  recorder.initAll();

  // OR init instance like this
  Flipbase.getRecorderById('xxxxxx-xxxxx-xxxxx').init();
</script>
```
## Add multiple recorder instances

When using multiple recorder instances a `selector` property is required!

```html
<script src="//app.flipbase.com/recorder.xxxxx1.js" ></script>
<script src="//app.flipbase.com/recorder.xxxxx2.js" ></script>

<form>
    <input type="flipbase"/>
</form>

<script>
// Add recorder instance 1
var recorder1 = Flipbase.recorder({
  recorderId: 'xxxxxx1',
  hash: recorderHash1,
  date: date1,
  selector: '#flipbase', // required when you have multiple recorder instances on a page
  intiliaze: false // do not create recorder instantly!
});

// Add recorder instance 1
Flipbase.recorder({
  recorderId: 'xxxxxx2',
  hash: recorderHash2,
  selector: '#flipbase2', // required when you have multiple recorder instances on a page
  initiliazeOnload: false // do not create recorder instantly!
});
</script>
```

## Async usage

```html
<script async src="//app.flipbase.com/recorder.xxxxx1.js" ></script>

<script>
window['Flipbase'] = window['Flipbase'] || {};
Flipbase['recorders'] = window.Flipbase['recorders'] = [
  {
    config for instance 2
  },
  {
    config for instance 1
  }
];

// If the config on server has initialize: true, then the recorder(s) will be shown when all is loaded, if not we need to do it our selves

// Triggerd when ready  
Flipbase.recorder.loaded = function () {
  Flipbase.recorder.initAll();
}
</script>
```

## Compatible with old legacy recorder.js API

Flipbase.recorder is still registered as a method, the legacy method just delegates the config to

````html

<script>
Flipbase.recorder = function (conf) {
  var destroyIsAlreadyExectued = false;

  // Placeholder for recorder.destroy() method
  var recorder = {
    destroy: function () {
      destroyIsAlreadyExectued = true;
    }
  };

  // We need to show here some kind of loading icon!
  
  // Only fetch config when not loaded yet!!!
  // Fetch config from server with callback, check: http://blog.kevinchisholm.com/asynchronous-javascript/cross-browser-asynchronous-javascript-script-loading/

  loadAsync(recorder.<conf.recorderId>.js, function () {
    // callback

    Flipbase['recorders'] = window.Flipbase['recorders'] = [];
    
    // Register config to new API
    Flipbase['recorders'].push(obj)

    // Getter
    recorder = Flipbase.getRecorderById('xxxx-xxx-xxxxx');
    
    // Init the recorder, but only when the destroy method is not yet called!
    if (!destroyIsAlreadyExectued)
      recorder.init();
  });

  // Return the instance so it can be destroyed
  return recorder;
}

// This is how we currently use the recorder!
var recorder = Flipbase.recorder({recorderId:'xxxx'});
recorder.destroy();
</script>
````

## Reference

Flipbase API
- Flipbase
  - recorder instances
    - destroy
    - init
    - onLoad (async callback triggered when recorder code is invoked!)
  - getRecorderById


- recorders
  - push

Instance API
- destroy
- init

Configurations properties
- recorderId
- hash
- date
- selector HTML element query selector
- initialize: true // if true, the instance create instantly when config is added!
