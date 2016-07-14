# Create signed request to media API

### Client auth flow

1. Client generates hash
2. Client creates new video document with hash & recorderId (POST /video)
3. Client requests a signed request to access (POST /video/signed_request)
4. Client receives signed_url from Video API server 
5. Client uses signed url to upload or record to Media API

## Create signed request to upload video

Signed urls are denied when:
* Video is set to public (prio)
* Video document is created X hours before. Users usually only update video files within the first hour; it occurs very (!) seldom that video's are updated after the first 1 hour. So, a 3 hour limit is safe to use. When users do, they need to refresh the page and record a new video. (prio)
* Block playback of video's that are requested using recorder signature 3 hours after they have been created!

****Request*****

    POST /signed_request?
      action=upload&
      recorderId=xxxxx-xxxxx&
      date=xxxxxxx&
      video=xxxxx-xxxx-xxxxx&
      hash=xxxxx&
      file_size=xxxx&
      file_name=xxxxx
      file_type=xxxxx

****Response****

  https://flipbasemedia.com/api/v1/upload?
      action=upload&
      recorderId=xxxxx-xxxxx&
      date=xxxxxxx&
      video=xxxxx-xxxx-xxxxx&
      hash=xxxxx&
      file_size=xxxx&
      file_name=xxxxx&
      file_type=xxxxx
      signature=xxxxxx&
      expires=xxxxx

## Upload video file

    POST /upload
