<script setup>
import { computed } from 'vue'

const props = defineProps({
  hints: { type: Number, default: 0 },
  maxHints: { type: Number, default: 3 },
  errors: { type: Number, default: 0 },
  status: { type: String, default: 'playing' },
  difficulty: { type: String, default: 'medium' }
})

const emit = defineEmits(['hint', 'restart', 'changeDifficulty'])

const options = [
  { value: 'easy', label: '简单' },
  { value: 'medium', label: '中等' },
  { value: 'hard', label: '困难' },
  { value: 'expert', label: '专家' },
  { value: 'custom', label: '自定义' }
]

const selectValue = computed({
  get: () => props.difficulty,
  set: (val) => emit('changeDifficulty', val)
})
</script>

<template>
  <div class="bar">
    <select class="select" v-model="selectValue">
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
    <button class="btn" :disabled="hints >= maxHints || status !== 'playing'" @click="emit('hint')">
      💡
      <span v-if="maxHints - hints > 0" class="badge">{{ maxHints - hints }}</span>
    </button>
    <button class="btn">
      ❌
      <span class="badge error">{{ errors }}</span>
    </button>
    <button class="btn" @click="emit('restart')">🔄</button>
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.select {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
}

.select:hover { border-color: var(--vp-c-brand-1); }
.select:focus { outline: none; border-color: var(--vp-c-brand-1); }

.btn {
  width: 48px;
  height: 48px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  background: var(--vp-c-bg);
  font-size: 20px;
  position: relative;
  transition: all 0.15s;
}

.btn:hover:not(:disabled) { background: var(--vp-c-bg-alt); }
.btn:active:not(:disabled) { transform: scale(0.95); }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }

.badge {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge.error { background: var(--vp-c-danger-1); }

@media (max-width: 768px) {
  .bar { gap: 8px; }
  .select { padding: 6px 10px; font-size: 13px; }
  .btn { width: 40px; height: 40px; font-size: 18px; }
  .badge { min-width: 18px; height: 18px; font-size: 10px; }
}
</style>
