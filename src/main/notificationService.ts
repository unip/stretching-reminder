import { Notification } from 'electron';

export class NotificationService {
  private currentNotification: Notification | null = null;

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
    this.show('🧘 Stretching Reminder', message || 'Time to stretch!');
  }

  close(): void {
    if (this.currentNotification) {
      this.currentNotification.close();
      this.currentNotification = null;
    }
  }

  dispose(): void {
    this.close();
  }
}
