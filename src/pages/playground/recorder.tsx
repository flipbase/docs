import React, { type JSX } from 'react';
import Head from '@docusaurus/Head';
import FlipbaseRecorder from '@site/src/components/FlipbaseRecorder';

/**
 * Live recorders, on their own URL.
 *
 * These used to sit inline in `recorder/v1/docs.mdx`, two of them side by side
 * in a column of prose. A recorder is not a diagram: it loads a bundle and asks
 * for the camera, so anyone reading the page to find out how to configure one
 * was being prompted for camera access by the documentation itself.
 *
 * On its own route they have room, and reaching them is a decision.
 *
 * No `<Layout>` on purpose — a sidebar beside a 16:9 recorder is the letterbox
 * this route exists to avoid.
 */

const RECORDER_ID = '9eaf41fd-4f3f-4fdb-b8ca-de84eeaed407';

export default function RecorderPlayground(): JSX.Element {
  return (
    <>
      <Head>
        <title>Recorder playground | Flipbase</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="fb-recorder-playground">
        <header>
          <h1>Recorder playground</h1>
          <p>
            Two recorders against the same recorder ID, configured differently.
            They ask for camera access because they are real — nothing here is
            submitted anywhere you need to care about.
          </p>
        </header>

        <div className="fb-recorder-playground__grid">
          <section>
            <h2>Themed</h2>
            <FlipbaseRecorder
              recorderId={RECORDER_ID}
              selector="recorder1"
              label="Recorder 1"
              primaryColor="#aeb00a"
              secondaryColor="#e0e0e0"
              backgroundColor="#242b3c"
              textColor="#FFFFFF"
            />
          </section>

          <section>
            <h2>Default</h2>
            <FlipbaseRecorder
              recorderId={RECORDER_ID}
              selector="recorder2"
              label="Recorder 2"
            />
          </section>
        </div>
      </main>
    </>
  );
}
