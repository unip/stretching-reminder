import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

interface MockNotificationType {
  title: string;
  body: string;
  onclick: (() => void) | null;
  onaction: ((_: any, index: number) => void) | null;
  actions: Array<{ type: string; text: string }> | undefined;
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
    onaction: ((_: any, index: number) => void) | null = null;
    actions: Array<{ type: string; text: string }> | undefined;

    constructor(options: { title: string; body: string; actions?: Array<{ type: string; text: string }> }) {
      this.title = options.title;
      this.body = options.body;
      this.actions = options.actions;
      mockState.notifications.push(this);
    }

    on(event: string, callback: () => void) {
      if (event === 'click') {
        this.onclick = callback;
      } else if (event === 'action') {
        this.onaction = callback;
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

  it('should show reminder with action buttons', () => {
    notificationService.showReminder('Time to stretch!');
    const notification = mockState.notifications[0];
    expect(notification.actions).toEqual([
      { type: 'button', text: 'Snooze 5 min' },
      { type: 'button', text: 'Skip' },
    ]);
  });

  it('should emit snooze action when first button is clicked', () => {
    const actionHandler = vi.fn();
    notificationService.on('action', actionHandler);
    
    notificationService.showReminder('Time to stretch!');
    const notification = mockState.notifications[0];
    
    if (notification.onaction) {
      notification.onaction(null, 0); // Index 0 = Snooze
    }

    expect(actionHandler).toHaveBeenCalledWith('snooze');
  });

  it('should emit skip action when second button is clicked', () => {
    const actionHandler = vi.fn();
    notificationService.on('action', actionHandler);
    
    notificationService.showReminder('Time to stretch!');
    const notification = mockState.notifications[0];
    
    if (notification.onaction) {
      notification.onaction(null, 1); // Index 1 = Skip
    }

    expect(actionHandler).toHaveBeenCalledWith('skip');
  });
});
