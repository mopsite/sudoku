<script setup>
import { computed } from 'vue'

const props = defineProps({
  hints: { type: Number, default: 0 },
  maxHints: { type: Number, default: 3 },
  errors: { type: Number, default: 0 },
  status: { type: String, default: 'playing' },
  difficulty: { type: String, default: 'medium' },
  theme: { type: String, default: 'glass' }
})

const emit = defineEmits(['hint', 'restart', 'changeDifficulty', 'toggleTheme'])

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
  <div class="bar" :class="`theme-${theme}`">
    <select class="select" v-model="selectValue">
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>
    <button class="btn" :disabled="hints >= maxHints || status !== 'playing'" @click="emit('hint')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18h6"/><path d="M10 22h4"/>
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
      </svg>
      <span v-if="maxHints - hints > 0" class="badge">{{ maxHints - hints }}</span>
    </button>
    <button class="btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
      </svg>
      <span class="badge error">{{ errors }}</span>
    </button>
    <button class="btn" @click="emit('restart')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
        <path d="M3 3v5h5"/>
      </svg>
    </button>
    <button class="btn theme-btn" @click="emit('toggleTheme')">
      <span class="theme-preview" :class="theme"></span>
    </button>
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 8px;
  border-radius: 16px;
}

.select {
  padding: 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
  text-align: center;
  text-align-last: center;
}

.btn {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  transition: transform 0.15s ease, background 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn svg {
  width: 24px;
  height: 24px;
  transition: transform 0.15s ease, stroke 0.15s ease;
}

.btn:disabled { opacity: 0.3; cursor: not-allowed; }
.btn:disabled svg { opacity: 0.5; }

.badge {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-btn { padding: 8px; }
.theme-preview {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: block;
}

/* ========== 玻璃主题 ========== */
.bar.theme-glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  box-shadow: var(--glass-shadow), var(--glass-highlight);
  border: 1px solid var(--glass-border);
}

.bar.theme-glass .select {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-cell-blur));
  -webkit-backdrop-filter: blur(var(--glass-cell-blur));
  border: 1px solid var(--glass-cell-border);
  color: var(--glass-text);
  box-shadow: var(--glass-cell-shadow);
}

.bar.theme-glass .select:hover { background: var(--glass-bg-hover); border-color: var(--glass-sel-num-border); }
.bar.theme-glass .select:focus { outline: none; border-color: var(--glass-accent); }

.bar.theme-glass .btn {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-cell-blur));
  -webkit-backdrop-filter: blur(var(--glass-cell-blur));
  border: 1px solid var(--glass-cell-border);
  box-shadow: var(--glass-cell-shadow);
}

.bar.theme-glass .btn svg { stroke: var(--glass-text); }
.bar.theme-glass .btn:hover:not(:disabled) { background: var(--glass-bg-hover); }
.bar.theme-glass .btn:hover:not(:disabled) svg { stroke: var(--glass-accent); transform: scale(1.1); }
.bar.theme-glass .btn:active:not(:disabled) { transform: scale(0.95); }
.bar.theme-glass .btn:active:not(:disabled) svg { transform: scale(0.9); }

.bar.theme-glass .badge { background: var(--glass-accent); color: #fff; }
.bar.theme-glass .badge.error { background: var(--glass-danger); }

.bar.theme-glass .theme-preview.glass {
  background: var(--glass-sel-num-bg);
  border: 1px solid var(--glass-sel-num-border);
  box-shadow: var(--glass-sel-num-shadow);
}

.bar.theme-glass .theme-preview.wood {
  background: var(--wood-accent-soft);
  border: 1px solid var(--wood-accent);
  box-shadow: var(--wood-sel-num-shadow);
}

/* ========== 木质主题 ========== */
.bar.theme-wood {
  background: var(--wood-bg);
  box-shadow: var(--wood-shadow-lg);
  border: 2px solid var(--wood-border);
}

.bar.theme-wood .select {
  background: var(--wood-cell);
  border: 1px solid var(--wood-border);
  color: var(--wood-text);
  box-shadow: var(--wood-cell-shadow);
}

.bar.theme-wood .select:hover { background: var(--wood-cell-hover); }
.bar.theme-wood .select:focus { outline: none; border-color: var(--wood-accent); }

.bar.theme-wood .btn {
  background: var(--wood-cell);
  border: 1px solid var(--wood-border);
  box-shadow: var(--wood-cell-shadow);
}

.bar.theme-wood .btn svg { stroke: var(--wood-text); }
.bar.theme-wood .btn:hover:not(:disabled) { background: var(--wood-cell-hover); }
.bar.theme-wood .btn:hover:not(:disabled) svg { stroke: var(--wood-accent); transform: scale(1.1); }
.bar.theme-wood .btn:active:not(:disabled) { transform: scale(0.95); }
.bar.theme-wood .btn:active:not(:disabled) svg { transform: scale(0.9); }

.bar.theme-wood .badge { background: var(--wood-accent); color: #fff; }
.bar.theme-wood .badge.error { background: var(--wood-danger); }

.bar.theme-wood .theme-preview.glass {
  background: var(--glass-accent-soft);
  border: 1px solid var(--glass-accent);
  box-shadow: var(--glass-sel-num-shadow);
}

.bar.theme-wood .theme-preview.wood {
  background: var(--wood-accent-soft);
  border: 1px solid var(--wood-accent);
  box-shadow: var(--wood-sel-num-shadow);
}

@media (max-width: 768px) {
  .bar { gap: 4px; padding: 6px; border-radius: 12px; }
  .select { padding: 8px; font-size: 13px; border-radius: 8px; }
  .btn { width: 40px; height: 40px; border-radius: 8px; }
  .badge { min-width: 18px; height: 18px; font-size: 10px; }
  .theme-btn { padding: 6px; }
}

@media (max-width: 480px) {
  .bar { gap: 3px; padding: 4px; border-radius: 10px; }
  .select { padding: 6px; font-size: 12px; border-radius: 6px; }
  .btn { width: 36px; height: 36px; border-radius: 6px; }
  .btn svg { width: 20px; height: 20px; }
  .badge { min-width: 16px; height: 16px; font-size: 9px; }
  .theme-btn { padding: 4px; }
}

@media (max-height: 700px) {
  .bar { gap: 4px; padding: 6px; }
  .btn { width: 40px; height: 40px; }
}

@media (max-height: 600px) {
  .bar { gap: 3px; padding: 4px; }
  .select { padding: 6px; font-size: 11px; }
  .btn { width: 32px; height: 32px; }
  .btn svg { width: 18px; height: 18px; }
}
</style>
