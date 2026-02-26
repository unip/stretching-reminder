import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { SettingsStore } from './settingsStore';
import { NotificationService } from './notificationService';
import { TimerService } from './timer';
import { TrayService } from './trayService';
import { AutoLaunchService } from './autoLaunchService';
import { registerIPCHandlers, unregisterIPCHandlers } from './ipcHandlers';

console.log('=== Main process starting ===');
console.log('Node version:', process.version);
console.log('Electron version:', process.versions.electron);
console.log('Chrome version:', process.versions.chrome);

let mainWindow: BrowserWindow | null = null;
let settingsStore: SettingsStore | null = null;
let notificationService: NotificationService | null = null;
let timerService: TimerService | null = null;
let trayService: TrayService | null = null;
let autoLaunchService: AutoLaunchService | null = null;

// Log when app is ready
app.on('ready', () => {
  console.log('=== App ready event fired ===');
});

function createWindow() {
  console.log('Creating window...');
  console.log('App path:', app.getAppPath());
  console.log('__dirname:', __dirname);
  
  mainWindow = new BrowserWindow({
    width: 450,
    height: 700,
    resizable: true,
    minWidth: 400,
    minHeight: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    console.log('Window ready to show');
    mainWindow?.show();
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    console.log('Loading dev server URL');
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    const htmlPath = path.join(__dirname, '../renderer/index.html');
    console.log('Loading file:', htmlPath);
    mainWindow.loadFile(htmlPath);
  }

  mainWindow.on('closed', () => {
    console.log('Window closed');
    mainWindow = null;
  });
  
  mainWindow.webContents.on('did-fail-load', (_event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
  });
}

function initializeServices() {
  console.log('Initializing services...');
  settingsStore = new SettingsStore();
  notificationService = new NotificationService();
  timerService = new TimerService();
  trayService = new TrayService();
  autoLaunchService = new AutoLaunchService();

  // Initialize timer with work hours from settings
  const settings = settingsStore.getSettings();
  timerService.setWorkHours(settings.workHoursStart, settings.workHoursEnd);

  // Initialize auto-launch based on settings
  if (settings.autoLaunch) {
    autoLaunchService.enable().catch(console.error);
  }

  trayService.create(
    () => {
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
      mainWindow?.show();
      mainWindow?.webContents.send('open-settings');
    },
    () => {
      app.quit();
    }
  );

  // Update tray tooltip on timer tick
  timerService.on('tick', (remainingTime) => {
    if (remainingTime) {
      const minutes = Math.ceil(remainingTime / 60000);
      const isWithinHours = timerService?.isWithinWorkHours();
      if (isWithinHours) {
        trayService?.setToolTip(`Next break in ${minutes} min`);
      } else {
        trayService?.setToolTip('Outside work hours - timer paused');
      }
    }
  });

  // Check work hours every minute and auto-pause/resume timer
  setInterval(() => {
    if (timerService && settingsStore) {
      const settings = settingsStore.getSettings();
      const isWithinHours = TimerService.isWithinWorkHours(
        settings.workHoursStart,
        settings.workHoursEnd
      );
      
      if (!isWithinHours && timerService.getRemainingTime() < timerService.getInterval()) {
        // Timer was running but now outside work hours - pause it
        timerService.pause();
        trayService?.setToolTip('Outside work hours - timer paused');
        mainWindow?.webContents.send('work-hours-changed', { isWithinWorkHours: false });
      } else if (isWithinHours && !timerService.getRemainingTime()) {
        // Back within work hours and timer is at zero - reset and start
        timerService.reset();
        timerService.start();
        trayService?.setToolTip(`Next break in ${settings.intervalMinutes} min`);
        mainWindow?.webContents.send('work-hours-changed', { isWithinWorkHours: true });
      }
    }
  }, 60000);

  console.log('Services initialized');
}

app.whenReady().then(() => {
  console.log('=== app.whenReady() resolved ===');
  createWindow();
  initializeServices();
  if (mainWindow && settingsStore && notificationService && timerService && autoLaunchService) {
    registerIPCHandlers(mainWindow, settingsStore, notificationService, timerService, autoLaunchService);
  }
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  console.log('Window all closed');
  unregisterIPCHandlers();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  console.log('Before quit');
  trayService?.destroy();
  settingsStore?.dispose();
  notificationService?.dispose();
  timerService?.dispose();
  autoLaunchService = null;
});

ipcMain.handle('get-version', () => app.getVersion());
