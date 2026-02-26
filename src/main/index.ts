import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { SettingsStore } from './settingsStore';
import { NotificationService } from './notificationService';
import { TimerService } from './timer';
import { TrayService } from './trayService';
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
  
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
  });
}

function initializeServices() {
  console.log('Initializing services...');
  settingsStore = new SettingsStore();
  notificationService = new NotificationService();
  timerService = new TimerService();
  trayService = new TrayService();

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

  timerService.on('tick', (remainingTime) => {
    if (remainingTime) {
      const minutes = Math.ceil(remainingTime / 60000);
      trayService?.setToolTip(`Next break in ${minutes} min`);
    }
  });
  
  console.log('Services initialized');
}

app.whenReady().then(() => {
  console.log('=== app.whenReady() resolved ===');
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
});

ipcMain.handle('get-version', () => app.getVersion());
