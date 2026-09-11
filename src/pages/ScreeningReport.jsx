import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Download, Plus, ShieldCheck, Loader2, FileText } from 'lucide-react';
import WorkflowSteps from '@/components/authenx/WorkflowSteps';
import ExtractedFields from '@/components/authenx/ExtractedFields';
import ValidationCard from '@/components/authenx/ValidationCard';
import TamperingFindings from '@/components/authenx/TamperingFindings';
import FaceComparison from '@/components/authenx/FaceComparison';
import RiskScore from '@/components/authenx/RiskScore';
import { getScreening } from '@/services/screeningService';
import { downloadScreeningReport } from '@/lib/reportPdf';
import { OVERALL_CONFIG, formatDate, shortId } from '@/lib/screeningUtils';
import { cn } from '@/lib/utils';

export default function ScreeningReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [screening, setScreening] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Prefer the screening result passed from the screening flow (no DB read).
    if (location.state?.screening) {
      setScreening(location.state.screening);
      setLoading(false);
      return;
    }
    // Direct access (history link / refresh) loads through the secured channel.
    getScreening(id)
      .then((s) => { setScreening(s); setError(s ? null : 'Screening not found.'); })
      .catch(() => setError('Could not load the screening report.'))
      .finally(() => setLoading(false));
  }, [id, location.state]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
        <p className="mt-3 text-sm text-slate-400">Loading screening report…</p>
      </div>
    );
  }
  if (error || !screening) {
    return (
      <div className="glass-card mx-auto max-w-lg p-8 text-center">
        <FileText className="mx-auto mb-3 h-10 w-10 text-slate-600" />
        <p className="text-sm text-slate-400">{error || 'Screening not found.'}</p>
        <Link to="/" className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
      </div>
    );
  }

  const r = screening.analysis_result || {};
  const cfg = OVERALL_CONFIG[r.overall_status || screening.overall_status] || OVERALL_CONFIG['Requires Review'];

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="glass-card p-5 sm:p-6">
        <WorkflowSteps current={4} />
      </div>

      {/* Report header */}
      <div className="glass-card relative overflow-hidden p-6 sm:p-8">
        <div className={cn('absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl opacity-30')} style={{ background: cfg.ring }} />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-cyan-400" />
              <h1 className="font-heading text-xl font-700 text-white sm:text-2xl">AUTHENX AI-Assisted Screening Report</h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              {r.document_type || screening.document_type} · {formatDate(screening.created_date)} · ID {shortId(screening.id)}
            </p>
            {screening.demo_mode && (
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 label-mono text-[10px] text-amber-300">
                Demo Analysis Mode · Simulated Results
              </span>
            )}
          </div>
          <span className={cn('rounded-full border px-4 py-2 text-sm font-600', cfg.text, cfg.bg, cfg.border, cfg.glow)}>
            {r.overall_status || screening.overall_status}
          </span>
        </div>
      </div>

      {/* Risk score + Photo comparison */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RiskScore score={r.risk_score ?? screening.risk_score} status={r.overall_status || screening.overall_status} categories={r.risk_categories || []} />
        <FaceComparison comparison={r.face_comparison || {}} />
      </div>

      {/* Extracted fields + validation */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ExtractedFields fields={r.extracted_fields || []} />
        <ValidationCard checks={r.field_validation || []} />
      </div>

      {/* Tampering */}
      <TamperingFindings findings={r.tampering_indicators || []} />

      {/* Explanations */}
      {(r.explanations || []).length > 0 && (
        <div className="glass-card p-5 sm:p-6">
          <h3 className="mb-3 font-heading text-base font-600 text-white">Analysis Notes</h3>
          <ul className="space-y-2">
            {r.explanations.map((e, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" /> {e}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
        <p className="text-xs text-slate-500">
          Generated by AUTHENX AI-Assisted Screening System. For hackathon demonstration using fictional/mock documents only.
          These are AI-assisted indicators for human review and do not constitute proof of fraud or official identity verification.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => downloadScreeningReport(screening)}
          className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/50 bg-cyan-500/15 px-5 py-2.5 font-heading text-sm font-600 text-cyan-200 transition hover:bg-cyan-500/25 hover:shadow-[0_0_24px_rgba(0,240,255,0.3)]"
        >
          <Download className="h-4 w-4" /> Download Report
        </button>
        <button
          onClick={() => navigate('/screening/new')}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10"
        >
          <Plus className="h-4 w-4" /> New Screening
        </button>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>
      </div>
    </div>
  );
}