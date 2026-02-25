export type TimerEvent = 'tick' | 'complete';
export type TimerCallback = (data?: number) => void;

export class TimerService {
  private intervalMs: number = 30 * 60 * 1000;
  private remainingTime: number = this.intervalMs;
  private timerId: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;
  private listeners: Map<string, TimerCallback[]> = new Map();

  constructor() {
    this.listeners.set('tick', []);
    this.listeners.set('complete', []);
  }

  on(event: TimerEvent, callback: TimerCallback): void {
    const callbacks = this.listeners.get(event) || [];
    callbacks.push(callback);
    this.listeners.set(event, callbacks);
  }

  off(event: TimerEvent, callback: TimerCallback): void {
    const callbacks = this.listeners.get(event) || [];
    this.listeners.set(
      event,
      callbacks.filter((cb) => cb !== callback)
    );
  }

  private emit(event: TimerEvent, data?: number): void {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach((cb) => cb(data));
  }

  setInterval(ms: number): void {
    this.intervalMs = ms;
    if (!this.isRunning) {
      this.remainingTime = ms;
    }
  }

  getInterval(): number {
    return this.intervalMs;
  }

  start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.timerId = setInterval(() => {
      this.remainingTime -= 1000;
      this.emit('tick', this.remainingTime);

      if (this.remainingTime <= 0) {
        this.emit('complete');
        this.stop();
      }
    }, 1000);
  }

  pause(): void {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  resume(): void {
    this.start();
  }

  reset(): void {
    this.remainingTime = this.intervalMs;
    this.emit('tick', this.remainingTime);
  }

  stop(): void {
    this.pause();
    this.remainingTime = this.intervalMs;
  }

  getRemainingTime(): number {
    return this.remainingTime;
  }

  dispose(): void {
    this.stop();
    this.listeners.clear();
  }
}
