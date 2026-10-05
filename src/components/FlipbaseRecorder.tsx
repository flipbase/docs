import React, { useEffect, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

// Same host the documented embed uses; see ScriptHost.tsx.
const RECORDER_SCRIPT_SRC = 'https://cdn.flipbase.com/recorder/recorder.js';

interface RecorderOptions {
  recorderId: string;
  selector?: string;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  locale?: string;
  duration?: number;
  maxWidth?: number;
  maxHeight?: number;
}

interface FlipbaseRecorderProps extends RecorderOptions {
  label?: string;
}

declare global {
  interface Window {
    Flipbase?: {
      recorder: (options: RecorderOptions) => { destroy: () => void; isUploading: () => boolean };
    };
  }
}

/*
 * One promise per source, shared by everything that asks for it.
 *
 * This used to resolve immediately whenever a matching `<script>` tag was
 * already in the document — which is true the instant the first recorder
 * appends it, long before it has loaded. So with two recorders on a page the
 * second resolved straight away, found `window.Flipbase` still undefined, and
 * returned without rendering. The page showed one recorder while describing
 * two, and said nothing about it.
 */
const loading = new Map<string, Promise<void>>();

function loadScript(src: string): Promise<void> {
  const existing = loading.get(src);
  if (existing) return existing;

  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Could not load ${src}`));
    document.head.appendChild(script);
  });

  loading.set(src, promise);
  return promise;
}

function RecorderInner({ label, ...options }: FlipbaseRecorderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const instanceRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadScript(RECORDER_SCRIPT_SRC).then(() => {
      if (cancelled || !inputRef.current || !window.Flipbase) return;
      instanceRef.current = window.Flipbase.recorder(options);
    });

    return () => {
      cancelled = true;
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [options.recorderId, options.selector]);

  return (
    <div>
      {label && <h4>{label}</h4>}
      {/* id is required when using the selector option so Flipbase can locate the element */}
      <input ref={inputRef} id={options.selector} type="flipbase" style={{ display: 'none' }} />
    </div>
  );
}

export default function FlipbaseRecorder(props: FlipbaseRecorderProps) {
  return (
    <BrowserOnly>
      {() => <RecorderInner {...props} />}
    </BrowserOnly>
  );
}
