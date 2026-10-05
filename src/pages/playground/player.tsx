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
 * `index.html` is named explicitly rather than relying on the directory URL.
 *
 * The CDN's origin is the S3 REST endpoint, which has no directory-index
 * behaviour, and creating a folder in the S3 console leaves a zero-byte object
 * at that exact key. So `/playground/player/` answers 200 with
 * `content-type: application/x-directory` and no body — the frame loads an
 * empty document and never fires `load`.
 */
const PLAYGROUND_URL = 'https://cdn.flipbase.com/playground/player/index.html';

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
