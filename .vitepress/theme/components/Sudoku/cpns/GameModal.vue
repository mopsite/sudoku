<script setup>
defineProps({
  show: { type: Boolean, default: false },
  type: { type: String, default: 'win' },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  btnText: { type: String, default: '确定' }
})

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="overlay" @click.self="emit('close')">
      <div class="modal">
        <div class="icon" :class="type">
          <svg v-if="type === 'win'" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          <svg v-else viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        </div>
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        <button class="btn" @click="emit('close')">{{ btnText }}</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: var(--sudoku-overlay);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.modal {
  background: var(--sudoku-modal-bg);
  padding: 48px 56px;
  border-radius: 28px;
  text-align: center;
  box-shadow: 0 0 60px var(--sudoku-selection-glow), 0 24px 48px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--sudoku-border);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 30px var(--sudoku-selection-glow); }
  50% { box-shadow: 0 0 50px var(--sudoku-selection-glow); }
}

.icon.win { background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%); }
.icon.lose { background: linear-gradient(135deg, #ff3366 0%, #ff6b6b 100%); }

.icon svg {
  width: 44px;
  height: 44px;
  fill: #fff;
  filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));
}

h2 {
  margin: 0 0 12px;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--sudoku-text);
  text-shadow: 0 0 20px var(--sudoku-selection-glow);
}

p {
  margin: 0 0 32px;
  color: var(--sudoku-text);
  opacity: 0.7;
  font-size: 1rem;
}

.btn {
  padding: 16px 48px;
  border: none;
  border-radius: 16px;
  background: var(--sudoku-btn-hover);
  color: var(--sudoku-btn-hover-text);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 0 20px var(--sudoku-selection-glow);
}

.btn:hover {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 0 40px var(--sudoku-selection-glow);
}
</style>
