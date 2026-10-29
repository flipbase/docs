import React, { type JSX } from 'react';

/**
 * The note that sits above every embed snippet.
 *
 * It used to say that `app.flipbase.com` serves the same file as
 * `cdn.flipbase.com`, just through an extra hop. That was true of the
 * unversioned paths and is **false of everything this site now documents**:
 *
 *   200  cdn.flipbase.com/recorder/v2.0.0-alpha.1/recorder.js
 *   403  app.flipbase.com/recorder/v2.0.0-alpha.1/recorder.js
 *   200  cdn.flipbase.com/player/v3.0.0/player.min.js
 *   404  app.flipbase.com/player/v3.0.0/player.min.js
 *
 * nginx on the app host does not proxy versioned folders, so "swap the host if
 * you prefer" was advice that turns a working embed into a 403. Hence three
 * variants rather than one piece of prose: a versioned path is CDN-only, an
 * unversioned legacy path genuinely is served by both hosts, and player v1 is
 * served by the app alone.
 *
 * The purpose has not changed: tell someone starting out where to load from,
 * without implying that an integration already pointing at `app` is broken. It
 * is not. Those paths are frozen, not withdrawn.
 *
 * One component rather than an admonition per page, so the wording stays the
 * same everywhere it appears and changes in one edit when the hosting does.
 */
export default function ScriptHost({
  appOnly = false,
  unversioned = false,
}: {
  /** For player v1, which is served from the app and has no CDN path. */
  appOnly?: boolean;
  /**
   * For the frozen unversioned recorder bundles, which — unlike a versioned
   * path — really are served by both hosts.
   */
  unversioned?: boolean;
}): JSX.Element {
  if (appOnly) {
    return (
      <div className="fb-script-host fb-script-host--app">
        <p>
          <strong>
            This version is served from <code>app.flipbase.com</code> only.
          </strong>{' '}
          Unlike the newer components it was never published to{' '}
          <code>cdn.flipbase.com</code>, so the request goes through a reverse
          proxy on a single instance rather than to a CDN edge. It is one reason
          among several to move to a current version.
        </p>
      </div>
    );
  }

  if (unversioned) {
    return (
      <div className="fb-script-host fb-script-host--app">
        <p>
          <strong>This is an unversioned path, and it is frozen.</strong> It
          serves the same bytes it served the day you integrated and will keep
          doing so — but it never receives a fix, because a fix would change a
          URL thousands of pages already load. Both{' '}
          <code>cdn.flipbase.com</code> and <code>app.flipbase.com</code> serve
          it, so an integration on either host keeps working untouched. To
          receive fixes you have to pin a version instead.
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
        A versioned path exists only there — <code>app.flipbase.com</code> does
        not serve one, so swapping the host turns a working embed into a 403.
        The old unversioned paths are the exception: they are served by both
        hosts, and an existing integration pointing at <code>app</code> keeps
        working exactly as it does today.
      </p>
    </div>
  );
}
