# Authentication

Authentication and authorization of the API is modeled after Amazon's signed URL framework. The Accounts API utilizes [RFC 2104](https://tools.ietf.org/html/rfc2104) and [RFC 4868](https://tools.ietf.org/html/rfc4868) compliant HMAC's.

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
Path | URI path and query paramaters (excluding hostname) 
Date | The date value should be identitcal to the value provided in the Date or X-Flipbase-Date header. The Date is the current UTC time in [ISO 8601](https://www.ietf.org/rfc/rfc3339.txt) format (for example, 20130524T000000Z).

### Headers

Header |  Required | Descriptions
--- | ---- | ----
Date | only if `X-Flipbase-Date` is omitted | The value of the `Date` header must be in one of the [RFC 2616](http://www.ietf.org/rfc/rfc2616.txt) formats. Some HTTP client libraries do not expose the ability to set the Date header for a request. If you have trouble including the value of the `Date` header in the headers, you can set the timestamp for the request by using an `X-Flipbase-Date` header instead. 
X-Flipbase-Date | only if `Date` header is omitted | The value of the `X-Flipbase-Date` header must be in one of the [RFC 2616](http://www.ietf.org/rfc/rfc2616.txt) formats. When an `X-Flipbase-Date` header is present in a request, the system will ignore any `Date` header when computing the request signature.
Authorization | yes | Prepend the <FlipbaseClientId>:<Signature> string with `Signature`.
