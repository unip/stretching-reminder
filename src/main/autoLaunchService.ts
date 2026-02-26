import AutoLaunch from 'auto-launch';

export class AutoLaunchService {
  private autoLauncher: AutoLaunch;
  private enabled: boolean = false;

  constructor(appName?: string) {
    this.autoLauncher = new AutoLaunch({
      name: appName || 'Stretching Reminder',
    });
  }

  async enable(): Promise<void> {
    try {
      await this.autoLauncher.enable();
      this.enabled = true;
    } catch (error) {
      console.error('Failed to enable auto-launch:', error);
      throw error;
    }
  }

  async disable(): Promise<void> {
    try {
      await this.autoLauncher.disable();
      this.enabled = false;
    } catch (error) {
      console.error('Failed to disable auto-launch:', error);
      throw error;
    }
  }

  async checkEnabled(): Promise<boolean> {
    try {
      this.enabled = await this.autoLauncher.isEnabled();
      return this.enabled;
    } catch (error) {
      console.error('Failed to check auto-launch status:', error);
      return false;
    }
  }

  async toggle(): Promise<boolean> {
    const currentlyEnabled = await this.checkEnabled();
    if (currentlyEnabled) {
      await this.disable();
      return false;
    } else {
      await this.enable();
      return true;
    }
  }
}
