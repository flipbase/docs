# Collections

Collections are groups that hold videos. Each collection will have its own globally unique `player_id` and `recorder_id` which can be used to playback videos using the Player application and to record and submit videos using the Recorder application.

  - [Create a collection](#create-a-collection)
  - [Read a collection](#read-a-collection)
  - [Update a collection](#update-a-collection)
  - [Delete a collection](#delete-a-collection)

## Create a collection

Create a collection within an existing organization.

**Request**

    POST /api/organizations/:id/collections
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

    {
      "data": {
        "type": "collections",
        "attributes": {
          "name": "Collection ABC",
          "description": "ABC corporate recruitment related videos",
          "secure_mode": true,
          "allowed_privacy": "private",
        }
      }
    }

**Response**

    {
      "data": {
        "type": "collections",
        "id": "5370df982b2779cf60e03217",
        "attributes": {
          "name": "Collection ABC",
          "description": "ABC corporate recruitment related videos",
          "secure_mode": true,
          "delete_after_days": 365,
          "allowed_privacy": "private",
          "player_id": "2419b1eb-fcfc-45b0-bde8-9a3c4d43c804",
          "recorder_id": "1a4ba320-7a4c-4040-9b67-c02490809cf1"
        }
      }
    }

## Read a collection

**Request**

    GET /api/organizations/149afbf4c8996fb92427ae41e464/collections/afbf4c8996fb92427
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


## Update a collection
**Request**

    PUT /api/organizations/149afbf4c8996fb92427ae41e464/collections/5370df982b2779cf60e03217
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=


    {
      "data": {
        "type": "collections",
        "id": "5370df982b2779cf60e03217",
        "attributes": {
          "name": "Collection ABC",
          "description": "ABC corporate recruitment related videos",
          "secure_mode": false,
          "delete_after_days": 21,
          "allowed_privacy": "private",
          "player_id": "2419b1eb-fcfc-45b0-bde8-9a3c4d43c804",
          "recorder_id": "1a4ba320-7a4c-4040-9b67-c02490809cf1"
        }
      }
    }

**Response**

    {
      "data": {
        "type": "collections",
        "id": "11223344556677",
        "attributes": {
          "name": "Collection ABC",
          "description": "ABC corporate recruitment related videos",
          "secure_mode": false,
          "delete_after_days": 21,
          "allowed_privacy": "private",
          "player_id": "2419b1eb-fcfc-45b0-bde8-9a3c4d43c804",
          "recorder_id": "1a4ba320-7a4c-4040-9b67-c02490809cf1"
        }
      }
    }

## Delete a collection

When you delete a collection, the videos that are related to this collection will not be deleted. You have to manually delete the videos related to this collection. However, since the player_id and recorder_id won't exist after you delete the collection, its not possible to access any videos anymore.

NOTE: This endpoint has been udpate. The precessor of this endpoint `DELETE /api/collections/5370df982b2779cf60e03217` has been deprecated but will be maintained. If we decided to remove this endpoint, parties that rely on this endpoint will be updated.

**Request**

    DELETE /api/organizations/149afbf4c8996fb92427ae41e464/collections/afbf4c8996fb92427
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=


**Response**

No response body, just a 200 (= successfully deleted), 404 (= not found / already deleted), 401 (= not authorized)
