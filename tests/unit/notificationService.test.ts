import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

interface MockNotificationType {
  title: string;
  body: string;
  onclick: (() => void) | null;
  show: () => void;
  close: () => void;
  on: (event: string, callback: () => void) => void;
}

// Mock state
const mockState = {
  notifications: [] as MockNotificationType[],
  closed: 0,
};

// Mock electron Notification at the top level
vi.mock('electron', () => {
  class MockNotification implements MockNotificationType {
    title: string;
    body: string;
    onclick: (() => void) | null = null;
    
    constructor(options: { title: string; body: string }) {
      this.title = options.title;
      this.body = options.body;
      mockState.notifications.push(this);
    }
    
    on(event: string, callback: () => void) {
      if (event === 'click') {
        this.onclick = callback;
      }
    }
    
    show() {
      // Mark as shown
    }
    
    close() {
      mockState.closed++;
    }
  }

  return {
    Notification: MockNotification,
  };
});

import { NotificationService } from '../../src/main/notificationService';

describe('NotificationService', () => {
  let notificationService: NotificationService;

  beforeEach(() => {
    mockState.notifications = [];
    mockState.closed = 0;
    notificationService = new NotificationService();
  });

  afterEach(() => {
    notificationService.dispose();
  });

  it('should create notification when show is called', () => {
    notificationService.show('Test Title', 'Test Body');
    expect(mockState.notifications.length).toBe(1);
  });

  it('should call onClick handler when notification is clicked', () => {
    const onClick = vi.fn();
    notificationService.show('Title', 'Body', onClick);
    
    const notification = mockState.notifications[0];
    if (notification.onclick) {
      notification.onclick();
    }
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should close notification', () => {
    notificationService.show('Title', 'Body');
    notificationService.close();
    expect(mockState.closed).toBe(1);
  });

  it('should show reminder notification with correct title', () => {
    notificationService.showReminder('Time to stretch!');
    const notification = mockState.notifications[0];
    expect(notification.title).toBe('🧘 Stretching Reminder');
    expect(notification.body).toBe('Time to stretch!');
  });

  it('should show reminder with default message', () => {
    notificationService.showReminder();
    const notification = mockState.notifications[0];
    expect(notification.body).toBe('Time to stretch!');
  });

  it('should close existing notification before showing new one', () => {
    notificationService.show('First', 'First body');
    notificationService.show('Second', 'Second body');
    
    // First notification should be closed when second is created
    expect(mockState.closed).toBe(1);
    expect(mockState.notifications.length).toBe(2);
  });
});
