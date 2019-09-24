# Create a signature

Flipbase needs to provide you with an `api_key` and an `api_secret` so you are able to do so. The `api_secret` will be used to generate (server side) signatures to send authenticated requests.

Authentication of the API is modeled after Amazon's signed URL framework. The API utilises [RFC 2104](https://tools.ietf.org/html/rfc2104) and [RFC 4868](https://tools.ietf.org/html/rfc4868) compliant HMAC's.

The Flipbase API will deny all non-authorized requests by default. You can authorize a request using the `Authorization` header in the following format: `<api_key>:<signature>`. Flipbase has provided you with an `api_key`, you need to generate a signature yourself for each API request you want to make.

#### How to authenticate?

Lets create a signature we can use to create an Organization. First: check if you have received an `api_key` and `api_secret`. For this example we have received the following (fictive) credentials:

- api_key: 11bb3344aabb11ee22dd
- api_secret: 99xx88yy77vv66ww55cc44ee33bb22aa11oo00ss77vv

Now, let's create the signature. We need the pseudo code below to generate a signature:

    StringToSign = HTTP-Verb + "\n" +
        URI-encode( <Path> ) + "\n" +
        Date;

    signature = Base64( HMAC-SHA256( <api_secret>, UTF-8-Encoding-Of( <StringToSign> ) ) );

Please note, we already know from the API reference that we need to make POST request to https://app.flibpase.com/api/organizations to create an organization. As a result we can create a signature as follows:

    StringToSign = "POST" + "\n" +
      URI-encode("/api/organizations") + "\n" +
      "2018-05-04T12:05:14.649Z"

    // output StringToSign: "POST\n%2Fapi%2Forganizations\n2018-05-04T12:05:14.649Z"

    signature = Base64( HMAC-SHA256( 11bb3344aabb11ee22dd, UTF-8-Encoding-Of( "POST\n%2Fapi%2Forganizations\n2018-05-04T12:05:14.649Z" ) ) );

    // output signature: vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

#### Send the request

Now, we have the signature, we can send the request with the Authorization header containing the signature and create an Organization:

    POST /api/organizations
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature 11bb3344aabb11ee22dd:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

    {
      "data": {
        "attributes": {
          "name": "Foo Bar International Ltd. (UK)",
          "description": "All videos from the UK office from Foo Bar"
        }
      }
    }
