import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { OrchestratorLayout } from '../components/layout/OrchestratorLayout';
import { CommandInput } from '../components/CommandInput';
import { LOG_TYPOGRAPHY } from '../constants/theme';
import { LiveStreamMatrix } from '../components/dashboard/LiveStreamMatrix';

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
  const [isRebooting, setIsRebooting] = useState(false);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      setLogs(prev => [{ id: Date.now(), type: 'info', title: 'User_Command', time: new Date().toLocaleTimeString('en-US', {hour12:false}), msg: input, color: 'terminal-green' }, ...prev]);
      setInput('');
    }
  };

  const handleRebootNodes = () => {
    if (isRebooting) return;
    setIsRebooting(true);
    setLogs(prev => [{ id: Date.now(), type: 'info', title: 'Macro_Execution', time: new Date().toLocaleTimeString('en-US', {hour12:false}), msg: 'Initiating graceful reboot for idle nodes.', color: 'terminal-green' }, ...prev]);
    
    setTimeout(() => {
      setIsRebooting(false);
      setLogs(prev => [{ id: Date.now(), type: 'success', title: 'System_Event', time: new Date().toLocaleTimeString('en-US', {hour12:false}), msg: 'Reboot sequence complete. All idle nodes back online.', color: 'terminal-green' }, ...prev]);
    }, 2000);
  };

  const handleRebootKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRebootNodes();
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
            <button 
              onClick={handleRebootNodes}
              onKeyDown={handleRebootKeyDown}
              tabIndex={0}
              aria-busy={isRebooting}
              disabled={isRebooting}
              className={`w-full py-2 border-2 transition-all flex items-center justify-center gap-2 group focus:outline-none focus:ring-2 focus:ring-terminal-green focus:ring-offset-1 focus:ring-offset-black ${
                isRebooting 
                  ? 'border-terminal-green/50 bg-terminal-green/20 cursor-wait' 
                  : 'border-terminal-green bg-terminal-green hover:bg-terminal-green/90 animate-neon-glow'
              }`}
            >
              <Icon 
                name="rotate-cw" 
                className={`text-[16px] ${isRebooting ? 'text-terminal-green animate-spin' : 'text-obsidian group-hover:rotate-180 transition-transform duration-500'}`} 
              />
              <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${isRebooting ? 'text-terminal-green' : 'text-obsidian'}`}>
                {isRebooting ? '[ REBOOTING_NODES... ]' : '[ REBOOT_IDLE_NODES ]'}
              </span>
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
        
        <LiveStreamMatrix logs={logs} agentLogs={agentLogs} />
        
        <CommandInput 
          value={input}
          onChange={(val) => setInput(val)}
          onKeyDown={handleCommand}
        />
      </main>
    </OrchestratorLayout>
  );
};
