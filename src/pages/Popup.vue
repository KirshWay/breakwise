<script lang="ts" setup>
import { useTimer } from '@/composables/useTimer';
import TimerStatusCard from './components/TimerStatusCard.vue';
import IntervalSettings from './components/IntervalSettings.vue';
import ControlButtons from './components/ControlButtons.vue';
import LastBreakInfo from './components/LastBreakInfo.vue';
import HealthTips from './components/HealthTips.vue';
import { BicepsFlexed } from 'lucide-vue-next';

const { handleStartTimer, handleStopTimer } = useTimer();

async function quickRestart() {
  await handleStartTimer();
}
</script>

<template>
  <div class="bg-gradient-to-b from-[#a18cd1] to-[#6d5bba] h-full flex flex-col">
    <div class="bg-white/10 backdrop-blur-sm p-6 text-center flex-shrink-0">
      <div class="w-16 aspect-square rounded-full ring ring-white/80 flex items-center justify-center overflow-hidden mx-auto">
        <BicepsFlexed class="w-10 h-10 object-contain object-center" />
      </div>
      <h1 class="text-2xl font-bold text-white mt-3">BreakWise</h1>
      <p class="text-white/80 text-sm">Take care of your health 💪</p>
    </div>

    <div class="p-6 space-y-6 flex-1 overflow-y-auto">
      <TimerStatusCard />

      <IntervalSettings />

      <ControlButtons 
        @start-timer="handleStartTimer"
        @stop-timer="handleStopTimer"
        @quick-restart="quickRestart"
      />

      <LastBreakInfo />

      <HealthTips />
    </div>
  </div>
</template>
