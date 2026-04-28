<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useGame } from './stores/useGame'
import { useTheme } from './stores/useTheme'
import { useKeyboardShortcuts } from './composables/useKeyboardShortcuts'
import { useVisibilityPause } from './composables/useVisibilityPause'

import ControlBar from './cpns/ControlBar.vue'
import Board from './cpns/Board.vue'
import NumbersPad from './cpns/NumbersPad.vue'
import Toast from './cpns/Toast.vue'
import Modal from './cpns/Modal.vue'
import Confirm from './cpns/Confirm.vue'

import './styles/index.css'
import Custom from './cpns/Custom.vue'

const game = useGame()
const theme = useTheme()

useKeyboardShortcuts()
useVisibilityPause()

const handleBeforeUnload = () => game.saveProgress()

onMounted(() => {
  const loaded = game.loadProgress()
  if (!loaded) game.createNewGame()
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', handleBeforeUnload)
  }
})

onUnmounted(() => {
  game.stopTimer()
  if (typeof window !== 'undefined') {
    window.removeEventListener('beforeunload', handleBeforeUnload)
  }
})
</script>

<template>
  <div class="sudoku" :data-theme="theme.current">
    <ControlBar />
    <Board />
    <NumbersPad />
    <Toast />
    <Modal />
    <Confirm />
    <Custom />
  </div>
</template>

<style scoped>
.sudoku {
  position: relative;
  width: 100%;
  max-width: var(--max-width);
  margin: 8px auto;
  user-select: none;

  * {
    box-sizing: border-box;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
}
</style>
