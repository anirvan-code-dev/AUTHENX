import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HistoryTable from '@/components/authenx/HistoryTable';
import { listScreenings } from '@/services/screeningService';

export default function History() {
  const navigate = useNavigate();
  const [screenings, setScreenings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listScreenings(100)
      .then(setScreenings)
      .catch(() => setScreenings([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-700 text-white">Screening History</h1>
          <p className="mt-1 text-sm text-slate-400">Previous demo screenings and their AI-assisted reports.</p>
        </div>
        <button
          onClick={() => navigate('/screening/new')}
          className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/50 bg-cyan-500/15 px-4 py-2.5 font-heading text-sm font-600 text-cyan-200 transition hover:bg-cyan-500/25"
        >
          <Plus className="h-4 w-4" /> New Screening
        </button>
      </div>

      {loading ? (
        <div className="glass-card space-y-2 p-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-lg bg-white/5" />
          ))}
        </div>
      ) : (
        <HistoryTable screenings={screenings} />
      )}
    </div>
  );
}