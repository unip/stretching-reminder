import { Tray, Menu, app } from 'electron';
import path from 'path';

export class TrayService {
  private tray: Tray | null = null;

  create(onTogglePause: () => void, onOpenSettings: () => void, onQuit: () => void): void {
    // Use default icon or custom if available
    const iconPath = path.join(__dirname, '../../assets/icons/icon.png');
    
    this.tray = new Tray(iconPath || app.getAppPath());
    
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Pause/Resume',
        click: onTogglePause,
      },
      {
        label: 'Settings',
        click: onOpenSettings,
      },
      { type: 'separator' },
      {
        label: 'Quit',
        click: onQuit,
      },
    ]);

    this.tray.setContextMenu(contextMenu);
    this.tray.setToolTip('Stretching Reminder');
  }

  setToolTip(text: string): void {
    if (this.tray) {
      this.tray.setToolTip(text);
    }
  }

  destroy(): void {
    if (this.tray) {
      this.tray.destroy();
      this.tray = null;
    }
  }
}
