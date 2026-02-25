import { useState, useEffect } from 'react';
import SettingsForm from '../components/SettingsForm';
import { createSettingsStore } from '../store/settingsStore';

interface SettingsPageProps {
  onBack?: () => void;
  store?: ReturnType<typeof createSettingsStore>;
}

export default function SettingsPage({ onBack, store: propStore }: SettingsPageProps) {
  const internalStore = propStore ?? createSettingsStore();
  const [, setSettings] = useState(internalStore.getState());

  useEffect(() => {
    const unsubscribe = internalStore.subscribe((state) => {
      setSettings({ ...state });
    });
    return unsubscribe;
  }, [internalStore]);

  const state = internalStore.getState();

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            Settings
          </h1>
          {onBack && (
            <button onClick={onBack} className="btn-secondary text-sm">
              ← Back
            </button>
          )}
        </div>

        {/* Settings Form */}
        <div className="card">
          <SettingsForm
            intervalMinutes={state.intervalMinutes}
            workHoursStart={state.workHoursStart}
            workHoursEnd={state.workHoursEnd}
            enabled={state.enabled}
            darkMode={state.darkMode}
            customMessage={state.customMessage}
            setIntervalMinutes={state.setIntervalMinutes}
            setWorkHours={state.setWorkHours}
            toggleEnabled={state.toggleEnabled}
            toggleDarkMode={state.toggleDarkMode}
            setCustomMessage={state.setCustomMessage}
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={() => state.resetToDefaults()}
          className="btn-secondary w-full mt-4"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}
