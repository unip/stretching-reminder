import { Notification } from 'electron';
import { EventEmitter } from 'events';

export type NotificationAction = 'snooze' | 'skip';

export class NotificationService extends EventEmitter {
  private currentNotification: Notification | null = null;

  constructor() {
    super();
  }

  show(title?: string, body?: string, onClick?: () => void): void {
    // Close existing notification
    if (this.currentNotification) {
      this.currentNotification.close();
    }

    this.currentNotification = new Notification({
      title: title || 'Stretching Reminder',
      body: body || 'Time to stretch!',
    });

    if (onClick) {
      this.currentNotification.on('click', onClick);
    }

    this.currentNotification.show();
  }

  showReminder(message?: string): void {
    // Close existing notification
    if (this.currentNotification) {
      this.currentNotification.close();
    }

    // Add action buttons for snooze and skip
    this.currentNotification = new Notification({
      title: '🧘 Stretching Reminder',
      body: message || 'Time to stretch!',
      actions: [
        { type: 'button', text: 'Snooze 5 min' },
        { type: 'button', text: 'Skip' },
      ],
    });

    this.currentNotification.on('action', (_, index) => {
      if (index === 0) {
        // Snooze button
        this.emit('action', 'snooze');
      } else if (index === 1) {
        // Skip button
        this.emit('action', 'skip');
      }
    });

    this.currentNotification.show();
  }

  close(): void {
    if (this.currentNotification) {
      this.currentNotification.close();
      this.currentNotification = null;
    }
  }

  dispose(): void {
    this.removeAllListeners();
    this.close();
  }
}
