# Videos


## GET /videos/:id

**Request**

    GET /api/videos/2419b1eb-fcfc-45b0-bde8-9a3c4d43c804
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

**Response**

    {
      "data": {
        "type": "videos",
        "id": "2419b1eb-fcfc-45b0-bde8-9a3c4d43c804",
        "attributes": {
          "privacy": "private",
          "expiration_time": 3600000,
          "submit_method": "upload",
          "width": 720,
          "height": 360,
          "duration": 300130,
          "labels": ["test", "vacature-xyz"],
          "created_at": "",
          "modified_at": "",
          "formats": [
            {
              "type": "video"
              "format": 'mp4',
              "width": 640,
              "height": 480,
              "duration": 300130,
              "frame_rate": 24,
              "audio_bitrate_in_kbps": 122,
              "audio_codec": "aac",
              "file_size_in_bytes": 234234321,
              "status": "ready",
              "total_bitrate_in_kbps": 0,
              "video_bitrate_in_kbps": 0,
              "video_codec": "h264"
              "audio_sample_rate": 22,
              "file_name": "aac_h264_640x480.mp4",
              "signed_url": "https://videos.flipbase.com/5370df982b2779cf7/2419b1eb-fcfc-45b0-bde8-9a3c4d43c804/aac_h264_640x480.mp4?Expires=1357034400&Signature=yYDhUF5EwRu19DzZrTxAnW7d8F5Kkai9HVx0FIu5jcQb0UEmatEXAMPLE3ReXySpLSMj0yCd3ZAB4UcBCAqEijkytL6f3fVYNGQI6&&Key-Pair-Id=APKA9ONS7QCOWEXAMPLE"
            },
            {
              "type": "video"
              "format": 'webm',
              "width": 640,
              "height": 480,
              "duration": 300130,
              "frame_rate": 24,
              "audio_bitrate_in_kbps": 122,
              "audio_codec": "aac",
              "file_size_in_bytes": 234234321,
              "status": "ready",
              "total_bitrate_in_kbps": 0,
              "video_bitrate_in_kbps": 0,
              "video_codec": "h264"
              "audio_sample_rate": 22,
              "file_name": "aac_h264_640x480.mp4",
              "signed_url": "https://videos.flipbase.com/5370df982b2779cf7/2419b1eb-fcfc-45b0-bde8-9a3c4d43c804/aac_h264_640x480.mp4?Expires=1357034400&Signature=yYDhUF5EwRu19DzZrTxAnW7d8F5Kkai9HVx0FIu5jcQb0UEmatEXAMPLE3ReXySpLSMj0yCd3ZAB4UcBCAqEijkytL6f3fVYNGQI6&&Key-Pair-Id=APKA9ONS7QCOWEXAMPLE"
            }
          ],
          "thumbnails": [
            {
              "type": "image",
              "format": "jpeg",
              "width": 640,
              "height": 480,
              "file_size": 12353242,
              "file_name": "001.jpeg",
              "signed_url": "https://videos.flipbase.com/5370df982b2779cf7/2419b1eb-fcfc-45b0-bde8-9a3c4d43c804/001.jpeg?Expires=1357034400&Signature=yYDhUF5EwRu19DzZrTxAnW7d8F5Kkai9HVx0FIu5jcQb0UEmatEXAMPLE3ReXySpLSMj0yCd3ZAB4UcBCAqEijkytL6f3fVYNGQI6&&Key-Pair-Id=APKA9ONS7QCOWEXAMPLE"
            }
          ]
        }
      }
    }

## DELETE /videos/:id

    DELETE /api/videos/5370df91eb-fcfc-45b0-bde8-9a3c43t
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

**Response**

No response body, just a 204 (= successfully deleted), 404 (= not found / already deleted), 401 (= not authorized) status