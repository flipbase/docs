# Accounts API

## GET  /accounts

Each account holds a reference to 1 recorder and 1 player instance.

Attributes | Required | Description
--- | --- | ----
name | yes | Name of the account, usually refers to the company or to a particular department.
description | no | Explanation what kind of video's the account holds, or where the video's are used for.
domains | yes | The `domains` attributes should hold all the domains were video's will be recorded and played. By default the domains MUST always contain the domain `*.flipbase.com` since the recorder uses CORS. You can include root domains (example.com) and wildcard domains (*.example.com). Wildcard domains refer to all subdomains of the root domain. If you want to record video's at record.example.com and play the video's at example.com, you need to include both like this `domains: ["*.example.com", example.com", "*.flipbase.com"]`
player_id | no | The player_id will be always available and cannot be updated
recorder_id | no | The recorder_id will be always available and cannot be updated

### Request

    GET /v1/api/accounts
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:c8996fb92427ae41e4649b934ca495991b7852b85c8996fb92427ae41e4649b934ca495991b7852b85

### Response

    {
      data: [{
        type: "accounts",
        id: "5370df982b2779cf60e03217",
        attributes: {
          name: "KPN Telecom",
          description: "KPN corporate recruitment related videos",
          domains: ["*.flipbase.com", "careers.kpn.com"],
          player_id: "2419b1eb-fcfc-45b0-bde8-9a3c4d43c804"
          recorder_id: "1a4ba320-7a4c-4040-9b67-c02490809cf1"
        }
      }, {
        type: "accounts",
        id: "23d10d0fe4b4f2b53d967c24",
        attributes: {
          name: "PricewaterhouseCoopers",
          description: "PWC employer branding",
          domains: ["*.flipbase.com", "careers.pwc.com", "*.pwc.com"],
          player_id: "5819b1eb-fcfc-45b0-bde8-9a3c4d43c985"
          recorder_id: "994ba320-7a4c-4040-9b67-c02490809a59"
        }      
      }]
    }

## POST /accounts

**Request**

    POST /v1/api/accounts
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:c8996fb92427ae41e4649b934ca495991b7852b85c8996fb92427ae41e4649b934ca495991b7852b85

    {
      data: {
        type: "accounts",
        attributes: {
          name: "KPN Telecom",
          description: "KPN corporate recruitment related videos",
          domains: ["*.flipbase.com", "careers.kpn.com"]
        }
      }
    }

**Response**

    {
      data: {
        type: "accounts",
        id: "5370df982b2779cf60e03217",
        attributes: {
          name: "KPN Telecom",
          description: "KPN corporate recruitment related videos",
          domains: ["*.flipbase.com", "careers.kpn.com"],
          player_id: "2419b1eb-fcfc-45b0-bde8-9a3c4d43c804"
          recorder_id: "1a4ba320-7a4c-4040-9b67-c02490809cf1"
        }
      }
    }

## GET /accounts/:id
**Request**

    GET /v1/api/accounts/5370df982b2779cf60e03217
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:c8996fb92427ae41e4649b934ca495991b7852b85c8996fb92427ae41e4649b934ca495991b7852b85

**Response**

    {
      data: {
        type: "accounts",
        id: "5370df982b2779cf60e03217",
        attributes: {
          name: "KPN Telecom",
          description: "KPN corporate recruitment related videos",
          domains: ["*.flipbase.com", "careers.kpn.com"],
          player_id: "2419b1eb-fcfc-45b0-bde8-9a3c4d43c804",
          recorder_id: "1a4ba320-7a4c-4040-9b67-c02490809cf1"
        }
      }
    }

## PUT  /accounts/:id
**Request**

    PUT /v1/api/accounts/5370df982b2779cf60e03217
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:c8996fb92427ae41e4649b934ca495991b7852b85c8996fb92427ae41e4649b934ca495991b7852b85


    {
      data: {
        type: "accounts",
        id: "11223344556677",
        attributes: {
          name: "KPN Telecom",
          description: "KPN corporate recruitment related videos",
          domains: ["*.flipbase.com", "*.kpn.com", "hroffice.com"],
          player_id: "2419b1eb-fcfc-45b0-bde8-9a3c4d43c804",
          recorder_id: "1a4ba320-7a4c-4040-9b67-c02490809cf1"
        }
      }
    }

**Response**

    {
      data: {
        type: "accounts",
        id: "11223344556677",
        attributes: {
          name: "KPN Telecom",
          description: "KPN corporate recruitment related videos",
          domains: ["*.flipbase.com", "*.kpn.com", "hroffice.com"],
          player_id: "2419b1eb-fcfc-45b0-bde8-9a3c4d43c804",
          recorder_id: "1a4ba320-7a4c-4040-9b67-c02490809cf1"
        }
      }
    }


## DELETE /accounts/:id
**Request**

    DELETE /v1/api/accounts/5370df982b2779cf60e03217
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:c8996fb92427ae41e4649b934ca495991b7852b85c8996fb92427ae41e4649b934ca495991b7852b85


**Response**

No response body, just a 200 (= successfully deleted), 404 (= not found / already deleted), 401 (= not authorized)
