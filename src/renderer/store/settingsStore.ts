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
  toggleEnabled: () => void;
  toggleDarkMode: () => void;
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

export function createSettingsStore() {
  return create<SettingsState>((set, get) => ({
    ...DEFAULT_SETTINGS,

    setIntervalMinutes: (minutes: number) => {
      const validMinutes = Math.max(1, minutes);
      set({ intervalMinutes: validMinutes });
    },

    setWorkHours: (start: number, end: number) => {
      const validStart = Math.max(0, Math.min(23, start));
      const validEnd = Math.max(0, Math.min(23, end));
      set({ workHoursStart: validStart, workHoursEnd: validEnd });
    },

    toggleEnabled: () => set({ enabled: !get().enabled }),

    toggleDarkMode: () => set({ darkMode: !get().darkMode }),

    setCustomMessage: (message: string) => set({ customMessage: message }),

    resetToDefaults: () => set(DEFAULT_SETTINGS),
  }));
}

export const useSettingsStore = createSettingsStore;
