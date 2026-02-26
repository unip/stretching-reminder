import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Mock auto-launch module
vi.mock('auto-launch', () => {
  return {
    default: class MockAutoLaunch {
      private enabled = false;
      constructor() {}
      async enable() {
        this.enabled = true;
      }
      async disable() {
        this.enabled = false;
      }
      async isEnabled() {
        return this.enabled;
      }
    },
  };
});

import { AutoLaunchService } from '../../src/main/autoLaunchService';

describe('AutoLaunchService', () => {
  let service: AutoLaunchService;

  beforeEach(() => {
    service = new AutoLaunchService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with auto-launch disabled', async () => {
    const enabled = await service.checkEnabled();
    expect(enabled).toBe(false);
  });

  it('should enable auto-launch', async () => {
    await service.enable();
    const enabled = await service.checkEnabled();
    expect(enabled).toBe(true);
  });

  it('should disable auto-launch', async () => {
    await service.enable();
    await service.disable();
    const enabled = await service.checkEnabled();
    expect(enabled).toBe(false);
  });

  it('should toggle from disabled to enabled', async () => {
    const result = await service.toggle();
    expect(result).toBe(true);
    expect(await service.checkEnabled()).toBe(true);
  });

  it('should toggle from enabled to disabled', async () => {
    await service.enable();
    const result = await service.toggle();
    expect(result).toBe(false);
    expect(await service.checkEnabled()).toBe(false);
  });
});
