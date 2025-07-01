import { onMounted, onUnmounted } from 'vue';
import { useTimerStore } from '@/stores/timerStore';

export const useTimer = () => {
  const timerStore = useTimerStore();
  
  let countdownInterval: number | null = null;
  let statusPollingInterval: number | null = null;

  async function initTimer(): Promise<void> {
    await timerStore.loadTimerStatus();
    
    if (timerStore.isTimerActive) {
      startIntervals();
    }
  }

  function startIntervals(): void {
    stopIntervals();
    
    countdownInterval = window.setInterval(() => {
      timerStore.updateCountdown();
    }, 1000);

    statusPollingInterval = window.setInterval(async () => {
      await timerStore.loadTimerStatus();
    }, 30000);
  }

  function stopIntervals(): void {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    
    if (statusPollingInterval) {
      clearInterval(statusPollingInterval);
      statusPollingInterval = null;
    }
  }

  async function handleStartTimer(): Promise<void> {
    await timerStore.startTimer();
    
    if (timerStore.isTimerActive) {
      startIntervals();
    }
  }

  async function handleStopTimer(): Promise<void> {
    await timerStore.stopTimer();
    stopIntervals();
  }

  onMounted(() => {
    initTimer();
  });

  onUnmounted(() => {
    stopIntervals();
  });

  return {
    timerStore,
    initTimer,
    handleStartTimer,
    handleStopTimer,
    startIntervals,
    stopIntervals
  };
} 
