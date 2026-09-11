import React from 'react';
import { Images } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';

export default function FaceComparison({ comparison = {} }) {
  const { score = 0, status, document_photo_url, reference_photo_url } = comparison;
  const color = score >= 85 ? 'text-emerald-400' : score >= 70 ? 'text-amber-400' : 'text-rose-400';
  const bar = score >= 85 ? 'from-emerald-400 to-emerald-500' : score >= 70 ? 'from-amber-400 to-amber-500' : 'from-rose-400 to-rose-500';

  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <Images className="h-5 w-5 text-cyan-400" />
        <h3 className="font-heading text-base font-600 text-white">Reference Photo Comparison</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <PhotoTile label="Document Photo" url={document_photo_url} />
        <PhotoTile label="Reference Photo" url={reference_photo_url} />
      </div>

      <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between">
          <span className="label-mono text-[10px] text-slate-500">Face Match Score</span>
          <span className={cn('font-heading text-2xl font-700', color)}>{score}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
          <div className={cn('h-full rounded-full bg-gradient-to-r', bar)} style={{ width: `${score}%` }} />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-slate-300">Status: <span className={cn('font-medium', color)}>{status}</span></span>
          <span className="label-mono text-[9px] text-slate-500">Not official identity verification</span>
        </div>
      </div>
    </div>
  );
}

function PhotoTile({ label, url }) {
  return (
    <div className="overflow-hidden rounded-xl border border-cyan-500/15 bg-black/40">
      <div className="border-b border-white/5 px-3 py-2 label-mono text-[10px] text-slate-400">{label}</div>
      <div className="aspect-square w-full">
        {url ? (
          <Image src={url} fittingType="fill" className="h-full w-full" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-600">No image</div>
        )}
      </div>
    </div>
  );
}