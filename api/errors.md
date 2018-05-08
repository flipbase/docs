
## Error handling

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
