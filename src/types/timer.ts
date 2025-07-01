export type BreakSettings = {
  interval: number;
  isEnabled: boolean
  lastBreakTime?: number
};

export type TimerStatus = {
  isEnabled: boolean
  interval: number
  lastBreakTime?: number
  nextAlarmTime?: number
}

export type BackgroundResponse = {
  success?: boolean
  error?: string
}

export type RuntimeMessage = {
  action: 'startTimer' | 'stopTimer' | 'getTimerStatus'
  interval?: number
}

export type IntervalOption = {
  value: number
  label: string
  emoji: string
}

export type LoadingState = {
  isStarting: boolean
  isStopping: boolean
}

export type NotificationButton = {
  title: string
}

export type NotificationOptions = {
  type: 'basic' | 'image' | 'list' | 'progress'
  iconUrl: string
  title: string
  message: string;
  buttons?: NotificationButton[];
  requireInteraction?: boolean;
} 
