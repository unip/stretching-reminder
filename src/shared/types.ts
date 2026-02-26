export interface Settings {
  intervalMinutes: number;
  workHoursStart: number;
  workHoursEnd: number;
  enabled: boolean;
  darkMode: boolean;
  customMessage: string;
  autoLaunch: boolean;
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
  getTimerState: () => Promise<{ remainingTime: number; interval: number; isWithinWorkHours: boolean }>;
  checkWorkHours: () => Promise<{ isWithinWorkHours: boolean }>;
  onTimerTick: (callback: (remainingTime: number) => void) => void;
  onTimerComplete: (callback: () => void) => void;
  onWorkHoursChanged: (callback: (state: { isWithinWorkHours: boolean }) => void) => void;
  onNotificationAction: (callback: (action: 'snooze' | 'skip') => void) => void;
  
  // Notifications
  showNotification: (title: string, body: string) => Promise<void>;
  showReminder: (message?: string) => Promise<void>;
  
  // Events
  onOpenSettings: (callback: () => void) => void;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}

export {};
