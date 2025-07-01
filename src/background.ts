import browser from "webextension-polyfill";
import { BrowserService } from "@/services/browserService";
import type { BreakSettings, RuntimeMessage } from "@/types/timer";

console.log("BreakWise background started");

browser.runtime.onInstalled.addListener(async (details) => {
  console.log("Extension installed:", details);
  await BrowserService.initDefaultSettings();
});


browser.runtime.onStartup.addListener(async () => {
  console.log("Browser started, checking for active timers");
  
  const settings = await BrowserService.getBreakSettings();
  if (settings?.isEnabled) {
    console.log("Restoring timer after browser restart");
    await BrowserService.createAlarm('breakReminder', settings.interval);
  }
});

browser.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'breakReminder') {
    await BrowserService.showBreakNotification();
    await stopTimerAfterNotification();
  }
});


browser.notifications.onButtonClicked.addListener(async (notificationId, buttonIndex) => {
  if (notificationId === 'breakNotification') {
    if (buttonIndex === 0) { 
      await BrowserService.clearNotification(notificationId);
    } else if (buttonIndex === 1) { 
      await BrowserService.clearNotification(notificationId);
      await handleSnooze();
    }
  }
});

browser.notifications.onClicked.addListener(async (notificationId) => {
  if (notificationId === 'breakNotification') {
    await BrowserService.clearNotification(notificationId);
  }
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const msg = message as RuntimeMessage;
  
  (async () => {
    try {
      switch (msg.action) {
        case 'startTimer':
          if (msg.interval) {
            await startBreakTimer(msg.interval);
            sendResponse({ success: true });
          } else {
            sendResponse({ success: false, error: 'No interval provided' });
          }
          break;
        case 'stopTimer':
          await stopBreakTimer();
          sendResponse({ success: true });
          break;
        case 'getTimerStatus':
          const status = await getTimerStatus();
          sendResponse(status);
          break;
      }
    } catch (error) {
      console.error('Error in background message handler:', error);
      sendResponse({ success: false, error: String(error) });
    }
  })();
  
  return true;
});

async function startBreakTimer(interval: number): Promise<void> {
  const currentSettings = await BrowserService.getBreakSettings();
  
  const settings: BreakSettings = {
    interval,
    isEnabled: true,
    lastBreakTime: currentSettings?.lastBreakTime
  };
  
  await BrowserService.saveBreakSettings(settings);
  await BrowserService.createAlarm('breakReminder', interval);
  
      console.log(`Timer started for ${interval} minutes`);
}

async function stopBreakTimer(): Promise<void> {
  await BrowserService.clearAlarm('breakReminder');
  
  const settings = await BrowserService.getBreakSettings();
  if (settings) {
    settings.isEnabled = false;
    await BrowserService.saveBreakSettings(settings);
  }
  
      console.log('Timer stopped');
}

async function stopTimerAfterNotification(): Promise<void> {
  const settings = await BrowserService.getBreakSettings();
  
  if (settings) {
    settings.lastBreakTime = Date.now();
    settings.isEnabled = false;
    await BrowserService.saveBreakSettings(settings);
    console.log('Timer stopped after reminder. User will start new cycle themselves.');
  }
}

async function handleSnooze(): Promise<void> {
  const settings = await BrowserService.getBreakSettings();
  if (settings) {
    settings.isEnabled = true;
    await BrowserService.saveBreakSettings(settings);
    await BrowserService.createAlarm('breakReminder', 5);
  }
}

async function getTimerStatus() {
  const [settings, alarm] = await Promise.all([
    BrowserService.getBreakSettings(),
    BrowserService.getAlarm('breakReminder')
  ]);
  
  return {
    isEnabled: settings?.isEnabled || false,
    interval: settings?.interval || 30,
    lastBreakTime: settings?.lastBreakTime,
    nextAlarmTime: alarm?.scheduledTime
  };
}
