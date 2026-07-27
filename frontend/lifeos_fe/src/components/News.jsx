import React from 'react';
import { Newspaper as NewsIcon } from 'lucide-react';

const News = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">News</h1>
        <p className="mt-2 text-sm text-slate-500">Catch up on the latest updates and curated stories.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 p-5">
        <div className="mb-3 flex items-center gap-2 text-amber-600">
          <NewsIcon size={18} />
          <h2 className="font-semibold">Today&apos;s digest</h2>
        </div>
        <p className="text-sm text-slate-600">A quick overview of your personalized news digest is ready.</p>
      </div>
    </div>
  );
};

export default News;
