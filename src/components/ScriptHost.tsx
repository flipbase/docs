import React, { type JSX } from 'react';

/**
 * The note that sits above every embed snippet.
 *
 * Both hosts serve the same bytes, but not by the same route.
 * `cdn.flipbase.com` is the CDN itself. `app.flipbase.com` is nginx on a single
 * EC2 instance in front of it — an extra hop, and one that can be down while
 * the CDN is fine. Integrations have historically pointed at `app` because that
 * is what these examples said, so the wording has to keep working for them
 * rather than imply they are broken.
 *
 * One component rather than an admonition per page, so the wording stays the
 * same everywhere it appears and changes in one edit when the hosting does.
 */
export default function ScriptHost({
  appOnly = false,
}: {
  /** For player v1, whose bundle is frozen and lives at two fixed URLs. */
  appOnly?: boolean;
}): JSX.Element {
  if (appOnly) {
    return (
      <div className="fb-script-host fb-script-host--app">
        <p>
          <strong>This bundle is frozen, at two URLs.</strong> The one below,{' '}
          <code>app.flipbase.com/player.js</code>, goes through a reverse proxy
          on a single instance rather than to a CDN edge. The same bytes are also
          served from the CDN, at{' '}
          <code>cdn.flipbase.com/player/app.min.js</code>. Neither receives
          fixes, which is one reason among several to move to a current version.
        </p>
      </div>
    );
  }

  return (
    <div className="fb-script-host">
      <p>
        <strong>
          Load from <code>cdn.flipbase.com</code>.
        </strong>{' '}
        That is the CDN itself, so the request goes straight to the nearest
        edge. <code>app.flipbase.com</code> serves the same file through a
        reverse proxy on a single instance — existing integrations pointing at
        it keep working, but it is one more thing between the browser and the
        file.
      </p>
    </div>
  );
}
