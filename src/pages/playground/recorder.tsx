import React, { type JSX } from 'react';
import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';

/**
 * The recorder playground, full height and on its own URL.
 *
 * The same shape as `player.tsx`, because it is now the same kind of thing: the
 * recorder got the player's harness treatment, and that harness is published to
 * `cdn.flipbase.com/recorder/playground/`. This route is a frame around it.
 *
 * It used to be a hand-rolled page in this repo — a column of colour pickers
 * and a locale select, mounting the recorder itself. That existed only because
 * there was nothing to point at. There is now, and the published harness is the
 * better artefact by every measure that matters: it carries a version picker,
 * it is built from the recorder's own source so its controls cannot drift from
 * the options the recorder actually takes, and it is the same page the team
 * uses to test a release.
 *
 * Deliberately not wrapped in `<Layout>`: the point of this route is that there
 * is no documentation chrome around it. A sidebar and a navbar would put the
 * playground back in the letterbox this route exists to get it out of.
 *
 * `?v=` is passed straight through, so a page can link to the version it is
 * documenting.
 */

/*
 * `index.html` named explicitly rather than relying on the directory URL. A
 * CloudFront function does rewrite directory-shaped URLs, so
 * `/recorder/playground/` resolves on its own — but the frame does not need to
 * depend on that, and naming the file costs nothing.
 */
const PLAYGROUND_URL = 'https://cdn.flipbase.com/recorder/playground/index.html';

export default function RecorderPlayground(): JSX.Element {
  const { search } = useLocation();
  const version = new URLSearchParams(search).get('v');
  const src = version ? `${PLAYGROUND_URL}?v=${encodeURIComponent(version)}` : PLAYGROUND_URL;

  return (
    <>
      <Head>
        <title>Recorder playground | Flipbase</title>
        {/* Nothing here is worth indexing; the documentation is. */}
        <meta name="robots" content="noindex" />
      </Head>
      <iframe
        title="Flipbase recorder playground"
        src={src}
        /* The recorder asks for the camera, so the frame has to be allowed to. */
        allow="camera; microphone; fullscreen"
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
