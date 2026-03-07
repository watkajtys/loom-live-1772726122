import React from 'react';
import { KnowledgeLayout } from './KnowledgeLayout';

export const KnowledgeGraphView: React.FC = () => {
  return (
    <KnowledgeLayout
      title="KB_GRAPH"
      subtitle="MATRIX_LAYOUT_V2"
      icon="hub"
      headerStats={
        <div className="flex flex-col">
          <span className="text-[8px] font-mono text-slate-500 uppercase">Knowledge Density</span>
          <span className="text-xs font-mono text-accent">1.4 TB / 4,291 Nodes</span>
        </div>
      }
      headerStatus="REAL-TIME_ACTIVE"
      footerStats={
        <>
          <div className="text-[9px] font-mono text-slate-600 uppercase">Latency: 4ms</div>
          <div className="text-[9px] font-mono text-slate-600 uppercase">Vector Ops: 12.4k/s</div>
        </>
      }
      footerStatus="Knowledge Core: Optimized"
      footerVersion="v4.2.0-KB_ENGINE"
      viewLink="/?view=feed"
      viewIcon="list"
      viewTitle="Feed View"
    >
      <main className="relative z-10 flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-black/40 flex flex-col shrink-0">
          <div className="p-4 bg-white/5">
            <div className="relative">
              <input 
                type="text"
                placeholder="FILTER_CLUSTERS..."
                className="w-full bg-black/40 text-[10px] font-mono focus:outline-none focus:ring-1 focus:ring-accent text-white placeholder-slate-600 pl-8 h-8 rounded-none"
              />
              <span className="material-symbols-outlined absolute left-2 top-1.5 text-slate-500 text-base">search</span>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto custom-scrollbar py-2">
            <div className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Knowledge Domains</div>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-xs font-mono text-accent bg-accent/5 border-l-2 border-accent hover:bg-white/5 transition-all">
              <span className="material-symbols-outlined text-sm">api</span> API_DOCUMENTATION
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-xs font-mono text-slate-400 hover:text-accent hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-accent">
              <span className="material-symbols-outlined text-sm">forum</span> COMMUNITY_FORUMS
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-xs font-mono text-slate-400 hover:text-accent hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-accent">
              <span className="material-symbols-outlined text-sm">terminal</span> SDK_SOURCE_CODE
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-xs font-mono text-slate-400 hover:text-accent hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-accent">
              <span className="material-symbols-outlined text-sm">description</span> WHITE_PAPERS
            </a>

            <div className="px-4 py-2 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Embedding Clusters</div>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-xs font-mono text-slate-400 hover:text-accent hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-accent">
              <span className="material-symbols-outlined text-sm">schema</span> AUTHENTICATION_FLOW
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-xs font-mono text-slate-400 hover:text-accent hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-accent">
              <span className="material-symbols-outlined text-sm">schema</span> ERROR_HANDLING
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-xs font-mono text-slate-400 hover:text-accent hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-accent">
              <span className="material-symbols-outlined text-sm">schema</span> DATA_SCHEMAS
            </a>
          </nav>

          <div className="p-4 bg-black/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono text-slate-500">VECTOR_SPACE</span>
              <span className="text-[9px] font-mono text-accent">HNSW_INDEX</span>
            </div>
            <div className="w-full bg-white/5 h-1">
              <div className="bg-accent h-full w-[72%]"></div>
            </div>
          </div>
        </aside>

        {/* Center Main Area */}
        <section className="flex-1 relative overflow-hidden flex flex-col">
          <div className="absolute inset-0 z-0 opacity-40">
            {/* Hardcoded Nodes */}
            <div className="absolute top-[20%] left-[30%] w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(0,242,255,0.8)] cursor-pointer hover:scale-125 transition-transform group">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity">AUTH_V2_FLOW</div>
            </div>
            
            <div className="absolute top-[45%] left-[45%] w-3 h-3 rounded-full bg-[#00f2ff] shadow-[0_0_12px_rgba(0,242,255,0.8)] cursor-pointer hover:scale-125 transition-transform group scale-150">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono text-white opacity-100">CORE_ENGINE_ROOT</div>
            </div>

            <div className="absolute top-[70%] left-[25%] w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(0,242,255,0.8)] cursor-pointer hover:scale-125 transition-transform group">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity">DOCS_MARKDOWN</div>
            </div>

            <div className="absolute top-[30%] left-[65%] w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(0,242,255,0.8)] cursor-pointer hover:scale-125 transition-transform group">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity">SDK_PYTHON_LIB</div>
            </div>

            <div className="absolute top-[60%] left-[70%] w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(0,242,255,0.8)] cursor-pointer hover:scale-125 transition-transform group">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity">REST_ENDPOINTS</div>
            </div>

            {/* Connecting lines */}
            <div className="absolute bg-accent/20 h-[1px] origin-left w-[150px] rotate-[15deg] top-[45%] left-[45%] opacity-50"></div>
            <div className="absolute bg-accent/20 h-[1px] origin-left w-[100px] rotate-[140deg] top-[45%] left-[45%] opacity-50"></div>
            <div className="absolute bg-accent/20 h-[1px] origin-left w-[200px] rotate-[-20deg] top-[45%] left-[45%] opacity-50"></div>
            <div className="absolute bg-accent/20 h-[1px] origin-left w-[140px] rotate-[60deg] top-[45%] left-[45%] opacity-50"></div>
          </div>

          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <button className="px-3 py-1 bg-white/10 text-[9px] font-mono text-white hover:bg-white/20 transition-colors">2D_VIEW</button>
            <button className="px-3 py-1 bg-white/5 text-[9px] font-mono text-slate-500 hover:bg-white/10 transition-colors">3D_SPACE</button>
            <button className="px-3 py-1 bg-white/5 text-[9px] font-mono text-slate-500 hover:bg-white/10 transition-colors">AUTO_LAYOUT</button>
          </div>

          <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
            <button className="w-8 h-8 bg-white/5 flex items-center justify-center text-slate-400 hover:text-accent transition-colors">
              <span className="material-symbols-outlined text-lg">add</span>
            </button>
            <button className="w-8 h-8 bg-white/5 flex items-center justify-center text-slate-400 hover:text-accent transition-colors">
              <span className="material-symbols-outlined text-lg">remove</span>
            </button>
          </div>
        </section>

        {/* Right Sidebar */}
        <section className="w-96 bg-black/80 flex flex-col shrink-0 z-20">
          <div className="p-4 bg-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Source Details</span>
              <span className="w-1.5 h-1.5 rounded-full bg-terminal-green shadow-[0_0_5px_#00ff41]"></span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-accent text-2xl">description</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase">auth_workflow.md</h3>
                <p className="text-[9px] font-mono text-slate-500">ID: KB-77291-ALPHA</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono text-accent uppercase tracking-wider pb-1">Embedding Matrix</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/5 p-2">
                  <div className="text-[8px] text-slate-500 uppercase">Cosine Sim</div>
                  <div className="text-xs font-mono text-terminal-green">0.9982</div>
                </div>
                <div className="bg-white/5 p-2">
                  <div className="text-[8px] text-slate-500 uppercase">Dimensions</div>
                  <div className="text-xs font-mono text-white">1,536</div>
                </div>
                <div className="bg-white/5 p-2">
                  <div className="text-[8px] text-slate-500 uppercase">Fragments</div>
                  <div className="text-xs font-mono text-white">24</div>
                </div>
                <div className="bg-white/5 p-2">
                  <div className="text-[8px] text-slate-500 uppercase">Last Updated</div>
                  <div className="text-xs font-mono text-white">2m ago</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 flex-1">
              <h4 className="text-[10px] font-mono text-accent uppercase tracking-wider pb-1 flex justify-between">
                Raw Data Stream
                <span className="text-[8px] text-slate-500">LIVE_READ</span>
              </h4>
              <div className="bg-white/[0.02] p-2 h-64 overflow-y-auto custom-scrollbar font-mono text-[9px] leading-relaxed">
                <div className="py-0.5 hover:bg-accent/5 transition-all px-2 text-slate-500">0001: {`{ "root": "auth", "version": "2.1" }`}</div>
                <div className="py-0.5 hover:bg-accent/5 transition-all px-2 text-terminal-green">0002: [CHUNK_01] Validating OAuth flow...</div>
                <div className="py-0.5 hover:bg-accent/5 transition-all px-2 text-slate-400">0003: POST /api/v1/auth/token status:200</div>
                <div className="py-0.5 hover:bg-accent/5 transition-all px-2 text-slate-400">0004: Mapping vector IDs: 0x921, 0x882, 0x112</div>
                <div className="py-0.5 hover:bg-accent/5 transition-all px-2 text-accent">0005: EVENT: "User Login" {'->'} Relation: "Security"</div>
                <div className="py-0.5 hover:bg-accent/5 transition-all px-2 text-slate-500">0006: Data integrity check... PASSED</div>
                <div className="py-0.5 hover:bg-accent/5 transition-all px-2 text-slate-500">0007: Refreshing embeddings for cluster B-4</div>
                <div className="py-0.5 hover:bg-accent/5 transition-all px-2 text-terminal-green">0008: [CHUNK_02] Mapping session lifetimes...</div>
                <div className="py-0.5 hover:bg-accent/5 transition-all px-2 text-slate-400">0009: KV_STORE updated successfully.</div>
                <div className="py-0.5 hover:bg-accent/5 transition-all px-2 text-slate-500">0010: EOF reached. Waiting for next sync.</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] font-mono text-accent uppercase tracking-wider pb-1">Relations</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-[8px] font-mono bg-white/5">API_GATEWAY</span>
                <span className="px-2 py-0.5 text-[8px] font-mono bg-white/5">SECURITY_PROTOCOL</span>
                <span className="px-2 py-0.5 text-[8px] font-mono bg-white/5">USER_IDENTITY</span>
              </div>
            </div>
          </div>

          <div className="p-4 flex gap-2">
            <button className="flex-1 py-2 bg-accent text-black font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-colors">Re-Embed Source</button>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-white/5 transition-colors bg-white/5">
              <span className="material-symbols-outlined text-base">delete</span>
            </button>
          </div>
        </section>
      </main>
    </KnowledgeLayout>
  );
};
