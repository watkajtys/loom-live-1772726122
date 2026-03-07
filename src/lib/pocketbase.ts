import PocketBase, { SendOptions } from 'pocketbase';
import { telemetryMiddleware } from './api/middleware';

const getPocketBaseUrl = () => {
  if (import.meta.env.VITE_POCKETBASE_URL) {
    return import.meta.env.VITE_POCKETBASE_URL;
  }
  return `http://${window.location.hostname}:8090`;
};

class RequestProfiler {
  subscribe(listener: (metrics: any) => void) {
    return telemetryMiddleware.subscribe((metrics) => {
      // map to what useProfiler expects
      listener(metrics.map(m => ({ url: m.url, duration: m.duration, timestamp: m.timestamp })));
    });
  }
  
  getMetrics() {
    return telemetryMiddleware.getMetrics().map(m => ({ url: m.url, duration: m.duration, timestamp: m.timestamp }));
  }
}

export const profiler = new RequestProfiler();

class InstrumentedPocketBase extends PocketBase {
  async send(path: string, options?: SendOptions) {
    const start = performance.now();
    const method = options?.method || 'GET';
    try {
        const res = await super.send(path, options);
        const duration = performance.now() - start;
        telemetryMiddleware.record(path, method, duration);
        return res;
    } catch (e) {
        const duration = performance.now() - start;
        telemetryMiddleware.record(path, method, duration);
        throw e;
    }
  }
}

export const pb = new InstrumentedPocketBase(getPocketBaseUrl());
