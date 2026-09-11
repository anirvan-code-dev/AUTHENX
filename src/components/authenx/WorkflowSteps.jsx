import React from 'react';
import { Upload, UserCheck, Cpu, FileCheck2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  { label: 'Upload Document', icon: Upload },
  { label: 'Reference Photo', icon: UserCheck },
  { label: 'AI Analysis', icon: Cpu },
  { label: 'Screening Report', icon: FileCheck2 },
];

export default function WorkflowSteps({ current = 1 }) {
  const items = [];
  STEPS.forEach((step, i) => {
    const num = i + 1;
    const active = num === current;
    const done = num < current;
    const Icon = step.icon;
    items.push(
      <div key={'step-' + num} className="flex flex-col items-center gap-2">
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300',
            active && 'border-cyan-400/60 bg-cyan-500/15 shadow-[0_0_20px_rgba(0,240,255,0.3)]',
            done && 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
            !active && !done && 'border-white/10 bg-white/5 text-slate-500'
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={cn(
            'label-mono hidden text-[10px] sm:block',
            active ? 'text-cyan-300' : done ? 'text-emerald-400' : 'text-slate-500'
          )}
        >
          {step.label}
        </span>
      </div>
    );
    if (i < STEPS.length - 1) {
      items.push(
        <div key={'conn-' + num} className="relative mx-1 h-px flex-1 sm:mx-2">
          <div className="absolute inset-0 bg-white/10" />
          <div className={cn('absolute inset-0 transition-all duration-500', done ? 'bg-emerald-500/50' : 'bg-transparent')} />
        </div>
      );
    }
  });

  return <div className="flex w-full items-center">{items}</div>;
}