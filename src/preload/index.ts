import { contextBridge, ipcRenderer } from 'electron';

export interface Settings {
  intervalMinutes: number;
  workHoursStart: number;
  workHoursEnd: number;
  enabled: boolean;
  darkMode: boolean;
  customMessage: string;
}

export interface IElectronAPI {
  // App
  getVersion: () => Promise<string>;
  
  // Settings
  getSettings: () => Promise<Settings>;
  setInterval: (minutes: number) => Promise<void>;
  setWorkHours: (start: number, end: number) => Promise<void>;
  toggleEnabled: () => Promise<void>;
  toggleDarkMode: () => Promise<void>;
  setCustomMessage: (message: string) => Promise<void>;
  onSettingsChanged: (callback: (settings: Settings) => void) => void;
  
  // Timer
  startTimer: () => Promise<void>;
  pauseTimer: () => Promise<void>;
  resumeTimer: () => Promise<void>;
  resetTimer: () => Promise<void>;
  getTimerState: () => Promise<{ remainingTime: number; interval: number }>;
  onTimerTick: (callback: (remainingTime: number) => void) => void;
  onTimerComplete: (callback: () => void) => void;
  
  // Notifications
  showNotification: (title: string, body: string) => Promise<void>;
  showReminder: (message?: string) => Promise<void>;
  
  // Events
  onOpenSettings: (callback: () => void) => void;
}

const electronAPI: IElectronAPI = {
  // App
  getVersion: () => ipcRenderer.invoke('get-version'),
  
  // Settings
  getSettings: () => ipcRenderer.invoke('get-settings'),
  setInterval: (minutes: number) => ipcRenderer.invoke('set-interval', minutes),
  setWorkHours: (start: number, end: number) =>
    ipcRenderer.invoke('set-work-hours', start, end),
  toggleEnabled: () => ipcRenderer.invoke('toggle-enabled'),
  toggleDarkMode: () => ipcRenderer.invoke('toggle-dark-mode'),
  setCustomMessage: (message: string) =>
    ipcRenderer.invoke('set-custom-message', message),
  onSettingsChanged: (callback: (settings: Settings) => void) => {
    ipcRenderer.on('settings-changed', (_, settings) => callback(settings));
  },
  
  // Timer
  startTimer: () => ipcRenderer.invoke('start-timer'),
  pauseTimer: () => ipcRenderer.invoke('pause-timer'),
  resumeTimer: () => ipcRenderer.invoke('resume-timer'),
  resetTimer: () => ipcRenderer.invoke('reset-timer'),
  getTimerState: () => ipcRenderer.invoke('get-timer-state'),
  onTimerTick: (callback: (remainingTime: number) => void) => {
    ipcRenderer.on('timer-tick', (_, remainingTime) => callback(remainingTime));
  },
  onTimerComplete: (callback: () => void) => {
    ipcRenderer.on('timer-complete', () => callback());
  },
  
  // Notifications
  showNotification: (title: string, body: string) =>
    ipcRenderer.invoke('show-notification', title, body),
  showReminder: (message?: string) =>
    ipcRenderer.invoke('show-reminder', message),
  
  // Events
  onOpenSettings: (callback: () => void) => {
    ipcRenderer.on('open-settings', () => callback());
  },
};

contextBridge.exposeInMainWorld('electron', electronAPI);
