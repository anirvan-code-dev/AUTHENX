import React from 'react';
import { Link } from 'react-router-dom';
import { FileSearch, ChevronRight } from 'lucide-react';
import { OVERALL_CONFIG, formatDate, shortId } from '@/lib/screeningUtils';
import { cn } from '@/lib/utils';

export default function HistoryTable({ screenings = [], compact = false }) {
  if (!screenings.length) {
    return (
      <div className="glass-card flex flex-col items-center justify-center px-6 py-12 text-center">
        <FileSearch className="mb-3 h-10 w-10 text-slate-600" />
        <p className="text-sm text-slate-400">No screenings yet.</p>
        <p className="mt-1 text-xs text-slate-500">Start a new screening to see results here.</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-b border-white/5">
              {['ID', 'Document Type', 'Date', 'Risk Score', 'Status', ''].map((h) => (
                <th key={h} className="label-mono px-4 py-3 text-[10px] text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {screenings.map((s) => {
              const cfg = OVERALL_CONFIG[s.overall_status] || OVERALL_CONFIG['Requires Review'];
              return (
                <tr key={s.id} className="border-b border-white/5 transition hover:bg-white/[0.03]">
                  <td className="px-4 py-3 label-mono text-xs text-cyan-300">{shortId(s.id)}</td>
                  <td className="px-4 py-3 text-sm text-slate-200">{s.document_type || '—'}</td>
                  <td className="px-4 py-3 text-sm text-slate-400">{formatDate(s.created_date)}</td>
                  <td className="px-4 py-3">
                    <span className={cn('font-heading text-sm font-700', cfg.text)}>{s.risk_score ?? '—'}</span>
                    <span className="text-xs text-slate-500">/100</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn('rounded-full border px-2.5 py-1 text-xs font-medium', cfg.text, cfg.bg, cfg.border)}>
                      {s.overall_status || '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/screening/${s.id}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-300 transition hover:bg-cyan-500/20"
                    >
                      View Report <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}