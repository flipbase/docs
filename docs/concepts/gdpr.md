---
hide_table_of_contents: true
---

# GDPR

We added the features below in order to comply with GDPR as of 25 May 2018.

## Explicit subject approval

- Videos are only exposed to authorised entities once they are confirmed to have
  actually been submitted by the subject.
- The retention period can be set per collection, so each customer has granular
  control over when their videos are archived.
- The retention period can also be set per video, so end users can decide when
  their own video is archived.

## What we process

| Data                              | Where it comes from                         |
| --------------------------------- | ------------------------------------------- |
| Video files                       | Recorder                                    |
| Cookies                           | Player                                      |
| IP address, user agent, referer   | Recorder, stored on the video record        |
| Names and email addresses         | Employer Branding pages, and member accounts |

The IP address, user agent and referer of a submission are returned by the API
on the video record — see the response on the [Videos](../api/v1/videos.md)
page. The recorder-plus-player integration does not send us a candidate's name,
email address or application; see [Data flow](data-flow.md).

## Recorder

- A video is only processed once we receive a real confirmation that we may
  process it.
- Subjects can remove their most recent video themselves.
- Previous takes are removed too, using the trash button in the recorder.
- The save button is unambiguous about the fact that pressing it is the
  subject's approval to process the video.
- The retention period can be set per video.

## Player

- A cookie is used to recognise the same viewer across page refreshes.
- Metadata is stored for when a video starts playing, is playing and stops.
- IP addresses in these view statistics are hashed before they are stored, so
  they cannot be traced back to a person. This applies to view statistics; the
  `ip_address` on the video record is the submission's own IP and is returned by
  the API as shown on the [Videos](../api/v1/videos.md) page.

Statistics collection can be switched off entirely with `collectStatistics:
false` from player v3 onwards, for integrators who have no consent basis for it.
See [Player v3](../player/v3/docs.mdx).

## API

- A confirmation endpoint, used together with the collection's
  `require_confirmation` setting.
- Retention periods that you can set per collection and per video.
