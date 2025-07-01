<script lang="ts" setup>
import { useTimerStore } from '@/stores/timerStore';
import { Info } from 'lucide-vue-next';

const timerStore = useTimerStore();
</script> 

<template>
  <div v-if="timerStore.lastBreakTime" class="alert bg-white/10 border-white/20">
    <Info class="stroke-info shrink-0 w-6 h-6 text-white" />
    <div class="text-white/90">
      <div class="font-semibold">Last reminder</div>
      <div class="text-xs opacity-80">{{ timerStore.formatTime(timerStore.lastBreakTime) }}</div>
    </div>
  </div>
</template>
