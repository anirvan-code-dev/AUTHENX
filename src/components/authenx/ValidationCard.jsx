import React from 'react';
import { ClipboardCheck, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const ICONS = { passed: CheckCircle2, review: AlertTriangle, inconsistency: XCircle };
const STYLES = {
  passed: { text: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/5', label: 'Passed' },
  review: { text: 'text-amber-400', border: 'border-amber-500/20', bg: 'bg-amber-500/5', label: 'Requires Review' },
  inconsistency: { text: 'text-rose-400', border: 'border-rose-500/20', bg: 'bg-rose-500/5', label: 'Potential Inconsistency' },
};

export default function ValidationCard({ checks = [] }) {
  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <ClipboardCheck className="h-5 w-5 text-cyan-400" />
        <h3 className="font-heading text-base font-600 text-white">Document Validation</h3>
      </div>
      <div className="space-y-2.5">
        {checks.map((c) => {
          const s = STYLES[c.status] || STYLES.passed;
          const Icon = ICONS[c.status] || CheckCircle2;
          return (
            <div
              key={c.check}
              className={cn('flex items-center gap-3 rounded-xl border px-4 py-3', s.border, s.bg)}
            >
              <Icon className={cn('h-5 w-5 shrink-0', s.text)} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-100">{c.check}</p>
                <p className="truncate text-xs text-slate-400">{c.detail}</p>
              </div>
              <span className={cn('label-mono shrink-0 text-[10px]', s.text)}>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}