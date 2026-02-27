import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ipcMain } from 'electron';
import { registerIPCHandlers, unregisterIPCHandlers } from '../../src/main/ipcHandlers';

// Mock Electron ipcMain
vi.mock('electron', () => ({
  ipcMain: {
    handle: vi.fn(),
    on: vi.fn(),
    removeHandler: vi.fn(),
  },
}));

// Mock services
const mockSettingsStore = {
  getSettings: vi.fn(),
  setIntervalMinutes: vi.fn(),
  setWorkHours: vi.fn(),
  toggleEnabled: vi.fn(),
  toggleDarkMode: vi.fn(),
  setCustomMessage: vi.fn(),
  on: vi.fn(),
};

const mockNotificationService = {
  show: vi.fn(),
  showReminder: vi.fn(),
};

const mockTimerService = {
  start: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  reset: vi.fn(),
  getRemainingTime: vi.fn(),
  getInterval: vi.fn(),
  isWithinWorkHours: vi.fn(),
  setWorkHours: vi.fn(),
  on: vi.fn(),
};

const mockAutoLaunchService = {
  toggle: vi.fn(),
  checkEnabled: vi.fn(),
};

const mockMainWindow = {
  webContents: {
    send: vi.fn(),
  },
};

describe('IPC Handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    unregisterIPCHandlers();
  });

  describe('registerIPCHandlers', () => {
    it('should register all settings handlers', () => {
      registerIPCHandlers(
        mockMainWindow as any,
        mockSettingsStore as any,
        mockNotificationService as any,
        mockTimerService as any,
        mockAutoLaunchService as any
      );

      expect(ipcMain.handle).toHaveBeenCalledWith('get-settings', expect.any(Function));
      expect(ipcMain.handle).toHaveBeenCalledWith('set-interval', expect.any(Function));
      expect(ipcMain.handle).toHaveBeenCalledWith('set-work-hours', expect.any(Function));
      expect(ipcMain.handle).toHaveBeenCalledWith('toggle-enabled', expect.any(Function));
      expect(ipcMain.handle).toHaveBeenCalledWith('toggle-dark-mode', expect.any(Function));
      expect(ipcMain.handle).toHaveBeenCalledWith('set-custom-message', expect.any(Function));
    });

    it('should register auto-launch handlers', () => {
      registerIPCHandlers(
        mockMainWindow as any,
        mockSettingsStore as any,
        mockNotificationService as any,
        mockTimerService as any,
        mockAutoLaunchService as any
      );

      expect(ipcMain.handle).toHaveBeenCalledWith('toggle-auto-launch', expect.any(Function));
      expect(ipcMain.handle).toHaveBeenCalledWith('check-auto-launch', expect.any(Function));
    });

    it('should register timer handlers', () => {
      registerIPCHandlers(
        mockMainWindow as any,
        mockSettingsStore as any,
        mockNotificationService as any,
        mockTimerService as any,
        mockAutoLaunchService as any
      );

      expect(ipcMain.handle).toHaveBeenCalledWith('start-timer', expect.any(Function));
      expect(ipcMain.handle).toHaveBeenCalledWith('pause-timer', expect.any(Function));
      expect(ipcMain.handle).toHaveBeenCalledWith('resume-timer', expect.any(Function));
      expect(ipcMain.handle).toHaveBeenCalledWith('reset-timer', expect.any(Function));
      expect(ipcMain.handle).toHaveBeenCalledWith('get-timer-state', expect.any(Function));
      expect(ipcMain.handle).toHaveBeenCalledWith('check-work-hours', expect.any(Function));
    });

    it('should register notification handlers', () => {
      registerIPCHandlers(
        mockMainWindow as any,
        mockSettingsStore as any,
        mockNotificationService as any,
        mockTimerService as any,
        mockAutoLaunchService as any
      );

      expect(ipcMain.handle).toHaveBeenCalledWith('show-notification', expect.any(Function));
      expect(ipcMain.handle).toHaveBeenCalledWith('show-reminder', expect.any(Function));
    });

    it('should set up settings change listener', () => {
      registerIPCHandlers(
        mockMainWindow as any,
        mockSettingsStore as any,
        mockNotificationService as any,
        mockTimerService as any,
        mockAutoLaunchService as any
      );

      expect(mockSettingsStore.on).toHaveBeenCalledWith('change', expect.any(Function));
    });

    it('should set up timer event listeners', () => {
      registerIPCHandlers(
        mockMainWindow as any,
        mockSettingsStore as any,
        mockNotificationService as any,
        mockTimerService as any,
        mockAutoLaunchService as any
      );

      expect(mockTimerService.on).toHaveBeenCalledWith('tick', expect.any(Function));
      expect(mockTimerService.on).toHaveBeenCalledWith('complete', expect.any(Function));
    });
  });

  describe('Settings handlers', () => {
    beforeEach(() => {
      registerIPCHandlers(
        mockMainWindow as any,
        mockSettingsStore as any,
        mockNotificationService as any,
        mockTimerService as any,
        mockAutoLaunchService as any
      );
    });

    it('get-settings should return settings from store', () => {
      const mockSettings = { intervalMinutes: 30, enabled: true };
      mockSettingsStore.getSettings.mockReturnValue(mockSettings);

      const handler = (ipcMain.handle as any).mock.calls.find(
        (call: any) => call[0] === 'get-settings'
      )[1];

      const result = handler();

      expect(mockSettingsStore.getSettings).toHaveBeenCalled();
      expect(result).toBe(mockSettings);
    });

    it('set-interval should call store with minutes', () => {
      const handler = (ipcMain.handle as any).mock.calls.find(
        (call: any) => call[0] === 'set-interval'
      )[1];

      handler(null, 45);

      expect(mockSettingsStore.setIntervalMinutes).toHaveBeenCalledWith(45);
    });

    it('set-work-hours should call store and timer service', () => {
      const handler = (ipcMain.handle as any).mock.calls.find(
        (call: any) => call[0] === 'set-work-hours'
      )[1];

      handler(null, 9, 17);

      expect(mockSettingsStore.setWorkHours).toHaveBeenCalledWith(9, 17);
      expect(mockTimerService.setWorkHours).toHaveBeenCalledWith(9, 17);
    });

    it('toggle-enabled should call store', () => {
      const handler = (ipcMain.handle as any).mock.calls.find(
        (call: any) => call[0] === 'toggle-enabled'
      )[1];

      handler();

      expect(mockSettingsStore.toggleEnabled).toHaveBeenCalled();
    });

    it('set-custom-message should call store with message', () => {
      const handler = (ipcMain.handle as any).mock.calls.find(
        (call: any) => call[0] === 'set-custom-message'
      )[1];

      handler(null, 'Custom message!');

      expect(mockSettingsStore.setCustomMessage).toHaveBeenCalledWith('Custom message!');
    });
  });

  describe('Timer handlers', () => {
    beforeEach(() => {
      registerIPCHandlers(
        mockMainWindow as any,
        mockSettingsStore as any,
        mockNotificationService as any,
        mockTimerService as any,
        mockAutoLaunchService as any
      );
    });

    it('start-timer should call timer service', () => {
      const handler = (ipcMain.handle as any).mock.calls.find(
        (call: any) => call[0] === 'start-timer'
      )[1];

      handler();

      expect(mockTimerService.start).toHaveBeenCalled();
    });

    it('pause-timer should call timer service', () => {
      const handler = (ipcMain.handle as any).mock.calls.find(
        (call: any) => call[0] === 'pause-timer'
      )[1];

      handler();

      expect(mockTimerService.pause).toHaveBeenCalled();
    });

    it('resume-timer should call timer service', () => {
      const handler = (ipcMain.handle as any).mock.calls.find(
        (call: any) => call[0] === 'resume-timer'
      )[1];

      handler();

      expect(mockTimerService.resume).toHaveBeenCalled();
    });

    it('reset-timer should call timer service', () => {
      const handler = (ipcMain.handle as any).mock.calls.find(
        (call: any) => call[0] === 'reset-timer'
      )[1];

      handler();

      expect(mockTimerService.reset).toHaveBeenCalled();
    });

    it('get-timer-state should return timer state', () => {
      mockTimerService.getRemainingTime.mockReturnValue(1800000);
      mockTimerService.getInterval.mockReturnValue(1800000);
      mockTimerService.isWithinWorkHours.mockReturnValue(true);

      const handler = (ipcMain.handle as any).mock.calls.find(
        (call: any) => call[0] === 'get-timer-state'
      )[1];

      const result = handler();

      expect(result).toEqual({
        remainingTime: 1800000,
        interval: 1800000,
        isWithinWorkHours: true,
      });
    });
  });

  describe('unregisterIPCHandlers', () => {
    it('should remove all registered handlers', () => {
      unregisterIPCHandlers();

      expect(ipcMain.removeHandler).toHaveBeenCalledWith('get-settings');
      expect(ipcMain.removeHandler).toHaveBeenCalledWith('set-interval');
      expect(ipcMain.removeHandler).toHaveBeenCalledWith('set-work-hours');
      expect(ipcMain.removeHandler).toHaveBeenCalledWith('toggle-enabled');
      expect(ipcMain.removeHandler).toHaveBeenCalledWith('toggle-dark-mode');
      expect(ipcMain.removeHandler).toHaveBeenCalledWith('set-custom-message');
      expect(ipcMain.removeHandler).toHaveBeenCalledWith('toggle-auto-launch');
      expect(ipcMain.removeHandler).toHaveBeenCalledWith('check-auto-launch');
      expect(ipcMain.removeHandler).toHaveBeenCalledWith('start-timer');
      expect(ipcMain.removeHandler).toHaveBeenCalledWith('pause-timer');
      expect(ipcMain.removeHandler).toHaveBeenCalledWith('resume-timer');
      expect(ipcMain.removeHandler).toHaveBeenCalledWith('reset-timer');
      expect(ipcMain.removeHandler).toHaveBeenCalledWith('get-timer-state');
      expect(ipcMain.removeHandler).toHaveBeenCalledWith('check-work-hours');
      expect(ipcMain.removeHandler).toHaveBeenCalledWith('show-notification');
      expect(ipcMain.removeHandler).toHaveBeenCalledWith('show-reminder');
      // Note: Window controls use ipcMain.on() which can't be easily removed
    });
  });
});
