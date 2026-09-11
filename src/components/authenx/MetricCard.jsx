import React from 'react';
import { cn } from '@/lib/utils';

// Dashboard metric card with a tiny sparkline trend.
export default function MetricCard({ label, value, icon: Icon, accent = 'cyan', trend = [] }) {
  const accents = {
    cyan: { text: 'text-cyan-400', border: 'border-cyan-500/20', glow: 'shadow-[0_0_24px_rgba(0,240,255,0.08)]' },
    purple: { text: 'text-purple-400', border: 'border-purple-500/20', glow: 'shadow-[0_0_24px_rgba(168,85,247,0.08)]' },
    amber: { text: 'text-amber-400', border: 'border-amber-500/20', glow: 'shadow-[0_0_24px_rgba(245,158,11,0.08)]' },
    rose: { text: 'text-rose-400', border: 'border-rose-500/20', glow: 'shadow-[0_0_24px_rgba(239,68,68,0.08)]' },
  };
  const a = accents[accent];

  // build sparkline path
  const max = Math.max(...trend, 1);
  const min = Math.min(...trend, 0);
  const range = max - min || 1;
  const pts = trend.map((v, i) => {
    const x = (i / (trend.length - 1 || 1)) * 100;
    const y = 30 - ((v - min) / range) * 26 - 2;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={cn('glass-card p-4 transition hover:scale-[1.02]', a.glow)}>
      <div className="flex items-center justify-between">
        <span className="label-mono text-[10px] text-slate-400">{label}</span>
        <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg border', a.border, a.text, 'bg-white/5')}>
          {Icon && <Icon className="h-4 w-4" />}
        </div>
      </div>
      <div className="mt-2 flex items-end justify-between gap-2">
        <span className="font-heading text-3xl font-700 text-white">{value}</span>
        {trend.length > 1 && (
          <svg viewBox="0 0 100 30" className="h-8 w-24" preserveAspectRatio="none">
            <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="2" className={a.text} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  );
}