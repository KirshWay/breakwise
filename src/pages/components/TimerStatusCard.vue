<template>
  <div class="card bg-white/10 backdrop-blur-sm border border-white/20">
    <div class="card-body p-4">
      <div class="flex items-center gap-3">
        <div class="indicator">
          <span 
            class="indicator-item badge badge-xs"
            :class="timerStore.isTimerActive ? 'badge-success' : 'badge-error'"
          ></span>
          <div class="placeholder">
            <div class="bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center">
              <span class="text-lg">{{ timerStore.isTimerActive ? '▶️' : '⏸️' }}</span>
            </div>
          </div>
        </div>
        <div class="text-white">
          <div class="font-semibold">
            {{ timerStore.isTimerActive ? 'Timer active' : 'Timer inactive' }}
          </div>
          <div class="text-xs opacity-80">
            Interval: {{ timerStore.selectedIntervalData.emoji }} {{ timerStore.selectedIntervalData.label }}
          </div>
        </div>
      </div>

      <div v-if="timerStore.isTimerActive && timerStore.timeLeft > 0" class="text-center">
        <div class="text-white/80 text-sm mb-2">Time until next reminder:</div>
        <div class="countdown font-mono text-4xl text-white">
          <span 
            :style="{ '--value': timerStore.countdownHours }" 
            aria-live="polite" 
            :aria-label="timerStore.countdownHours.toString()"
          >{{ timerStore.countdownHours.toString().padStart(2, '0') }}</span>
          :
          <span 
            :style="{ '--value': timerStore.countdownMinutes }" 
            aria-live="polite" 
            :aria-label="timerStore.countdownMinutes.toString()"
          >{{ timerStore.countdownMinutes.toString().padStart(2, '0') }}</span>
          :
          <span 
            :style="{ '--value': timerStore.countdownSeconds }" 
            aria-live="polite" 
            :aria-label="timerStore.countdownSeconds.toString()"
          >{{ timerStore.countdownSeconds.toString().padStart(2, '0') }}</span>
        </div>
        <div class="text-white/60 text-xs mt-1">hours : minutes : seconds</div>
      </div>

      <div v-else-if="timerStore.isTimerActive" class="text-center">
        <div class="loading loading-spinner loading-lg text-white"></div>
        <div class="text-white/80 text-sm mt-2">Loading...</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTimerStore } from '@/stores/timerStore';

const timerStore = useTimerStore();
</script>

<style scoped>
.countdown {
  font-variant-numeric: tabular-nums;
}

@keyframes pulse-glow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.4); 
  }
  50% { 
    box-shadow: 0 0 40px rgba(34, 197, 94, 0.6); 
  }
}

.indicator-item.badge-success {
  animation: pulse-glow 2s infinite;
}
</style> 
