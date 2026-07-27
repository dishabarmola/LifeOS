import React from 'react';
import { Activity, HeartHandshake } from 'lucide-react';

const Health = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Health</h1>
        <p className="mt-2 text-sm text-slate-500">Track wellness habits and recovery progress.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-5">
          <div className="mb-3 flex items-center gap-2 text-rose-500">
            <HeartHandshake size={18} />
            <h2 className="font-semibold">Wellness score</h2>
          </div>
          <p className="text-sm text-slate-600">Your weekly wellness score is trending upward.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-5">
          <div className="mb-3 flex items-center gap-2 text-sky-600">
            <Activity size={18} />
            <h2 className="font-semibold">Daily habits</h2>
          </div>
          <p className="text-sm text-slate-600">Hydration, sleep, and exercise are on pace.</p>
        </div>
      </div>
    </div>
  );
};

export default Health;
