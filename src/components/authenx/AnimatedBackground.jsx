import React from 'react';

// Subtle animated background — floating abstract elements related to document
// scanning, digital identity, AI and cybersecurity. Stays behind content and
// never reduces readability.
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#07090E]">
      {/* grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* radial glows */}
      <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-cyan-400/5 blur-[100px]" />

      {/* floating abstract shapes */}
      <div className="absolute left-[8%] top-[18%] animate-float">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-20">
          <rect x="20" y="30" width="80" height="60" rx="6" stroke="#00F0FF" strokeWidth="1" />
          <rect x="30" y="42" width="40" height="5" rx="2" fill="#00F0FF" opacity="0.5" />
          <rect x="30" y="54" width="60" height="3" rx="1.5" fill="#00F0FF" opacity="0.3" />
          <rect x="30" y="62" width="50" height="3" rx="1.5" fill="#00F0FF" opacity="0.3" />
          <circle cx="85" cy="72" r="9" stroke="#A855F7" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute right-[12%] top-[22%] animate-float-slow">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none" className="opacity-20">
          <circle cx="70" cy="70" r="60" stroke="#A855F7" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="70" cy="70" r="40" stroke="#00F0FF" strokeWidth="1" opacity="0.6" />
          <circle cx="70" cy="70" r="20" stroke="#00F0FF" strokeWidth="1" opacity="0.4" />
          <circle cx="70" cy="70" r="3" fill="#00F0FF" />
        </svg>
      </div>
      <div className="absolute left-[15%] bottom-[14%] animate-float">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="opacity-20">
          <path d="M20 80 L20 30 L50 20 L80 30 L80 80 Z" stroke="#00F0FF" strokeWidth="1" />
          <path d="M35 50 L65 50 M35 60 L65 60 M35 70 L55 70" stroke="#00F0FF" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>
      <div className="absolute right-[18%] bottom-[18%] animate-float-slow">
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none" className="opacity-20">
          <polygon points="55,15 90,75 20,75" stroke="#A855F7" strokeWidth="1" />
          <circle cx="55" cy="58" r="10" stroke="#00F0FF" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

      {/* horizontal scan line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-scan-line" />

      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07090E]" />
    </div>
  );
}