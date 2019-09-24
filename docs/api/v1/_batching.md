# Batching express requests

A library that allows you to receive and respond to POST /batch requests when using Express.js. This library is moddeld after [Facebook's Batch API](https://developers.facebook.com/docs/graph-api/making-multiple-requests).

Batching allows you to pass instructions for several operations in a single HTTP request. You can also specify dependencies between related operations (described in a section below). Facebook will process each of your independent operations in parallel and will process your dependent operations sequentially. Once all operations have been completed, a consolidated response will be passed back to you and the HTTP connection will be closed.

The batch API takes in an array of logical HTTP requests represented as JSON arrays - each request has a method (corresponding to HTTP method GET/PUT/POST/DELETE etc.), a url (the portion of the URL after api.flipbase.com), optional headers array (corresponding to HTTP headers) and an optional body (for POST and PUT requests). The Batch API returns an array of logical HTTP responses represented as JSON arrays - each response has a status code, an optional headers array and an optional body (which is a JSON encoded string).

To make batched requests, you build a JSON object which describes each individual operation you'd like to perform and POST this to the Batch API endpoint at https://api.flipbase.com/batch.

Once all operations have been completed, the API sends a response which encapsulates the result of all the operations. For each operation, the response includes a status code, header information, and the body. These are equivalent to the response you could expect from each operation if performed as raw requests against the Graph API. The body field contains a string encoded JSON object:

### POST /api/batch

**Request**

    DELETE /api/batch HTTP/1.1
    Host: app.flipbase.com
    Date: Date
    Authorization: Signature <FLIPBASE_PARTNER_ID>:<Signature>
    Body

      {
        "data": [
          {
            url: "/api/videos/id1" 
            method: "GET"
          },
          {
            url: "/api/videos/id2" 
            method: "GET"
          }
        ]
      }

**Response**
    
    {
      "data": [
        {
          "method": "GET",
          "url": "/api/videos/id1", 
          "code": 200, 
          "body": {
            "type": "videos"
            "id": "id1"
            "attributes": {} 
          }
        },
        {
          "method": "GET",
          "url": "/api/videos/id2", 
          "code": 200, 
          "body": {
            "type": "videos"
            "id": "id2"
            "attributes": {}
          }          
        }
      ]
    }

## Under the hood

Express.js has a private `router.handle` method that can be utilized. 

## Errors

Its possible that one of your requested operations may throw an error. This could be because, for example, you don't have permission to perform the requested operation. In this scenario, the batch API throws a similar response to the standard Graph API, but encapsulated in the batch response syntax:

**Response**
    
    {
      "data": [
        {
          "method": "GET",
          "url": "/api/videos/id1", 
          "code": 401, 
          "body": {
            "errors": []
        },
        {
          "method": "GET",
          "url": "/api/videos/id2", 
          "code": 200, 
          "response": {
            "type": "videos"
            "id": "id2"
            "attributes": {}
          }          
        }
      ]
    }

## Limits

We currently limit the number of requests which can be in a batch to 50, but each call within the batch is counted separately for the purposes of calculating API call limits and resource limits. For example, a batch of 10 API calls will count as 10 calls and each call within the batch contributes to CPU resource limits in the same manner.

## Timeouts

Large or complex batches may timeout if it takes too long to complete all the requests within the batch. In such a circumstance, the result is a partially-completed batch. In partially-completed batches, responses from operations that complete successfully will look normal (see prior examples) whereas responses for operations that are not completed will be null.

**Response**
    
    {
      "data": [
        {
          "method": "GET",
          "url": "/api/videos/id1", 
          "code": 401, 
          "body": {
            "errors": []
        },
        null,
        null
      ]
    }

## Order of respons requests

The ordering of responses correspond with the ordering of operations in the request, so developers should process responses accordingly to determine which operations were successful and which should be retried in a subsequent operation.
