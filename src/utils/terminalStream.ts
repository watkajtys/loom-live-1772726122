export interface TerminalLog {
  id: string;
  timestamp: string;
  type: 'success' | 'info' | 'warning' | 'error' | 'system';
  message: string;
  prefix: string;
}

const mockMessages = [
  { prefix: 'INGEST_SUCCESS:', message: "Github Webhook - Repository: 'advoloom-core' - Pull Request #421", type: 'success' },
  { prefix: 'AGENT_REPLY:', message: "Llama-3-70B processing technical query on Discord #general...", type: 'info' },
  { prefix: 'NEURAL_MAP:', message: "Updating context vector for 'Authentication Flow' tutorials", type: 'system' },
  { prefix: 'WARN:', message: "Rate limit approaching for X-API v2 [88% capacity]", type: 'warning' },
  { prefix: 'INGEST_SUCCESS:', message: "New tutorial request identified from Discord thread ID 99283", type: 'success' },
  { prefix: 'AGENT_OUTPUT:', message: "\"To initialize the SDK, use the `adv.init()` method with your API key...\"", type: 'info' },
  { prefix: 'INGEST_SUCCESS:', message: "4 files synced from 'documentation-v2' main branch", type: 'success' },
  { prefix: 'SYSTEM:', message: "Garbage collection complete. 1.2MB memory reclaimed.", type: 'system' },
  { prefix: 'ERROR:', message: "Failed to connect to secondary database node.", type: 'error' },
];

export function getTerminalStream(callback: (log: TerminalLog) => void) {
  let isRunning = true;
  
  const emitLog = () => {
    if (!isRunning) return;
    
    const randomMsg = mockMessages[Math.floor(Math.random() * mockMessages.length)];
    const now = new Date();
    
    const log: TerminalLog = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: now.toISOString().substring(11, 19),
      type: randomMsg.type as any,
      prefix: randomMsg.prefix,
      message: randomMsg.message
    };
    
    callback(log);
    
    // Schedule next log between 2 and 5 seconds
    const nextDelay = Math.floor(Math.random() * 3000) + 2000;
    setTimeout(emitLog, nextDelay);
  };
  
  // Initial delay
  setTimeout(emitLog, 1000);
  
  return () => {
    isRunning = false;
  };
}
