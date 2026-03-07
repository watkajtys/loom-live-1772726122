cat << 'INNER_EOF' > /tmp/theme_patch.ts
export type StageStyleState = 
  | { status: 'published'; iconColor: 'text-terminal-green'; headerBg: 'bg-terminal-green/5'; collapsedBg: 'bg-terminal-green/5 hover:bg-terminal-green/10'; collapsedBorder: 'border-r-terminal-green/20'; countColor: 'text-terminal-green'; statusColorClass: 'bg-terminal-green'; titleColorClass: 'text-slate-300'; textColorClass: 'text-slate-500' }
  | { status: 'review'; iconColor: 'text-accent'; headerBg: 'bg-accent/5'; collapsedBg: 'bg-accent/5 hover:bg-accent/10'; collapsedBorder: 'border-r-accent/20'; countColor: 'text-accent'; statusColorClass: 'bg-accent'; titleColorClass: 'text-white'; textColorClass: 'text-accent' }
  | { status: 'drafting'; iconColor: 'text-accent'; headerBg: 'bg-white/[0.02]'; collapsedBg: 'bg-white/5 hover:bg-white/10'; collapsedBorder: 'border-r-white/20'; countColor: 'text-slate-500'; statusColorClass: 'bg-terminal-green'; titleColorClass: 'text-slate-300'; textColorClass: 'text-slate-500' };

export const getStageStyles = (status: 'drafting' | 'review' | 'published' | string): StageStyleState => {
  switch (status) {
    case 'published':
      return { status: 'published', iconColor: 'text-terminal-green', headerBg: 'bg-terminal-green/5', collapsedBg: 'bg-terminal-green/5 hover:bg-terminal-green/10', collapsedBorder: 'border-r-terminal-green/20', countColor: 'text-terminal-green', statusColorClass: 'bg-terminal-green', titleColorClass: 'text-slate-300', textColorClass: 'text-slate-500' };
    case 'review':
      return { status: 'review', iconColor: 'text-accent', headerBg: 'bg-accent/5', collapsedBg: 'bg-accent/5 hover:bg-accent/10', collapsedBorder: 'border-r-accent/20', countColor: 'text-accent', statusColorClass: 'bg-accent', titleColorClass: 'text-white', textColorClass: 'text-accent' };
    case 'drafting':
    default:
      return { status: 'drafting', iconColor: 'text-accent', headerBg: 'bg-white/[0.02]', collapsedBg: 'bg-white/5 hover:bg-white/10', collapsedBorder: 'border-r-white/20', countColor: 'text-slate-500', statusColorClass: 'bg-terminal-green', titleColorClass: 'text-slate-300', textColorClass: 'text-slate-500' };
  }
};
INNER_EOF

sed -i '/export type StageStyleState =/,$d' src/utils/theme.ts
cat /tmp/theme_patch.ts >> src/utils/theme.ts
