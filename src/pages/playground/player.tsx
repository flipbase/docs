import React, { type JSX } from 'react';
import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';

/**
 * The player playground, full height and on its own URL.
 *
 * Deliberately not wrapped in `<Layout>`: the point of this route is that there
 * is no documentation chrome around it. A sidebar and a navbar would put the
 * playground back in the letterbox this route exists to get it out of.
 *
 * `?v=2.1.3` is passed straight through, so a page can link to the version it
 * is documenting.
 */

/*
 * `player/playground/`, not `playground/player/`. The playground moved on
 * 2026-10-06 so that everything the player publishes sits under one prefix —
 * version folders, aliases and the playground together — matching
 * `recorder/playground/`. The old path was deleted, and this URL pointed at it
 * until the deletion turned the frame into an S3 `NoSuchKey` page.
 *
 * `index.html` is still named explicitly rather than relying on the directory
 * URL. A CloudFront function does rewrite directory-shaped URLs now, so
 * `/player/playground/` resolves on its own — but the frame does not need to
 * depend on that, and naming the file costs nothing.
 */
const PLAYGROUND_URL = 'https://cdn.flipbase.com/player/playground/index.html';

export default function PlayerPlayground(): JSX.Element {
  const { search } = useLocation();
  const version = new URLSearchParams(search).get('v');
  const src = version ? `${PLAYGROUND_URL}?v=${encodeURIComponent(version)}` : PLAYGROUND_URL;

  return (
    <>
      <Head>
        <title>Player playground | Flipbase</title>
        {/* Nothing here is worth indexing; the documentation is. */}
        <meta name="robots" content="noindex" />
      </Head>
      <iframe
        title="Flipbase player playground"
        src={src}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 0,
        }}
        /*
         * Scripts and same-origin so it can keep a configuration between
         * reloads; nothing that would let it navigate the opener.
         */
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </>
  );
}
