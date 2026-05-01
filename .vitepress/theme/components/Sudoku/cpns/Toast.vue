<script setup>
import { useToast } from '../stores/useToast'

const toast = useToast()
</script>

<template>
  <Transition name="toast">
    <div v-if="toast.visible" class="toast" @click="toast.hide">
      {{ toast.message }}
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  padding: 6px 14px;
  color: var(--toast-color);
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  background: var(--toast-bg);
  border: var(--toast-border);
  border-radius: var(--toast-bdrs);
  box-shadow: var(--toast-shadow);
}

.toast-enter-active {
  animation: toast-in 0.3s ease;
}

.toast-leave-active {
  animation: toast-out 0.3s ease;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateX(-50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
}

@keyframes toast-out {
  from {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) scale(0.9);
  }
}
</style>
