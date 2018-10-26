# User API

- [Get your user profile](#get-user-profile)
- [List a users organizatoins](#list-a-users-organizations)
- [Delete your profile](#delete-your-profile)

## Get user profile

This API endpoint can only be used when authenticated with a JSON Web Token!

**Request**

    GET /api/user/me
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: JWT eyJhbGcfpXVCJ9.eyJ1c2VyX2lkIjohMzEZXhQaeuE1MzYwMzl9.etFdVu6kly-fea-18zIfenv3JEjgQ

**Response**

    A 204 status message


## List a users' organizations

**Request**

    GET /api/user/organizations
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: JWT eyJhbGcfpXVCJ9.eyJ1c2VyX2lkIjohMzEZXhQaeuE1MzYwMzl9.etFdVu6kly-fea-18zIfenv3JEjgQ

**Response**

    {
      "data": [{
        "type": "organizations",
        "id": "5370df982b2779cf60e03217",
        "attributes": {
          "name": "Organization ABC",
          "employer_branding_license": true,
          "description": "ABC corporate recruitment related videos"
        }
      }, {
        "type": "organizations",
        "id": "23d10d0fe4b4f2b53d967c24",
        "attributes": {
          "name": "Organization XYZ",
          "employer_branding_license": true,
          "description": "Employer branding videos"
        }      
      }]
    }

## Delete your profile

Since a user can be associated with multiple organizations, only a user can delete its own account. This API endpoint can only be used when authenticated with a JSON Web Token!

**Request**

    DELETE /api/user/me
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: JWT eyJhbGcfpXVCJ9.eyJ1c2VyX2lkIjohMzEZXhQaeuE1MzYwMzl9.etFdVu6kly-fea-18zIfenv3JEjgQ

**Response**

    A 204 status message
