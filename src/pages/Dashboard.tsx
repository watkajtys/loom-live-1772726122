import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeMacro = searchParams.get('macro') || '';
  const activeScript = searchParams.get('script') || 'sync_github.py';

  return (
    <div className="flex-1 flex flex-col bg-obsidian text-slate-300 font-sans selection:bg-accent/30 selection:text-accent overflow-hidden relative">
      <div className="absolute inset-0 grid-bg pointer-events-none z-0"></div>
      
      {/* We are skipping the TopBar since the app's Layout already provides a TopBar. 
          However, the design shows a very specific header: ORCHESTRATOR NODE_CONTROL_V3.0. 
          To match the exact design, we'll embed the specific header inside our page. */}
      <header className="relative z-40 h-14 border-b border-white/10 bg-black/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-accent/10 border border-accent/40 flex items-center justify-center">
              <span className="material-symbols-outlined text-accent text-xl">hub</span>
            </div>
            <div className="leading-none">
              <h1 className="text-lg font-bold text-white tracking-tight uppercase">ORCHESTRATOR</h1>
              <span className="text-[9px] font-mono text-accent/60 tracking-[0.3em]">NODE_CONTROL_V3.0</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6 px-4 py-1.5 border border-white/10 bg-white/5">
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-slate-500">THREADS</span>
              <span className="text-[10px] font-mono text-terminal-cyan">14_ACTIVE</span>
            </div>
            <div className="flex flex-col border-l border-white/10 pl-4">
              <span className="text-[8px] font-mono text-slate-500">LATENCY</span>
              <span className="text-[10px] font-mono text-terminal-green">12MS</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative z-10">
        <aside className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-md flex flex-col shrink-0">
          <div className="p-4 border-b border-white/5">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">COMMAND_LIBRARY</span>
          </div>
          
          <nav className="flex-1 overflow-y-auto custom-scrollbar py-4">
            <div className="mb-6">
              <h3 className="px-4 text-[9px] font-mono text-slate-600 uppercase mb-2">Automation Macros</h3>
              <button 
                onClick={() => setSearchParams({ macro: 'auto_ingest' })}
                className={`w-full text-left sidebar-link ${activeMacro === 'auto_ingest' ? 'border-l-accent text-accent bg-accent/5' : ''}`}>
                <span className="material-symbols-outlined text-sm">bolt</span> Auto_Ingest_Repo
              </button>
              <button 
                onClick={() => setSearchParams({ macro: 'batch_vectorize' })}
                className={`w-full text-left sidebar-link ${activeMacro === 'batch_vectorize' ? 'border-l-accent text-accent bg-accent/5' : ''}`}>
                <span className="material-symbols-outlined text-sm">cyclone</span> Batch_Vectorize
              </button>
              <button 
                onClick={() => setSearchParams({ macro: 'audit_permissions' })}
                className={`w-full text-left sidebar-link ${activeMacro === 'audit_permissions' ? 'border-l-accent text-accent bg-accent/5' : ''}`}>
                <span className="material-symbols-outlined text-sm">security</span> Audit_Permissions
              </button>
            </div>
            
            <div className="mb-6">
              <h3 className="px-4 text-[9px] font-mono text-slate-600 uppercase mb-2">Agent Prompt Templates</h3>
              <button className="w-full text-left sidebar-link"><span className="material-symbols-outlined text-sm">psychology</span> Refactoring_Agent</button>
              <button className="w-full text-left sidebar-link"><span className="material-symbols-outlined text-sm">support_agent</span> DevRel_Response</button>
              <button className="w-full text-left sidebar-link"><span className="material-symbols-outlined text-sm">find_in_page</span> KB_Discovery</button>
            </div>
            
            <div className="mb-6">
              <h3 className="px-4 text-[9px] font-mono text-slate-600 uppercase mb-2">Script Library</h3>
              <button 
                onClick={() => setSearchParams({ script: 'sync_github.py' })}
                className={`w-full text-left sidebar-link ${activeScript === 'sync_github.py' ? 'border-l-accent text-accent bg-accent/5' : ''}`}>
                <span className="material-symbols-outlined text-sm">code</span> sync_github.py
              </button>
              <button 
                onClick={() => setSearchParams({ script: 'clean_vectors.sh' })}
                className={`w-full text-left sidebar-link ${activeScript === 'clean_vectors.sh' ? 'border-l-accent text-accent bg-accent/5' : ''}`}>
                <span className="material-symbols-outlined text-sm">code</span> clean_vectors.sh
              </button>
              <button 
                onClick={() => setSearchParams({ script: 'heartbeat_check.js' })}
                className={`w-full text-left sidebar-link ${activeScript === 'heartbeat_check.js' ? 'border-l-accent text-accent bg-accent/5' : ''}`}>
                <span className="material-symbols-outlined text-sm">code</span> heartbeat_check.js
              </button>
            </div>
          </nav>
          
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-terminal-green animate-pulse"></div>
              <span className="text-[10px] font-mono text-slate-400">REMOTE_ENGINE: CONNECTED</span>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col bg-black/20 overflow-hidden relative">
          <div className="h-12 border-b border-white/5 bg-black/40 flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-widest">Orchestration_Feed</span>
              <span className="text-[9px] font-mono text-slate-600">// LOG_LEVEL: VERBOSE</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-[10px] font-mono text-slate-500 hover:text-white uppercase">Export_Logs</button>
              <button className="text-[10px] font-mono text-slate-500 hover:text-white uppercase">Clear_Buffer</button>
            </div>
          </div>
          
          <section className="flex-1 overflow-y-auto custom-scrollbar">
            <article className="feed-item">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <span className="text-[10px] font-mono text-slate-600 mt-1 whitespace-nowrap">14:02:44.22</span>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                      <span className="size-1.5 bg-terminal-cyan"></span>
                      INITIATING_CROSS_REPO_SYNC
                    </h4>
                    <div className="flex gap-2 mt-2">
                      <span className="metadata-pill">AGENT: SYNC_MASTER</span>
                      <span className="metadata-pill">TARGET: GITHUB_ADVOLOOM</span>
                      <span className="metadata-pill">PRIORITY: HIGH</span>
                    </div>
                    <div className="agent-decision">
                      <span className="text-accent">DECISION_LOG:</span> Analyzed delta between main and dev branches. Detected 12 un-indexed commits. Spawning 3 worker nodes for parallel ingestion.
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-terminal-green uppercase">STATUS: PROCESSING</span>
              </div>
            </article>

            <article className="feed-item">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <span className="text-[10px] font-mono text-slate-600 mt-1 whitespace-nowrap">13:58:12.89</span>
                  <div>
                    <h4 className="text-sm font-bold text-white/80 uppercase flex items-center gap-2">
                      <span className="size-1.5 bg-terminal-green"></span>
                      KNOWLEDGE_SYNTHESIS_COMPLETE
                    </h4>
                    <div className="flex gap-2 mt-2">
                      <span className="metadata-pill">AGENT: DOC_SYNTH</span>
                      <span className="metadata-pill">TASK_ID: 99x-A2</span>
                    </div>
                    <div className="agent-decision">
                      <span className="text-terminal-green">DECISION_LOG:</span> Documentation for "Advanced Webhooks" summarized. 4 core concepts extracted. Vectors inserted into primary partition.
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-500 uppercase">STATUS: SUCCESS</span>
              </div>
            </article>

            <article className="feed-item bg-red-500/[0.02]">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <span className="text-[10px] font-mono text-red-900 mt-1 whitespace-nowrap">13:45:01.05</span>
                  <div>
                    <h4 className="text-sm font-bold text-red-500 uppercase flex items-center gap-2">
                      <span className="size-1.5 bg-red-500"></span>
                      API_RATE_LIMIT_WARNING
                    </h4>
                    <div className="flex gap-2 mt-2">
                      <span className="metadata-pill border-red-900/30 text-red-400">ERR_CODE: 429</span>
                      <span className="metadata-pill border-red-900/30 text-red-400">ORIGIN: DISCORD_BRIDGE</span>
                    </div>
                    <div className="agent-decision !border-red-500/10">
                      <span className="text-red-500">AUTONOMOUS_ACTION:</span> Backing off ingestion frequency by 40%. Scheduled retry in 300s. Monitoring pool health.
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-red-500 uppercase">STATUS: DEGRADED</span>
              </div>
            </article>

            <div className="p-12 text-center opacity-20 select-none">
              <span className="text-[10px] font-mono uppercase tracking-[1em]">Listening_to_Event_Bus...</span>
            </div>
          </section>

          <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
            <div className="w-full max-w-2xl px-4 pointer-events-auto">
              <div className="bg-black/90 border border-white/20 shadow-2xl backdrop-blur-2xl p-3 flex items-center gap-4 group">
                <span className="material-symbols-outlined text-terminal-green text-lg">terminal</span>
                <div className="flex-1 flex items-center">
                  <span className="text-terminal-green font-mono text-sm mr-2">$</span>
                  <input autoFocus className="bg-transparent border-none focus:ring-0 text-white font-mono text-sm w-full uppercase placeholder-slate-700 outline-none" placeholder="EXECUTE_MACRO_OR_SYSTEM_COMMAND..." type="text"/>
                  <span className="cursor-blink"></span>
                </div>
                <div className="flex items-center gap-1 opacity-40 group-focus-within:opacity-100 transition-opacity">
                  <span className="text-[9px] font-mono text-slate-500 px-1.5 py-0.5 border border-white/10 uppercase">Enter</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="h-8 border-t border-white/10 bg-black/90 px-6 flex items-center justify-between relative z-40 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-terminal-green"></span>
            <span className="text-[9px] font-mono text-terminal-green uppercase tracking-tighter">Core: Running</span>
          </div>
          <div className="text-[9px] font-mono text-slate-600 uppercase">Mem_Usage: 14.2GB / 64GB</div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-mono text-slate-600">ORCH_ID: 771-KILO-9</span>
          <span className="text-[9px] font-mono text-slate-600">© 2024_ADVOLOOM</span>
        </div>
      </footer>
    </div>
  );
};
