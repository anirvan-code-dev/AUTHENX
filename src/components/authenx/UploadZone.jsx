import React, { useRef, useState } from 'react';
import { UploadCloud, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { validateFile, formatFileSize } from '@/lib/screeningUtils';

export default function UploadZone({
  onFile,
  accept,
  acceptExt,
  label = 'Drag & drop or click to upload',
  hint,
  error: externalError,
  disabled = false,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleFile = (file) => {
    if (!file) return;
    const err = validateFile(file, accept);
    if (err) {
      setLocalError(err);
      return;
    }
    setLocalError(null);
    onFile(file);
  };

  const error = localError || externalError;

  return (
    <div>
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (disabled) return;
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={cn(
          'group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-all duration-300',
          dragging
            ? 'border-cyan-400/70 bg-cyan-500/10 shadow-[0_0_30px_rgba(0,240,255,0.2)]'
            : 'border-white/10 bg-white/[0.02] hover:border-cyan-500/40 hover:bg-cyan-500/5',
          disabled && 'pointer-events-none opacity-50'
        )}
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/5 transition group-hover:scale-105">
          <UploadCloud className="h-8 w-8 text-cyan-400" />
        </div>
        <p className="font-heading text-base font-600 text-slate-100">{label}</p>
        {hint && <p className="mt-1.5 max-w-sm text-sm text-slate-400">{hint}</p>}
        <p className="label-mono mt-3 text-[10px] text-slate-500">
          {acceptExt?.replace(/\./g, '').toUpperCase().replace(/,/g, ' · ')}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={acceptExt}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      {error && (
        <p className="mt-3 flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
          <FileText className="h-4 w-4 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}