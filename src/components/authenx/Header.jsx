import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Plus, History, Activity } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 border-b border-cyan-500/10 bg-[#07090E]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/5 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <ShieldCheck className="h-5 w-5 text-cyan-400" />
            <div className="absolute inset-0 rounded-xl border border-cyan-400/20 animate-pulse-glow" />
          </div>
          <div className="leading-tight">
            <div className="font-heading text-lg font-700 tracking-tight text-white">
              AUTHEN<span className="text-cyan-400">X</span>
            </div>
            <div className="label-mono text-[10px] text-slate-400">AI-Based Document Screening</div>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            <span className="label-mono text-[10px] text-amber-300">Demo Mode</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span className="label-mono text-[10px] text-emerald-300">System Online</span>
          </div>
          <button
            onClick={() => navigate('/screening/new')}
            className="hidden items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20 hover:shadow-[0_0_16px_rgba(0,240,255,0.25)] sm:flex"
          >
            <Plus className="h-4 w-4" /> New Screening
          </button>
          <button
            onClick={() => navigate('/history')}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-300 transition hover:bg-white/10"
          >
            <History className="h-4 w-4" /> <span className="hidden sm:inline">History</span>
          </button>
        </div>
      </div>
    </header>
  );
}