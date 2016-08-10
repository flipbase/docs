# Flipbase API

The Flipbase API enables access to resource like `apps` and `videos`. Authentication and authorization of the API is modeled after Amazon's signed URL framework. The API utilizes [RFC 2104](https://tools.ietf.org/html/rfc2104) and [RFC 4868](https://tools.ietf.org/html/rfc4868) compliant HMAC's.

## Create a signed request

The Flipbase API will deny all non-authorized requests by default. You can authorize a request using the `Authorization` header in the following format: `<FlipbaseClientId>:<Signature>`

### Create a signature

    StringToSign = HTTP-Verb + "\n" +
         URI-encode( <Path> ) + "\n" +
         Date;

    Signature = Base64( HMAC-SHA256( <FLIPBASE_CLIENT_SECRET>, UTF-8-Encoding-Of( <StringToSign> ) ) ); 

    DELETE /v1/api/videos/<VIDEO_ID> HTTP/1.1
    Host: app.flipbase.com
    Date: Date
    Authorization: Signature <FLIPBASE_CLIENT_ID>:<Signature>

**StringToSign attributes**

The string to sign that is used to create the signature is build using 3 attributes: the verb, path and date

Attributes |  Description
--- |  ----
HTTP-Verb | Uppercase plain-text (e.g GET, POST, PUT or DELETE)
Path | URI path and query paramaters ((in lowercase characters only, excluding hostname) 
Date | The date value should be identitcal to the value provided in the Date or X-Flipbase-Date header. The Date is the current UTC time in [ISO 8601](https://www.ietf.org/rfc/rfc3339.txt) format (for example, 2016-08-08T09:04:29Z).

### Headers

Header |  Required | Descriptions
--- | ---- | ----
Date | only if `X-Flipbase-Date` is omitted | The value of the `Date` header must be in one of the [RFC 2616](http://www.ietf.org/rfc/rfc2616.txt) formats. Some HTTP client libraries do not expose the ability to set the Date header for a request. If you have trouble including the value of the `Date` header in the headers, you can set the timestamp for the request by using an `X-Flipbase-Date` header instead. 
X-Flipbase-Date | only if `Date` header is omitted | The value of the `X-Flipbase-Date` header must be in one of the [RFC 2616](http://www.ietf.org/rfc/rfc2616.txt) formats. When an `X-Flipbase-Date` header is present in a request, the system will ignore any `Date` header when computing the request signature.
Authorization | yes | Prepend the <FlipbaseClientId>:<Signature> string with `Signature`.

## Resources

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
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

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
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

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
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

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
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=


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
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=


**Response**

No response body, just a 200 (= successfully deleted), 404 (= not found / already deleted), 401 (= not authorized)

## DELETE /videos/:id

    DELETE /v1/api/videos/5370df91eb-fcfc-45b0-bde8-9a3c43t
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=


**Response**

No response body, just a 200 (= successfully deleted), 404 (= not found / already deleted), 401 (= not authorized)
