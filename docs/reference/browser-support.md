# Browser support

Support differs by component version, so check the version you are actually
embedding. Everything else in these docs applies across versions; this page does
not.

## Player

### v3

| Browser          | Minimum |
| ---------------- | ------- |
| Chrome           | 87      |
| Edge             | 88      |
| Firefox          | 78      |
| Safari           | 15      |
| Safari on iOS    | 15      |

**Internet Explorer is not supported.** v2 carried polyfills, a padded
thumbnail variant and user-agent sniffing for IE 9 and IE 11. Dropping that
removed roughly a third of the bundle, which is why v3 is 79 kB where v2 is
141 kB.

If you still have users on Internet Explorer, stay on v2 — it is unchanged and
is not being withdrawn.

### v2

| Browser          | Minimum |
| ---------------- | ------- |
| Chrome           | 37      |
| Firefox          | 40      |
| Internet Explorer| 11      |
| Opera            | 25      |
| Safari           | 9.1     |
| Safari on iOS    | 10      |
| Android Browser  | 5       |

## Recorder

### v2

:::caution Not yet established

Per-browser minimums for the recorder have never been documented, and this page
will not invent them. The recorder's own "Browser support" section currently
lists supported *languages* under that heading.

Establishing this needs real testing across browsers rather than a table copied
from a compatibility site, and it is part of the recorder modernisation work.

:::

What can be said without testing, because it is a property of the web platform
rather than of our code:

- **Recording requires a secure origin.** Browsers only expose a camera over
  HTTPS, or on `localhost` during development. On an insecure origin the camera
  is never offered.
- **File upload is the fallback.** Where recording is unavailable for any
  reason, the recorder accepts an existing video file, so a candidate on an
  unsupported browser can still submit one.
