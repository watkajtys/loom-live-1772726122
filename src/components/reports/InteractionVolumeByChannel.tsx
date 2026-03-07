import React from 'react';

export const InteractionVolumeByChannel = () => {
  return (
    <div className="terminal-window flex-1">
      <div className="terminal-header">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-accent text-sm">bar_chart</span>
          <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Interaction_Volume_By_Channel</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-accent"></div>
            <span className="text-[8px] font-mono text-slate-400">SUCCESS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-white/20"></div>
            <span className="text-[8px] font-mono text-slate-400">TOTAL</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex items-stretch justify-between h-48 gap-4 px-4">
          <div className="flex-1 flex flex-col items-center gap-2 h-full">
            <div className="w-full relative flex flex-col justify-end h-full">
              <div className="bg-white/5 w-full h-full absolute top-0 border-t border-white/5"></div>
              <div className="bg-accent/40 w-full h-[65%] absolute bottom-0 group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity">1.2k</div>
              </div>
              <div className="bg-accent w-full h-[40%] absolute bottom-0 shadow-[0_0_10px_rgba(0,242,255,0.3)]"></div>
            </div>
            <span className="text-[9px] font-mono text-slate-500 uppercase">Slack</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2 h-full">
            <div className="w-full relative flex flex-col justify-end h-full">
              <div className="bg-white/5 w-full h-full absolute top-0 border-t border-white/5"></div>
              <div className="bg-accent/40 w-full h-[85%] absolute bottom-0"></div>
              <div className="bg-accent w-full h-[70%] absolute bottom-0 shadow-[0_0_10px_rgba(0,242,255,0.3)]"></div>
            </div>
            <span className="text-[9px] font-mono text-slate-500 uppercase">Discord</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2 h-full">
            <div className="w-full relative flex flex-col justify-end h-full">
              <div className="bg-white/5 w-full h-full absolute top-0 border-t border-white/5"></div>
              <div className="bg-accent/40 w-full h-[45%] absolute bottom-0"></div>
              <div className="bg-accent w-full h-[30%] absolute bottom-0 shadow-[0_0_10px_rgba(0,242,255,0.3)]"></div>
            </div>
            <span className="text-[9px] font-mono text-slate-500 uppercase">GitHub</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2 h-full">
            <div className="w-full relative flex flex-col justify-end h-full">
              <div className="bg-white/5 w-full h-full absolute top-0 border-t border-white/5"></div>
              <div className="bg-accent/40 w-full h-[95%] absolute bottom-0"></div>
              <div className="bg-accent w-full h-[85%] absolute bottom-0 shadow-[0_0_10px_rgba(0,242,255,0.3)]"></div>
            </div>
            <span className="text-[9px] font-mono text-slate-500 uppercase">X_Thread</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2 h-full">
            <div className="w-full relative flex flex-col justify-end h-full">
              <div className="bg-white/5 w-full h-full absolute top-0 border-t border-white/5"></div>
              <div className="bg-accent/40 w-full h-[35%] absolute bottom-0"></div>
              <div className="bg-accent w-full h-[25%] absolute bottom-0 shadow-[0_0_10px_rgba(0,242,255,0.3)]"></div>
            </div>
            <span className="text-[9px] font-mono text-slate-500 uppercase">StackOver</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2 h-full">
            <div className="w-full relative flex flex-col justify-end h-full">
              <div className="bg-white/5 w-full h-full absolute top-0 border-t border-white/5"></div>
              <div className="bg-accent/40 w-full h-[55%] absolute bottom-0"></div>
              <div className="bg-accent w-full h-[45%] absolute bottom-0 shadow-[0_0_10px_rgba(0,242,255,0.3)]"></div>
            </div>
            <span className="text-[9px] font-mono text-slate-500 uppercase">Email</span>
          </div>
        </div>
      </div>
    </div>
  );
};
