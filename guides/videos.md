# Managing videos

Once end-users have create one or multiple videos, you as a partner, can manage the video. For example, you are allowed to publish or delete videos individually.

## Publish videos
Published videos do not require any form of authentication; so these videos should be assumed to be publicly accessible. If you want only authenticated and authorised entities to access a video, you need to make the video private. You can publish or unpublish a video if you like.

## Confirming videos
In the context of the GDPR it might be necessary to "confirm" once a subject has actually submitted a form where the Recorder application is implemented. When you enabled the `require_confirmation` property in the Collections videos cannot be played back until they are confirmed. To enable videos for playback you can [confirm a video](/api/videos.md#confirm-a-video).

## Delete a video
By default videos are automatically archived after a configurable amount of days after creation. You can use the `delete_after_days` property on a Collection to change when a video is deleted. Additionally, can you can delete videos manually if you like.
