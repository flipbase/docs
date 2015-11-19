# Implemantation

## Tips

What you should know before implementating the recorder interface:

* We strongly advice you to make sure that in in all cases (even on mobile phones), the recorder interface is not smaller then 244 pixels wide.


## Why a minimum width of 244 pixels?!

Well, that's because of Flash. The Flash Player will automatically deny all access to the microphone and webcam if the interface is smaller then 244 pixels wide. If the interface is smaller then 244 pixels, there is not enough room for the Flash Player to show the access dialogue to the user to accept microphone and webcam access. Therefore Flash will automatically block all access and therefore it is not possible to record a video. This access dialogue looks something like this:

// image

If you don't care about the user experience and don't want to use webcam recordings anyway, you can try to use a smaller interface. 