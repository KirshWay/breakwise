import browser from 'webextension-polyfill';
import type { BreakSettings, RuntimeMessage, BackgroundResponse, NotificationOptions } from '@/types/timer';

export class BrowserService {
  static async createAlarm(name: string, delayInMinutes: number): Promise<void> {
    await browser.alarms.create(name, { delayInMinutes });
  }

  static async clearAlarm(name: string): Promise<void> {
    await browser.alarms.clear(name);
  }

  static async getAlarm(name: string) {
    return await browser.alarms.get(name);
  }

  static async showBreakNotification(): Promise<void> {
    const notificationOptions: NotificationOptions = {
      type: 'basic',
      iconUrl: '/icon/128.png',
      title: 'BreakWise - Time to stretch! 🏃‍♂️',
      message: '⏰ Stand up, stretch, do some exercises. Start a new timer yourself after the break!',
      buttons: [
        { title: 'Going to stretch! 🚶‍♂️' },
        { title: 'Postpone 5 min ⏰' }
      ],
      requireInteraction: false
    };

    await browser.notifications.create('breakNotification', notificationOptions);

    setTimeout(async () => {
      try {
        await browser.notifications.clear('breakNotification');
        console.log('Notification automatically closed after 10 seconds');
      } catch (error) {
        console.error('Error clearing notification:', error);
      }
    }, 10000);
  }

  static async clearNotification(id: string): Promise<void> {
    await browser.notifications.clear(id);
  }

  static async getBreakSettings(): Promise<BreakSettings | null> {
    const result = await browser.storage.local.get('breakSettings');
    const settings = result.breakSettings;
    
    if (settings && typeof settings === 'object' && 
        'interval' in settings && 'isEnabled' in settings) {
      return settings as BreakSettings;
    }
    
    return null;
  }

  static async saveBreakSettings(settings: BreakSettings): Promise<void> {
    await browser.storage.local.set({ breakSettings: settings });
  }

  static async initDefaultSettings(): Promise<void> {
    const defaultSettings: BreakSettings = {
      interval: 30,
      isEnabled: false
    };
    await this.saveBreakSettings(defaultSettings);
  }

  static async sendMessage(message: RuntimeMessage): Promise<BackgroundResponse> {
    return await browser.runtime.sendMessage(message) as BackgroundResponse;
  }

  static async getTimerStatus() {
    const response = await this.sendMessage({ action: 'getTimerStatus' });
    return response;
  }

  static async startTimer(interval: number): Promise<BackgroundResponse> {
    return await this.sendMessage({ action: 'startTimer', interval });
  }

  static async stopTimer(): Promise<BackgroundResponse> {
    return await this.sendMessage({ action: 'stopTimer' });
  }
} 
