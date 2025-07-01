import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { BrowserService } from '@/services/browserService';
import type { TimerStatus, IntervalOption, LoadingState } from '@/types/timer';

export const useTimerStore = defineStore('timer', () => {
  const isTimerActive = ref(false);
  const selectedInterval = ref(30);
  const customInterval = ref(30);
  const showCustomInput = ref(false);
  const lastBreakTime = ref<number | null>(null);
  const nextBreakTime = ref<number | null>(null);
  const timeLeft = ref(0);

  const loadingState = ref<LoadingState>({
    isStarting: false,
    isStopping: false
  });

  const intervalOptions = computed((): IntervalOption[] => [
    { value: 15, label: '15 minutes', emoji: '⚡' },
    { value: 30, label: '30 minutes', emoji: '⏰' },
    { value: 45, label: '45 minutes', emoji: '🕐' },
    { value: 60, label: '1 hour', emoji: '⌚' },
    { value: 90, label: '1.5 hours', emoji: '🕰️' },
    { value: -1, label: 'Custom...', emoji: '✏️' }
  ]);

  const finalInterval = computed(() => {
    return showCustomInput.value ? customInterval.value : selectedInterval.value;
  });

  const isCustomIntervalValid = computed(() => {
    return customInterval.value >= 1 && customInterval.value <= 480;
  });

  const selectedIntervalData = computed(() => {
    if (showCustomInput.value) {
      return {
        emoji: '✏️',
        label: `${customInterval.value} ${getMinutesLabel(customInterval.value)}`
      };
    }
    return intervalOptions.value.find(opt => opt.value === selectedInterval.value) || intervalOptions.value[1];
  });

  const countdownHours = computed(() => Math.floor(timeLeft.value / 3600));
  const countdownMinutes = computed(() => Math.floor((timeLeft.value % 3600) / 60));
  const countdownSeconds = computed(() => timeLeft.value % 60);

  async function loadTimerStatus(): Promise<void> {
    try {
      const status = await BrowserService.getTimerStatus() as TimerStatus;
      
      isTimerActive.value = status.isEnabled;
      
      const presetExists = intervalOptions.value.some(opt => opt.value === status.interval);
      if (presetExists && status.interval !== -1) {
        selectedInterval.value = status.interval;
        showCustomInput.value = false;
      } else {
        selectedInterval.value = -1;
        customInterval.value = status.interval;
        showCustomInput.value = true;
      }
      
      lastBreakTime.value = status.lastBreakTime || null;
      nextBreakTime.value = status.nextAlarmTime || null;
      
      if (nextBreakTime.value) {
        const now = Date.now();
        const remaining = Math.max(0, Math.floor((nextBreakTime.value - now) / 1000));
        timeLeft.value = remaining;
      }
    } catch (error) {
      console.error('Timer status loading error:', error);
    }
  }

  async function startTimer(): Promise<void> {
    if (showCustomInput.value && !isCustomIntervalValid.value) {
      return;
    }
    
    loadingState.value.isStarting = true;
    
    try {
      isTimerActive.value = true;
      
      const response = await BrowserService.startTimer(finalInterval.value);
      
      if (response?.success) {
        await loadTimerStatus();
      } else {
        throw new Error(response?.error || 'Unknown error when starting timer');
      }
    } catch (error) {
      console.error('Timer start error:', error);
      isTimerActive.value = false;
    } finally {
      loadingState.value.isStarting = false;
    }
  }

  async function stopTimer(): Promise<void> {
    loadingState.value.isStopping = true;
    
    try {
      // Optimistic update
      isTimerActive.value = false;
      nextBreakTime.value = null;
      timeLeft.value = 0;
      
      const response = await BrowserService.stopTimer();
      
      if (!response?.success) {
        throw new Error(response?.error || 'Unknown error when stopping timer');
      }
    } catch (error) {
      console.error('Timer stop error:', error);
      // Rollback optimistic update
      await loadTimerStatus();
    } finally {
      loadingState.value.isStopping = false;
    }
  }

  function handleIntervalChange(): void {
    showCustomInput.value = selectedInterval.value === -1;
  }

  function updateCountdown(): void {
    if (nextBreakTime.value) {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((nextBreakTime.value - now) / 1000));
      timeLeft.value = remaining;
    } else {
      timeLeft.value = 0;
    }
  }

  function getMinutesLabel(minutes: number): string {
    if (minutes === 1) return 'minute';
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return hours === 1 ? 'hour' : 'hours';
      }
      return `h ${remainingMinutes}m`;
    }
    return 'minutes';
  }

  function formatTime(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  return {
    isTimerActive,
    selectedInterval,
    customInterval,
    showCustomInput,
    lastBreakTime,
    nextBreakTime,
    timeLeft,
    loadingState,
    intervalOptions,
    finalInterval,
    isCustomIntervalValid,
    selectedIntervalData,
    countdownHours,
    countdownMinutes,
    countdownSeconds,
    loadTimerStatus,
    startTimer,
    stopTimer,
    handleIntervalChange,
    updateCountdown,
    formatTime
  };
}); 
