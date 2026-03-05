import React from 'react';

export function LiveTerminalWidget() {
  return (
    <section className="col-span-12 lg:col-span-9 row-span-4 glass-panel rounded-lg flex flex-col overflow-hidden border-t-2 border-t-accent/30">
      <div className="bg-primary/10 px-4 py-2 border-b border-primary/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-accent text-sm">terminal</span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider">Command::Live_Log</span>
        </div>
        <div className="flex gap-1">
          <div className="size-2 rounded-full bg-slate-600"></div>
          <div className="size-2 rounded-full bg-slate-600"></div>
          <div className="size-2 rounded-full bg-slate-600"></div>
        </div>
      </div>
      <div className="flex-1 p-4 font-mono text-sm terminal-scroll overflow-y-auto bg-black/40">
        <div className="mb-2"><span className="text-accent">[14:22:01]</span> <span className="text-green-400">INGEST_SUCCESS:</span> Github Webhook - Repository: 'advoloom-core' - Pull Request #421</div>
        <div className="mb-2"><span className="text-accent">[14:22:05]</span> <span className="text-primary">AGENT_REPLY:</span> Llama-3-70B processing technical query on Discord #general...</div>
        <div className="mb-2"><span className="text-accent">[14:22:10]</span> <span className="text-slate-400">NEURAL_MAP:</span> Updating context vector for 'Authentication Flow' tutorials</div>
        <div className="mb-2"><span className="text-accent">[14:22:15]</span> <span className="text-yellow-400">WARN:</span> Rate limit approaching for X-API v2 [88% capacity]</div>
        <div className="mb-2"><span className="text-accent">[14:22:18]</span> <span className="text-green-400">INGEST_SUCCESS:</span> New tutorial request identified from Discord thread ID 99283</div>
        <div className="mb-2"><span className="text-accent">[14:22:20]</span> <span className="text-primary">AGENT_OUTPUT:</span> "To initialize the SDK, use the `adv.init()` method with your API key..."</div>
        <div className="mb-2"><span className="text-accent">[14:22:25]</span> <span className="text-green-400">INGEST_SUCCESS:</span> 4 files synced from 'documentation-v2' main branch</div>
        <div className="mb-2"><span className="text-accent">[14:22:31]</span> <span className="text-slate-400">SYSTEM:</span> Garbage collection complete. 1.2MB memory reclaimed.</div>
        <div className="flex items-center gap-2">
          <span className="text-accent font-bold">&gt;</span>
          <div className="w-2 h-4 bg-accent animate-[pulse_1s_infinite]"></div>
        </div>
      </div>
    </section>
  );
}
