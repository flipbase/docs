import React, { useEffect, useId, useRef, type JSX } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

/**
 * The code example above, actually running.
 *
 * Every component page shows a snippet; this renders that same snippet with the
 * same values, so the thing on the page is the thing the reader would get. It
 * takes no props to configure it on purpose — anything adjustable belongs in
 * the playground, which is a separate route and a deliberate click away.
 *
 * Four embed APIs, because there genuinely are four:
 *
 *   recorder v1  `Flipbase.recorder({ recorderId })`  on `<input type="flipbase">`
 *   recorder v2  `FlipbaseV2.recorder({ selector, recorderId })`  on a `<div>`
 *   player v1    `Flipbase.player({ playerId })`  on `<video type="flipbase">`
 *   player v2    `new FlipbasePlayer({ video_id, player_id, selector })`
 *
 * The two v1s both claim `window.Flipbase`, so they must never share a page.
 * They do not — each lives on its own version's documentation.
 */

/* The values the snippets use. Changing one means changing the snippet too. */
export const DEMO = {
  recorderId: '9eaf41fd-4f3f-4fdb-b8ca-de84eeaed407',
  playerId: '95f4d94b-86c0-4e4a-b23d-484158efd1a4',
  videoId: '5120293b-583b-4534-90dc-0f44cd51705e',
} as const;

const SCRIPTS = {
  'recorder-v1': 'https://cdn.flipbase.com/recorder/recorder.js',
  'recorder-v2': 'https://cdn.flipbase.com/recorder/recorder/recorderv2/recorder.js',
  'player-v1': 'https://app.flipbase.com/player.js',
  'player-v2': 'https://cdn.flipbase.com/player/v2/player.min.js',
} as const;

export type Variant = keyof typeof SCRIPTS;

declare global {
  interface Window {
    Flipbase?: any;
    FlipbaseV2?: any;
    FlipbasePlayer?: any;
  }
}

/*
 * One promise per source, shared by every caller.
 *
 * Resolving as soon as a matching `<script>` tag exists is wrong: that is true
 * the instant the first embed appends it and long before it has loaded, so a
 * second embed resolves immediately, finds the global undefined and silently
 * renders nothing.
 */
const loading = new Map<string, Promise<void>>();

function loadScript(src: string): Promise<void> {
  const existing = loading.get(src);
  if (existing) return existing;

  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Could not load ${src}`));
    document.head.appendChild(script);
  });

  loading.set(src, promise);
  return promise;
}

function Inner({ variant }: { variant: Variant }): JSX.Element {
  /* Unique per instance, so two examples on one page cannot collide. */
  const selector = `fb-${variant}-${useId().replace(/:/g, '')}`;
  const host = useRef<HTMLDivElement>(null);
  const instance = useRef<{ destroy?: () => void; unmount?: () => void } | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadScript(SCRIPTS[variant])
      .then(() => {
        if (cancelled || !host.current) return;

        if (variant === 'recorder-v1') {
          instance.current = window.Flipbase?.recorder({
            selector,
            recorderId: DEMO.recorderId,
          });
        } else if (variant === 'recorder-v2') {
          instance.current = window.FlipbaseV2?.recorder({
            selector,
            recorderId: DEMO.recorderId,
          });
        } else if (variant === 'player-v1') {
          window.Flipbase?.player({ playerId: DEMO.playerId });
        } else {
          const player = new window.FlipbasePlayer({
            video_id: DEMO.videoId,
            player_id: DEMO.playerId,
            selector,
          });
          player.mount();
          instance.current = player;
        }
      })
      .catch(() => {
        /* A dead CDN should not take the documentation with it. */
      });

    return () => {
      cancelled = true;
      /*
       * Guarded because these are third-party teardowns and they throw.
       * The V2 recorder's `destroy()` reaches into something it has already
       * released — `Cannot read properties of undefined (reading 'remove')` —
       * and an exception thrown from a cleanup function propagates out of
       * React's unmount, which took the *next* page's render with it. Leaving
       * a recorder undestroyed is a leak; letting it break navigation is a
       * broken site.
       */
      try {
        instance.current?.unmount?.();
      } catch {
        /* nothing useful to do; the element is going away regardless */
      }
      try {
        instance.current?.destroy?.();
      } catch {
        /* as above */
      }
      instance.current = null;
    };
  }, [variant, selector]);

  return (
    <div className="fb-live-example">
      <p className="fb-live-example__label">The example above, running</p>
      <div className="fb-live-example__stage" ref={host}>
        {variant === 'recorder-v1' ? (
          /* v1 replaces an input rather than filling a container. */
          <input id={selector} type="flipbase" />
        ) : variant === 'player-v1' ? (
          <video id={selector} type="flipbase" data-video-id={DEMO.videoId} />
        ) : (
          <div id={selector} />
        )}
      </div>
    </div>
  );
}

export default function LiveExample({ variant }: { variant: Variant }): JSX.Element {
  /* Every one of these touches `window` and, for recorders, the camera. */
  return <BrowserOnly>{() => <Inner variant={variant} />}</BrowserOnly>;
}
