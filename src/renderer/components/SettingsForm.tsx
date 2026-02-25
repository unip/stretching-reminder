import { useState, useEffect } from 'react';

interface SettingsFormProps {
  intervalMinutes: number;
  workHoursStart: number;
  workHoursEnd: number;
  enabled: boolean;
  darkMode: boolean;
  customMessage: string;
  setIntervalMinutes: (minutes: number) => void;
  setWorkHours: (start: number, end: number) => void;
  setEnabled: (enabled: boolean) => void;
  setDarkMode: (darkMode: boolean) => void;
  setCustomMessage: (message: string) => void;
  onSave: () => void;
}

export default function SettingsForm({
  intervalMinutes,
  workHoursStart,
  workHoursEnd,
  enabled,
  darkMode,
  customMessage,
  setIntervalMinutes,
  setWorkHours,
  setEnabled,
  setDarkMode,
  setCustomMessage,
  onSave,
}: SettingsFormProps) {
  // Local state for inputs to avoid reset on every keystroke
  const [localInterval, setLocalInterval] = useState(intervalMinutes);
  const [localWorkStart, setLocalWorkStart] = useState(workHoursStart);
  const [localWorkEnd, setLocalWorkEnd] = useState(workHoursEnd);
  const [localEnabled, setLocalEnabled] = useState(enabled);
  const [localDarkMode, setLocalDarkMode] = useState(darkMode);
  const [localMessage, setLocalMessage] = useState(customMessage);

  // Track if there are unsaved changes
  const [hasChanges, setHasChanges] = useState(false);

  // Sync local state with props when they change from outside (e.g., reset)
  useEffect(() => {
    setLocalInterval(intervalMinutes);
    setLocalWorkStart(workHoursStart);
    setLocalWorkEnd(workHoursEnd);
    setLocalEnabled(enabled);
    setLocalDarkMode(darkMode);
    setLocalMessage(customMessage);
    setHasChanges(false);
  }, [intervalMinutes, workHoursStart, workHoursEnd, enabled, darkMode, customMessage]);

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setLocalInterval(value);
    setHasChanges(true);
  };

  const handleWorkHoursStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setLocalWorkStart(value);
    setHasChanges(true);
  };

  const handleWorkHoursEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setLocalWorkEnd(value);
    setHasChanges(true);
  };

  const handleEnabledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setLocalEnabled(value);
    setHasChanges(true);
  };

  const handleDarkModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setLocalDarkMode(value);
    setHasChanges(true);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalMessage(value);
    setHasChanges(true);
  };

  const handleSave = () => {
    setIntervalMinutes(localInterval);
    setWorkHours(localWorkStart, localWorkEnd);
    setEnabled(localEnabled);
    setDarkMode(localDarkMode);
    setCustomMessage(localMessage);
    onSave();
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Interval Setting */}
      <div>
        <label htmlFor="interval" className="block text-sm font-medium mb-2">
          Reminder Interval (minutes)
        </label>
        <input
          type="number"
          id="interval"
          min="1"
          max="120"
          value={localInterval}
          onChange={handleIntervalChange}
          className="input"
        />
      </div>

      {/* Work Hours */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="workStart" className="block text-sm font-medium mb-2">
            Start Time (hour)
          </label>
          <input
            type="number"
            id="workStart"
            min="0"
            max="23"
            value={localWorkStart}
            onChange={handleWorkHoursStartChange}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="workEnd" className="block text-sm font-medium mb-2">
            End Time (hour)
          </label>
          <input
            type="number"
            id="workEnd"
            min="0"
            max="23"
            value={localWorkEnd}
            onChange={handleWorkHoursEndChange}
            className="input"
          />
        </div>
      </div>

      {/* Custom Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Custom Reminder Message
        </label>
        <input
          type="text"
          id="message"
          value={localMessage}
          onChange={handleMessageChange}
          className="input"
          placeholder="Time to stretch!"
        />
      </div>

      {/* Toggles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="enabled" className="text-sm font-medium">
            Enable Reminders
          </label>
          <input
            type="checkbox"
            id="enabled"
            checked={localEnabled}
            onChange={handleEnabledChange}
            className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="darkMode" className="text-sm font-medium">
            Dark Mode
          </label>
          <input
            type="checkbox"
            id="darkMode"
            checked={localDarkMode}
            onChange={handleDarkModeChange}
            className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        type="button"
        onClick={handleSave}
        disabled={!hasChanges}
        className={`btn-primary w-full mt-6 ${!hasChanges ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {hasChanges ? 'Save Changes' : 'No Changes'}
      </button>
    </div>
  );
}
