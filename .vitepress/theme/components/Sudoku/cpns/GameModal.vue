<script setup>
defineProps({
  show: { type: Boolean, default: false },
  type: { type: String, default: 'win' },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  btnText: { type: String, default: '确定' },
  theme: { type: String, default: 'glass' }
})

const emit = defineEmits(['close'])
</script>

<template>
  <div v-if="show" class="overlay" :class="`theme-${theme}`">
    <div class="modal">
      <div class="icon" :class="type">
        <svg v-if="type === 'win'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4"/><path d="M12 16h.01"/>
        </svg>
      </div>
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <button class="btn" @click="emit('close')">{{ btnText }}</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.modal {
  padding: 40px 48px;
  border-radius: 24px;
  text-align: center;
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon svg {
  width: 36px;
  height: 36px;
  stroke: #fff;
}

h2 {
  margin: 0 0 10px;
  font-size: 1.6rem;
  font-weight: 700;
}

p {
  margin: 0 0 28px;
  font-size: 1rem;
}

.btn {
  padding: 14px 40px;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* ========== 玻璃主题 ========== */
.overlay.theme-glass {
  background: transparent;
}

.overlay.theme-glass .modal {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  box-shadow: var(--glass-shadow-lg), var(--glass-highlight);
  border: 1px solid var(--glass-border);
}

.overlay.theme-glass .icon.win { background: var(--glass-success); box-shadow: 0 0 30px rgba(52, 199, 89, 0.5); }
.overlay.theme-glass .icon.lose { background: var(--glass-danger); box-shadow: 0 0 30px rgba(255, 59, 48, 0.5); }
.overlay.theme-glass h2 { color: var(--glass-text); }
.overlay.theme-glass p { color: var(--glass-text-soft); }
.overlay.theme-glass .btn { background: var(--glass-accent); color: #fff; box-shadow: 0 0 20px rgba(0, 122, 255, 0.3); }
.overlay.theme-glass .btn:hover { transform: scale(1.05); box-shadow: 0 0 30px rgba(0, 122, 255, 0.4); }

/* ========== 木质主题 ========== */
.overlay.theme-wood {
  background: transparent;
}

.overlay.theme-wood .modal {
  background: var(--wood-bg-light);
  box-shadow: var(--wood-shadow-lg);
  border: 3px solid var(--wood-border);
}

.overlay.theme-wood .icon.win { background: var(--wood-success); box-shadow: 0 0 30px rgba(80, 140, 60, 0.5); }
.overlay.theme-wood .icon.lose { background: var(--wood-danger); box-shadow: 0 0 30px rgba(180, 60, 30, 0.5); }
.overlay.theme-wood h2 { color: var(--wood-text); }
.overlay.theme-wood p { color: var(--wood-text-soft); }
.overlay.theme-wood .btn { background: var(--wood-accent); color: #fff; box-shadow: 0 4px 12px rgba(101, 67, 33, 0.3); }
.overlay.theme-wood .btn:hover { transform: scale(1.05); }
</style>
