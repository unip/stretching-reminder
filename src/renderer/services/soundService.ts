export class SoundService {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    this.initAudioContext();
  }

  private initAudioContext(): void {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  /**
   * Play a gentle notification sound
   */
  playNotification(): void {
    if (!this.enabled || !this.audioContext) return;

    // Resume audio context if suspended (browser autoplay policy)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    const now = this.audioContext.currentTime;

    // Create a gentle ascending tone pattern
    this.playTone(523.25, now, 0.1); // C5
    this.playTone(659.25, now + 0.1, 0.1); // E5
    this.playTone(783.99, now + 0.2, 0.2); // G5
  }

  /**
   * Play a single tone
   */
  private playTone(frequency: number, startTime: number, duration: number): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;

    // Fade in/out to avoid clicking
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  }

  /**
   * Play a custom tone (for testing)
   */
  playTestSound(): void {
    if (!this.enabled || !this.audioContext) return;

    const now = this.audioContext.currentTime;
    this.playTone(440, now, 0.3); // A4 test tone
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  checkEnabled(): boolean {
    return this.enabled;
  }
}
