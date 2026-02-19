import React, { useEffect, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

const RECORDER_SCRIPT_SRC = '//app.flipbase.com/recorder.js';

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

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
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
