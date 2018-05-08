<script src="//app.flipbase.com/recorder.js"></script>

# Flipbase Partner documentation

Flipbase enables you to add video recording and playback capabilities to your website, web application or recruitment-system, with 1 line of Javascript code. Flipbase exists of a [recorder.js Javascript library](recorder/docs.md), a [player.js Javascript library](player/docs.md) and an [API](api/api.md).

### Who is this documentation meant for?

This documentation is meant for implementation partners who want to use the recorder, player or both.

### Scope of the documentation

The documentation should you guide through some basic concepts of our service and how you can use the different parts of the Flipbase service. The documentation assumes knowledge of programming and networking.

### Implementation scenario's
If you want to use Flipbase you can choose multiple paths to implement Flipbase:

1. You implement the [recorder](recorder/docs.md) and [player](player/docs.md) application, but do not implement any communication with our API. Flibpase will provide you with a recorder_id and player_id (for each customer). This implementation path is usually sufficient if you only need to implement Flipbase for a single (or very few) customers.

2. You create a client that will communicate with the Flipbase API's, so you can create your own player_id's and recorder_id's. This implementation is usually advised for recruitment software providers (like Application Tracking Systems, Onboarding software providers and Job sites).
