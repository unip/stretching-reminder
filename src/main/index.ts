import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { SettingsStore } from './settingsStore';
import { NotificationService } from './notificationService';
import { TimerService } from './timer';
import { TrayService } from './trayService';
import { registerIPCHandlers, unregisterIPCHandlers } from './ipcHandlers';

let mainWindow: BrowserWindow | null = null;
let settingsStore: SettingsStore | null = null;
let notificationService: NotificationService | null = null;
let timerService: TimerService | null = null;
let trayService: TrayService | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 450,
    height: 700,
    resizable: true,
    minWidth: 400,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function initializeServices() {
  settingsStore = new SettingsStore();
  notificationService = new NotificationService();
  timerService = new TimerService();
  trayService = new TrayService();

  // Create tray
  trayService.create(
    () => {
      // Toggle pause/resume
      if (timerService) {
        const remaining = timerService.getRemainingTime();
        const interval = timerService.getInterval();
        if (remaining === interval || remaining === 0) {
          timerService.start();
        } else {
          timerService.pause();
        }
      }
    },
    () => {
      // Open settings - focus window
      mainWindow?.show();
      mainWindow?.webContents.send('open-settings');
    },
    () => {
      // Quit
      app.quit();
    }
  );

  // Update tray tooltip with next break time
  timerService.on('tick', (remainingTime) => {
    if (remainingTime) {
      const minutes = Math.ceil(remainingTime / 60000);
      trayService?.setToolTip(`Next break in ${minutes} min`);
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  initializeServices();

  if (mainWindow && settingsStore && notificationService && timerService) {
    registerIPCHandlers(mainWindow, settingsStore, notificationService, timerService);
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  unregisterIPCHandlers();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  trayService?.destroy();
  settingsStore?.dispose();
  notificationService?.dispose();
  timerService?.dispose();
});

// IPC handlers for app version
ipcMain.handle('get-version', () => app.getVersion());
