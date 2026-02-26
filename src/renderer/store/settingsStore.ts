import { create } from 'zustand';

export interface SettingsState {
  // Settings
  intervalMinutes: number;
  workHoursStart: number;
  workHoursEnd: number;
  enabled: boolean;
  darkMode: boolean;
  customMessage: string;
  autoLaunch: boolean;
  soundEnabled: boolean;

  // Actions
  setIntervalMinutes: (minutes: number) => void;
  setWorkHours: (start: number, end: number) => void;
  setEnabled: (enabled: boolean) => void;
  setDarkMode: (darkMode: boolean) => void;
  setCustomMessage: (message: string) => void;
  setAutoLaunch: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  resetToDefaults: () => void;
}

const DEFAULT_SETTINGS: Pick<
  SettingsState,
  | 'intervalMinutes'
  | 'workHoursStart'
  | 'workHoursEnd'
  | 'enabled'
  | 'darkMode'
  | 'customMessage'
  | 'autoLaunch'
  | 'soundEnabled'
> = {
  intervalMinutes: 30,
  workHoursStart: 9,
  workHoursEnd: 17,
  enabled: true,
  darkMode: false,
  customMessage: 'Time to stretch!',
  autoLaunch: false,
  soundEnabled: true,
};

const STORAGE_KEY = 'stretching-reminder-settings';

// Load settings from localStorage
function loadSettings(): Partial<SettingsState> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load settings:', e);
  }
  return {};
}

export function createSettingsStore() {
  const saved = loadSettings();
  const initialState = { ...DEFAULT_SETTINGS, ...saved };

  return create<SettingsState>((set, get) => ({
    ...initialState,

    setIntervalMinutes: (minutes: number) => {
      const validMinutes = Math.max(1, minutes);
      set({ intervalMinutes: validMinutes });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(get()));
    },

    setWorkHours: (start: number, end: number) => {
      const validStart = Math.max(0, Math.min(23, start));
      const validEnd = Math.max(0, Math.min(23, end));
      set({ workHoursStart: validStart, workHoursEnd: validEnd });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(get()));
    },

    setEnabled: (enabled: boolean) => {
      set({ enabled });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(get()));
    },

    setDarkMode: (darkMode: boolean) => {
      set({ darkMode });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(get()));
    },

    setCustomMessage: (message: string) => {
      set({ customMessage: message });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(get()));
    },

    setAutoLaunch: (enabled: boolean) => {
      set({ autoLaunch: enabled });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(get()));
    },

    setSoundEnabled: (enabled: boolean) => {
      set({ soundEnabled: enabled });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(get()));
    },

    resetToDefaults: () => {
      set(DEFAULT_SETTINGS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(get()));
    },
  }));
}

export const useSettingsStore = createSettingsStore;
