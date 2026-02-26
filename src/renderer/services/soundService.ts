export class SoundService {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private isInitialized: boolean = false;

  constructor() {
    // Don't initialize immediately - wait for user interaction
  }

  private initAudioContext(): void {
    if (this.isInitialized) return;
    
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.isInitialized = true;
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  /**
   * Initialize audio on first user interaction
   * Call this on any user click/key press
   */
  initializeOnUserInteraction(): void {
    if (!this.isInitialized) {
      this.initAudioContext();
      // Resume if suspended (browser autoplay policy)
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
    }
  }

  /**
   * Play a gentle notification sound
   */
  playNotification(): void {
    console.log('[Sound] playNotification called, enabled:', this.enabled, 'initialized:', this.isInitialized);
    
    if (!this.enabled) {
      console.log('[Sound] Sound is disabled');
      return;
    }
    
    // Initialize on first play if not already done
    if (!this.isInitialized) {
      console.log('[Sound] Initializing audio context...');
      this.initAudioContext();
    }
    
    if (!this.audioContext) {
      console.log('[Sound] Audio context not available');
      return;
    }

    console.log('[Sound] Audio context state:', this.audioContext.state);

    // Resume audio context if suspended (browser autoplay policy)
    if (this.audioContext.state === 'suspended') {
      console.log('[Sound] Resuming suspended audio context...');
      this.audioContext.resume().then(() => {
        console.log('[Sound] Audio context resumed successfully');
      }).catch((err) => {
        console.warn('[Sound] Could not resume audio context:', err);
      });
    }

    const now = this.audioContext.currentTime;
    console.log('[Sound] Playing notification tones at time:', now);

    // Create a gentle ascending tone pattern
    this.playTone(523.25, now, 0.1); // C5
    this.playTone(659.25, now + 0.1, 0.1); // E5
    this.playTone(783.99, now + 0.2, 0.2); // G5
    
    console.log('[Sound] Notification sound scheduled');
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
