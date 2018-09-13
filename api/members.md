# Members

## Create a new member

As a partner you wouldcan create a new member, without sending an e-mail invitation to confirm the email address. You can assign the following roles to the member:
  - owner: can manage and invite members
  - publisher: can create and manage templates, pages and videos
  - spectator: can only view videos

If the member needs to login using username and password in the dashboard, you are required to provide a password with the following requirements
- at least 1 uppercase character
- at least 1 lowercase character
- at least 1 special character
- at least 1 number
- at least 8 characters

If you want to login in via an API on this member behalf, you can enable the `programmatic_access` option. This will create a set of API credentials which you then can use to authenticate and retrieve a JSON Web Token.

Regardless of the authentication method you choose, you are required to provide a unique (!) username and a valid email address.

**Request**

    POST /api/organizations/1c149afbf4c8996fb92427ae41e/members
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

    {
      "data": {
        "type": "members",
        "id": "5370df982b2779cf60e03217",
        "attributes": {
          "first_name": "Catrina",
          "last_name": "Jorgensen",
          "roles": ["director"],
          "email": "helloworld@example.com",
          "username": "catjorgensen",
          "roles": ["publisher"],
          "password": "V3ry_DffcltPwd?",
          "programmatic_access": true
        }
      }
    }

**Response**

    {
      "data": {
        "type": "members",
        "id": "5370df982b2779cf60e03217",
        "attributes": {
          "first_name": "Catrina",
          "last_name": "Jorgensen",
          "roles": ["director"],
          "email": "helloworld@example.com",
          "username": "catjorgensen",
          "programmatic_access": true,
          "api_key": "9afbf4c8996fb92427ae41e4649b934ca4",
          "api_secret": "96fb92427ae419afbf4c8996fb92427ae41e4649b934ca49afbf4c8996fb92427ae41e4649b934ca4"
        }
      }
    }

## Delete a member

Since a user can be associated with multiple organizations, only a user can delete its own account. This API endpoint can only be used when authenticated with a JSON Web Token!

**Request**

    DELETE /api/user/me
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: JWT eyJhbGcfpXVCJ9.eyJ1c2VyX2lkIjohMzEZXhQaeuE1MzYwMzl9.etFdVu6kly-fea-18zIfenv3JEjgQ

**Response**

    A 204 status message
