import React from 'react';

// Radar-style scanning reticle — signature device over uploaded document previews.
export default function ScanningReticle({ active = true }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="h-full w-full opacity-40">
        <circle cx="100" cy="100" r="90" stroke="#00F0FF" strokeWidth="1" fill="none" opacity="0.5" />
        <circle cx="100" cy="100" r="60" stroke="#00F0FF" strokeWidth="1" fill="none" opacity="0.4" />
        <circle cx="100" cy="100" r="30" stroke="#00F0FF" strokeWidth="1" fill="none" opacity="0.3" />
        <line x1="10" y1="100" x2="190" y2="100" stroke="#00F0FF" strokeWidth="0.5" opacity="0.3" />
        <line x1="100" y1="10" x2="100" y2="190" stroke="#00F0FF" strokeWidth="0.5" opacity="0.3" />
        <g className="origin-center animate-sweep">
          <defs>
            <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0" />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path d="M100 100 L190 100 A90 90 0 0 0 136 22 Z" fill="url(#sweepGrad)" />
        </g>
      </svg>
    </div>
  );
}