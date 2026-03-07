import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { OrchestratorLayout } from '../components/layout/OrchestratorLayout';

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
    <OrchestratorLayout
      variantTitle="ORCHESTRATOR"
      variantSubtitle="VARIANT_02_SPLIT_FEED"
      iconName="git-commit-horizontal"
      statusText="ENCRYPTION"
      statusPulse={false}
      statusValue="ACTIVE_RSA_4096"
      uptimeText="UPTIME"
      uptimeValue="082:44:12"
      sidebarHeader={
        <>
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest">03_CLUSTER_MONITOR</span>
          <span className="text-[8px] font-mono text-slate-500">NODES_ACTIVE: 04</span>
        </>
      }
      sidebarContent={
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2 relative z-10">
          <div className="node-row px-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-white flex items-center gap-2">
                <span className="heartbeat-rapid"></span>
                WORKER_US_WEST
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono text-terminal-green bg-terminal-green/10 px-1 font-bold">HIGH_LOAD</span>
                <Icon name="chevron-up" className="text-[14px] text-slate-500" />
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="pid-row bg-accent/5">
                <span className="text-accent">PID: 8821</span>
                <span className="text-slate-500 italic">MODEL: GPT-4-T</span>
              </div>
              <div className="pid-row bg-accent/5">
                <span className="text-accent">PID: 9012</span>
                <span className="text-slate-500 italic">MODEL: LLAMA3_70B</span>
              </div>
            </div>
          </div>
          
          <div className="node-row px-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-white flex items-center gap-2">
                <span className="heartbeat-indicator"></span>
                WORKER_EU_CENT
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono text-slate-500">LAT:</span>
                <span className="text-[8px] font-mono text-terminal-green">42ms</span>
                <Icon name="chevron-down" className="text-[14px] text-slate-500" />
              </div>
            </div>
          </div>
          
          <div className="node-row px-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-white flex items-center gap-2">
                <span className="heartbeat-rapid"></span>
                WORKER_ASIA_S
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono text-terminal-green bg-terminal-green/10 px-1 font-bold">STRESS</span>
                <Icon name="chevron-down" className="text-[14px] text-slate-500" />
              </div>
            </div>
          </div>
          
          <div className="node-row px-1 opacity-40 grayscale">
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
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">System_Stability</span>
              <span className="text-[9px] font-mono text-terminal-green">94.2%</span>
            </div>
            <div className="h-1 bg-white/5 overflow-hidden">
              <div className="h-full bg-terminal-green w-[94.2%] shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
            </div>
          </div>
          <div className="p-3 border-t border-accent/20 bg-black space-y-2 relative z-10 mt-6">
            <button className="w-full py-2 border-2 border-terminal-green/30 bg-terminal-green/5 animate-neon-glow hover:bg-terminal-green/20 transition-all flex items-center justify-center gap-2 group">
              <Icon name="rotate-cw" className="text-[16px] text-terminal-green group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-[10px] font-mono text-terminal-green font-bold tracking-widest uppercase">REBOOT_IDLE_NODES</span>
            </button>
            <div className="flex justify-between items-center px-1">
              <span className="text-[8px] font-mono text-muted uppercase">Engine_ID:</span>
              <span className="text-[8px] font-mono text-slate-400 tracking-tighter">RE-771-MATRIX-OVERLOAD</span>
            </div>
          </div>
        </div>
      }
      footerContent={
        <>
          <div className="flex items-center gap-6">
            <div className="text-[8px] font-mono text-muted uppercase tracking-tighter">I/O_STREAM: 4.8MB/S</div>
            <div className="text-[8px] font-mono text-muted uppercase tracking-tighter">LATENCY: 4ms</div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[8px] font-mono text-muted uppercase">Buffer: 0x8892AF</span>
            <span className="text-[8px] font-mono text-muted">© 2024_ADVOLOOM_SYSTEMS</span>
          </div>
        </>
      }
    >
      
      <aside className="w-60 border border-accent/30 shadow-[0_0_10px_rgba(0,242,255,0.1)] bg-black/60 backdrop-blur-md flex flex-col shrink-0">
        <div className="p-3 border-b border-accent/20 bg-accent/5">
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest">01_COMMANDS</span>
        </div>
        <nav className="flex-1 overflow-y-auto custom-scrollbar py-2">
          <div className="mb-4">
            <h3 className="px-3 text-[9px] font-mono text-slate-600 uppercase mb-1 flex items-center gap-2">
              <Icon name="terminal" className="text-xs" /> Macro_Execution
            </h3>
            <ul className="space-y-0.5">
              <li>
                <button className="w-full text-left px-4 py-1.5 text-[10px] font-mono text-slate-400 hover:text-accent hover:bg-accent/10 transition-colors flex items-center justify-between group">
                  <span>&gt; REBUILD_INDICES</span>
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-1.5 text-[10px] font-mono text-slate-400 hover:text-accent hover:bg-accent/10 transition-colors flex items-center justify-between group">
                  <span>&gt; COMPRESS_LOGS</span>
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-1.5 text-[10px] font-mono text-accent bg-accent/10 border-l-2 border-accent transition-colors flex items-center justify-between">
                  <span>&gt; DRAIN_NODE_B</span>
                  <span className="w-1.5 h-1.5 bg-accent shadow-[0_0_5px_#00f2ff] animate-pulse"></span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col min-w-0">
        <div className="h-8 border-b border-accent/20 bg-black/60 flex items-center px-4 shrink-0 justify-between">
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest">02_LIVE_STREAM_MATRIX</span>
          <div className="flex items-center gap-3">
            <span className="text-[8px] font-mono text-slate-500">FILTER: NONE</span>
            <span className="text-[8px] font-mono text-slate-500">SORT: DESC</span>
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
    </OrchestratorLayout>
  );
};
