export type TelemetryMetrics = {
  url: string;
  duration: number;
  timestamp: number;
  method: string;
  bottleneck: boolean;
};

class TelemetryMiddleware {
  private listeners: Set<(metrics: TelemetryMetrics[]) => void> = new Set();
  private metrics: TelemetryMetrics[] = [];
  
  // Define what we consider a bottleneck (e.g. over 100ms)
  private readonly BOTTLENECK_THRESHOLD_MS = 100;

  subscribe(listener: (metrics: TelemetryMetrics[]) => void) {
    this.listeners.add(listener);
    listener(this.metrics);
    return () => this.listeners.delete(listener);
  }

  record(url: string, method: string, duration: number) {
    const isBottleneck = duration > this.BOTTLENECK_THRESHOLD_MS;
    const metric: TelemetryMetrics = {
      url,
      method,
      duration,
      timestamp: Date.now(),
      bottleneck: isBottleneck
    };
    
    // Log the request tracing, execution duration, and bottleneck warnings
    console.log(`[TELEMETRY] Request Trace: ${method} ${url}`);
    console.log(`[TELEMETRY] Execution Duration: ${duration.toFixed(2)}ms`);
    if (isBottleneck) {
      console.warn(`[TELEMETRY] BOTTLENECK DETECTED: Execution exceeded ${this.BOTTLENECK_THRESHOLD_MS}ms threshold`);
    }

    this.metrics.push(metric);
    // keep only last 50 metrics to prevent memory leak
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

export const telemetryMiddleware = new TelemetryMiddleware();
