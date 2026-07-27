import React from 'react';
import { MessageSquareQuote } from 'lucide-react';

const Review = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Review</h1>
        <p className="mt-2 text-sm text-slate-500">Reflect on progress and keep the momentum going.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 p-5">
        <div className="mb-3 flex items-center gap-2 text-indigo-600">
          <MessageSquareQuote size={18} />
          <h2 className="font-semibold">Weekly reflection</h2>
        </div>
        <p className="text-sm text-slate-600">Write down wins, blockers, and next steps for the week ahead.</p>
      </div>
    </div>
  );
};

export default Review;
