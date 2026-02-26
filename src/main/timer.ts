export type TimerEvent = 'tick' | 'complete';
export type TimerCallback = (data?: number) => void;

export class TimerService {
  private intervalMs: number = 30 * 60 * 1000;
  private remainingTime: number = this.intervalMs;
  private timerId: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;
  private listeners: Map<string, TimerCallback[]> = new Map();
  private workHoursStart: number = 9;
  private workHoursEnd: number = 17;

  constructor() {
    this.listeners.set('tick', []);
    this.listeners.set('complete', []);
  }

  /**
   * Check if current hour is within work hours
   * @param workStart - Work start hour (0-23)
   * @param workEnd - Work end hour (0-23)
   * @param currentHour - Current hour (0-23), defaults to now
   */
  static isWithinWorkHours(workStart: number, workEnd: number, currentHour?: number): boolean {
    const hour = currentHour ?? new Date().getHours();
    
    // Handle overnight work hours (e.g., 22:00 - 06:00)
    if (workStart > workEnd) {
      return hour >= workStart || hour < workEnd;
    }
    
    // Normal work hours (e.g., 09:00 - 17:00)
    return hour >= workStart && hour < workEnd;
  }

  setWorkHours(start: number, end: number): void {
    this.workHoursStart = start;
    this.workHoursEnd = end;
  }

  isWithinWorkHours(): boolean {
    return TimerService.isWithinWorkHours(this.workHoursStart, this.workHoursEnd);
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
