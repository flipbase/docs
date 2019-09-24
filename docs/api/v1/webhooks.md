# Webhooks

  - [Create a collection](#create-a-collection)
  - [Read a collection](#read-a-collection)
  - [Update a collection](#update-a-collection)
  - [Delete a collection](#delete-a-collection)

## Create a collection

Create a collection within an existing organization.

**Request**

    POST /api/organizations/:id/webhooks
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

    {
      "data": {
        "type": "webhooks",
        "attributes": {
          "url": "https://yourdomain.com/api/listen_to_webhook",
          "method": "POST",
          "event": "pages.submitted"
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
          "type": "employer_branding",
          "allowed_privacy": "public",
          "player_id": "2419b1eb-fcfc-45b0-bde8-9a3c4d43c804",
          "recorder_id": "1a4ba320-7a4c-4040-9b67-c02490809cf1"
        }
      }
    }
