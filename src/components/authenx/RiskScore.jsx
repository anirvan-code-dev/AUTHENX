import React, { useEffect, useState } from 'react';
import { Gauge } from 'lucide-react';
import { OVERALL_CONFIG } from '@/lib/screeningUtils';
import { cn } from '@/lib/utils';

export default function RiskScore({ score = 0, status, categories = [] }) {
  const [display, setDisplay] = useState(0);
  const cfg = OVERALL_CONFIG[status] || OVERALL_CONFIG['Requires Review'];

  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 1200;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * score));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  // semicircle gauge
  const r = 80;
  const circ = Math.PI * r;
  const pct = Math.min(100, Math.max(0, score)) / 100;

  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <Gauge className="h-5 w-5 text-cyan-400" />
        <h3 className="font-heading text-base font-600 text-white">AI-Assisted Risk Assessment</h3>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative">
          <svg viewBox="0 0 200 120" className="w-56">
            <defs>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
            <path d="M20 110 A80 80 0 0 1 180 110" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" strokeLinecap="round" />
            <path
              d="M20 110 A80 80 0 0 1 180 110"
              fill="none"
              stroke="url(#riskGrad)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - pct)}
              style={{ transition: 'stroke-dashoffset 1.2s ease', filter: `drop-shadow(0 0 8px ${cfg.ring}88)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
            <span className="font-heading text-4xl font-700 text-white">{display}</span>
            <span className="label-mono text-[10px] text-slate-500">/ 100</span>
          </div>
        </div>
        <span className={cn('mt-2 rounded-full border px-4 py-1.5 text-sm font-medium', cfg.text, cfg.bg, cfg.border, cfg.glow)}>
          {status}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {categories.map((c) => (
          <div key={c.name}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs text-slate-300">{c.name}</span>
              <span className={cn('text-xs font-medium', c.score >= 75 ? 'text-emerald-400' : c.score >= 50 ? 'text-amber-400' : 'text-rose-400')}>
                {c.score}/100
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className={cn('h-full rounded-full', c.score >= 75 ? 'bg-emerald-400' : c.score >= 50 ? 'bg-amber-400' : 'bg-rose-400')}
                style={{ width: `${c.score}%`, transition: 'width 1s ease' }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs text-slate-500">
        The score summarizes detected inconsistencies and should be reviewed by a human.
      </p>
    </div>
  );
}