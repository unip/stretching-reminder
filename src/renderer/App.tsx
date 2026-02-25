import { useState, useEffect } from 'react';
import TimerDisplay from './components/TimerDisplay';
import { TimerService } from '../main/timer';

const timerService = new TimerService();

function App() {
  const [remainingTime, setRemainingTime] = useState(timerService.getRemainingTime());
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleTick = (data?: number) => data && setRemainingTime(data);
    const handleComplete = () => {
      // TODO: Show notification
      console.log('Timer complete! Time to stretch!');
    };

    timerService.on('tick', handleTick);
    timerService.on('complete', handleComplete);

    return () => {
      timerService.off('tick', handleTick);
      timerService.off('complete', handleComplete);
    };
  }, []);

  const handlePause = () => {
    timerService.pause();
    setIsPaused(true);
  };

  const handleResume = () => {
    timerService.resume();
    setIsPaused(false);
  };

  const handleReset = () => {
    timerService.reset();
    setRemainingTime(timerService.getRemainingTime());
    setIsPaused(false);
  };

  const handleStart = () => {
    timerService.start();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            🧘 Stretching Reminder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Time to take a break and stretch!
          </p>
        </div>

        {!isPaused && remainingTime === timerService.getInterval() && !timerService.getRemainingTime() ? (
          <div className="card text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
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

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Next break in: {Math.floor(remainingTime / 60000)} minutes
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
