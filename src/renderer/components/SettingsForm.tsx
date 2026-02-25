interface SettingsFormProps {
  intervalMinutes: number;
  workHoursStart: number;
  workHoursEnd: number;
  enabled: boolean;
  darkMode: boolean;
  customMessage: string;
  setIntervalMinutes: (minutes: number) => void;
  setWorkHours: (start: number, end: number) => void;
  toggleEnabled: () => void;
  toggleDarkMode: () => void;
  setCustomMessage: (message: string) => void;
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
  toggleEnabled,
  toggleDarkMode,
  setCustomMessage,
}: SettingsFormProps) {
  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setIntervalMinutes(value);
    }
  };

  const handleWorkHoursStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setWorkHours(value, workHoursEnd);
    }
  };

  const handleWorkHoursEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setWorkHours(workHoursStart, value);
    }
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
          value={intervalMinutes}
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
            value={workHoursStart}
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
            value={workHoursEnd}
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
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
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
            checked={enabled}
            onChange={toggleEnabled}
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
            checked={darkMode}
            onChange={toggleDarkMode}
            className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Save Button */}
      <button type="button" className="btn-primary w-full mt-6">
        Save Settings
      </button>
    </div>
  );
}
