<script lang="ts" setup>
import { useTimerStore } from '@/stores/timerStore';
import { Timer, RefreshCw, StopCircle } from 'lucide-vue-next';

defineEmits<{
  startTimer: []
  stopTimer: []
  quickRestart: []
}>();

const timerStore = useTimerStore();
</script> 

<template>
  <div class="space-y-3">
    <button 
      v-if="!timerStore.isTimerActive" 
      @click="$emit('startTimer')"
      :disabled="timerStore.loadingState.isStarting || (timerStore.showCustomInput && !timerStore.isCustomIntervalValid)"
      class="btn btn-success btn-lg w-full gap-2 text-white border-none"
      :class="{ 
        'btn-disabled': timerStore.showCustomInput && !timerStore.isCustomIntervalValid,
        'loading': timerStore.loadingState.isStarting 
      }"
    >
      <span v-if="!timerStore.loadingState.isStarting" class="loading loading-spinner loading-sm" style="display: none;"></span>
      <Timer v-if="!timerStore.loadingState.isStarting" class="h-6 w-6" />
      <span v-if="timerStore.loadingState.isStarting" class="loading loading-spinner loading-sm"></span>
      {{ timerStore.loadingState.isStarting ? 'Starting...' : 'Start Timer' }}
    </button>
    
    <button 
      v-if="!timerStore.isTimerActive && timerStore.lastBreakTime" 
      @click="$emit('quickRestart')"
      :disabled="timerStore.loadingState.isStarting"
      class="btn btn-outline btn-sm w-full gap-2 text-white border-white/30 hover:bg-white/10"
    >
      <RefreshCw class="h-4 w-4" />
      Quick Restart ({{ timerStore.selectedIntervalData.label }})
    </button>
    
    <button 
      v-else-if="timerStore.isTimerActive" 
      @click="$emit('stopTimer')"
      :disabled="timerStore.loadingState.isStopping"
      class="btn btn-error btn-lg w-full gap-2 text-white border-none"
      :class="{ 'loading': timerStore.loadingState.isStopping }"
    >
      <span v-if="!timerStore.loadingState.isStopping" class="loading loading-spinner loading-sm" style="display: none;"></span>
      <StopCircle v-if="!timerStore.loadingState.isStopping" class="h-6 w-6" />
      <span v-if="timerStore.loadingState.isStopping" class="loading loading-spinner loading-sm"></span>
      {{ timerStore.loadingState.isStopping ? 'Stopping...' : 'Stop Timer' }}
    </button>
  </div>
</template>
