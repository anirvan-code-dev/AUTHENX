import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, UserCheck, ScanLine } from 'lucide-react';
import WorkflowSteps from '@/components/authenx/WorkflowSteps';
import UploadZone from '@/components/authenx/UploadZone';
import DocumentPreview from '@/components/authenx/DocumentPreview';
import AnalysisProgress from '@/components/authenx/AnalysisProgress';
import { uploadDocument, uploadReferencePhoto, analyzeScreening } from '@/services/screeningService';
import { DOC_ACCEPT, DOC_ACCEPT_EXT, PHOTO_ACCEPT, PHOTO_ACCEPT_EXT } from '@/lib/screeningUtils';

export default function NewScreening() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [docFile, setDocFile] = useState(null);
  const [docUrl, setDocUrl] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [scanning, setScanning] = useState(false);

  // Pre-fill from dashboard quick upload
  useEffect(() => {
    if (location.state?.documentUrl) {
      setDocUrl(location.state.documentUrl);
      setDocFile(location.state.documentFile || null);
      setStep(2);
    }
  }, [location.state]);

  const handleDoc = async (file) => {
    setError(null);
    setUploading(true);
    setScanning(true);
    try {
      const url = await uploadDocument(file);
      setDocFile(file);
      setDocUrl(url);
      setTimeout(() => setScanning(false), 800);
    } catch (e) {
      setError('Could not upload the document. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handlePhoto = async (file) => {
    setError(null);
    setUploading(true);
    try {
      const url = await uploadReferencePhoto(file);
      setPhotoFile(file);
      setPhotoUrl(url);
    } catch (e) {
      setError('Could not upload the reference photo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const startAnalysis = async () => {
    if (!docUrl || !photoUrl) {
      setError('Both a mock document and a reference photo are required.');
      return;
    }
    setError(null);
    setAnalyzing(true);
    setStep(3);
    try {
      const result = await analyzeScreening(docUrl, photoUrl);
      // Wait for the progress animation to feel complete, then go to report
      setTimeout(() => {
        if (result?.screening_id) {
          const screening = {
            id: result.screening_id,
            created_date: new Date().toISOString(),
            document_type: result.document_type,
            risk_score: result.risk_score,
            overall_status: result.overall_status,
            demo_mode: result.demo_mode,
            analysis_result: result,
          };
          navigate(`/screening/${result.screening_id}`, { state: { screening } });
        }
      }, 600);
    } catch (e) {
      setAnalyzing(false);
      setStep(2);
      setError(e?.message || 'Analysis failed. The screening service may be unavailable.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="glass-card p-5 sm:p-6">
        <WorkflowSteps current={step} />
      </div>

      {error && (
        <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>
      )}

      {/* STEP 1 — Upload Document */}
      {step === 1 && (
        <div className="glass-card mx-auto max-w-2xl p-6 sm:p-8 animate-fade-up">
          <h2 className="font-heading text-xl font-600 text-white">Step 1 — Upload Mock Document</h2>
          <p className="mt-1 text-sm text-slate-400">Upload a fictional/mock identity document for screening.</p>
          <div className="mt-6">
            {docUrl ? (
              <DocumentPreview file={docFile} url={docUrl} scanning={scanning} onRemove={() => { setDocUrl(null); setDocFile(null); }} onReplace={() => document.getElementById('doc-replace')?.click()} />
            ) : (
              <UploadZone
                onFile={handleDoc}
                accept={DOC_ACCEPT}
                acceptExt={DOC_ACCEPT_EXT}
                label="Drag & drop your mock document"
                hint="JPG, JPEG, PNG or PDF · Max 10 MB"
                disabled={uploading}
              />
            )}
            <input id="doc-replace" type="file" accept={DOC_ACCEPT_EXT} className="hidden" onChange={(e) => handleDoc(e.target.files?.[0])} />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              disabled={!docUrl || uploading}
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/50 bg-cyan-500/15 px-5 py-2.5 font-heading text-sm font-600 text-cyan-200 transition hover:bg-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 — Upload Reference Photo */}
      {step === 2 && (
        <div className="glass-card mx-auto max-w-2xl p-6 sm:p-8 animate-fade-up">
          <h2 className="font-heading text-xl font-600 text-white">Step 2 — Upload Reference Photo</h2>
          <p className="mt-1 text-sm text-slate-400">Upload a consenting person's photograph for comparison.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <span className="label-mono mb-2 block text-[10px] text-slate-500">Document (selected)</span>
              <DocumentPreview file={docFile} url={docUrl} onRemove={() => { setDocUrl(null); setDocFile(null); setStep(1); }} onReplace={() => setStep(1)} />
            </div>
            <div>
              <span className="label-mono mb-2 block text-[10px] text-slate-500">Reference Photo</span>
              {photoUrl ? (
                <DocumentPreview file={photoFile} url={photoUrl} label="Reference photo" onRemove={() => { setPhotoUrl(null); setPhotoFile(null); }} onReplace={() => document.getElementById('photo-replace')?.click()} />
              ) : (
                <UploadZone
                  onFile={handlePhoto}
                  accept={PHOTO_ACCEPT}
                  acceptExt={PHOTO_ACCEPT_EXT}
                  label="Drop reference photo"
                  hint="JPG or PNG · Use only a consenting team-member photograph."
                  disabled={uploading}
                />
              )}
              <input id="photo-replace" type="file" accept={PHOTO_ACCEPT_EXT} className="hidden" onChange={(e) => handlePhoto(e.target.files?.[0])} />
            </div>
          </div>
          <p className="mt-4 flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs text-amber-300">
            <UserCheck className="h-4 w-4" /> Use only a consenting team-member photograph for this demonstration.
          </p>
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              disabled={!docUrl || !photoUrl || uploading}
              onClick={startAnalysis}
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/50 bg-cyan-500/15 px-5 py-2.5 font-heading text-sm font-600 text-cyan-200 transition hover:bg-cyan-500/25 hover:shadow-[0_0_24px_rgba(0,240,255,0.3)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ScanLine className="h-4 w-4" /> Start AI Analysis
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — AI Analysis */}
      {step === 3 && (
        <div className="mx-auto max-w-2xl">
          <AnalysisProgress active={analyzing} demoMode={true} />
          <p className="mt-4 text-center text-xs text-slate-500">
            Running AI-assisted screening pipeline. Results are simulated in Demo Mode.
          </p>
        </div>
      )}
    </div>
  );
}