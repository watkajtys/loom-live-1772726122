export interface Ingest {
  type: string;
  time: string;
  title: string;
  tag: string;
  style?: string;
}

export interface TerminalLog {
  time: string;
  type: string;
  message: string;
  typeColor: string;
}

export interface DashboardData {
  agentVisualBars: number[];
  opsPerMinute: number;
  snapshot: {
    activeAgents: number;
    tokensPerSec: number;
    health: number;
  };
  channelHealth: {
    discord: number;
    github: string;
    twitter: string;
  };
  recentIngests: Ingest[];
  terminalLogs: TerminalLog[];
}

export const INITIAL_DASHBOARD_DATA: DashboardData = {
  agentVisualBars: [20, 40, 10, 40, 60, 20, 40, 10, 40, 60, 20, 40, 10, 40, 60, 20, 40],
  opsPerMinute: 142.8,
  snapshot: {
    activeAgents: 12,
    tokensPerSec: 854,
    health: 98,
  },
  channelHealth: {
    discord: 98,
    github: 'SYNC',
    twitter: '1.2k',
  },
  recentIngests: [
    { type: 'GITHUB_COMMIT', time: '2m ago', title: 'Refactor: Auth middleware logic updates', tag: 'Tutorial_Update' },
    { type: 'DISCORD_MSG', time: '5m ago', title: 'User: "How do I setup multi-tenancy?"', tag: 'Q&A_Trigger', style: 'bg-background-dark/50' },
    { type: 'X_MENTION', time: '14m ago', title: '@dev_guru: Loving the new @advoloom CLI!', tag: 'Sentiment_Pos', style: 'bg-background-dark/50' },
    { type: 'DOCS_PARSE', time: '1h ago', title: "Updated 'Advanced Routing' technical doc", tag: 'Vector_Sync', style: 'bg-background-dark/50' },
  ],
  terminalLogs: [
    { time: '14:22:01', type: 'INGEST_SUCCESS:', message: "Github Webhook - Repository: 'advoloom-core' - Pull Request #421", typeColor: 'text-green-400' },
    { time: '14:22:05', type: 'AGENT_REPLY:', message: 'Llama-3-70B processing technical query on Discord #general...', typeColor: 'text-primary' },
    { time: '14:22:10', type: 'NEURAL_MAP:', message: "Updating context vector for 'Authentication Flow' tutorials", typeColor: 'text-slate-400' },
    { time: '14:22:15', type: 'WARN:', message: 'Rate limit approaching for X-API v2 [88% capacity]', typeColor: 'text-yellow-400' },
    { time: '14:22:18', type: 'INGEST_SUCCESS:', message: 'New tutorial request identified from Discord thread ID 99283', typeColor: 'text-green-400' },
    { time: '14:22:20', type: 'AGENT_OUTPUT:', message: '"To initialize the SDK, use the `adv.init()` method with your API key..."', typeColor: 'text-primary' },
    { time: '14:22:25', type: 'INGEST_SUCCESS:', message: "4 files synced from 'documentation-v2' main branch", typeColor: 'text-green-400' },
    { time: '14:22:31', type: 'SYSTEM:', message: 'Garbage collection complete. 1.2MB memory reclaimed.', typeColor: 'text-slate-400' },
  ],
};