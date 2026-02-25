import { describe, it, expect, vi } from 'vitest';

// These tests verify the SettingsStore interface and event emission
// Mock electron-store at the top level
vi.mock('electron-store', () => ({
  default: class MockStore {
    store = {
      intervalMinutes: 30,
      workHoursStart: 9,
      workHoursEnd: 17,
      enabled: true,
      darkMode: false,
      customMessage: 'Time to stretch!',
    };
    get(key: string) { return this.store[key as keyof typeof this.store]; }
    set(key: string, value: unknown) { (this.store as Record<string, unknown>)[key] = value; }
    clear() { /* reset handled by re-creating instance */ }
  },
}));

import { SettingsStore } from '../main/settingsStore';

describe('SettingsStore', () => {
  it('should have getSettings method', () => {
    const store = new SettingsStore();
    const settings = store.getSettings();
    
    expect(typeof settings).toBe('object');
    expect(settings).toHaveProperty('intervalMinutes');
    expect(settings).toHaveProperty('workHoursStart');
    expect(settings).toHaveProperty('enabled');
    expect(settings).toHaveProperty('darkMode');
    expect(settings).toHaveProperty('customMessage');
    store.dispose();
  });

  it('should emit change event when settings update', () => {
    const store = new SettingsStore();
    const changeHandler = vi.fn();
    store.on('change', changeHandler);

    store.setIntervalMinutes(45);

    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(changeHandler).toHaveBeenCalledWith(store.getSettings());
    store.dispose();
  });

  it('should update interval minutes', () => {
    const store = new SettingsStore();
    store.setIntervalMinutes(45);
    expect(store.getSettings().intervalMinutes).toBe(45);
    store.dispose();
  });

  it('should update work hours', () => {
    const store = new SettingsStore();
    store.setWorkHours(8, 18);
    const settings = store.getSettings();
    expect(settings.workHoursStart).toBe(8);
    expect(settings.workHoursEnd).toBe(18);
    store.dispose();
  });

  it('should toggle enabled state', () => {
    const store = new SettingsStore();
    const initial = store.getSettings().enabled;
    store.toggleEnabled();
    expect(store.getSettings().enabled).toBe(!initial);
    store.dispose();
  });

  it('should toggle dark mode', () => {
    const store = new SettingsStore();
    const initial = store.getSettings().darkMode;
    store.toggleDarkMode();
    expect(store.getSettings().darkMode).toBe(!initial);
    store.dispose();
  });

  it('should update custom message', () => {
    const store = new SettingsStore();
    store.setCustomMessage('Take a break!');
    expect(store.getSettings().customMessage).toBe('Take a break!');
    store.dispose();
  });

  it('should have dispose method', () => {
    const store = new SettingsStore();
    expect(() => store.dispose()).not.toThrow();
  });
});
