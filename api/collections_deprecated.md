# Collections (deprecated)

Below API's will be deprecated per 01-08-2019.

- [Read a collection](#read-a-collection)
- [Delete a collection](#delete-a-collection)

## Read a collection

**Request**

    GET /api/collections/afbf4c8996fb92427
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

**Response**

    {
      "data": {
        "type": "collections",
        "id": "5370df982b2779cf60e03217",
        "attributes": {
          "name": "Collection ABC",
          "description": "ABC corporate recruitment related videos",
          "secure_mode": true,
          "delete_after_days": 90,
          "allowed_privacy": "private",
          "player_id": "2419b1eb-fcfc-45b0-bde8-9a3c4d43c804",
          "recorder_id": "1a4ba320-7a4c-4040-9b67-c02490809cf1"
        }
      }
    }


## Delete a collection

When you delete a collection, the videos that are related to this collection will not be deleted. You have to manually delete the videos related to this collection. However, since the player_id and recorder_id won't exist after you delete the collection, its not possible to access any videos anymore.

**Request**

    DELETE /api/collections/afbf4c8996fb92427
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

**Response**

No response body, just a 200 (= successfully deleted), 404 (= not found / already deleted), 401 (= not authorized)
