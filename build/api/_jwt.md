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
