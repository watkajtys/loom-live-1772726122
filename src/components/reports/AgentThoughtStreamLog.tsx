import React from 'react';
import { AX_REPORTS_CONFIG } from '../../constants/config';
import { Icon } from '../Icon';

export const AgentThoughtStreamLog = () => {
  return (
    <section className="w-[40%] flex flex-col terminal-window border-accent/20">
      <div className="terminal-header">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-accent text-sm">terminal</span>
          <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Agent_Thought_Stream.log</span>
        </div>
        <span className="text-[9px] font-mono text-accent/50">PID: {AX_REPORTS_CONFIG.PID}</span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-0.5 bg-black/40">
        <div className="log-line text-slate-500"><span className="text-accent/40">[14:02:01]</span> INIT_CORE: Loading neural weights...</div>
        <div className="log-line text-slate-500"><span className="text-accent/40">[14:02:02]</span> QUERY_RECEIVE: User requested "API latency spikes"</div>
        <div className="log-line text-white/90"><span className="text-accent/40">[14:02:02]</span> <span className="text-accent">THOUGHT:</span> Accessing historical performance logs for past 24h</div>
        <div className="log-line text-slate-500"><span className="text-accent/40">[14:02:03]</span> FETCH: logs.performance.api_v2 - status 200</div>
        <div className="log-line text-white/90"><span className="text-accent/40">[14:02:03]</span> <span className="text-accent">THOUGHT:</span> Pattern detected in region us-east-1. Correlating with deployment #452</div>
        <div className="log-line text-yellow-400/80"><span className="text-accent/40">[14:02:04]</span> ANOMALY: Cluster node 0x2A reporting packet loss</div>
        <div className="log-line text-white/90"><span className="text-accent/40">[14:02:05]</span> <span className="text-accent">THOUGHT:</span> High probability cause: Misconfigured ingress rule on v1.4.2</div>
        <div className="log-line text-slate-500"><span className="text-accent/40">[14:02:05]</span> ACTION: Drafted technical resolution for DevOps team</div>
        <div className="log-line text-green-400/80"><span className="text-accent/40">[14:02:06]</span> RESPONSE_READY: Sent to channel #support-leads</div>
        <div className="log-line text-slate-500 mt-4"><span className="text-accent/40">[14:02:10]</span> IDLE: Awaiting next trigger...</div>
        <div className="log-line text-slate-500"><span className="text-accent/40">[14:02:15]</span> QUERY_RECEIVE: Webhook trigger from Slack #dev-rel</div>
        <div className="log-line text-white/90"><span className="text-accent/40">[14:02:16]</span> <span className="text-accent">THOUGHT:</span> Parsing natural language sentiment for SDK feedback</div>
        <div className="log-line text-white/90"><span className="text-accent/40">[14:02:17]</span> <span className="text-accent">THOUGHT:</span> Sentiment 0.82 POSITIVE. Identifying core feature mentions...</div>
        <div className="log-line text-slate-500"><span className="text-accent/40">[14:02:18]</span> EXTRACT: "Auth-Flow", "Simplified-UI"</div>
        <div className="log-line text-slate-500"><span className="text-accent/40">[14:02:19]</span> UPDATE_KNOWLEDGE_BASE: Interaction logged to vector database</div>
      </div>

      <div className="p-2 border-t border-white/10 bg-black/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          <span className="text-[9px] font-mono text-accent">STREAM_LIVE</span>
        </div>
        <div className="text-[9px] font-mono text-slate-500">BUFFER: {AX_REPORTS_CONFIG.BUFFER}</div>
      </div>
    </section>
  );
};
