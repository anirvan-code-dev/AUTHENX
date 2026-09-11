import React from 'react';
import { ScanText } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { cn } from '@/lib/utils';

export default function ExtractedFields({ fields = [], title = 'Extracted Document Information' }) {
  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <ScanText className="h-5 w-5 text-cyan-400" />
        <h3 className="font-heading text-base font-600 text-white">{title}</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((f) => (
          <div
            key={f.field_name}
            className="rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-cyan-500/20"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="label-mono text-[10px] text-slate-500">{f.field_name}</span>
              <StatusBadge status={f.validation_status} size="sm" />
            </div>
            <p className="mt-1.5 break-words text-sm font-medium text-slate-100">{f.value || '—'}</p>
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="label-mono text-[9px] text-slate-500">Confidence</span>
                <span className={cn('text-xs font-medium', f.confidence >= 0.85 ? 'text-emerald-400' : f.confidence >= 0.7 ? 'text-amber-400' : 'text-rose-400')}>
                  {Math.round(f.confidence * 100)}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className={cn(
                    'h-full rounded-full',
                    f.confidence >= 0.85 ? 'bg-emerald-400' : f.confidence >= 0.7 ? 'bg-amber-400' : 'bg-rose-400'
                  )}
                  style={{ width: `${Math.round(f.confidence * 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}