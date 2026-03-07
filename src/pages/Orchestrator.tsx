import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { OrchestratorLayout } from '../components/layout/OrchestratorLayout';
import { CommandInput } from '../components/CommandInput';
import { LOG_TYPOGRAPHY } from '../constants/theme';
import { LiveStreamMatrix } from '../components/dashboard/LiveStreamMatrix';

export const Orchestrator: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCommand = searchParams.get('command');
  
  const [input, setInput] = useState('');

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      setInput('');
    }
  };

  const [logs] = useState([
    { id: 1, type: 'critical', title: 'Kernel_Boot_Seq', time: '14:55:01', msg: 'Memory allocation verified. Peripheral scan complete. No errors detected.', color: 'accent' },
    { id: 2, type: 'info', title: 'Net_Handshake', time: '14:54:30', msg: 'Incoming connection from proxy node 04. SSL Handshake succeeded.', color: 'terminal-green' },
    { id: 3, type: 'warning', title: 'Disk_Warning', time: '14:52:12', msg: 'Cache partition exceeding 85% capacity. Automated purge scheduled.', color: 'red-500' }
  ]);
  const [agentLogs] = useState([
    { id: 1, type: 'decision', title: 'Decision_Engine', time: '14:55:04', msg: '"Redirecting workflow to node_B based on current latency spike (45ms > 20ms threshold)."', color: 'accent', pulse: true, isItalic: true },
    { id: 2, type: 'info', title: 'Repo_Observer', time: '14:54:55', msg: 'Identified code pattern: \'async_leak\' in module auth.py. Suggesting fix...', color: 'slate-400' },
    { id: 3, type: 'info', title: 'Context_Refiner', time: '14:54:20', msg: 'Refining vector search space. Pruned 452 irrelevant nodes from current context.', color: 'accent' }
  ]);

  return (
    <OrchestratorLayout
      variantTitle="ORCHESTRATOR"
      variantSubtitle="VARIANT_03_MATRIX_OVERLOAD"
      iconName="hub"
      statusText="CLUSTER_STATUS"
      statusPulse={true}
      statusValue="OVERLOAD_OPTIMIZED"
      uptimeText="UPTIME"
      uptimeValue="082:44:12"
      sidebarHeader={
        <>
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest">03_ENGINE_STATS</span>
          <span className="text-[8px] font-mono text-slate-500">NODES_ACTIVE: 04</span>
        </>
      }
      sidebarContent={
        <div className="p-4 overflow-y-auto custom-scrollbar space-y-4 relative z-20">
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
                  <span className="size-1 rounded-full bg-terminal-green heartbeat-rapid"></span>
                  WORKER_US_WEST
                </span>
                <span className="text-[9px] font-mono text-terminal-green">8ms</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-1">
                <span className="text-[10px] font-mono text-white flex items-center gap-2">
                  <span className="size-1 rounded-full bg-terminal-green heartbeat-indicator"></span>
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
      }
      footerContent={
        <>
          <div className="flex items-center gap-6">
            <div className="text-[8px] font-mono text-slate-600 uppercase tracking-tighter">I/O_STREAM: 1.2MB/S</div>
            <div className="text-[8px] font-mono text-slate-600 uppercase tracking-tighter">LATENCY: 12ms</div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[8px] font-mono text-slate-600 uppercase">Session: f0e1d2c3b4a5</span>
            <span className="text-[8px] font-mono text-slate-600">© 2024_ADVOLOOM_SYSTEMS</span>
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
                <button 
                  onClick={() => setSearchParams({ command: 'analyze' })}
                  className={`w-full text-left px-4 py-1.5 text-[10px] font-mono hover:bg-accent/10 transition-colors flex items-center justify-between ${activeCommand === 'analyze' ? 'text-accent bg-accent/10 border-l-2 border-accent' : 'text-slate-400'}`}
                >
                  <span>&gt; RUN_ANALYSIS_NODE</span>
                  {activeCommand === 'analyze' && <span className="w-1.5 h-1.5 bg-accent shadow-[0_0_5px_#00f2ff] animate-pulse"></span>}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setSearchParams({ command: 'purge' })}
                  className={`w-full text-left px-4 py-1.5 text-[10px] font-mono hover:bg-accent/10 transition-colors flex items-center justify-between ${activeCommand === 'purge' ? 'text-accent bg-accent/10 border-l-2 border-accent' : 'text-slate-400'}`}
                >
                  <span>&gt; PURGE_CACHE_BIN</span>
                  {activeCommand === 'purge' && <span className="w-1.5 h-1.5 bg-accent shadow-[0_0_5px_#00f2ff] animate-pulse"></span>}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setSearchParams({ command: 'sync' })}
                  className={`w-full text-left px-4 py-1.5 text-[10px] font-mono hover:bg-accent/10 transition-colors flex items-center justify-between ${activeCommand === 'sync' ? 'text-accent bg-accent/10 border-l-2 border-accent' : 'text-slate-400'}`}
                >
                  <span>&gt; FORCE_SYNC_DATA</span>
                  {activeCommand === 'sync' && <span className="w-1.5 h-1.5 bg-accent shadow-[0_0_5px_#00f2ff] animate-pulse"></span>}
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="px-3 text-[9px] font-mono text-slate-600 uppercase mb-1 flex items-center gap-2">
              <Icon name="network" className="text-xs" /> Sub_Systems
            </h3>
            <ul className="space-y-0.5">
              <li>
                <button className="w-full text-left px-4 py-1.5 text-[10px] font-mono text-slate-500 hover:text-slate-300 transition-colors">
                  [ ] ENG_ROUTING
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-1.5 text-[10px] font-mono text-slate-500 hover:text-slate-300 transition-colors">
                  [x] SEC_MONITOR
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <div className="h-8 border-b border-accent/20 bg-black/60 flex items-center px-4 shrink-0 justify-between relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="w-full h-full bg-[linear-gradient(rgba(0,242,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
          </div>
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest relative z-10">02_LIVE_STREAM_MATRIX</span>
          <div className="flex items-center gap-3 relative z-10">
            <span className="text-[8px] font-mono text-slate-500">FILTER: NONE</span>
            <span className="text-[8px] font-mono text-slate-500">SORT: DESC</span>
          </div>
        </div>
        
        <LiveStreamMatrix logs={logs} agentLogs={agentLogs} hasBackgroundEffects={true} />
        
        <CommandInput 
          value={input}
          onChange={(val) => setInput(val)}
          onKeyDown={handleCommand}
        />
      </main>
    </OrchestratorLayout>
  );
};
