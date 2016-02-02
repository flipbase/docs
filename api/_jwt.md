# Flipbase API

The Flipbase API enables access to resource like `apps` and `videos`. The API is based upon the oAuth 2.0 framework, utilizng JWT for authentication and oAuth Bearer tokens for authorization.
The Flipbase API specification is based upon (and compliant with):

- [JWT RFC 7519 spec](https://tools.ietf.org/html/rfc7519)
- [JWT profiles for oAuth 2.0 RFC 7523 spec](https://tools.ietf.org/html/rfc7523)
- [oAuth 2.0 RFC 6749 spec](http://tools.ietf.org/html/rfc6749)

## POST /oauth/token

Flipbase will register a new Client upon request and issue a set of client credentials, containing a client_id and a client_secret. These credentials are necessary to sign the Json Web Token (JWT) that is necessary to get an access token.

### Json Web Token (JWT)
    # Header
    header = {
      "alg": "HS256",
      "typ": "JWT"
    }

    # Payload
    payload = {
      "iss": "hroffice",
      "aud": "https://app.flipbase.com/api/oauth/token",
      "sub": "<YOUR_CLIENT_ID>",
      "exp": 3600
    }

    encodedString = Base64(header) + "." + Base64(payload)

    # Signature
    signature = HMACSHA256(encodedString, <YOUR_CLIENT_SECRET>)

    # Token
    token = header + "." + payload + "." + signature

**Request**

    POST /api/oauth/token?grant_type=client_credentials&
      client_assertion_type=urn:ietf:params:oauth:grant-type:jwt-bearer&
      client_assertion=<YOUR_JWT>
    Host: app.flipbase.com
    Content-Type: application/x-www-form-urlencoded

**Response**

    {
      access_token: "mF_9.B5f-4.1JqM",
      token_type: "bearer",
      expires_in: 3600
    }

**Error response**

    {
      error: "invalid_request" // or 'invalid_client', 'invalid_grant', 'unauthorized_client', 'unsupported_grant_type', 'invalid_scope'
      error_description: "description of the error"
    }

## GET  /apps
### Request

    GET /api/apps
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Bearer mF_9.B5f-4.1JqM

### Response

    {
      data: [{
        type: "apps",
        id: "5370df982b2779cf60e03217",
        attributes: {
          name: "KPN Telecom",
          description: "KPN corporate recruitment related videos",
          domains: ["*.flipbase.com", "careers.kpn.com"],
          player_id: "2419b1eb-fcfc-45b0-bde8-9a3c4d43c804"
          recorder_id: "1a4ba320-7a4c-4040-9b67-c02490809cf1"
        }
      }, {
        type: "apps",
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

## POST /apps

**Request**

    POST /api/apps
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Bearer mF_9.B5f-4.1JqM

    {
      data: {
        type: "apps",
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
        type: "apps",
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

## GET /apps/:id
**Request**

    GET /api/apps/5370df982b2779cf60e03217
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Bearer mF_9.B5f-4.1JqM

**Response**

    {
      data: {
        type: "apps",
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

## PUT  /apps/:id
**Request**

    PUT /api/apps/5370df982b2779cf60e03217
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Bearer mF_9.B5f-4.1JqM

    {
      data: {
        type: "apps",
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
        type: "apps",
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

## DELETE /apps/:id
**Request**

    DELETE /api/apps/5370df982b2779cf60e03217
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Bearer mF_9.B5f-4.1JqM

**Response**

No response body, just a 200 (= succesfully deleted), 404 (= not found / already deleted), 401 (= not authorized)

## DELETE /videos/:id

    DELETE /api/videos/5370df91eb-fcfc-45b0-bde8-9a3c43t
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Bearer mF_9.B5f-4.1JqM

**Response**

No response body, just a 200 (= succesfully deleted), 404 (= not found / already deleted), 401 (= not authorized)

