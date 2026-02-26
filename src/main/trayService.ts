import { Tray, Menu, app } from 'electron';
import path from 'path';

export class TrayService {
  private tray: Tray | null = null;

  create(onTogglePause: () => void, onOpenSettings: () => void, onQuit: () => void): void {
    const appPath = app.getAppPath();
    console.log('TrayService: App path:', appPath);
    
    let iconPath: string;
    
    if (appPath.endsWith('app.asar') || appPath.includes('resources/app')) {
      iconPath = path.join(appPath, 'dist', 'assets', 'icons', 'icon.png');
    } else {
      iconPath = path.join(appPath, 'assets', 'icons', 'icon.png');
    }

    console.log('TrayService: Icon path:', iconPath);
    
    try {
      this.tray = new Tray(iconPath);
      console.log('TrayService: Tray created successfully');
    } catch (error) {
      console.error('TrayService: Failed to create tray:', error);
      return;
    }

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
