# Customize your recorder

At initialisation of the Recorder, you are able to configure some settings:

#####HTTP or HTTPS

The Recorder loads all assets over the protocol that is used to load the webpage. So if the website is served using HTTPS, all additional Flipbase server traffic will be over HTTPS.

#####Responsive

The Recorder app is fully responsive. No maximum width is provided and therefore the Recorder will fill up the parent element containing the `<input type="flipbase"/>` element by default. Caution: if the parent element of the recorder is a table element, this table element needs to have a minimum width. Otherwise, it’s not possible to record a video.

#####Background color

You can change the background color of the homescreen by providing the `backgroundColor` property in HEX format.

#####CSS className

You can apply a CSS class defined in one of your own stylesheets to the Recorder by providing the className property.

#####Multi language support

You can select which language of the Recorder interface by providing the locale property. Currently the following locales are supported: `nl_nl` (Dutch) and `en_us`.

#####Duration of 1 take

U kunt een instellen hoeveel seconden 1 take wilt laten duren via de duration eigenschap. Standaard is deze ingesteld op 30 seconden.

#####Callback

After a video is recorded you are able to provide your own callback functionality. Using the callback property you can trigger a function that is defined in the global scope (bound to the `window` object). This callback function will be executed when the video is successfully saved and will provide 2 arguments: the data-video-id and the HTML element.