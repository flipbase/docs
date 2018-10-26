# Videos

- [List videos](#list-videos)
- [Read a video](#delete-a-video)
- [Delete a video](#delete-a-video)

### List videos

**Request**

    GET /api/organization/5b53484422e3d6123e82788/videos
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

**Response**

    {
      "data": [{
        "type": "videos",
        "id": "2419b1eb-fcfc-45b0-bde8-9a3c4d43c804",
        "attributes": {
          "privacy": "private",
          "expiration_time": 3600000,
          "submit_method": "upload",
          ...
      }, {
        "type": "videos",
        "id": "2419b1eb-fcfc-45b0-bde8-9a3c4d43c804",
        "attributes": {
          "privacy": "private",
          "expiration_time": 3600000,
          "submit_method": "upload"
          ...       
      }, {
        "type": "videos",
        "id": "2419b1eb-fcfc-45b0-bde8-9a3c4d43c804",
        "attributes": {
          "privacy": "private",
          "expiration_time": 3600000,
          "submit_method": "upload"
          ...
      }]
    }

### Read a video

Retrieve all metadata for a single video.

**Request**

    GET /api/organization/5b53484422e3d6123e82788/videos/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

**Response**

    {
      "data": {
        "id": "4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234",
        "type": "videos",
        "attributes": {
          "status": "created",
          "privacy": "private",
          "labels": [],
          "submit_method": "webrtc_webcam",
          "thumbnails": [
            {
              "filename": "59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/thumbs/frame_0000_640x480_padded_IE.jpg",
              "dimensions": "640x480",
              "file_size_bytes": 23451,
              "format": "JPG",
              "url": "https://s3.some-region.some-provider.com/some-directory/59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/thumbs/frame_0000_640x480_padded_IE.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ABBCCDDEEFFGGHHIIJJ%2F20180504%2Fsome-region%2Fs3%2Frequest&date=20180504T134930Z&expires=3600",
            },
            {
              "filename": "59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/thumbs/frame_0000_1080x720.jpg",
              "dimensions": "1080x720",
              "file_size_bytes": 43025,
              "format": "JPG",
              "url": "https://s3.some-region.some-provider.com/some-directory/59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/thumbs/frame_0000_1080x720.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ABBCCDDEEFFGGHHIIJJ%2F20180504%2Fsome-region%2Fs3%2Frequest&date=20180504T134930Z&expires=3600",
            },
            {
              "filename": "59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/thumbs/frame_0000_150x150.jpg",
              "dimensions": "150x150",
              "file_size_bytes": 4327,
              "format": "JPG",
              "url": "https://s3.some-region.some-provider.com/some-directory/59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/thumbs/frame_0000_150x150.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ABBCCDDEEFFGGHHIIJJ%2F20180504%2Fsome-region%2Fs3%2Frequest&date=20180504T134930Z&expires=3600",
            },
            {
              "filename": "59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/thumbs/frame_0000_400x400.jpg",
              "dimensions": "400x400",
              "file_size_bytes": 15652,
              "format": "JPG",
              "url": "https://s3.some-region.some-provider.com/some-directory/59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/thumbs/frame_0000_400x400.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ABBCCDDEEFFGGHHIIJJ%2F20180504%2Fsome-region%2Fs3%2Frequest&date=20180504T134930Z&expires=3600",
            }
          ],
          "input": {
            "state": "finished",
            "video_bitrate_in_kbps": 2345,
            "total_bitrate_in_kbps": 2394,
            "video_codec": "vp9",
            "file_size_in_bytes": 1492912,
            "width": 1080,
            "height": 720,
            "audio_codec": "opus",
            "audio_bitrate_in_kbps": 49,
            "audio_sample_rate": 48000,
            "duration_in_ms": 5039,
            "frame_rate": null,
            "format": "webm",
            "signed_upload_url": "https://s3.some-region.some-provider.com/some-directory/59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/original?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ABBCCDDEEFFGGHHIIJJ%2F20180504%2Fsome-region%2Fs3%2Frequest&date=20180504T134059Z&expires=3600&",
            "url": "some-directory/59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/original",
            "filename": "59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/original",
            "multi_parts": [
              {
                "signed_url": "https://s3.some-region.some-provider.com/some-directory/59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/original?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ABBCCDDEEFFGGHHIIJJ%2F20180504%2Fsome-region%2Fs3%2Frequest&date=20180504T134059Z&expires=7200",
                "part_number": 1,
              }
            ]
          },
          "outputs": [
            {
              "filename": "59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/h264_baseline_aac_padded_IE.mp4",
              "url": "https://s3.some-region.some-provider.com/some-directory/59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/h264_baseline_aac_padded_IE.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ABBCCDDEEFFGGHHIIJJ%2F20180504%2Fsome-region%2Fs3%2Frequest&date=20180504T134930Z&expires=3600",
              "state": "finished",
              "frame_rate": 25,
              "duration_in_ms": 5098,
              "audio_sample_rate": 48000,
              "audio_bitrate_in_kbps": 44,
              "audio_codec": "aac",
              "height": 480,
              "width": 640,
              "file_size_in_bytes": 578819,
              "video_codec": "h264",
              "total_bitrate_in_kbps": 912,
              "video_bitrate_in_kbps": 868,
              "format": "mpeg4",
            },
            {
              "filename": "59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/vp8_vorbis.webm",
              "url": "https://s3.some-region.some-provider.com/some-directory/59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/vp8_vorbis.webm?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ABBCCDDEEFFGGHHIIJJ%2F20180504%2Fsome-region%2Fs3%2Frequest&date=20180504T134930Z&expires=3600",
              "state": "finished",
              "frame_rate": 25,
              "duration_in_ms": 5043,
              "audio_sample_rate": 48000,
              "audio_bitrate_in_kbps": 55,
              "audio_codec": "vorbis",
              "height": 720,
              "width": 1080,
              "file_size_in_bytes": 1189514,
              "video_codec": "vp8",
              "total_bitrate_in_kbps": 1875,
              "video_bitrate_in_kbps": 1820,
              "_id": "5aec62fff2bc4c7470f0e928",
              "format": "webm",
            },
            {
              "filename": "59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/theora_vorbis.ogv",
              "url": "https://s3.some-region.some-provider.com/some-directory/59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/theora_vorbis.ogv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ABBCCDDEEFFGGHHIIJJ%2F20180504%2Fsome-region%2Fs3%2Frequest&date=20180504T134930Z&expires=3600",
              "state": "finished",
              "frame_rate": 25,
              "duration_in_ms": 5040,
              "audio_sample_rate": 48000,
              "audio_bitrate_in_kbps": 56,
              "audio_codec": "vorbis",
              "height": 720,
              "width": 1080,
              "file_size_in_bytes": 695680,
              "video_codec": "theora",
              "total_bitrate_in_kbps": 1093,
              "video_bitrate_in_kbps": 1037,
              "format": "ogg",
            }
          ],
          "encoding_state": "finished",
          "referer": "https://someurl.example.com/first/grid/job/123",
          "created_at": "2018-05-04T13:40:58.615Z",
          "updated_at": "2018-05-04T13:40:58.615Z",
          "user_agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36",
          "ip_address": "217.111.106.53",
          "multi_parts": [
            {
              "signed_url": "https://s3.some-region.some-provider.com/some-directory/59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/original?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ABBCCDDEEFFGGHHIIJJ%2F20180504%2Fsome-region%2Fs3%2Frequest&date=20180504T134059Z&expires=7200",
              "part_number": 1,
            }
          ],
          "recorder_id": "7d786585-792a-4483-b302-754afbdb437d",
          "player_id": "c6d29242-2195-41d3-95c8-ecee56d67001",
          "collection_id": "59b131f85fca9028dfas19u901097",
          "organization": "59b131f85fb9107893ca6511",
          "recorder_output": "id",
          "playback_urls": [
            {
              "state": "finished",
              "url": "https://s3.some-region.some-provider.com/some-directory/59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/h264_baseline_aac_padded_IE.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ABBCCDDEEFFGGHHIIJJ%2F20180504%2Fsome-region%2Fs3%2Frequest&date=20180504T134930Z&expires=3600",
              "filename": "59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/h264_baseline_aac_padded_IE.mp4",
              "format": "mpeg4",
              "height": 480,
              "width": 640
            },
            {
              "state": "finished",
              "url": "https://s3.some-region.some-provider.com/some-directory/59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/vp8_vorbis.webm?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ABBCCDDEEFFGGHHIIJJ%2F20180504%2Fsome-region%2Fs3%2Frequest&date=20180504T134930Z&expires=3600",
              "filename": "59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/vp8_vorbis.webm",
              "format": "webm",
              "height": 720,
              "width": 1080
            },
            {
              "state": "finished",
              "url": "https://s3.some-region.some-provider.com/some-directory/59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/theora_vorbis.ogv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ABBCCDDEEFFGGHHIIJJ%2F20180504%2Fsome-region%2Fs3%2Frequest&date=20180504T134930Z&expires=3600",
              "filename": "59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/theora_vorbis.ogv",
              "format": "ogg",
              "height": 720,
              "width": 1080
            }
          ],
          "upload_url": "https://s3.some-region.some-provider.com/some-directory/59b131f85fca9028dfas19u901097/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234/original?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ABBCCDDEEFFGGHHIIJJ%2F20180504%2Fsome-region%2Fs3%2Frequest&date=20180504T134059Z&expires=3600",
          "secure_share_url": null,
          "secure_embed_url": null,
          "share_url": "https://app.flipbase.com/share/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234",
          "embed_url": "https://app.flipbase.com/embed/4f28fae2fdsa-7a1f-4d53-9509-1234780fxyz1234"
        }
      }
    }

### Delete a video

    DELETE /api/organization/fdsafdsa123/videos/5370df91eb-fcfc-45b0-bde8-9a3c43t
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

**Response**

No response body, just a 204 (= successfully deleted), 404 (= not found / already deleted), 401 (= not authorized) status
