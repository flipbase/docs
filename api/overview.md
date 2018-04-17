# API Overview

- [Authentication](#authentication)
- [Errors](#errors)
- Resources:
  * [Organizations](organizations.md)
  * [Collections](collections.md)
  - [Videos](videos.md)

## Authentication

When you want to use the API you need an `api_key` and an `api_secret`, provided by Flipbase. The `api_secret` will be used to generate (server side) signatures to send authenticated requests.

The Flipbase API enables access to resources like `organizations`, `collections` and `videos`. Authentication of the API is modeled after Amazon's signed URL framework. The API utilizes [RFC 2104](https://tools.ietf.org/html/rfc2104) and [RFC 4868](https://tools.ietf.org/html/rfc4868) compliant HMAC's.

Requests without signature will be denied.

## Create a signed request

The Flipbase API will deny all non-authorized requests by default. You can authorize a request using the `Authorization` header in the following format: `<FLIPBASE_API_KEY>:<Signature>`

### Signed requests

    StringToSign = HTTP-Verb + "\n" +
        URI-encode( <Path> ) + "\n" +
        Date;

    Signature = Base64( HMAC-SHA256( <FLIPBASE_API_SECRET>, UTF-8-Encoding-Of( <StringToSign> ) ) );

### Using a signature in API requests

    DELETE /api/videos/<VIDEO_ID> HTTP/1.1
    Host: app.flipbase.com
    Date: Date
    Authorization: Signature <FLIPBASE_API_KEY>:<Signature>

### Using the signature with the Flipbase Player.js

Just create a signature the way you do with any API request, but append the elements you've used in the `StringToSign` in querystring like style to the signature. NOTE: the URI-encoded path should equal: '/api/videos/<VIDEO_ID>' when creating signatures to be used along with the video player.

    SignatureString = 'signature=<SIGNATURE>&' +
      'api_key=<FLIPBASE_API_KEY>&' +
      'date=<DATE>'

Add this `signature` to each Flipbase HTML video element on the page;

    <video type="flipbase" data-video-id="786553529-a24e-22ae-cca6-891861f7895" data-signature="<SIGNATURE_STRING>"></video>

**StringToSign attributes**

The string to sign that is used to create the signature is build using 3 attributes: the verb, path and date

| Attributes | Description                                                                                                                                                                                                                       |
|:-----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| HTTP-Verb  | Uppercase plain-text (e.g GET, POST, PUT or DELETE)                                                                                                                                                                               |
| Path       | URI path and query paramaters ((in lowercase characters only, excluding hostname)                                                                                                                                                 |
| Date       | The date value should be identitcal to the value provided in the Date or X-Flipbase-Date header. The Date is the current UTC time in [ISO 8601](https://www.ietf.org/rfc/rfc3339.txt) format (for example, 2016-08-08T09:04:29Z). |

### Headers

It's also possible to send these parameters along in the query instead of headers of the request.

| Header          | Required                             | Descriptions                                                                                                                                                                                                                                                                                                                                                                  |
|:----------------|:-------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Date            | only if `X-Flipbase-Date` is omitted | The value of the `Date` header must be in one of the [RFC 2616](http://www.ietf.org/rfc/rfc2616.txt) formats. Some HTTP client libraries do not expose the ability to set the Date header for a request. If you have trouble including the value of the `Date` header in the headers, you can set the timestamp for the request by using an `X-Flipbase-Date` header instead. |
| X-Flipbase-Date | only if `Date` header is omitted     | The value of the `X-Flipbase-Date` header must be in one of the [RFC 2616](http://www.ietf.org/rfc/rfc2616.txt) formats. When an `X-Flipbase-Date` header is present in a request, the system will ignore any `Date` header when computing the request signature.                                                                                                             |
| Authorization   | yes                                  | Prepend the <FLIPBASE_API_KEY>:<Signature> string with `Signature`.                                                                                                                                                                                                                                                                                                           |

## Errors

### Authentication errors

    HTTP/1.1 401 Unauthorized

    {
      "message": "Bad credentials"
    }

### Authorzation errors



### Invalid request

There are three possible types of client errors on API calls that receive request bodies. Sending invalid JSON will result in a 400 Bad Request response:

    HTTP/1.1 400 Bad Request
    Content-Length: 35

    {
      "message": "Problems parsing JSON"
    }

Sending the wrong type of JSON values will result in a 400 Bad Request response.

    HTTP/1.1 400 Bad Request
    Content-Length: 40

    {
      "message": "Body should be a JSON object"
    }

Sending invalid fields will result in a 422 Unprocessable Entity response.

    HTTP/1.1 422 Unprocessable Entity
    Content-Length: 149

    {
      "message": "Validation Failed",
      "errors": [
        {
          "resource": "Videos",
          "field": "formats",
          "code": "missing_field"
        }
      ]
    }

All error objects have resource and field properties so that your client can tell what the problem is. There's also an error code to let you know what is wrong with the field. These are the possible validation error codes:


| Error name     | Description                                                                                                                                |
|:---------------|:-------------------------------------------------------------------------------------------------------------------------------------------|
| missing        | This means a resource does not exist.                                                                                                      |
| missing_field  | This means a required field on a resource has not been set.                                                                                |
| invalid        | This means the formatting of a field is invalid. The documentation for that resource should be able to give you more specific information. |
| already_exists | This means another resource has the same value as this field. This can happen in resources that must have some unique key.                 |

Resources may also send custom validation errors (where code is custom). Custom errors will always have a message field describing the error, and most errors will also include a documentation_url field pointing to some content that might help you resolve the error.
