import React, { type JSX } from 'react';

/**
 * A way into the playground, rather than the playground itself.
 *
 * It used to be embedded in the page. Two problems with that, and they compound:
 * the playground has its own sidebar of controls, so inside a 720px frame
 * sitting in a column of prose it was being operated through a letterbox; and
 * it loads real player bundles from the CDN, so the page carried that cost
 * whether or not anyone wanted to try it.
 *
 * The route it opens (`/playground/player`) renders the same thing at full
 * height with no documentation chrome, so there is one URL to send someone who
 * only wants to play with it.
 */
export default function PlaygroundLink({
  to = '/playground/player',
  children = 'Open the player playground',
  note,
}: {
  to?: string;
  children?: React.ReactNode;
  note?: string;
}): JSX.Element {
  return (
    <div className="fb-playground-link">
      <a className="fb-playground-link__button" href={to} target="_blank" rel="noreferrer">
        {children}
        <span aria-hidden="true"> ↗</span>
      </a>
      <p className="fb-playground-link__note">
        {note ??
          'Opens in a new tab. Runs the published bundle from the CDN — the same bytes you would embed.'}
      </p>
    </div>
  );
}
