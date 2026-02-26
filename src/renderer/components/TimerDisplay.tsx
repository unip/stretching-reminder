import ProgressRing from './ProgressRing';

interface TimerDisplayProps {
  remainingTime: number;
  interval?: number;
  isPaused?: boolean;
  onPause?: () => void;
  onResume?: () => void;
  onReset?: () => void;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function TimerDisplay({
  remainingTime,
  interval,
  isPaused = false,
  onPause,
  onResume,
  onReset
}: TimerDisplayProps) {
  // Calculate progress percentage (0-100)
  const progress = interval ? (remainingTime / interval) * 100 : 0;

  return (
    <div className="text-center card">
      <div className="mb-6">
        {isPaused && (
          <div
            data-testid="paused-indicator"
            className="mb-2 text-sm font-medium text-primary-600 dark:text-primary-400"
          >
            ⏸ PAUSED
          </div>
        )}

        {/* Progress Ring with Timer */}
        <div className="flex justify-center mb-6">
          <ProgressRing
            progress={progress}
            size={220}
            strokeWidth={18}
            showPercentage={true}
            isComplete={remainingTime === 0}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-gray-800 dark:text-gray-100">
                {formatTime(remainingTime)}
              </div>
            </div>
          </ProgressRing>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        {isPaused ? (
          <button onClick={onResume} className="btn-primary" aria-label="Resume timer">
            ▶ Resume
          </button>
        ) : (
          <button onClick={onPause} className="btn-primary" aria-label="Pause timer">
            ⏸ Pause
          </button>
        )}
        <button onClick={onReset} className="btn-secondary" aria-label="Reset timer">
          ↻ Reset
        </button>
      </div>
    </div>
  );
}
