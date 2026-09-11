import React from 'react';
import { X, RefreshCw, FileText } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { formatFileSize } from '@/lib/screeningUtils';

export default function DocumentPreview({ file, url, onRemove, onReplace, scanning = false, label = 'Document' }) {
  const isPdf = file?.type === 'application/pdf' || url?.toLowerCase().endsWith('.pdf');
  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#0D111A]/80">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <FileText className="h-4 w-4 shrink-0 text-cyan-400" />
          <span className="truncate text-sm font-medium text-slate-200">{file?.name || label}</span>
          {file?.size && <span className="label-mono shrink-0 text-[10px] text-slate-500">{formatFileSize(file.size)}</span>}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onReplace}
            className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300 transition hover:bg-white/10"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Replace
          </button>
          <button
            onClick={onRemove}
            className="flex items-center gap-1 rounded-md border border-rose-500/20 bg-rose-500/10 px-2 py-1 text-xs text-rose-300 transition hover:bg-rose-500/20"
          >
            <X className="h-3.5 w-3.5" /> Remove
          </button>
        </div>
      </div>
      <div className="relative aspect-[4/3] w-full bg-black/40">
        {isPdf ? (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            <div className="text-center">
              <FileText className="mx-auto mb-2 h-12 w-12 text-cyan-400/60" />
              <p className="label-mono text-xs">PDF Document</p>
            </div>
          </div>
        ) : (
          <Image src={url} fittingType="fit" className="h-full w-full object-contain" />
        )}
        {scanning && <ScanningOverlay />}
      </div>
    </div>
  );
}

function ScanningOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-cyan-500/5" />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-b from-cyan-400/80 to-transparent shadow-[0_0_20px_4px_rgba(0,240,255,0.5)] animate-scan-line" />
      <div className="absolute inset-0 grid-bg opacity-40" />
    </div>
  );
}