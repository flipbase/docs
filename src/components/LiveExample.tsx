import React, { useEffect, useRef, useState, type JSX } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

/**
 * The code example above, actually running — in its own document.
 *
 * It takes no props to configure it on purpose: anything adjustable belongs in
 * the playground, which is a separate route and a deliberate click away.
 *
 * ## Why an iframe
 *
 * These embeds used to be mounted straight into the docs page. That cannot
 * work, and the reason is the documentation being a single-page app:
 * client-side navigation never reloads the document, so every script a version
 * page loads stays for the rest of the session.
 *
 *   recorder v1  `window.Flipbase`    `<input type="flipbase">`
 *   recorder v2  `window.FlipbaseV2`  `<div>`
 *   player v1    `window.Flipbase`    `<video type="flipbase">`
 *   player v2/v3 `window.FlipbasePlayer`
 *
 * **Recorder v1 and player v1 both claim `window.Flipbase`.** The old comment
 * here reasoned that they "must never share a page, and they do not — each
 * lives on its own version's documentation". That is true of the *routes* and
 * false of the *document*: visit one then the other and both scripts are loaded
 * side by side, with whichever arrived second holding the global. Going back
 * then found `Flipbase.recorder` undefined and rendered nothing, silently.
 *
 * An iframe is a separate realm. Each example gets its own `window`, its own
 * globals, and vanishes completely when React removes the element — which also
 * disposes of the teardown problem, since these scripts' `destroy()` throws and
 * an exception out of a cleanup function used to take the next page's render
 * with it.
 *
 * The frame is a real same-origin page under `static/embed/`, not `srcdoc`: a
 * srcdoc iframe has an opaque origin and the camera permission cannot be
 * delegated into one, which the recorder needs.
 */

export type Variant =
  | 'recorder-v1'
  | 'recorder-v2'
  | 'player-v1'
  | 'player-v2'
  | 'player-v3';

/* Until the frame reports its real height. Roughly a 16:9 stage. */
const INITIAL_HEIGHT = 420;

/*
 * A reported height is clamped before it is believed. On a very narrow
 * viewport the frame's error message — which contains a long unbroken CDN
 * URL — wraps to something absurd, and an iframe sized from that leaves a
 * screenful of empty box. Seen at 1269px while measuring in a collapsed pane.
 */
const MIN_HEIGHT = 64;
const MAX_HEIGHT = 900;

function Inner({ variant }: { variant: Variant }): JSX.Element {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(INITIAL_HEIGHT);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      /*
       * Same-origin only, and only this variant's frame: other embeds on the
       * page post the same message shape.
       */
      if (event.origin !== window.location.origin) return;
      const data = event.data as { type?: string; variant?: string; height?: number };
      if (data?.type !== 'fb-embed-height' || data.variant !== variant) return;
      if (typeof data.height === 'number' && data.height > 0) {
        setHeight(Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, Math.ceil(data.height))));
      }
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [variant]);

  return (
    <div className="fb-live-example">
      <p className="fb-live-example__label">The example above, running</p>
      <div className="fb-live-example__stage">
        <iframe
          ref={frame}
          className="fb-live-example__frame"
          title={`${variant} example`}
          src={`/embed/?variant=${variant}`}
          height={height}
          /* The recorder needs both; the players need neither but asking is harmless. */
          allow="camera; microphone; fullscreen"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function LiveExample({ variant }: { variant: Variant }): JSX.Element {
  /* The frame touches `window` and, for recorders, the camera. */
  return <BrowserOnly>{() => <Inner variant={variant} />}</BrowserOnly>;
}
