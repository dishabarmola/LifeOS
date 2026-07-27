import React from 'react';
import { BookOpenCheck, NotebookPen } from 'lucide-react';

const Academics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Academics</h1>
        <p className="mt-2 text-sm text-slate-500">Stay on top of classes, assignments, and study goals.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-5">
          <div className="mb-3 flex items-center gap-2 text-violet-600">
            <NotebookPen size={18} />
            <h2 className="font-semibold">Upcoming tasks</h2>
          </div>
          <p className="text-sm text-slate-600">DSA revision, DBMS sprint, and OS practice session.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-5">
          <div className="mb-3 flex items-center gap-2 text-emerald-600">
            <BookOpenCheck size={18} />
            <h2 className="font-semibold">Focus streak</h2>
          </div>
          <p className="text-sm text-slate-600">You are 4 days into a productive study streak.</p>
        </div>
      </div>
    </div>
  );
};

export default Academics;
