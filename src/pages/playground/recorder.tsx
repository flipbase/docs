import React, { useState, type JSX } from 'react';
import Head from '@docusaurus/Head';
import FlipbaseRecorder from '@site/src/components/FlipbaseRecorder';

/**
 * The recorder, with its settings exposed.
 *
 * The player's playground is a separate application published to the CDN. This
 * one does not need to be: the recorder takes its configuration as a plain
 * options object, so a few inputs and a re-initialise is the whole of it. When
 * the recorder gets the player's harness treatment this page can point at that
 * instead — until then there is no reason to have nothing.
 *
 * No `<Layout>`: a sidebar beside a 16:9 recorder is the letterbox this route
 * exists to avoid.
 */

const RECORDER_ID = '9eaf41fd-4f3f-4fdb-b8ca-de84eeaed407';

/* The locales the recorder ships, by the codes it actually accepts. */
const LOCALES = [
  ['nl-NL', 'Dutch'],
  ['en-US', 'English'],
  ['de-DE', 'German'],
  ['fr-FR', 'French'],
  ['es-ES', 'Spanish'],
  ['it-IT', 'Italian'],
  ['pt-PT', 'Portuguese'],
  ['pl-PL', 'Polish'],
  ['tr-TR', 'Turkish'],
  ['sv-SE', 'Swedish'],
  ['ru-RU', 'Russian'],
  ['zh-Hans', 'Chinese (simplified)'],
] as const;

interface Config {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  locale: string;
  duration: number;
  maxWidth: number;
}

/* The recorder's own defaults, from `src/constants/settings.js`. */
const DEFAULTS: Config = {
  primaryColor: '#a62651',
  secondaryColor: '#ffffff',
  backgroundColor: '#e0e0e0',
  textColor: '#232322',
  locale: 'nl-NL',
  duration: 31,
  maxWidth: 640,
};

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="fb-pg__field">
      <span className="fb-pg__label">{label}</span>
      {children}
      {hint && <span className="fb-pg__hint">{hint}</span>}
    </label>
  );
}

export default function RecorderPlayground(): JSX.Element {
  const [config, setConfig] = useState<Config>(DEFAULTS);

  const set = <K extends keyof Config>(key: K, value: Config[K]) =>
    setConfig((previous) => ({ ...previous, [key]: value }));

  /*
   * The recorder reads its options once, at construction. Keying on the
   * serialised config remounts it when anything changes, which is the same
   * thing an integrator gets on a page load.
   */
  const key = JSON.stringify(config);

  return (
    <>
      <Head>
        <title>Recorder playground | Flipbase</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="fb-pg">
        <header className="fb-pg__header">
          <h1>Recorder playground</h1>
          <p>
            Every option below is one you can pass to <code>Flipbase.recorder</code>.
            Changing one re-initialises the recorder, which is what an integrator
            gets on a page load. It asks for camera access because it is real.
          </p>
        </header>

        <div className="fb-pg__split">
          <aside className="fb-pg__controls">
            <Field label="Primary colour" hint="Buttons and the progress bar">
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => set('primaryColor', e.target.value)}
              />
            </Field>

            <Field label="Secondary colour" hint="Text on the buttons">
              <input
                type="color"
                value={config.secondaryColor}
                onChange={(e) => set('secondaryColor', e.target.value)}
              />
            </Field>

            <Field label="Background colour">
              <input
                type="color"
                value={config.backgroundColor}
                onChange={(e) => set('backgroundColor', e.target.value)}
              />
            </Field>

            <Field label="Text colour">
              <input
                type="color"
                value={config.textColor}
                onChange={(e) => set('textColor', e.target.value)}
              />
            </Field>

            <Field label="Locale" hint="One of 24 shipped languages">
              <select value={config.locale} onChange={(e) => set('locale', e.target.value)}>
                {LOCALES.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name} — {code}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={`Duration — ${config.duration - 1}s`} hint="Maximum recording length">
              <input
                type="range"
                min={6}
                max={121}
                value={config.duration}
                onChange={(e) => set('duration', Number(e.target.value))}
              />
            </Field>

            <Field label={`Max width — ${config.maxWidth}px`} hint="Minimum usable width is 242px">
              <input
                type="range"
                min={244}
                max={960}
                step={4}
                value={config.maxWidth}
                onChange={(e) => set('maxWidth', Number(e.target.value))}
              />
            </Field>

            <button type="button" className="fb-pg__reset" onClick={() => setConfig(DEFAULTS)}>
              Reset to defaults
            </button>
          </aside>

          <section className="fb-pg__stage">
            <FlipbaseRecorder key={key} recorderId={RECORDER_ID} selector="playground" {...config} />

            <details className="fb-pg__code">
              <summary>The code for this configuration</summary>
              <pre>
                <code>{`Flipbase.recorder({
  recorderId: '${RECORDER_ID}',
  selector: 'recorder',
  primaryColor: '${config.primaryColor}',
  secondaryColor: '${config.secondaryColor}',
  backgroundColor: '${config.backgroundColor}',
  textColor: '${config.textColor}',
  locale: '${config.locale}',
  duration: ${config.duration},
  maxWidth: ${config.maxWidth}
});`}</code>
              </pre>
            </details>
          </section>
        </div>
      </main>
    </>
  );
}
