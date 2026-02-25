import { describe, it, expect, beforeEach } from 'vitest';
import { createSettingsStore } from '../renderer/store/settingsStore';

describe('SettingsStore', () => {
  let store: ReturnType<typeof createSettingsStore>;

  beforeEach(() => {
    store = createSettingsStore();
  });

  it('should initialize with default settings', () => {
    const state = store.getState();
    
    expect(state.intervalMinutes).toBe(30);
    expect(state.workHoursStart).toBe(9);
    expect(state.workHoursEnd).toBe(17);
    expect(state.enabled).toBe(true);
    expect(state.darkMode).toBe(false);
    expect(state.customMessage).toBe('Time to stretch!');
  });

  it('should update interval minutes', () => {
    store.getState().setIntervalMinutes(45);
    expect(store.getState().intervalMinutes).toBe(45);
  });

  it('should update work hours', () => {
    store.getState().setWorkHours(8, 18);
    expect(store.getState().workHoursStart).toBe(8);
    expect(store.getState().workHoursEnd).toBe(18);
  });

  it('should toggle enabled state', () => {
    store.getState().toggleEnabled();
    expect(store.getState().enabled).toBe(false);
    
    store.getState().toggleEnabled();
    expect(store.getState().enabled).toBe(true);
  });

  it('should toggle dark mode', () => {
    store.getState().toggleDarkMode();
    expect(store.getState().darkMode).toBe(true);
  });

  it('should update custom message', () => {
    store.getState().setCustomMessage('Take a break!');
    expect(store.getState().customMessage).toBe('Take a break!');
  });

  it('should reset to default settings', () => {
    store.getState().setIntervalMinutes(60);
    store.getState().toggleDarkMode();
    store.getState().setCustomMessage('Custom');
    
    store.getState().resetToDefaults();
    
    const state = store.getState();
    expect(state.intervalMinutes).toBe(30);
    expect(state.darkMode).toBe(false);
    expect(state.customMessage).toBe('Time to stretch!');
  });

  it('should validate interval is positive', () => {
    store.getState().setIntervalMinutes(0);
    expect(store.getState().intervalMinutes).toBeGreaterThan(0);
  });

  it('should validate work hours are within 0-23 range', () => {
    store.getState().setWorkHours(25, 30);
    const state = store.getState();
    expect(state.workHoursStart).toBeLessThanOrEqual(23);
    expect(state.workHoursEnd).toBeLessThanOrEqual(23);
  });
});
