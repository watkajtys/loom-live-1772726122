import React from 'react';
import { Icon } from '../Icon';

export const ChannelHealth = () => (
  <section className="col-span-12 lg:col-span-4 row-span-1 glass-panel rounded-lg p-4 flex gap-4">
    <div className="flex-1 flex flex-col justify-center border-r border-primary/10">
      <div className="flex items-center gap-2 mb-1">
        <Icon name="hub" className="text-accent text-sm" />
        <span className="text-[10px] font-mono uppercase text-slate-400">Discord</span>
      </div>
      <div className="text-xl font-bold font-mono">98<span className="text-xs text-slate-500 ml-1">ms</span></div>
    </div>
    <div className="flex-1 flex flex-col justify-center border-r border-primary/10">
      <div className="flex items-center gap-2 mb-1">
        <Icon name="code" className="text-accent text-sm" />
        <span className="text-[10px] font-mono uppercase text-slate-400">GitHub</span>
      </div>
      <div className="text-xl font-bold font-mono text-green-400">SYNC</div>
    </div>
    <div className="flex-1 flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-1">
        <Icon name="alternate_email" className="text-accent text-sm" />
        <span className="text-[10px] font-mono uppercase text-slate-400">X / Twitter</span>
      </div>
      <div className="text-xl font-bold font-mono">1.2k<span className="text-xs text-slate-500 ml-1">rq/m</span></div>
    </div>
  </section>
);
