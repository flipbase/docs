# Organizations

Organizations are basically groups of users that are allowed to have access to the same collections and videos. In order to create a `collection` you need to create an organization that contains that collection. 

## GET  /organizations

Attributes | Required | Description
--- | --- | ----
name | yes | Name of the organization
description | no | Explanation what kind of collections and users the organization holds

### Request

    GET /api/organizations
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

### Response

    {
      "data": [{
        "type": "organizations",
        "id": "5370df982b2779cf60e03217",
        "attributes": {
          "name": "Organization ABC",
          "description": "ABC corporate recruitment related videos"
        }
      }, {
        "type": "organizations",
        "id": "23d10d0fe4b4f2b53d967c24",
        "attributes": {
          "name": "Organization XYZ",
          "description": "Employer branding videos"
        }      
      }]
    }

## POST /organizations

**Request**

    POST /api/organizations
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

    {
      "data": {
        "type": "organizations",
        "attributes": {
          "name": "Collection ABC",
          "description": "ABC corporate recruitment related videos"
        }
      }
    }

**Response**

    {
      "data": {
        "type": "organizations",
        "id": "5370df982b2779cf60e03217",
        "attributes": {
          "name": "Collection ABC",
          "description": "ABC corporate recruitment related videos"
        }
      }
    }

## GET /organizations/:id
**Request**

    GET /api/organizations/5370df982b2779cf60e03217
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

**Response**

    {
      "data": {
        "type": "organizations",
        "id": "5370df982b2779cf60e03217",
        "attributes": {
          "name": "Collection ABC",
          "description": "ABC corporate recruitment related videos"
        }
      }
    }

## PUT  /organizations/:id
**Request**

    PUT /api/organizations/5370df982b2779cf60e03217
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=


    {
      "data": {
        "type": "organizations",
        "id": "5370df982b2779cf60e03217",
        "attributes": {
          "name": "Collection ABC - department X",
          "description": "ABC corporate recruitment related videos"
        }
      }
    }

**Response**

    {
      "data": {
        "type": "organizations",
        "id": "5370df982b2779cf60e03217",
        "attributes": {
          "name": "Collection ABC - department X",
          "description": "ABC corporate recruitment related videos"
        }
      }
    }

## DELETE /organizations/:id

When you delete an organization, only the organization will be deleted. If the organization contained one or more collections, these collections are not deleted. You have to delete collections seperatly.

**Request**

    DELETE /api/organizations/5370df982b2779cf60e03217
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

**Response**

No response body, just a 204 (= successfully deleted), 404 (= not found / already deleted), 401 (= not authorized)