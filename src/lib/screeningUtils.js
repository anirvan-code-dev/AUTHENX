// Shared helpers and status styling for AUTHENX.

export const STATUS_CONFIG = {
  valid: { label: 'Valid', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', dot: 'bg-emerald-400', icon: 'CheckCircle2' },
  passed: { label: 'Passed', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', dot: 'bg-emerald-400', icon: 'CheckCircle2' },
  review: { label: 'Requires Review', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', dot: 'bg-amber-400', icon: 'AlertTriangle' },
  inconsistency: { label: 'Potential Inconsistency', text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30', dot: 'bg-rose-400', icon: 'XCircle' },
};

export const OVERALL_CONFIG = {
  'Low Concern': { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/40', glow: 'shadow-[0_0_24px_rgba(16,185,129,0.25)]', ring: '#10B981' },
  'Requires Review': { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/40', glow: 'shadow-[0_0_24px_rgba(245,158,11,0.25)]', ring: '#F59E0B' },
  'Potential Inconsistency': { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/40', glow: 'shadow-[0_0_24px_rgba(249,115,22,0.25)]', ring: '#F97316' },
  'Suspicious': { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/40', glow: 'shadow-[0_0_28px_rgba(239,68,68,0.3)]', ring: '#EF4444' },
};

export const SEVERITY_CONFIG = {
  low: { label: 'Low', text: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30' },
  medium: { label: 'Medium', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  high: { label: 'High', text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
};

export function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
export const DOC_ACCEPT = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
export const PHOTO_ACCEPT = ['image/jpeg', 'image/jpg', 'image/png'];
export const DOC_ACCEPT_EXT = '.jpg,.jpeg,.png,.pdf';
export const PHOTO_ACCEPT_EXT = '.jpg,.jpeg,.png';

export function validateFile(file, allowedTypes, maxSize = MAX_FILE_SIZE) {
  if (!allowedTypes.includes(file.type)) {
    const label = allowedTypes.includes('application/pdf') ? 'JPG, PNG or PDF' : 'JPG or PNG';
    return 'Unsupported file type. Please upload ' + label + '.';
  }
  if (file.size > maxSize) {
    return 'File is too large. Maximum size is ' + formatFileSize(maxSize) + '.';
  }
  return null;
}

export function formatDate(value) {
  if (!value) return '—';
  try {
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    return d.toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return value;
  }
}

export function shortId(id) {
  if (!id) return '—';
  return id.slice(-8).toUpperCase();
}