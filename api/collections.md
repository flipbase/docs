# Collections

Collections are groups that hold videos. Each collection will have its own globally unique `player_id` and `recorder_id` which can be used to playback videos using the Player application and to record and submit videos using the Recorder application.

## Attributes

Attributes | Required | Description
--- | --- | ----
name | yes | Name of the collection
description | no | Explanation what kind of video's the collection holds, or where the video's are used for.
secure_mode | no | When set to 'true' the player.js application requires `data-signature` properties to be added the HTML elements, to be able to load videos files. Read more about [`signatures`](overview.html#using-the-signature-with-the-flipbase-playerjs).
delete_after_days | no | Videos will be automatically deleted after X days after they were created. Defaults to 365 days, maximum value is 9999 (which equals about 27 years), minimum value is 1 day. 
allowed_privacy | no | Whether videos in this collection are publicly accessible or not. When no authenication is necessary to playback videos, set allowed_privacy to `public`. Default is 'private'. 
player_id | no | The player_id is a globally unique UUID and cannot be updated
recorder_id | no | The recorder_id is a globally unique UUID and cannot be updated

## GET  /collections

List all the collections that are accessible by the current user.

### Request

    GET /api/collections
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

### Response

    {
      "data": [{
        "type": "collections",
        "id": "5370df982b2779cf60e03217",
        "attributes": {
          "name": "Collection ABC",
          "description": "ABC corporate recruitment related videos",
          "secure_mode": true,
          "delete_after_days": 90,
          "allowed_privacy": "private",
          "player_id": "2419b1eb-fcfc-45b0-bde8-9a3c4d43c804"
          "recorder_id": "1a4ba320-7a4c-4040-9b67-c02490809cf1"
        }
      }, {
        "type": "collections",
        "id": "23d10d0fe4b4f2b53d967c24",
        "attributes": {
          "name": "Public videos of Finance",
          "secure_mode": false,
          "delete_after_days": 90,
          "allowed_privacy": "public",
          "description": "Employer branding videos",
          "player_id": "5819b1eb-fcfc-45b0-bde8-9a3c4d43c985"
          "recorder_id": "994ba320-7a4c-4040-9b67-c02490809a59"
        }      
      }]
    }

## POST /organizations/:id/collections

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

## GET /collections/:id
**Request**

    GET /api/collections/5370df982b2779cf60e03217
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
          "delete_after_days": 365,
          "allowed_privacy": "private",
          "player_id": "2419b1eb-fcfc-45b0-bde8-9a3c4d43c804",
          "recorder_id": "1a4ba320-7a4c-4040-9b67-c02490809cf1"
        }
      }
    }

## PUT  /collections/:id
**Request**

    PUT /api/collections/5370df982b2779cf60e03217
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

## DELETE /collections/:id

When you delete a collection, the videos that are related to this collection will not be deleted. You have to manually delete the videos related to this collection. However, since the player_id and recorder_id won't exist after you delete the collection, its not possible to access any videos anymore. 

**Request**

    DELETE /api/collections/5370df982b2779cf60e03217
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=


**Response**

No response body, just a 200 (= successfully deleted), 404 (= not found / already deleted), 401 (= not authorized)