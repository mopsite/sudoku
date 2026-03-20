<script setup>
import { ref } from 'vue'

const props = defineProps({ counts: Object, disabled: Boolean, theme: { type: String, default: 'glass' } })
const emit = defineEmits(['input'])

const isPencil = ref(false)
</script>

<template>
  <div class="keyboard" :class="`theme-${theme}`">
    <button class="key toggle-btn" :class="{ active: isPencil }" :disabled @click="isPencil = !isPencil">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        <path d="m15 5 4 4"/>
      </svg>
    </button>
    <button
      v-for="n in 9" :key="n"
      class="key"
      :class="{ hide: counts[n] >= 9, candidate: isPencil }"
      :disabled="disabled || counts[n] >= 9"
      @click="emit('input', n, isPencil)"
    >{{ n }}</button>
  </div>
</template>

<style scoped>
.keyboard {
  display: flex;
  gap: 8px;
  width: 100%;
  max-width: 540px;
  padding: 12px;
  border-radius: 16px;
}

.key {
  flex: 1;
  aspect-ratio: 1;
  border-radius: 12px;
  font-size: clamp(18px, 4vw, 28px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.key.hide { visibility: hidden; }
.key:disabled { opacity: 0.3; cursor: not-allowed; }

.toggle-btn svg {
  width: 60%;
  height: 60%;
  transition: all 0.2s ease;
}

.toggle-btn:hover:not(:disabled) svg { transform: scale(1.1); }
.toggle-btn:active:not(:disabled) svg { transform: scale(0.9); }

/* ========== 玻璃主题 ========== */
.keyboard.theme-glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  box-shadow: var(--glass-shadow), var(--glass-highlight);
  border: 1px solid var(--glass-border);
}

.keyboard.theme-glass .key {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(200, 155, 200, 0.55);
  color: var(--glass-text);
  box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.8), inset 0 -2px 3px rgba(120, 60, 120, 0.1), 0 3px 6px rgba(120, 60, 120, 0.12);
}

.keyboard.theme-glass .key:hover:not(:disabled) { background: var(--glass-bg-hover); }
.keyboard.theme-glass .key:active:not(:disabled) { transform: scale(0.95); }
.keyboard.theme-glass .key.candidate { color: var(--glass-text-soft); font-weight: 400; font-size: clamp(16px, 3.5vw, 24px); }
.keyboard.theme-glass .toggle-btn.active { background: rgba(170, 80, 160, 0.25); border-color: rgba(170, 80, 160, 0.8); }
.keyboard.theme-glass .toggle-btn.active svg { stroke: rgba(170, 80, 160, 1); }

/* ========== 木质主题 ========== */
.keyboard.theme-wood {
  background: var(--wood-bg);
  box-shadow: var(--wood-shadow-lg);
  border: 2px solid var(--wood-border);
}

.keyboard.theme-wood .key {
  background: var(--wood-cell);
  border: 1px solid var(--wood-border);
  color: var(--wood-text);
  box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.4), inset 0 -2px 4px rgba(101, 67, 33, 0.15), 0 3px 6px rgba(101, 67, 33, 0.25);
}

.keyboard.theme-wood .key:hover:not(:disabled) { background: var(--wood-cell-hover); }
.keyboard.theme-wood .key:active:not(:disabled) { transform: scale(0.95); }
.keyboard.theme-wood .key.candidate { color: var(--wood-text-soft); font-weight: 400; font-size: clamp(16px, 3.5vw, 24px); }
.keyboard.theme-wood .toggle-btn.active { background: var(--wood-accent-soft); border-color: var(--wood-accent); }
.keyboard.theme-wood .toggle-btn.active svg { stroke: var(--wood-accent); }

@media (max-width: 768px) {
  .keyboard { gap: 4px; max-width: 98%; padding: 8px; border-radius: 12px; }
  .key { border-radius: 8px; }
}
</style>
