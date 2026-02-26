import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { SoundService } from '../../src/renderer/services/soundService';

describe('SoundService', () => {
  let soundService: SoundService;

  beforeEach(() => {
    // Mock AudioContext
    class MockAudioContext {
      state = 'running';
      currentTime = 0;
      
      createOscillator() {
        return {
          connect: vi.fn(),
          type: 'sine',
          frequency: { value: 0 },
          start: vi.fn(),
          stop: vi.fn(),
        };
      }
      
      createGain() {
        return {
          connect: vi.fn(),
          gain: {
            setValueAtTime: vi.fn(),
            linearRampToValueAtTime: vi.fn(),
          },
        };
      }
      
      resume() {
        return Promise.resolve();
      }
    }

    vi.stubGlobal('AudioContext', MockAudioContext);
    soundService = new SoundService();
  });

  afterEach(() => {
    vi.clearAllMocks();
    soundService = null as any;
  });

  it('should initialize with sound enabled', () => {
    expect(soundService.checkEnabled()).toBe(true);
  });

  it('should disable sound', () => {
    soundService.setEnabled(false);
    expect(soundService.checkEnabled()).toBe(false);
  });

  it('should enable sound', () => {
    soundService.setEnabled(false);
    soundService.setEnabled(true);
    expect(soundService.checkEnabled()).toBe(true);
  });

  it('should not play sound when disabled', () => {
    soundService.setEnabled(false);
    // Should not throw error
    expect(() => soundService.playNotification()).not.toThrow();
  });

  it('should play test sound', () => {
    soundService.setEnabled(true);
    // Should not throw error
    expect(() => soundService.playTestSound()).not.toThrow();
  });
});
