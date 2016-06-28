# Video API

## DELETE /videos/:id

    DELETE /v1/api/videos/5370df91eb-fcfc-45b0-bde8-9a3c43t
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:c8996fb92427ae41e4649b934ca495991b7852b85c8996fb92427ae41e4649b934ca495991b7852b85


**Response**

No response body, just a 200 (= successfully deleted), 404 (= not found / already deleted), 401 (= not authorized)