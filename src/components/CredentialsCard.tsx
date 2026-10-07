import React, { type JSX } from 'react';

/**
 * The one thing a reader cannot get from the documentation itself.
 *
 * Every page here explains what to do with an `api_key` and an `api_secret`,
 * and nothing explains how to obtain a pair. Sitting at the foot of the
 * sidebar, this is visible from whichever page someone landed on rather than
 * only from the one page that happens to mention it.
 *
 * Absolute URL on purpose: these docs are served from docs.flipbase.com and the
 * form lives on the marketing site.
 */
export default function CredentialsCard(): JSX.Element {
  return (
    <aside className="fb-card">
      <p className="fb-card__title">Need API credentials?</p>
      <p className="fb-card__body">
        We reply within one working day with your <code>api_key</code>, <code>api_secret</code>{' '}
        and a sandbox organization to try things against.
      </p>
      <a
        className="fb-card__link"
        href="https://www.flipbase.com/request-documentation"
        target="_blank"
        rel="noreferrer"
      >
        Request credentials →
      </a>
    </aside>
  );
}
