import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanLine, FileSearch, AlertTriangle, ShieldAlert, Plus, History as HistoryIcon, UploadCloud, ArrowRight, Cpu, UserCheck, FileCheck2 } from 'lucide-react';
import MetricCard from '@/components/authenx/MetricCard';
import HistoryTable from '@/components/authenx/HistoryTable';
import UploadZone from '@/components/authenx/UploadZone';
import { listScreenings, uploadDocument } from '@/services/screeningService';
import { DOC_ACCEPT, DOC_ACCEPT_EXT } from '@/lib/screeningUtils';

export default function Dashboard() {
  const navigate = useNavigate();
  const [screenings, setScreenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    listScreenings(100)
      .then(setScreenings)
      .catch(() => setScreenings([]))
      .finally(() => setLoading(false));
  }, []);

  const handleQuickUpload = async (file) => {
    setUploading(true);
    setError(null);
    try {
      const url = await uploadDocument(file);
      navigate('/screening/new', { state: { documentUrl: url, documentFile: { name: file.name, size: file.size, type: file.type } } });
    } catch (e) {
      setError('Could not upload the document. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const total = screenings.length;
  const reviewed = screenings.length;
  const reviewCount = screenings.filter((s) => s.overall_status === 'Requires Review').length;
  const inconsistencyCount = screenings.filter((s) => s.overall_status === 'Potential Inconsistency' || s.overall_status === 'Suspicious').length;

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-cyan-500/15 bg-gradient-to-br from-[#0D111A]/90 to-[#0D111A]/60 p-6 sm:p-10">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-12 left-1/4 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 label-mono text-[10px] text-amber-300">
            Hackathon Demo · Fictional/Mock Documents Only
          </span>
          <h1 className="mt-4 font-heading font-700 leading-[1.05] text-white" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
            AI-Powered Identity &<br className="hidden sm:block" /> <span className="text-cyan-400 text-glow-cyan">Document Screening</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
            Analyze mock identity documents, detect potential inconsistencies, and generate an AI-assisted screening report.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/screening/new')}
              className="group inline-flex items-center gap-2 rounded-xl border border-cyan-400/50 bg-cyan-500/15 px-5 py-3 font-heading text-sm font-600 text-cyan-200 transition hover:bg-cyan-500/25 hover:shadow-[0_0_28px_rgba(0,240,255,0.35)]"
            >
              <Plus className="h-4 w-4" /> Start New Screening
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => navigate('/history')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-heading text-sm font-600 text-slate-200 transition hover:bg-white/10"
            >
              <HistoryIcon className="h-4 w-4" /> View Previous Results
            </button>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label="Total Screenings" value={loading ? '—' : total} icon={ScanLine} accent="cyan" trend={[2, 3, 5, 4, 7, total]} />
        <MetricCard label="Documents Reviewed" value={loading ? '—' : reviewed} icon={FileSearch} accent="purple" trend={[1, 2, 4, 6, 8, reviewed]} />
        <MetricCard label="Requires Review" value={loading ? '—' : reviewCount} icon={AlertTriangle} accent="amber" trend={[0, 1, 1, 2, 3, reviewCount]} />
        <MetricCard label="Potential Inconsistencies" value={loading ? '—' : inconsistencyCount} icon={ShieldAlert} accent="rose" trend={[0, 0, 1, 1, 2, inconsistencyCount]} />
      </section>

      {/* Workflow + Recent logs */}
      <section className="grid gap-6 lg:grid-cols-12">
        {/* Left: wizard pipeline + drop zone (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-card p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-cyan-400" />
              <h2 className="font-heading text-base font-600 text-white">Screening Pipeline</h2>
            </div>
            <div className="mb-6 grid grid-cols-4 gap-2">
              {[
                { icon: UploadCloud, label: 'Upload' },
                { icon: UserCheck, label: 'Photo' },
                { icon: Cpu, label: 'AI Analysis' },
                { icon: FileCheck2, label: 'Report' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-cyan-400">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <span className="label-mono text-[9px] text-slate-400">Step {i + 1}</span>
                  <span className="text-xs text-slate-300">{s.label}</span>
                </div>
              ))}
            </div>
            <UploadZone
              onFile={handleQuickUpload}
              accept={DOC_ACCEPT}
              acceptExt={DOC_ACCEPT_EXT}
              label="Drop a mock document to begin"
              hint="JPG, PNG or PDF · Max 10 MB · Starts a new screening instantly"
              error={error}
              disabled={uploading}
            />
            {uploading && (
              <p className="mt-3 flex items-center gap-2 text-sm text-cyan-300">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400/30 border-t-cyan-400" />
                Uploading & starting screening…
              </p>
            )}
          </div>
        </div>

        {/* Right: recent logs (5 cols) */}
        <div className="lg:col-span-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-base font-600 text-white">Recent Screening Logs</h2>
            <button onClick={() => navigate('/history')} className="label-mono text-[10px] text-cyan-400 hover:text-cyan-300">
              View all
            </button>
          </div>
          {loading ? (
            <div className="glass-card space-y-2 p-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-12 animate-pulse rounded-lg bg-white/5" />
              ))}
            </div>
          ) : (
            <HistoryTable screenings={screenings.slice(0, 5)} compact />
          )}
        </div>
      </section>
    </div>
  );
}