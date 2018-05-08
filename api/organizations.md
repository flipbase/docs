# Organizations

Organizations are basically groups of users that are allowed to have access to the same collections and videos. In order to create a `collection` you need to create an organization that contains that collection.

- [List all your existing organizations](#list-all-your-existing-organizations)
- [Create a organization](#create-a-organization)
- [Retrieve a single organization](#retrieve-a-single-organization)
- [Update a organization](#update-a-organization)
- [Delete a organization](#delete-a-organization)

## List all your existing organizations

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

## Create a organization

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

## Retrieve a single organization

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

## Update a organization
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

## Delete a organization

When you delete an organization, only the organization will be deleted. If the organization contained one or more collections, these collections (and associated videos) are not deleted. You have to delete collections and associated videos seperatly.

**Request**

    DELETE /api/organizations/5370df982b2779cf60e03217
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

**Response**

No response body, just a 204 (= successfully deleted), 404 (= not found / already deleted), 401 (= not authorized)
