import { create } from 'zustand';

export interface SettingsState {
  // Settings
  intervalMinutes: number;
  workHoursStart: number;
  workHoursEnd: number;
  enabled: boolean;
  darkMode: boolean;
  customMessage: string;

  // Actions
  setIntervalMinutes: (minutes: number) => void;
  setWorkHours: (start: number, end: number) => void;
  setEnabled: (enabled: boolean) => void;
  setDarkMode: (darkMode: boolean) => void;
  setCustomMessage: (message: string) => void;
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
> = {
  intervalMinutes: 30,
  workHoursStart: 9,
  workHoursEnd: 17,
  enabled: true,
  darkMode: false,
  customMessage: 'Time to stretch!',
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

// Save settings to localStorage
function saveSettings(settings: Partial<SettingsState>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

export function createSettingsStore() {
  const saved = loadSettings();
  const initialState = { ...DEFAULT_SETTINGS, ...saved };

  return create<SettingsState>((set) => ({
    ...initialState,

    setIntervalMinutes: (minutes: number) => {
      const validMinutes = Math.max(1, minutes);
      set({ intervalMinutes: validMinutes });
      saveSettings({ intervalMinutes: validMinutes });
    },

    setWorkHours: (start: number, end: number) => {
      const validStart = Math.max(0, Math.min(23, start));
      const validEnd = Math.max(0, Math.min(23, end));
      set({ workHoursStart: validStart, workHoursEnd: validEnd });
      saveSettings({ workHoursStart: validStart, workHoursEnd: validEnd });
    },

    setEnabled: (enabled: boolean) => {
      set({ enabled });
      saveSettings({ enabled });
    },

    setDarkMode: (darkMode: boolean) => {
      set({ darkMode });
      saveSettings({ darkMode });
    },

    setCustomMessage: (message: string) => {
      set({ customMessage: message });
      saveSettings({ customMessage: message });
    },

    resetToDefaults: () => {
      set(DEFAULT_SETTINGS);
      saveSettings(DEFAULT_SETTINGS);
    },
  }));
}

export const useSettingsStore = createSettingsStore;
