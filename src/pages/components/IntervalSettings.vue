<script lang="ts" setup>
import { useTimerStore } from '@/stores/timerStore';
import { Settings } from 'lucide-vue-next';

const timerStore = useTimerStore();
</script>

<template>
  <div class="card bg-white/10 backdrop-blur-sm border border-white/20">
    <div class="card-body p-4">
      <p class="card-title text-white text-lg"><Settings class="w-4 h-4" /> Settings</p>
      
      <div class="form-control">
        <label class="label mb-3">
          <span class="label-text text-white/90">Reminder interval:</span>
        </label>
        <select 
          v-model="timerStore.selectedInterval" 
          @change="timerStore.handleIntervalChange"
          :disabled="timerStore.isTimerActive"
          class="select select-bordered bg-white/20 text-white border-white/30 focus:border-white/60"
        >
          <option 
            v-for="option in timerStore.intervalOptions" 
            :key="option.value" 
            :value="option.value"
            class="text-black"
          >
            {{ option.emoji }} {{ option.label }}
          </option>
        </select>
      </div>

      <div v-if="timerStore.showCustomInput" class="form-control mt-4 animate-fadeIn">
        <label class="label">
          <span class="label-text text-white/90">Custom interval (minutes):</span>
        </label>
        <div class="join">
          <input 
            v-model.number="timerStore.customInterval"
            type="number"
            min="1"
            max="480"
            :disabled="timerStore.isTimerActive"
            class="input input-bordered join-item flex-1 bg-white/20 text-white border-white/30 focus:border-white/60 placeholder-white/50"
            :class="{ 'input-error': !timerStore.isCustomIntervalValid }"
            placeholder="30"
          />
          <span class="join-item btn btn-outline text-white border-white/30 bg-white/10 pointer-events-none">
            min
          </span>
        </div>
        <label class="label">
          <span 
            class="label-text-alt"
            :class="timerStore.isCustomIntervalValid ? 'text-white/60' : 'text-error'"
          >
            {{ timerStore.isCustomIntervalValid 
              ? 'From 1 minute to 8 hours' 
              : 'Enter value from 1 to 480 minutes' }}
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.input-error {
  border-color: #f87171 !important;
}

.join-item:not(:first-child) {
  margin-left: -1px;
}
</style> 
