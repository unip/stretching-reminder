import { ipcMain, BrowserWindow } from 'electron';
import { SettingsStore } from './settingsStore';
import { NotificationService } from './notificationService';
import { TimerService } from './timer';

export function registerIPCHandlers(
  mainWindow: BrowserWindow,
  settingsStore: SettingsStore,
  notificationService: NotificationService,
  timerService: TimerService
): void {
  // Settings handlers
  ipcMain.handle('get-settings', () => settingsStore.getSettings());
  
  ipcMain.handle('set-interval', (_, minutes: number) => {
    settingsStore.setIntervalMinutes(minutes);
  });
  
  ipcMain.handle('set-work-hours', (_, start: number, end: number) => {
    settingsStore.setWorkHours(start, end);
  });
  
  ipcMain.handle('toggle-enabled', () => {
    settingsStore.toggleEnabled();
  });
  
  ipcMain.handle('toggle-dark-mode', () => {
    settingsStore.toggleDarkMode();
  });
  
  ipcMain.handle('set-custom-message', (_, message: string) => {
    settingsStore.setCustomMessage(message);
  });

  // Timer handlers
  ipcMain.handle('start-timer', () => {
    timerService.start();
  });
  
  ipcMain.handle('pause-timer', () => {
    timerService.pause();
  });
  
  ipcMain.handle('resume-timer', () => {
    timerService.resume();
  });
  
  ipcMain.handle('reset-timer', () => {
    timerService.reset();
  });
  
  ipcMain.handle('get-timer-state', () => ({
    remainingTime: timerService.getRemainingTime(),
    interval: timerService.getInterval(),
  }));

  // Notification handlers
  ipcMain.handle('show-notification', (_, title: string, body: string) => {
    notificationService.show(title, body);
  });
  
  ipcMain.handle('show-reminder', (_, message?: string) => {
    notificationService.showReminder(message);
  });

  // Settings change listener
  settingsStore.on('change', (settings) => {
    mainWindow.webContents.send('settings-changed', settings);
  });

  // Timer event listeners
  timerService.on('tick', (remainingTime) => {
    mainWindow.webContents.send('timer-tick', remainingTime);
  });
  
  timerService.on('complete', () => {
    mainWindow.webContents.send('timer-complete');
    notificationService.showReminder();
  });
}

export function unregisterIPCHandlers(): void {
  ipcMain.removeHandler('get-settings');
  ipcMain.removeHandler('set-interval');
  ipcMain.removeHandler('set-work-hours');
  ipcMain.removeHandler('toggle-enabled');
  ipcMain.removeHandler('toggle-dark-mode');
  ipcMain.removeHandler('set-custom-message');
  ipcMain.removeHandler('start-timer');
  ipcMain.removeHandler('pause-timer');
  ipcMain.removeHandler('resume-timer');
  ipcMain.removeHandler('reset-timer');
  ipcMain.removeHandler('get-timer-state');
  ipcMain.removeHandler('show-notification');
  ipcMain.removeHandler('show-reminder');
}
