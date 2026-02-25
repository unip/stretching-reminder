interface TimerDisplayProps {
  remainingTime: number;
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
  isPaused = false,
  onPause,
  onResume,
  onReset,
}: TimerDisplayProps) {
  return (
    <div className="card text-center">
      <div className="mb-6">
        {isPaused && (
          <div
            data-testid="paused-indicator"
            className="text-sm font-medium mb-2 text-primary-600 dark:text-primary-400"
          >
            ⏸ PAUSED
          </div>
        )}
        <div className="text-6xl font-bold text-gray-800 dark:text-gray-100 font-mono">
          {formatTime(remainingTime)}
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        {isPaused ? (
          <button
            onClick={onResume}
            className="btn-primary"
            aria-label="Resume timer"
          >
            ▶ Resume
          </button>
        ) : (
          <button
            onClick={onPause}
            className="btn-primary"
            aria-label="Pause timer"
          >
            ⏸ Pause
          </button>
        )}
        <button
          onClick={onReset}
          className="btn-secondary"
          aria-label="Reset timer"
        >
          ↻ Reset
        </button>
      </div>
    </div>
  );
}
