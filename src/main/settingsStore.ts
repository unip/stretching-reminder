import Store from 'electron-store';
import { EventEmitter } from 'events';

export interface Settings {
  intervalMinutes: number;
  workHoursStart: number;
  workHoursEnd: number;
  enabled: boolean;
  darkMode: boolean;
  customMessage: string;
  autoLaunch: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  intervalMinutes: 30,
  workHoursStart: 9,
  workHoursEnd: 17,
  enabled: true,
  darkMode: false,
  customMessage: 'Time to stretch!',
  autoLaunch: false,
};

type SettingsEvent = 'change';
type SettingsCallback = (settings: Settings) => void;

export class SettingsStore extends EventEmitter {
  private store: Store<Settings>;

  constructor() {
    super();
    this.store = new Store<Settings>({
      defaults: DEFAULT_SETTINGS,
    });
  }

  getSettings(): Settings {
    const data = this.store.store as Settings;
    return data;
  }

  setIntervalMinutes(minutes: number): void {
    const validMinutes = Math.max(1, minutes);
    this.store.set('intervalMinutes', validMinutes);
    this.emit('change', this.getSettings());
  }

  setWorkHours(start: number, end: number): void {
    const validStart = Math.max(0, Math.min(23, start));
    const validEnd = Math.max(0, Math.min(23, end));
    this.store.set('workHoursStart', validStart);
    this.store.set('workHoursEnd', validEnd);
    this.emit('change', this.getSettings());
  }

  toggleEnabled(): void {
    this.store.set('enabled', !this.store.get('enabled'));
    this.emit('change', this.getSettings());
  }

  toggleDarkMode(): void {
    this.store.set('darkMode', !this.store.get('darkMode'));
    this.emit('change', this.getSettings());
  }

  setCustomMessage(message: string): void {
    this.store.set('customMessage', message);
    this.emit('change', this.getSettings());
  }

  toggleAutoLaunch(): void {
    this.store.set('autoLaunch', !this.store.get('autoLaunch'));
    this.emit('change', this.getSettings());
  }

  resetToDefaults(): void {
    this.store.clear();
    this.emit('change', this.getSettings());
  }

  on(event: SettingsEvent, callback: SettingsCallback): this {
    return super.on(event, callback);
  }

  dispose(): void {
    this.removeAllListeners();
  }
}
