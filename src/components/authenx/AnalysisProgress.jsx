import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const STAGES = [
  'Image preprocessing',
  'OCR field extraction',
  'Document field validation',
  'Tampering / inconsistency analysis',
  'Photo comparison',
  'Risk assessment',
];

export default function AnalysisProgress({ active, onComplete, demoMode = true }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return;
    setCurrent(0);
    const total = STAGES.length;
    let stage = 0;
    const interval = setInterval(() => {
      stage += 1;
      if (stage >= total) {
        clearInterval(interval);
        setCurrent(total);
        if (onComplete) onComplete();
      } else {
        setCurrent(stage);
      }
    }, 900);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="glass-card p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-lg font-600 text-white">AI Analysis Pipeline</h3>
          <p className="text-sm text-slate-400">Running screening stages…</p>
        </div>
        {demoMode && (
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 label-mono text-[10px] text-amber-300">
            Demo Analysis Mode
          </span>
        )}
      </div>
      <div className="space-y-3">
        {STAGES.map((stage, i) => {
          const done = current > i;
          const running = current === i;
          return (
            <div
              key={stage}
              className={cn(
                'flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300',
                done && 'border-emerald-500/20 bg-emerald-500/5',
                running && 'border-cyan-500/40 bg-cyan-500/10 shadow-[0_0_20px_rgba(0,240,255,0.15)]',
                !done && !running && 'border-white/5 bg-white/[0.02] opacity-50'
              )}
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                {done ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                ) : running ? (
                  <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
                ) : (
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                )}
              </div>
              <span className={cn('text-sm font-medium', done ? 'text-emerald-300' : running ? 'text-cyan-200' : 'text-slate-500')}>
                {stage}
              </span>
              {running && <span className="ml-auto label-mono text-[10px] text-cyan-400">processing…</span>}
              {done && <span className="ml-auto label-mono text-[10px] text-emerald-500">complete</span>}
            </div>
          );
        })}
      </div>
      <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500"
          style={{ width: `${(current / STAGES.length) * 100}%` }}
        />
      </div>
    </div>
  );
}