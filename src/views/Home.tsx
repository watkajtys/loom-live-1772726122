import React from 'react';
import { Icon } from '../components/Icon';

export function Home() {
  return (
    <div className="flex-1 p-6 grid grid-cols-12 grid-rows-6 gap-4 overflow-hidden text-slate-100 bg-background-dark">
      {/* Channel Health (Top Left) */}
      <section className="col-span-12 lg:col-span-4 row-span-1 glass-panel rounded-lg p-4 flex gap-4">
        <div className="flex-1 flex flex-col justify-center border-r border-primary/10">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="hub" className="text-accent text-sm" />
            <span className="text-[10px] font-mono uppercase text-slate-400">Discord</span>
          </div>
          <div className="text-xl font-bold font-mono">98<span className="text-xs text-slate-500 ml-1">ms</span></div>
        </div>
        <div className="flex-1 flex flex-col justify-center border-r border-primary/10">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="code" className="text-accent text-sm" />
            <span className="text-[10px] font-mono uppercase text-slate-400">GitHub</span>
          </div>
          <div className="text-xl font-bold font-mono text-green-400">SYNC</div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="alternate_email" className="text-accent text-sm" />
            <span className="text-[10px] font-mono uppercase text-slate-400">X / Twitter</span>
          </div>
          <div className="text-xl font-bold font-mono">1.2k<span className="text-xs text-slate-500 ml-1">rq/m</span></div>
        </div>
      </section>

      {/* Agent Status Visualization (Center Top) */}
      <section className="col-span-12 lg:col-span-8 row-span-2 glass-panel rounded-lg p-4 flex flex-col relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xs font-mono text-accent uppercase tracking-widest">Autonomous Activity Visualize</h3>
            <p className="text-2xl font-bold font-mono">142.8 <span className="text-sm font-normal text-slate-400">ops/m</span></p>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 text-[10px] bg-accent/10 text-accent border border-accent/20 rounded font-mono">LIVE_STREAM</span>
          </div>
        </div>

        <div className="flex-1 flex items-end gap-1 px-2 pb-2">
          {/* Kinetic Visualizer Mock */}
          <div className="flex-1 bg-accent/20 rounded-t h-1/2"></div>
          <div className="flex-1 bg-accent/40 rounded-t h-3/4"></div>
          <div className="flex-1 bg-accent/10 rounded-t h-1/4"></div>
          <div className="flex-1 bg-primary/40 rounded-t h-5/6"></div>
          <div className="flex-1 bg-accent/60 rounded-t h-full"></div>
          <div className="flex-1 bg-accent/20 rounded-t h-1/3"></div>
          <div className="flex-1 bg-accent/40 rounded-t h-2/3"></div>
          <div className="flex-1 bg-accent/10 rounded-t h-1/2"></div>
          <div className="flex-1 bg-primary/40 rounded-t h-1/4"></div>
          <div className="flex-1 bg-accent/60 rounded-t h-3/4"></div>
          <div className="flex-1 bg-accent/20 rounded-t h-5/6"></div>
          <div className="flex-1 bg-accent/40 rounded-t h-full"></div>
          <div className="flex-1 bg-accent/10 rounded-t h-1/3"></div>
          <div className="flex-1 bg-primary/40 rounded-t h-2/3"></div>
          <div className="flex-1 bg-accent/60 rounded-t h-1/2"></div>
          <div className="flex-1 bg-accent/20 rounded-t h-1/4"></div>
          <div className="flex-1 bg-accent/40 rounded-t h-3/4"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent pointer-events-none"></div>
      </section>

      {/* Live Terminal Output (Middle Bottom) */}
      <section className="col-span-12 lg:col-span-9 row-span-4 glass-panel rounded-lg flex flex-col overflow-hidden border-t-2 border-t-accent/30">
        <div className="bg-primary/10 px-4 py-2 border-b border-primary/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="terminal" className="text-accent text-sm" />
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
          <div className="mb-2"><span className="text-accent">[14:22:15]</span> <span className="text-yellow-400">WARN:</span> Rate limit approaching for X-API v2 [88&#37; capacity]</div>
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

      {/* Recent Ingests Panel (Right) */}
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

      {/* Snapshot Stats (Bottom Left) */}
      <section className="col-span-12 lg:col-span-4 row-span-1 glass-panel rounded-lg p-4 flex items-center justify-around">
        <div className="text-center">
          <p className="text-[10px] font-mono text-slate-500 uppercase">Active Agents</p>
          <p className="text-xl font-bold font-mono text-accent">12</p>
        </div>
        <div className="w-px h-8 bg-primary/20"></div>
        <div className="text-center">
          <p className="text-[10px] font-mono text-slate-500 uppercase">Tokens / Sec</p>
          <p className="text-xl font-bold font-mono text-slate-100">854</p>
        </div>
        <div className="w-px h-8 bg-primary/20"></div>
        <div className="text-center">
          <p className="text-[10px] font-mono text-slate-500 uppercase">Health</p>
          <p className="text-xl font-bold font-mono text-green-400">98&#37;</p>
        </div>
      </section>

    </div>
  );
}