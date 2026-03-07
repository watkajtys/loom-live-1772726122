import PocketBase from 'pocketbase';

const getPocketBaseUrl = () => {
  if (import.meta.env.VITE_POCKETBASE_URL) {
    return import.meta.env.VITE_POCKETBASE_URL;
  }
  return `http://${window.location.hostname}:8090`;
};

class RequestProfiler {
  private listeners: Set<(metrics: any) => void> = new Set();
  private metrics: { url: string; duration: number; timestamp: number }[] = [];

  subscribe(listener: (metrics: any) => void) {
    this.listeners.add(listener);
    listener(this.metrics);
    return () => this.listeners.delete(listener);
  }

  record(url: string, duration: number) {
    this.metrics.push({ url, duration, timestamp: Date.now() });
    // keep only last 50 metrics
    if (this.metrics.length > 50) {
      this.metrics.shift();
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => listener([...this.metrics]));
  }
  
  getMetrics() {
    return this.metrics;
  }
}

export const profiler = new RequestProfiler();

export const pb = new PocketBase(getPocketBaseUrl());

pb.beforeSend = function (url, options) {
    // Add a start time to the request options
    (options as any).startTime = performance.now();
    return { url, options };
};

pb.afterSend = function (response, data) {
    // Calculate the duration
    const startTime = (response.url as any)?.__req_options?.startTime || (response as any).startTime; // PocketBase doesn't strictly expose options in afterSend easily via response. But we can monkey patch pb.send
    return data;
};

// Monkey patch send to get duration accurately since afterSend doesn't receive original options easily
const originalSend = pb.send.bind(pb);
pb.send = async function (path: string, options: any) {
    const start = performance.now();
    try {
        const res = await originalSend(path, options);
        const duration = performance.now() - start;
        profiler.record(path, duration);
        return res;
    } catch (e) {
        const duration = performance.now() - start;
        profiler.record(path, duration);
        throw e;
    }
};
