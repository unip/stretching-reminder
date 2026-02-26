import { useState } from 'react';
import type { Exercise } from '../data/exerciseLibrary';

interface ReminderModalProps {
  isOpen: boolean;
  message: string;
  exercise: Exercise;
  onSnooze: (minutes?: number) => void;
  onSkip: () => void;
  onClose: () => void;
}

const EXERCISES = []; // Kept for backwards compatibility, use exerciseLibrary instead

export default function ReminderModal({
  isOpen,
  message,
  exercise,
  onSnooze,
  onSkip,
  onClose,
}: ReminderModalProps) {
  const [showSnoozeOptions, setShowSnoozeOptions] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  if (!isOpen) return null;

  const handleSnoozeClick = () => {
    setShowSnoozeOptions(true);
  };

  const handleSnoozeSelect = (minutes: number) => {
    onSnooze(minutes);
    setShowSnoozeOptions(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card max-w-md w-full relative animate-pulse-slow">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">🧘</div>
          <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {message}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Take a quick break to stretch!
          </p>
        </div>

        {/* Exercise Suggestion */}
        <div className="bg-primary-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-primary-700 dark:text-primary-300">
              💡 {exercise.name}
            </h3>
            <span className="text-xs px-2 py-1 bg-primary-200 dark:bg-primary-800 text-primary-800 dark:text-primary-200 rounded capitalize">
              {exercise.category}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-2">{exercise.description}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ⏱ {exercise.duration}
          </p>
          
          {/* Expandable Instructions */}
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="mt-3 text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            {showInstructions ? 'Hide instructions' : 'Show instructions'} ↓
          </button>
          
          {showInstructions && (
            <div className="mt-3 pt-3 border-t border-primary-200 dark:border-gray-600">
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!showSnoozeOptions ? (
          <div className="flex gap-3">
            <button onClick={handleSnoozeClick} className="btn-secondary flex-1">
              ⏰ Snooze
            </button>
            <button onClick={onSkip} className="btn-secondary flex-1">
              ⏭ Skip
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Remind me in:
            </p>
            <div className="flex gap-2">
              <button onClick={() => handleSnoozeSelect(5)} className="btn-secondary flex-1">
                5 min
              </button>
              <button onClick={() => handleSnoozeSelect(10)} className="btn-secondary flex-1">
                10 min
              </button>
              <button onClick={() => handleSnoozeSelect(15)} className="btn-secondary flex-1">
                15 min
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { EXERCISES };
