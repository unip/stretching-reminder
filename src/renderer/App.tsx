import { useState, useEffect, useCallback } from 'react';
import TimerDisplay from './components/TimerDisplay';
import ReminderModal, { EXERCISES } from './components/ReminderModal';
import SettingsPage from './pages/SettingsPage';
import { createSettingsStore } from './store/settingsStore';
import { TimerService } from '../main/timer';

// Create shared store once
const settingsStore = createSettingsStore();
const timerService = new TimerService();

type View = 'timer' | 'settings';

function App() {
  const [currentView, setCurrentView] = useState<View>('timer');
  const [remainingTime, setRemainingTime] = useState(timerService.getRemainingTime());
  const [isPaused, setIsPaused] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(EXERCISES[0]);
  const [settings, setSettings] = useState(settingsStore.getState());
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isWithinWorkHours, setIsWithinWorkHours] = useState(true);

  // Subscribe to settings changes
  useEffect(() => {
    const unsubscribe = settingsStore.subscribe((state) => {
      setSettings({ ...state });
      // Update timer interval when settings change
      timerService.setInterval(state.intervalMinutes * 60 * 1000);
    });
    return unsubscribe;
  }, []);

  // Listen for work hours changes from main process
  useEffect(() => {
    const unsubscribe = () => {
      window.electron?.onWorkHoursChanged(() => {});
    };
    
    window.electron?.onWorkHoursChanged((state) => {
      setIsWithinWorkHours(state.isWithinWorkHours);
    });

    return unsubscribe;
  }, []);

  // Apply dark mode
  useEffect(() => {
    console.log('Applying dark mode:', settings.darkMode);
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // Initialize timer with settings
  useEffect(() => {
    timerService.setInterval(settings.intervalMinutes * 60 * 1000);
    setRemainingTime(timerService.getRemainingTime());
  }, []);

  // Timer event handlers
  useEffect(() => {
    const handleTick = (data?: number) => {
      if (data !== undefined) {
        setRemainingTime(data);
      }
    };
    const handleComplete = () => {
      const randomExercise = EXERCISES[Math.floor(Math.random() * EXERCISES.length)];
      setCurrentExercise(randomExercise);
      setShowReminder(true);
      setIsTimerStarted(false);
    };

    timerService.on('tick', handleTick);
    timerService.on('complete', handleComplete);

    return () => {
      timerService.off('tick', handleTick);
      timerService.off('complete', handleComplete);
    };
  }, []);

  const handlePause = useCallback(() => {
    timerService.pause();
    setIsPaused(true);
  }, []);

  const handleResume = useCallback(() => {
    timerService.resume();
    setIsPaused(false);
  }, []);

  const handleReset = useCallback(() => {
    timerService.reset();
    setRemainingTime(timerService.getRemainingTime());
    setIsPaused(false);
  }, []);

  const handleStart = useCallback(() => {
    timerService.start();
    setIsTimerStarted(true);
  }, []);

  const handleSnooze = useCallback((minutes: number = 5) => {
    setShowReminder(false);
    timerService.setInterval(minutes * 60 * 1000);
    timerService.reset();
    timerService.start();
  }, []);

  const handleSkip = useCallback(() => {
    setShowReminder(false);
    timerService.reset();
    timerService.start();
  }, []);

  const handleCloseReminder = useCallback(() => {
    setShowReminder(false);
  }, []);

  // Listen for notification actions from main process
  useEffect(() => {
    const handleNotificationAction = (action: 'snooze' | 'skip') => {
      if (action === 'snooze') {
        handleSnooze(5);
      } else if (action === 'skip') {
        handleSkip();
      }
    };

    window.electron?.onNotificationAction(handleNotificationAction);

    return () => {
      window.electron?.onNotificationAction(() => {});
    };
  }, [handleSnooze, handleSkip]);

  const isTimerRunning = remainingTime < timerService.getInterval() || isPaused || isTimerStarted;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {currentView === 'timer' ? (
        <div className="container mx-auto px-4 py-8 max-w-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                🧘 Stretching Reminder
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isWithinWorkHours ? (settings.enabled ? 'Active' : 'Paused') : 'Outside work hours'} • Next break in {Math.ceil(remainingTime / 60000)} min
              </p>
            </div>
            <button
              onClick={() => setCurrentView('settings')}
              className="btn-secondary text-sm"
            >
              ⚙ Settings
            </button>
          </div>

          {/* Timer or Start Button */}
          {!isTimerRunning ? (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">⏰</div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Ready to start your focus timer?
              </p>
              <button onClick={handleStart} className="btn-primary text-lg px-8 py-3">
                ▶ Start Timer
              </button>
            </div>
          ) : (
            <TimerDisplay
              remainingTime={remainingTime}
              isPaused={isPaused}
              onPause={handlePause}
              onResume={handleResume}
              onReset={handleReset}
            />
          )}

          {/* Quick Info */}
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-500">
            <p>Reminder interval: {settings.intervalMinutes} minutes</p>
            <p>Work hours: {settings.workHoursStart}:00 - {settings.workHoursEnd}:00</p>
          </div>
        </div>
      ) : (
        <SettingsPage onBack={() => setCurrentView('timer')} store={settingsStore} />
      )}

      {/* Reminder Modal */}
      <ReminderModal
        isOpen={showReminder}
        message={settings.customMessage}
        exercise={currentExercise}
        onSnooze={handleSnooze}
        onSkip={handleSkip}
        onClose={handleCloseReminder}
      />
    </div>
  );
}

export default App;
