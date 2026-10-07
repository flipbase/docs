---
hide_table_of_contents: true
---

# Webhooks

A webhook asks Flipbase to call a URL of yours when something happens in one of
your organizations.

:::caution This page is incomplete

Only *creating* a webhook is documented, and only one event name is known. The
payload Flipbase sends, how to verify it came from us, how to list or delete a
webhook, and what happens when your endpoint is down are **not documented** —
not here and not anywhere else. They are being written up; until then, ask us
rather than inferring the shape from the example below.

If you are polling the video list waiting for `encoding_state` to reach
`finished`, that is currently the documented way to do it. See
[Videos](videos.md).

:::

## Create a webhook

Register a webhook on an existing organization.

**Request**

    POST /api/organizations/:id/webhooks
    Host: app.flipbase.com
    Content-Type: application/json
    Authorization: Signature e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca49:vWHRrjnw+QpH1DgDTrR5Lpa9vqP14toWz0X2Tdp3/Ck=

    {
      "data": {
        "type": "webhooks",
        "attributes": {
          "url": "https://yourdomain.com/api/listen_to_webhook",
          "method": "POST",
          "event": "pages.submitted"
        }
      }
    }

| Attribute | Description                                                      |
|:----------|:-----------------------------------------------------------------|
| `url`     | The URL Flipbase calls.                                           |
| `method`  | HTTP method used for the call.                                    |
| `event`   | The event to subscribe to. `pages.submitted` is the only one documented. |

**Response**

Not documented. The response previously shown on this page was a copy of the
[Collections](collections.md) example and described a collection, not a webhook,
so it has been removed rather than left to mislead.

## What is not documented yet

- The body Flipbase sends to your URL, for any event.
- Whether the call is signed, and if so how to verify it.
- Listing, updating and deleting webhooks.
- Retry behaviour and timeouts when your endpoint fails or is slow.
- Any event other than `pages.submitted` — in particular, whether there is one
  for a video finishing encoding.
