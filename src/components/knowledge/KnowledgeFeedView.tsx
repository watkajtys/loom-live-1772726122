import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const mockFeedData = [
  {
    id: 'security_compliance_audit_v4.md',
    title: 'security_compliance_audit_v4.md',
    source: 'GITHUB_REPO',
    path: '/docs/security/',
    statusText: 'VECTORIZING_84%',
    statusClass: 'text-accent',
    progress: 84,
    progressClass: 'bg-accent shadow-[0_0_10px_#00f2ff]',
    estTime: '4s',
    date: '2024-05-20 14:22:01.004',
    icon: 'description',
    iconClass: 'text-accent border-accent/20 bg-accent/5',
    actions: ['RE-INDEX', 'VIEW_SOURCE', 'TRUNCATE'],
    cardClass: 'group',
  },
  {
    id: 'api_v2_endpoint_mapping.json',
    title: 'api_v2_endpoint_mapping.json',
    source: 'INTERNAL_STORAGE',
    path: '/meta/schemas/',
    statusText: 'COMPLETE_100%',
    statusClass: 'text-terminal-green',
    progress: 100,
    progressClass: 'bg-terminal-green shadow-[0_0_8px_#00ff41]',
    date: '2024-05-20 13:45:12.882',
    icon: 'schema',
    iconClass: 'text-slate-400 border-white/10 bg-white/5',
    actions: ['RE-INDEX', 'VIEW_SOURCE'],
    cardClass: 'opacity-80 hover:opacity-100',
    titleClass: 'text-slate-300',
  },
  {
    id: 'community_feedback_stream.xlsx',
    title: 'community_feedback_stream.xlsx',
    source: 'CRM_WEBHOOK',
    error: 'INVALID_FORMAT',
    statusText: 'FAILED_0%',
    statusClass: 'text-red-500',
    progress: 0,
    progressBgClass: 'bg-red-900/20',
    date: '2024-05-20 12:10:55.001',
    icon: 'error',
    iconClass: 'text-red-500 border-red-500/20 bg-red-500/10',
    actions: [
      { label: 'RETRY_INGESTION', className: '!text-red-400 !border-red-900/50 hover:!bg-red-500/20' },
      { label: 'LOG_DETAILS' }
    ],
    cardClass: 'border-red-900/30 bg-red-950/5',
  },
  {
    id: 'sdk_ref_v1.2.md',
    title: 'sdk_ref_v1.2.md',
    queueStatus: 'WAITING_IN_QUEUE // POSITION: 01',
    statusText: 'PENDING',
    statusClass: 'text-slate-600',
    progress: 0,
    progressBgClass: 'opacity-20',
    date: 'PENDING_SYNC',
    icon: 'hourglass_empty',
    iconClass: 'text-slate-500 border-white/10 bg-white/5',
    actions: ['PRIORITIZE', 'REMOVE'],
    cardClass: 'opacity-50',
    titleClass: 'text-slate-500',
    dateClass: 'text-slate-700',
  }
];

export const KnowledgeFeedView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = mockFeedData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col relative bg-obsidian text-slate-300 font-sans selection:bg-accent/30 selection:text-accent overflow-hidden h-full">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTYwIDBMMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLCAyNDIsIDI1NSwgMC4wMikiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] pointer-events-none z-0"></div>
      
      <header className="relative z-30 h-14 border-b border-white/10 bg-black/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-accent/10 border border-accent/40 flex items-center justify-center">
              <span className="material-symbols-outlined text-accent text-lg">terminal</span>
            </div>
            <div className="leading-none">
              <h1 className="text-lg font-bold text-white tracking-tight uppercase">KB_FEED</h1>
              <span className="text-[9px] font-mono text-accent/60 tracking-[0.3em]">COMMAND_INTERFACE_V3</span>
            </div>
          </div>
          <div className="h-6 w-[1px] bg-white/10 hidden md:block"></div>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-slate-500 uppercase">Ingestion Stream</span>
              <span className="text-xs font-mono text-accent">ACTIVE_LISTENER</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-1.5 border border-white/10 bg-white/5 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            <span className="text-terminal-green">●</span>
            SYS_HEALTH: OPTIMAL
          </div>
          <Link to="/?view=graph" className="w-9 h-9 flex items-center justify-center border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white transition-all" title="Graph View">
            <span className="material-symbols-outlined text-xl">hub</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col overflow-hidden max-w-4xl mx-auto w-full">
        <div className="px-6 pt-12 pb-8 shrink-0">
          <div className="bg-black/80 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] focus-within:border-accent/50 transition-all duration-500 flex items-center p-4 gap-4">
            <span className="material-symbols-outlined text-accent/60">search</span>
            <input 
              autoFocus 
              className="flex-1 bg-transparent border-none focus:ring-0 text-white font-mono placeholder-slate-700 text-lg uppercase tracking-wider outline-none" 
              placeholder="SEARCH_INDEX_OR_EXECUTE_CMD..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 border border-white/20 text-[9px] font-mono text-slate-500">⌘</span>
              <span className="px-1.5 py-0.5 border border-white/20 text-[9px] font-mono text-slate-500">K</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-4">
              <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-accent"></span> Filter: ALL_EVENTS
              </span>
              <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-slate-700"></span> Sort: CHRONOLOGICAL
              </span>
            </div>
            <span className="text-[9px] font-mono text-accent/40">QUERY_LATENCY: 0.2ms</span>
          </div>
        </div>

        <section className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-accent/20 px-6 pb-12 space-y-4">
          {filteredData.map((item) => (
            <div key={item.id} className={`border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 p-4 relative overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-accent/20 hover:before:bg-accent hover:before:shadow-[0_0_8px_#00f2ff] ${item.cardClass || ''}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 border flex items-center justify-center ${item.iconClass}`}>
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold uppercase tracking-tight ${item.titleClass || 'text-white'}`}>{item.title}</h3>
                    <p className="text-[9px] font-mono text-slate-500 uppercase">
                      {item.queueStatus ? (
                        item.queueStatus
                      ) : (
                        `SOURCE: ${item.source} // ${item.error ? `ERROR: ${item.error}` : `PATH: ${item.path}`}`
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[9px] font-mono uppercase ${item.statusClass}`}>{item.statusText}</span>
                  {item.estTime && <span className="text-[8px] font-mono text-slate-600 uppercase tracking-tighter">EST_TIME: {item.estTime}</span>}
                </div>
              </div>
              
              <div className={`h-1 w-full bg-white/5 overflow-hidden mb-4 ${item.progressBgClass || ''}`}>
                <div className={`h-full ${item.progressClass || ''}`} style={{ width: `${item.progress}%` }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {item.actions.map((action, idx) => {
                    const label = typeof action === 'string' ? action : action.label;
                    const customClass = typeof action === 'string' ? '' : action.className;
                    return (
                      <button key={idx} className={`px-2 py-1 text-[8px] font-mono border border-white/10 text-slate-500 hover:text-accent hover:border-accent/40 bg-white/5 transition-all uppercase tracking-tighter ${customClass}`}>
                        {label}
                      </button>
                    )
                  })}
                </div>
                <div className={`text-[9px] font-mono ${item.dateClass || 'text-slate-500'}`}>{item.date}</div>
              </div>
            </div>
          ))}

          <div className="flex flex-col items-center py-8 gap-3">
            <div className="h-[40px] w-[1px] bg-gradient-to-b from-accent/40 to-transparent"></div>
            <button className="text-[10px] font-mono text-slate-500 hover:text-accent tracking-[0.2em] uppercase transition-colors">
                Fetch_History_Page_02
            </button>
          </div>
        </section>
      </main>

      <footer className="h-8 border-t border-white/10 bg-black/90 px-6 flex items-center justify-between relative z-30 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-terminal-green shadow-[0_0_6px_#00ff41]"></span>
            <span className="text-[9px] font-mono text-terminal-green uppercase tracking-tighter">Indexers: Operational</span>
          </div>
          <div className="text-[9px] font-mono text-slate-600 uppercase">Stream: 1,240 Events/hr</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-2 h-2 border border-white/20"></div>
            <div className="w-2 h-2 border border-accent/60 bg-accent/20"></div>
            <div className="w-2 h-2 border border-white/20"></div>
          </div>
          <span className="text-[9px] font-mono text-slate-600">v4.2.0-KB_FEED</span>
          <span className="text-[9px] font-mono text-slate-600">© ADVOLOOM_SYSTEMS_2024</span>
        </div>
      </footer>
    </div>
  );
};
