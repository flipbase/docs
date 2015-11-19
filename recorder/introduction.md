# Flipbase recorder

The Flipbase recorder enables your website visitors to record or upload a video of themselves. 

## How does the recorder work...

#### Across devices?
We have tried to come up with a uniform interface: no matter on which device you use the application, it should look and feel similar on all these devices. However, we have to consider some limitations. 

#### When there is no webcam or Flash?

#### When the user doesn't use a browser that supports HTLM5 upload?

#### When the user saves a video?

#### How to verify if a users has saved a video?!


## What happens when I initiate the `Flipbase.recorder()` method?

When the JavaScript library is loaded and initialized using `Flipbase.recorder(...)`, the recorder will create a container `<div>` and place it just above the `<input type="flipbase"/>` element.
The `<input type="flipbase"/>` element will be made invisible (in case it isn’t invisible yet). 




Saved video’s will be encoded to multiple video formats (mp4, ogg and webm) to make sure the video can be played in all (including mobile) browsers. All video’s are hosted on the Flipbase servers.

