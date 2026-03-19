<script setup>
import { ref } from 'vue'

const props = defineProps({ counts: Object, disabled: Boolean })
const emit = defineEmits(['input'])

const isPencil = ref(false)
</script>

<template>
  <div class="keyboard">
    <button
      class="key toggle-btn"
      :class="{ active: isPencil }"
      :disabled
      @click="isPencil = !isPencil"
      :title="isPencil ? '候选数模式' : '确定数模式'"
    >
      <svg v-if="isPencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        <path d="m15 5 4 4"/>
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        <path d="M2 2l7.586 7.586"/>
        <circle cx="11" cy="11" r="2"/>
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
}

.key {
  flex: 1;
  aspect-ratio: 1;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: clamp(18px, 4vw, 28px);
  font-weight: 600;
  cursor: pointer;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.key:hover:not(:disabled) { background: var(--vp-c-bg-alt); }
.key:active:not(:disabled) { transform: scale(0.95); }
.key.hide { visibility: hidden; }
.key:disabled { opacity: 0.3; cursor: not-allowed; }

.key.candidate { color: var(--vp-c-text-2); font-weight: 400; font-size: clamp(16px, 3.5vw, 24px); }

.toggle-btn svg { width: 60%; height: 60%; }
.toggle-btn.active { background: var(--vp-c-brand-soft); border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }

@media (max-width: 768px) { .keyboard { gap: 4px; max-width: 98%; } }
</style>
