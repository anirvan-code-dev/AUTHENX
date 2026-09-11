import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { STATUS_CONFIG, OVERALL_CONFIG } from '@/lib/screeningUtils';
import { cn } from '@/lib/utils';

const ICONS = { CheckCircle2, AlertTriangle, XCircle };

export default function StatusBadge({ status, size = 'md', overall = false }) {
  const config = overall ? OVERALL_CONFIG[status] : STATUS_CONFIG[status];
  if (!config) return null;
  const Icon = config.icon ? ICONS[config.icon] : null;
  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3.5 py-1.5 text-sm gap-2',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        config.text, config.bg, config.border, sizes[size]
      )}
    >
      {Icon && <Icon className={cn(size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')} />}
      {config.label}
    </span>
  );
}

export function StatusDot({ status }) {
  const config = STATUS_CONFIG[status] || OVERALL_CONFIG[status];
  if (!config) return null;
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-60', config.dot)} />
      <span className={cn('relative inline-flex h-2.5 w-2.5 rounded-full', config.dot)} />
    </span>
  );
}