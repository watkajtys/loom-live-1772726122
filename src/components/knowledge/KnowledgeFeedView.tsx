import React, { useState } from 'react';
import { KnowledgeLayout } from './KnowledgeLayout';
import { mockFeedData } from '../../constants/mockKnowledgeData';

export const KnowledgeFeedView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = mockFeedData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <KnowledgeLayout
      title="KB_FEED"
      subtitle="COMMAND_INTERFACE_V3"
      icon="terminal"
      headerStats={
        <div className="flex flex-col">
          <span className="text-[8px] font-mono text-slate-500 uppercase">Ingestion Stream</span>
          <span className="text-xs font-mono text-accent">ACTIVE_LISTENER</span>
        </div>
      }
      headerStatus={null}
      footerStats={
        <div className="text-[9px] font-mono text-slate-600 uppercase">Stream: 1,240 Events/hr</div>
      }
      footerStatus="Indexers: Operational"
      footerVersion="v4.2.0-KB_FEED"
      viewLink="/?view=graph"
      viewIcon="hub"
      viewTitle="Graph View"
    >
      <main className="relative z-10 flex-1 flex flex-col overflow-hidden max-w-4xl mx-auto w-full">
        <div className="px-6 pt-12 pb-8 shrink-0">
          <div className="bg-white/5 shadow-[0_0_40px_rgba(0,0,0,0.8)] focus-within:bg-white/10 transition-all duration-500 flex items-center p-4 gap-4">
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
              <span className="px-1.5 py-0.5 bg-white/10 text-[9px] font-mono text-slate-500">⌘</span>
              <span className="px-1.5 py-0.5 bg-white/10 text-[9px] font-mono text-slate-500">K</span>
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
            <div key={item.id} className={`bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 p-4 relative overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-accent/20 hover:before:bg-accent hover:before:shadow-[0_0_8px_#00f2ff] ${item.cardClass || ''}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 flex items-center justify-center ${item.iconClass}`}>
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
                      <button key={idx} className={`px-2 py-1 text-[8px] font-mono text-slate-500 hover:text-accent hover:bg-white/10 bg-white/5 transition-all uppercase tracking-tighter ${customClass}`}>
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
    </KnowledgeLayout>
  );
};
