import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { SEVERITY_CONFIG } from '@/lib/screeningUtils';
import { cn } from '@/lib/utils';

export default function TamperingFindings({ findings = [] }) {
  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <ShieldAlert className="h-5 w-5 text-cyan-400" />
        <h3 className="font-heading text-base font-600 text-white">Tampering & Image Consistency Analysis</h3>
      </div>

      {findings.length === 0 ? (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-6 text-center">
          <p className="text-sm text-emerald-300">No significant tampering indicators detected.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {findings.map((f, i) => {
            const s = SEVERITY_CONFIG[f.severity] || SEVERITY_CONFIG.low;
            return (
            <div key={i} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-slate-100">{f.finding}</p>
                <div className="flex items-center gap-2">
                  <span className={cn('rounded-full border px-2 py-0.5 label-mono text-[10px]', s.text, s.bg, s.border)}>
                    {s.label} severity
                  </span>
                  <span className="label-mono text-[10px] text-slate-400">
                    conf {Math.round(f.confidence * 100)}%
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-400">{f.explanation}</p>
            </div>
          );})}
        </div>
      )}

      <p className="mt-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs text-slate-500">
        These are AI-assisted indicators for human review and do not constitute proof of fraud.
      </p>
    </div>
  );
}