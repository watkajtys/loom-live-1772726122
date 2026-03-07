import React, { useState } from 'react';
import { Icon } from '../components/Icon';

export const ExecutionLogs: React.FC = () => {
  const [logs, setLogs] = useState([
    { id: 1, type: 'critical', title: 'Kernel_Boot_Seq', time: '14:55:01', msg: 'Memory allocation verified. Peripheral scan complete. No errors detected.', color: 'accent' },
    { id: 2, type: 'info', title: 'Net_Handshake', time: '14:54:30', msg: 'Incoming connection from proxy node 04. SSL Handshake succeeded.', color: 'terminal-green' },
    { id: 3, type: 'warning', title: 'Disk_Warning', time: '14:52:12', msg: 'Cache partition exceeding 85% capacity. Automated purge scheduled.', color: 'red-500' }
  ]);
  const [agentLogs] = useState([
    { id: 1, type: 'decision', title: 'Decision_Engine', time: '14:55:04', msg: '"Redirecting workflow to node_B based on current latency spike (45ms > 20ms threshold)."', color: 'accent', pulse: true, isItalic: true },
    { id: 2, type: 'info', title: 'Repo_Observer', time: '14:54:55', msg: 'Identified code pattern: \'async_leak\' in module auth.py. Suggesting fix...', color: 'slate-400' },
    { id: 3, type: 'info', title: 'Context_Refiner', time: '14:54:20', msg: 'Refining vector search space. Pruned 452 irrelevant nodes from current context.', color: 'accent' }
  ]);
  
  const [input, setInput] = useState('');

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      setLogs([{ id: Date.now(), type: 'info', title: 'User_Command', time: new Date().toLocaleTimeString('en-US', {hour12:false}), msg: input, color: 'terminal-green' }, ...logs]);
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
              <Icon name="git-commit-horizontal" className="text-accent text-sm" />
            </div>
            <div className="leading-none">
              <h1 className="text-sm font-bold text-white tracking-widest uppercase">ORCHESTRATOR</h1>
              <span className="text-[8px] font-mono text-accent/60 tracking-[0.4em]">VARIANT_02_SPLIT_FEED</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-[10px] font-mono">
            <span className="text-slate-500">ENCRYPTION:</span>
            <span className="text-terminal-green">ACTIVE_RSA_4096</span>
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
              <a className="flex items-center gap-3 px-3 py-1.5 text-[10px] font-mono text-slate-400 hover:text-accent hover:bg-accent/10 border-l border-transparent hover:border-accent transition-all duration-150 uppercase tracking-tight" href="#">
                <Icon name="terminal" className="text-[14px]" /> Shell_Access
              </a>
              <a className="flex items-center gap-3 px-3 py-1.5 text-[10px] font-mono text-slate-400 hover:text-accent hover:bg-accent/10 border-l border-transparent hover:border-accent transition-all duration-150 uppercase tracking-tight" href="#">
                <Icon name="settings" className="text-[14px]" /> Port_Scan
              </a>
              <a className="flex items-center gap-3 px-3 py-1.5 text-[10px] font-mono text-slate-400 hover:text-accent hover:bg-accent/10 border-l border-transparent hover:border-accent transition-all duration-150 uppercase tracking-tight" href="#">
                <Icon name="clock" className="text-[14px]" /> Reset_Logs
              </a>
            </div>
            <div className="mb-4">
              <h3 className="px-3 text-[9px] font-mono text-slate-600 uppercase mb-1 flex items-center gap-2">
                <span className="w-1 h-1 bg-slate-600"></span> AGENT_MODS
              </h3>
              <a className="flex items-center gap-3 px-3 py-1.5 text-[10px] font-mono text-slate-400 hover:text-accent hover:bg-accent/10 border-l border-transparent hover:border-accent transition-all duration-150 uppercase tracking-tight" href="#">
                <Icon name="bot" className="text-[14px]" /> GPT4_Turbo_V3
              </a>
              <a className="flex items-center gap-3 px-3 py-1.5 text-[10px] font-mono text-slate-400 hover:text-accent hover:bg-accent/10 border-l border-transparent hover:border-accent transition-all duration-150 uppercase tracking-tight" href="#">
                <Icon name="cpu" className="text-[14px]" /> Local_Llama_8B
              </a>
            </div>
          </nav>
          <div className="p-3 border-t border-accent/20 text-[9px] font-mono">
            <div className="text-slate-500 uppercase">Input_Mode:</div>
            <div className="text-accent">SPLIT_SYNC_ENABLED</div>
          </div>
        </aside>
        
        <main className="flex-1 flex flex-col overflow-hidden gap-2">
          <div className="h-10 border border-accent/30 shadow-[0_0_10px_rgba(0,242,255,0.1)] bg-black/80 flex items-center justify-between px-5 shrink-0 border-accent/20">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">02_LIVE_STREAM_MATRIX</span>
              <div className="flex items-center gap-2">
                <span className="size-1.5 bg-accent shadow-[0_0_8px_rgba(0,242,255,0.8)] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                <span className="text-[9px] font-mono text-accent animate-pulse">STREAMING</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-1 border border-red-500/40 bg-red-500/10 text-red-500 text-[9px] font-mono hover:bg-red-500/20 transition-colors uppercase">
                <Icon name="pause" className="text-[12px]" /> PAUSE_STREAM
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
                {logs.map((log) => (
                  <div key={log.id} className={`border border-accent/10 bg-black/40 p-3 mb-2 hover:border-accent/30 transition-all duration-200 relative overflow-hidden ${log.color === 'red-500' ? 'border-red-500/20' : ''}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-[9px] font-mono font-bold uppercase ${log.color === 'accent' ? 'text-accent' : log.color === 'terminal-green' ? 'text-terminal-green' : 'text-red-500'}`}>
                        {log.title}
                      </span>
                      <span className="text-[8px] font-mono text-muted">{log.time}</span>
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 leading-tight">{log.msg}</p>
                    {log.id === 1 && (
                      <div className="mt-2 flex gap-1">
                        <span className="px-1 py-0.5 border border-accent/20 bg-accent/5 text-[8px] font-mono text-accent uppercase">PID: 1022</span>
                        <span className="px-1 py-0.5 border border-accent/20 bg-accent/5 text-[8px] font-mono text-accent uppercase">CPU: 0.1%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
            
            <section className="flex-1 border border-accent/30 shadow-[0_0_10px_rgba(0,242,255,0.1)] bg-black/40 flex flex-col overflow-hidden">
              <div className="h-8 border-b border-accent/20 bg-accent/5 flex items-center px-3 shrink-0 justify-between">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">AGENT_LOGS</span>
                <span className="text-[8px] font-mono text-slate-600">A_PRIORITY: HIGH</span>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
                {agentLogs.map((log) => (
                  <div key={log.id} className="border border-accent/10 bg-black/40 p-3 mb-2 hover:border-accent/30 transition-all duration-200 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-[9px] font-mono font-bold uppercase flex items-center gap-1 ${log.color === 'accent' ? 'text-accent' : log.color === 'slate-400' ? 'text-slate-400' : ''}`}>
                        {log.pulse && <span className="size-1.5 bg-accent shadow-[0_0_8px_rgba(0,242,255,0.8)] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>}
                        {log.title}
                      </span>
                      <span className="text-[8px] font-mono text-muted">{log.time}</span>
                    </div>
                    {log.isItalic ? (
                      <div className="p-2 bg-accent/5 border-l border-accent/30 mt-1">
                        <p className="text-[10px] font-mono text-slate-300 italic">{log.msg}</p>
                      </div>
                    ) : (
                      <p className="text-[10px] font-mono text-slate-400 leading-tight">{log.msg}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          <div className="p-2 bg-black border border-accent/30 shadow-[0_0_10px_rgba(0,242,255,0.1)] border-accent/20">
            <div className="flex items-center gap-3 bg-accent/5 border border-accent/20 px-3 py-1.5">
              <span className="text-terminal-green font-mono text-xs font-bold">$</span>
              <input 
                autoFocus 
                className="bg-transparent border-none focus:ring-0 text-white font-mono text-[11px] w-full uppercase placeholder-placeholder outline-none" 
                placeholder="SEND_COMMAND_TO_ACTIVE_FEED..." 
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleCommand}
              />
              <div className="w-1.5 h-3.5 bg-terminal-green animate-[pulse_1s_infinite]"></div>
            </div>
          </div>
        </main>
        
        <aside className="w-72 border border-accent/30 shadow-[0_0_10px_rgba(0,242,255,0.1)] bg-black/60 backdrop-blur-md flex flex-col shrink-0">
          <div className="p-3 border-b border-accent/20 bg-accent/5">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">03_ENGINE_STATS</span>
          </div>
          <div className="p-4 overflow-y-auto custom-scrollbar space-y-4">
            <div className="border border-accent/20 bg-black/40 p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-mono text-slate-500 uppercase">Sync_Status</span>
                <span className="text-[9px] font-mono text-terminal-green">98.2%_SYNC</span>
              </div>
              <div className="h-1 bg-white/5 overflow-hidden">
                <div className="h-full bg-accent w-[98%] shadow-[0_0_8px_rgba(0,242,255,0.5)]"></div>
              </div>
            </div>
            <div className="border border-accent/20 bg-black/40 p-3">
              <span className="text-[9px] font-mono text-slate-500 block mb-2 uppercase">Thread_Distribution</span>
              <div className="grid grid-cols-4 gap-1">
                <div className="h-8 bg-accent/40 border border-accent/30 flex items-center justify-center font-mono text-[10px] text-white">42</div>
                <div className="h-8 bg-accent/20 border border-accent/30 flex items-center justify-center font-mono text-[10px] text-slate-400">12</div>
                <div className="h-8 bg-accent/10 border border-accent/30 flex items-center justify-center font-mono text-[10px] text-slate-500">04</div>
                <div className="h-8 bg-accent/5 border border-accent/30 flex items-center justify-center font-mono text-[10px] text-slate-600">--</div>
              </div>
              <div className="flex justify-between mt-2 text-[8px] font-mono text-slate-500">
                <span>L1</span><span>L2</span><span>L3</span><span>WAIT</span>
              </div>
            </div>
            <div className="border border-accent/20 bg-black/40 p-3">
              <span className="text-[9px] font-mono text-slate-500 block mb-3 uppercase">Active_Worker_Nodes</span>
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-white/5 pb-1">
                  <span className="text-[10px] font-mono text-white flex items-center gap-2">
                    <span className="size-1 rounded-full bg-terminal-green"></span>
                    WORKER_US_WEST
                  </span>
                  <span className="text-[9px] font-mono text-terminal-green">8ms</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-1">
                  <span className="text-[10px] font-mono text-white flex items-center gap-2">
                    <span className="size-1 rounded-full bg-terminal-green"></span>
                    WORKER_EU_CENT
                  </span>
                  <span className="text-[9px] font-mono text-terminal-green">42ms</span>
                </div>
                <div className="flex items-center justify-between opacity-40">
                  <span className="text-[10px] font-mono text-white flex items-center gap-2">
                    <span className="size-1 rounded-full bg-red-500"></span>
                    WORKER_ASIA_S
                  </span>
                  <span className="text-[9px] font-mono text-red-500">OFFLINE</span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-white/5 space-y-3">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-mono text-slate-600 uppercase">Remote_Engine_ID</span>
                <span className="text-[9px] font-mono text-slate-400 truncate">RE-771-KILO-ORCH-9</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-terminal-green animate-pulse"></span>
                <span className="text-[9px] font-mono text-terminal-green uppercase tracking-tighter">DATA_STREAM_ACTIVE</span>
              </div>
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
