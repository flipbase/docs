import React, { type JSX } from 'react';

/**
 * The configuration playground, embedded.
 *
 * An iframe rather than an imported component, for three reasons that all
 * point the same way:
 *
 *  - **Isolation.** The playground runs real published player bundles fetched
 *    from the CDN. A version that throws takes the frame with it and leaves the
 *    documentation around it intact. Importing it would let a bad player
 *    release break the docs.
 *  - **Frameworks.** The playground is Preact, this site is React. Keeping them
 *    in separate documents means neither has to know about the other.
 *  - **Independence.** Publishing a player version does not require
 *    redeploying this site, and sales can open the same URL on its own with no
 *    documentation chrome around it.
 */

/*
 * `index.html` is named explicitly rather than relying on the directory URL.
 *
 * The CDN's origin is the S3 REST endpoint, which has no directory-index
 * behaviour, and creating a folder in the S3 console leaves a zero-byte object
 * at that exact key. So `/playground/player/` answers 200 with
 * `content-type: application/x-directory` and no body — the iframe loads an
 * empty document and never fires `load`. Naming the file sidesteps all of it
 * and needs no CloudFront configuration.
 */
const PLAYGROUND_URL = 'https://cdn.flipbase.com/playground/player/index.html';

interface PlaygroundProps {
  /** Pin a published version. Omit to let the playground pick the newest it can load. */
  version?: string;
  /** Visible height. The playground scrolls its own sidebar. */
  height?: number;
  title?: string;
}

export default function Playground({
  version,
  height = 720,
  title = 'Flipbase player playground',
}: PlaygroundProps): JSX.Element {
  const src = version
    ? `${PLAYGROUND_URL}?v=${encodeURIComponent(version)}`
    : PLAYGROUND_URL;

  return (
    <div className="fb-playground">
      <iframe
        className="fb-playground__frame"
        src={src}
        title={title}
        height={height}
        loading="lazy"
        /*
         * The playground needs scripts and same-origin for its own storage, and
         * nothing else. Without `allow-same-origin` it cannot remember a
         * configuration between reloads; without the omissions it could
         * navigate this page or open windows.
         */
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
      <p className="fb-playground__note">
        Runs the published bundle from the CDN — the same bytes you would embed.{' '}
        <a href={src} target="_blank" rel="noreferrer">
          Open in a new tab →
        </a>
      </p>
    </div>
  );
}
