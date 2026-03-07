import React from 'react';

interface CommandInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const CommandInput: React.FC<CommandInputProps> = ({ value, onChange, onKeyDown }) => {
  return (
    <div className="p-2 bg-black border border-accent/30 shadow-[0_0_10px_rgba(0,242,255,0.1)] focus-within:border-accent/60 focus-within:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all duration-300">
      <div className="flex items-center gap-3 bg-accent/5 border border-accent/20 px-3 py-1.5 focus-within:bg-accent/10 focus-within:border-accent/40 transition-all duration-300">
        <span className="text-terminal-green font-mono text-xs font-bold">$</span>
        <input 
          autoFocus 
          className="bg-transparent border-none focus:ring-0 text-white font-mono text-[11px] w-full uppercase placeholder-placeholder outline-none relative z-20" 
          placeholder="SEND_COMMAND_TO_ACTIVE_FEED..." 
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <div className="w-1.5 h-3.5 bg-terminal-green animate-[pulse_1s_infinite]"></div>
      </div>
    </div>
  );
};
