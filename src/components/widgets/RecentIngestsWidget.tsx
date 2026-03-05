import React from 'react';

export function RecentIngestsWidget() {
  return (
    <section className="col-span-12 lg:col-span-3 row-span-5 glass-panel rounded-lg flex flex-col overflow-hidden">
      <div className="p-4 border-b border-primary/20 bg-primary/5">
        <h3 className="text-xs font-mono text-slate-300 uppercase font-bold tracking-widest">Recent Ingests</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 hover:border-accent/40 transition-colors group cursor-pointer">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-mono text-accent">GITHUB_COMMIT</span>
            <span className="text-[10px] text-slate-500">2m ago</span>
          </div>
          <p className="text-xs text-slate-300 line-clamp-1">Refactor: Auth middleware logic updates</p>
          <div className="mt-2 flex gap-1">
            <span className="px-1 text-[8px] border border-primary/30 text-primary-300 rounded uppercase">Tutorial_Update</span>
          </div>
        </div>
        <div className="p-3 bg-background-dark/50 rounded-lg border border-primary/10 hover:border-accent/40 transition-colors group cursor-pointer">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-mono text-slate-400">DISCORD_MSG</span>
            <span className="text-[10px] text-slate-500">5m ago</span>
          </div>
          <p className="text-xs text-slate-300 line-clamp-1">User: "How do I setup multi-tenancy?"</p>
          <div className="mt-2 flex gap-1">
            <span className="px-1 text-[8px] border border-primary/30 text-primary-300 rounded uppercase">Q&amp;A_Trigger</span>
          </div>
        </div>
        <div className="p-3 bg-background-dark/50 rounded-lg border border-primary/10 hover:border-accent/40 transition-colors group cursor-pointer">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-mono text-slate-400">X_MENTION</span>
            <span className="text-[10px] text-slate-500">14m ago</span>
          </div>
          <p className="text-xs text-slate-300 line-clamp-1">@dev_guru: Loving the new @advoloom CLI!</p>
          <div className="mt-2 flex gap-1">
            <span className="px-1 text-[8px] border border-primary/30 text-primary-300 rounded uppercase">Sentiment_Pos</span>
          </div>
        </div>
        <div className="p-3 bg-background-dark/50 rounded-lg border border-primary/10 hover:border-accent/40 transition-colors group cursor-pointer">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-mono text-slate-400">DOCS_PARSE</span>
            <span className="text-[10px] text-slate-500">1h ago</span>
          </div>
          <p className="text-xs text-slate-300 line-clamp-1">Updated 'Advanced Routing' technical doc</p>
          <div className="mt-2 flex gap-1">
            <span className="px-1 text-[8px] border border-primary/30 text-primary-300 rounded uppercase">Vector_Sync</span>
          </div>
        </div>
      </div>
      <button className="p-3 text-[10px] font-mono text-slate-500 uppercase hover:text-accent border-t border-primary/20">
        View Data Lake
      </button>
    </section>
  );
}
