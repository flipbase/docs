# Authentication

When you want to use the API you need an `api_key` and an `api_secret`, provided by Flipbase. The `api_secret` will be used to generate (server side) signatures to send authenticated requests.

The Flipbase API enables access to resources like `organizations`, `collections` and `videos`. Authentication of the API is modeled after Amazon's signed URL framework. The API utilizes [RFC 2104](https://tools.ietf.org/html/rfc2104) and [RFC 4868](https://tools.ietf.org/html/rfc4868) compliant HMAC's.

Requests without signature will be denied.

## Authenticate using JSON Web Tokens

**Request**

    POST /api/auth/jwt_token
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

**Response**

    {
      "token": eyJhbGcxtyafdsafnR5cCI6privatekpXVCJ9.eyJ1c2VyX2lkIjofesht625ve1124WFkZjg3IiwiZXhwIjoxNTM1MveXQiOjE1MzfeDd9.BFtWEFaeplZ4nGKfefeazSATL6YpDvfels
      "expires_at": 1535185487000
      "created_at": 1534926287909
    }

## Authenticate using signed requests

The Flipbase API will deny all non-authorized requests by default. You can authorize a request using the `Authorization` header in the following format: `<FLIPBASE_API_KEY>:<Signature>`

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
