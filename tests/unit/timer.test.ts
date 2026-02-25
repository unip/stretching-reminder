import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { TimerService } from '../../src/main/timer';

describe('TimerService', () => {
  let timer: TimerService;

  beforeEach(() => {
    vi.useFakeTimers();
    timer = new TimerService();
  });

  afterEach(() => {
    vi.useRealTimers();
    timer.dispose();
  });

  it('should initialize with default interval of 30 minutes', () => {
    expect(timer.getInterval()).toBe(30 * 60 * 1000);
  });

  it('should allow setting custom interval', () => {
    timer.setInterval(15 * 60 * 1000); // 15 minutes
    expect(timer.getInterval()).toBe(15 * 60 * 1000);
  });

  it('should emit tick event every second when running', () => {
    const tickHandler = vi.fn();
    timer.on('tick', tickHandler);

    timer.start();
    vi.advanceTimersByTime(3000);

    expect(tickHandler).toHaveBeenCalledTimes(3);
  });

  it('should not emit tick when paused', () => {
    const tickHandler = vi.fn();
    timer.on('tick', tickHandler);

    timer.start();
    timer.pause();
    vi.advanceTimersByTime(3000);

    expect(tickHandler).not.toHaveBeenCalled();
  });

  it('should emit complete event when timer reaches zero', () => {
    const completeHandler = vi.fn();
    timer.setInterval(5000); // 5 seconds
    timer.on('complete', completeHandler);

    timer.start();
    vi.advanceTimersByTime(5000);

    expect(completeHandler).toHaveBeenCalledTimes(1);
  });

  it('should resume from paused state', () => {
    const tickHandler = vi.fn();
    timer.on('tick', tickHandler);

    timer.start();
    vi.advanceTimersByTime(2000);
    timer.pause();
    vi.advanceTimersByTime(2000);
    timer.resume();
    vi.advanceTimersByTime(2000);

    expect(tickHandler).toHaveBeenCalledTimes(4);
  });

  it('should reset timer to initial interval', () => {
    timer.setInterval(10000); // 10 seconds
    timer.start();
    vi.advanceTimersByTime(5000);
    timer.reset();

    expect(timer.getRemainingTime()).toBe(10000);
  });

  it('should return remaining time', () => {
    timer.setInterval(10000); // 10 seconds
    timer.start();
    vi.advanceTimersByTime(3000);

    expect(timer.getRemainingTime()).toBe(7000);
  });
});
