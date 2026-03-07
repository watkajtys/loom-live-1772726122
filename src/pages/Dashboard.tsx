import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useOrchestratorFeed } from '../hooks/useOrchestratorFeed';
import { useHealthCheck } from '../hooks/useHealthCheck';

export const Dashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeMacro = searchParams.get('macro');
  const activeScript = searchParams.get('script');
  
  const { feed, loading } = useOrchestratorFeed();
  const { isConnected } = useHealthCheck();

  return (
    <div className="flex flex-col h-full bg-obsidian text-slate-300 font-sans overflow-hidden">
      <header className="h-14 border-b border-white/10 bg-black flex items-center justify-between px-6 shrink-0 relative z-40">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center size-8 bg-white/5 rounded-sm border border-white/10">
            <span className="material-symbols-outlined text-white text-sm">hub</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white uppercase tracking-widest leading-none">ORCHESTRATOR</h1>
            <span className="text-[10px] font-mono text-accent uppercase">NODE_CONTROL_V3.0</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono text-slate-500 uppercase">System_Load</span>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-8 h-1 bg-white/10 overflow-hidden"><div className="h-full bg-accent w-[45%]"></div></div>
              <div className="w-8 h-1 bg-white/10 overflow-hidden"><div className="h-full bg-terminal-green w-[82%]"></div></div>
              <div className="w-8 h-1 bg-white/10 overflow-hidden"><div className="h-full bg-accent w-[21%]"></div></div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative z-10">
        <aside className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-md flex flex-col shrink-0">
          <div className="p-4 border-b border-white/5">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">COMMAND_LIBRARY</span>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
            <div className="mb-6">
              <h3 className="px-4 text-[9px] font-mono text-slate-600 uppercase mb-2">Execution Macros</h3>
              <button 
                onClick={() => setSearchParams({ macro: 'sync_vectors' })}
                className={`w-full text-left sidebar-link ${activeMacro === 'sync_vectors' ? 'border-l-accent text-accent bg-accent/5' : ''}`}>
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
              <div className={`size-2 rounded-full animate-pulse ${isConnected ? 'bg-terminal-green' : 'bg-red-500'}`}></div>
              <span className={`text-[10px] font-mono ${isConnected ? 'text-slate-400' : 'text-red-500'}`}>
                REMOTE_ENGINE: {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
              </span>
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
            {loading ? (
              <div className="p-12 text-center opacity-20 select-none">
                <span className="text-[10px] font-mono uppercase tracking-[1em]">Listening_to_Event_Bus...</span>
              </div>
            ) : (
              feed.map((item) => (
                <article key={item.id} className={`feed-item ${item.isError ? 'bg-red-500/[0.02]' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <span className={`text-[10px] font-mono mt-1 whitespace-nowrap ${item.isError ? 'text-red-900' : 'text-slate-600'}`}>
                        {new Date(item.timestamp).toLocaleTimeString(undefined, { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 2 })}
                      </span>
                      <div>
                        <h4 className={`text-sm font-bold uppercase flex items-center gap-2 ${item.isError ? 'text-red-500' : 'text-white'}`}>
                          <span className={`size-1.5 ${item.isError ? 'bg-red-500' : (item.statusColor.replace('text-', 'bg-'))}`}></span>
                          {item.title}
                        </h4>
                        <div className="flex gap-2 mt-2">
                          <span className={`metadata-pill ${item.isError ? 'border-red-900/30 text-red-400' : ''}`}>AGENT: {item.agent}</span>
                          {item.metadata.map((meta, idx) => (
                            <span key={idx} className={`metadata-pill ${meta.isError ? 'border-red-900/30 text-red-400' : ''}`}>
                              {meta.label}: {meta.value}
                            </span>
                          ))}
                        </div>
                        <div className={`agent-decision ${item.isError ? '!border-red-500/10' : ''}`}>
                          <span className={item.isError ? 'text-red-500' : 'text-accent'}>
                            {item.isError ? 'AUTONOMOUS_ACTION:' : 'DECISION_LOG:'}
                          </span> {item.decisionLog}
                        </div>
                      </div>
                    </div>
                    <span className={`text-[9px] font-mono uppercase ${item.statusColor}`}>STATUS: {item.status}</span>
                  </div>
                </article>
              ))
            )}

            {feed.length === 0 && !loading && (
              <div className="p-12 text-center opacity-20 select-none">
                <span className="text-[10px] font-mono uppercase tracking-[1em]">Listening_to_Event_Bus...</span>
              </div>
            )}
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
