import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '../components/Icon';

export const Orchestrator: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCommand = searchParams.get('command');
  
  const [input, setInput] = useState('');

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      setInput('');
    }
  };

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-obsidian text-slate-300 font-display selection:bg-accent/30 selection:text-accent">
      <div className="absolute inset-0 grid-bg pointer-events-none z-0"></div>
      
      <header className="relative z-40 h-12 border-b border-accent/30 bg-black flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border border-accent flex items-center justify-center">
              <Icon name="hub" className="text-accent text-sm" />
            </div>
            <div className="leading-none">
              <h1 className="text-sm font-bold text-white tracking-widest uppercase">ORCHESTRATOR</h1>
              <span className="text-[8px] font-mono text-accent/60 tracking-[0.4em]">VARIANT_02_CLUSTER_MONITOR</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-[10px] font-mono">
            <span className="text-slate-500">CLUSTER_STATUS:</span>
            <span className="text-terminal-green">NODES_BALANCED</span>
            <span className="text-slate-500 ml-2">UPTIME:</span>
            <span className="text-accent">082:44:12</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative z-10 p-2 gap-2">
        <aside className="w-60 border border-accent/30 shadow-[0_0_10px_rgba(0,242,255,0.1)] bg-black/60 backdrop-blur-md flex flex-col shrink-0">
          <div className="p-3 border-b border-accent/20 bg-accent/5">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">01_COMMANDS</span>
          </div>
          <nav className="flex-1 overflow-y-auto custom-scrollbar py-2">
            <div className="mb-4">
              <h3 className="px-3 text-[9px] font-mono text-slate-600 uppercase mb-1 flex items-center gap-2">
                <span className="w-1 h-1 bg-slate-600"></span> CORE_OPS
              </h3>
              <button 
                onClick={() => setSearchParams({ command: 'shell_access' })}
                className={`w-full text-left flex items-center gap-3 px-3 py-1.5 text-[10px] font-mono hover:text-accent hover:bg-accent/10 border-l border-transparent hover:border-accent transition-all duration-150 uppercase tracking-tight ${activeCommand === 'shell_access' ? 'border-accent text-accent bg-accent/10' : 'text-slate-400'}`}>
                <Icon name="terminal" className="text-[14px]" /> Shell_Access
              </button>
              <button 
                onClick={() => setSearchParams({ command: 'port_scan' })}
                className={`w-full text-left flex items-center gap-3 px-3 py-1.5 text-[10px] font-mono hover:text-accent hover:bg-accent/10 border-l border-transparent hover:border-accent transition-all duration-150 uppercase tracking-tight ${activeCommand === 'port_scan' ? 'border-accent text-accent bg-accent/10' : 'text-slate-400'}`}>
                <Icon name="network" className="text-[14px]" /> Port_Scan
              </button>
              <button 
                onClick={() => setSearchParams({ command: 'reset_logs' })}
                className={`w-full text-left flex items-center gap-3 px-3 py-1.5 text-[10px] font-mono hover:text-accent hover:bg-accent/10 border-l border-transparent hover:border-accent transition-all duration-150 uppercase tracking-tight ${activeCommand === 'reset_logs' ? 'border-accent text-accent bg-accent/10' : 'text-slate-400'}`}>
                <Icon name="history" className="text-[14px]" /> Reset_Logs
              </button>
            </div>
            <div className="mb-4">
              <h3 className="px-3 text-[9px] font-mono text-slate-600 uppercase mb-1 flex items-center gap-2">
                <span className="w-1 h-1 bg-slate-600"></span> AGENT_MODS
              </h3>
              <button 
                onClick={() => setSearchParams({ command: 'gpt4_turbo' })}
                className={`w-full text-left flex items-center gap-3 px-3 py-1.5 text-[10px] font-mono hover:text-accent hover:bg-accent/10 border-l border-transparent hover:border-accent transition-all duration-150 uppercase tracking-tight ${activeCommand === 'gpt4_turbo' ? 'border-accent text-accent bg-accent/10' : 'text-slate-400'}`}>
                <Icon name="bot" className="text-[14px]" /> GPT4_Turbo_V3
              </button>
              <button 
                onClick={() => setSearchParams({ command: 'local_llama' })}
                className={`w-full text-left flex items-center gap-3 px-3 py-1.5 text-[10px] font-mono hover:text-accent hover:bg-accent/10 border-l border-transparent hover:border-accent transition-all duration-150 uppercase tracking-tight ${activeCommand === 'local_llama' ? 'border-accent text-accent bg-accent/10' : 'text-slate-400'}`}>
                <Icon name="cpu" className="text-[14px]" /> Local_Llama_8B
              </button>
            </div>
          </nav>
          <div className="p-3 border-t border-accent/20 text-[9px] font-mono">
            <div className="text-slate-500 uppercase">Input_Mode:</div>
            <div className="text-accent">CLUSTER_SYNC_ENABLED</div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden gap-2">
          <div className="h-10 border border-accent/30 shadow-[0_0_10px_rgba(0,242,255,0.1)] bg-black/80 flex items-center justify-between px-5 shrink-0">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">02_LIVE_STREAM_MATRIX</span>
              <div className="flex items-center gap-2">
                <span className="size-1.5 bg-accent shadow-[0_0_8px_rgba(0,242,255,0.8)] animate-[pulse-ring_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                <span className="text-[9px] font-mono text-accent">STREAMING</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-1 border border-accent/40 bg-accent/10 text-accent text-[9px] font-mono hover:bg-accent/20 transition-colors uppercase">
                <Icon name="pause-circle" className="text-[12px]" /> PAUSE_STREAM
              </button>
              <button className="text-[9px] font-mono text-slate-500 hover:text-white uppercase">[FILTER]</button>
            </div>
          </div>

          <div className="flex-1 flex gap-2 overflow-hidden">
            <section className="flex-1 border border-accent/30 shadow-[0_0_10px_rgba(0,242,255,0.1)] bg-black/40 flex flex-col overflow-hidden">
              <div className="h-8 border-b border-accent/20 bg-accent/5 flex items-center px-3 shrink-0 justify-between">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">SYSTEM_LOGS</span>
                <span className="text-[8px] font-mono text-slate-600">S_PRIORITY: CRITICAL</span>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
                <div className="border border-accent/10 bg-black/40 p-3 mb-2 hover:border-accent/30 transition-all duration-200 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[9px] font-mono text-accent font-bold uppercase">Kernel_Boot_Seq</span>
                    <span className="text-[8px] font-mono text-slate-600">14:55:01</span>
                  </div>
                  <p className="text-[10px] font-mono text-slate-400 leading-tight">Memory allocation verified. Peripheral scan complete. No errors detected.</p>
                  <div className="mt-2 flex gap-1">
                    <span className="px-1 py-0.5 border border-accent/20 bg-accent/5 text-[8px] font-mono text-accent uppercase">PID: 1022</span>
                    <span className="px-1 py-0.5 border border-accent/20 bg-accent/5 text-[8px] font-mono text-accent uppercase">CPU: 0.1%</span>
                  </div>
                </div>
                <div className="border border-accent/10 bg-black/40 p-3 mb-2 hover:border-accent/30 transition-all duration-200 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[9px] font-mono text-terminal-green font-bold uppercase">Net_Handshake</span>
                    <span className="text-[8px] font-mono text-slate-600">14:54:30</span>
                  </div>
                  <p className="text-[10px] font-mono text-slate-400 leading-tight">Incoming connection from proxy node 04. SSL Handshake succeeded.</p>
                </div>
              </div>
            </section>
            
            <section className="flex-1 border border-accent/30 shadow-[0_0_10px_rgba(0,242,255,0.1)] bg-black/40 flex flex-col overflow-hidden">
              <div className="h-8 border-b border-accent/20 bg-accent/5 flex items-center px-3 shrink-0 justify-between">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">AGENT_LOGS</span>
                <span className="text-[8px] font-mono text-slate-600">A_PRIORITY: HIGH</span>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
                <div className="border border-accent/10 bg-black/40 p-3 mb-2 hover:border-accent/30 transition-all duration-200 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[9px] font-mono text-accent font-bold uppercase flex items-center gap-1">
                      <span className="size-1 bg-accent shadow-[0_0_8px_rgba(0,242,255,0.8)] animate-[pulse-ring_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                      Decision_Engine
                    </span>
                    <span className="text-[8px] font-mono text-slate-600">14:55:04</span>
                  </div>
                  <div className="p-2 bg-accent/5 border-l border-accent/30 mt-1">
                    <p className="text-[10px] font-mono text-slate-300 italic">"Redirecting workflow to node_B based on current latency spike (45ms &gt; 20ms threshold)."</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          <div className="p-2 bg-black border border-accent/30 shadow-[0_0_10px_rgba(0,242,255,0.1)] border-accent/20">
            <div className="flex items-center gap-3 bg-accent/5 border border-accent/20 px-3 py-1.5">
              <span className="text-terminal-green font-mono text-xs font-bold">$</span>
              <input 
                autoFocus 
                className="bg-transparent border-none focus:ring-0 text-white font-mono text-[11px] w-full uppercase placeholder-slate-700 outline-none" 
                placeholder="SEND_COMMAND_TO_ACTIVE_FEED..." 
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleCommand}
              />
              <div className="w-1.5 h-3.5 bg-terminal-green animate-pulse"></div>
            </div>
          </div>
        </main>

        <aside className="w-80 border border-accent/30 shadow-[0_0_10px_rgba(0,242,255,0.1)] bg-black/60 backdrop-blur-md flex flex-col shrink-0">
          <div className="p-3 border-b border-accent/20 bg-accent/5 flex justify-between items-center">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">03_CLUSTER_MONITOR</span>
            <span className="text-[8px] font-mono text-slate-500">NODES_ACTIVE: 04</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
            <div className="border-b border-white/5 py-2 cursor-pointer hover:bg-accent/5 transition-colors px-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-white flex items-center gap-2">
                  <span className="size-1.5 bg-terminal-green shadow-[0_0_8px_rgba(0,255,65,0.8)] animate-[pulse-ring_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                  WORKER_US_WEST
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-mono text-slate-500">LAT:</span>
                  <span className="text-[9px] font-mono text-terminal-green">8ms</span>
                  <Icon name="chevron-up" className="text-[14px] text-slate-500" />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center justify-between py-1 px-4 text-[9px] font-mono border-l border-accent/20 ml-2 mt-1 bg-accent/5">
                  <span className="text-accent">PID: 8821</span>
                  <span className="text-slate-500 italic">MODEL: GPT-4-T</span>
                </div>
                <div className="flex items-center justify-between py-1 px-4 text-[9px] font-mono border-l border-accent/20 ml-2 mt-1 bg-accent/5">
                  <span className="text-accent">PID: 9012</span>
                  <span className="text-slate-500 italic">MODEL: LLAMA3_70B</span>
                </div>
              </div>
            </div>
            
            <div className="border-b border-white/5 py-2 cursor-pointer hover:bg-accent/5 transition-colors px-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-white flex items-center gap-2">
                  <span className="size-1.5 bg-terminal-green shadow-[0_0_8px_rgba(0,255,65,0.8)] animate-[pulse-ring_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                  WORKER_EU_CENT
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-mono text-slate-500">LAT:</span>
                  <span className="text-[9px] font-mono text-terminal-green">42ms</span>
                  <Icon name="chevron-down" className="text-[14px] text-slate-500" />
                </div>
              </div>
            </div>
            
            <div className="border-b border-white/5 py-2 cursor-pointer hover:bg-accent/5 transition-colors px-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-white flex items-center gap-2">
                  <span className="size-1.5 bg-terminal-green shadow-[0_0_8px_rgba(0,255,65,0.8)] animate-[pulse-ring_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                  WORKER_ASIA_S
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-mono text-slate-500">LAT:</span>
                  <span className="text-[9px] font-mono text-terminal-green">105ms</span>
                  <Icon name="chevron-down" className="text-[14px] text-slate-500" />
                </div>
              </div>
            </div>
            
            <div className="border-b border-white/5 py-2 cursor-pointer hover:bg-accent/5 transition-colors px-1 opacity-50 grayscale">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
                  <span className="size-1.5 bg-slate-700"></span>
                  WORKER_BR_NORTH
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-slate-600">IDLE</span>
                  <Icon name="chevron-down" className="text-[14px] text-slate-700" />
                </div>
              </div>
            </div>
            
            <div className="mt-6 border border-accent/10 p-3 bg-black/40">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">Cluster_Load</span>
                <span className="text-[9px] font-mono text-accent">68.4%</span>
              </div>
              <div className="h-1 bg-white/5 overflow-hidden">
                <div className="h-full bg-accent w-[68%] shadow-[0_0_8px_rgba(0,242,255,0.5)]"></div>
              </div>
            </div>
          </div>
          
          <div className="p-3 border-t border-accent/20 bg-accent/5 space-y-2">
            <button className="w-full py-2 border border-accent/30 bg-black hover:bg-accent/10 transition-colors flex items-center justify-center gap-2 group">
              <Icon name="rotate-cw" className="text-[16px] text-accent group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-[10px] font-mono text-accent font-bold tracking-widest uppercase">REBOOT_IDLE_NODES</span>
            </button>
            <div className="flex justify-between items-center px-1">
              <span className="text-[8px] font-mono text-slate-600 uppercase">Engine_ID:</span>
              <span className="text-[8px] font-mono text-slate-400 tracking-tighter">RE-771-KILO-ORCH-9</span>
            </div>
          </div>
        </aside>
      </div>
      
      <footer className="h-6 border-t border-accent/30 bg-black px-6 flex items-center justify-between relative z-40 shrink-0">
        <div className="flex items-center gap-6">
          <div className="text-[8px] font-mono text-slate-600 uppercase tracking-tighter">I/O_STREAM: 1.2MB/S</div>
          <div className="text-[8px] font-mono text-slate-600 uppercase tracking-tighter">LATENCY: 12ms</div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[8px] font-mono text-slate-600 uppercase">Session: f0e1d2c3b4a5</span>
          <span className="text-[8px] font-mono text-slate-600">© 2024_ADVOLOOM_SYSTEMS</span>
        </div>
      </footer>
    </div>
  );
};
