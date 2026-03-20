<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import SudokuBoard from './cpns/SudokuBoard.vue'
import NumberKeyboard from './cpns/NumberKeyboard.vue'
import ControlBar from './cpns/ControlBar.vue'
import GameModal from './cpns/GameModal.vue'
import CustomModal from './cpns/CustomModal.vue'
import { useGame } from './composables/useGame.js'
import { useTheme } from './composables/useTheme.js'
import { parsePuzzle, hasSolution } from './utils/sudoku.js'
import './styles/themes.css'

const emit = defineEmits(['win', 'lose', 'restart'])
const game = useGame()
const { theme, toggle: toggleTheme } = useTheme()
const showModal = ref(false)
const showCustomModal = ref(false)
const errorCell = ref(null)
const difficulty = ref('medium')
const lastNonCustom = ref('medium')

const fillNumber = (n, isPencil) => {
  if (isPencil) return game.toggleCandidate(n)
  const selected = game.selected.value
  if (!selected) return
  if (game.board.value[selected.r][selected.c] !== 0) return
  if (!game.fill(n)) {
    errorCell.value = { ...selected }
    setTimeout(() => errorCell.value = null, 400)
  }
}

const onKey = e => {
  if (game.status.value !== 'playing') return
  if (e.key >= '1' && e.key <= '9') fillNumber(+e.key, false)
  else if (game.selected.value) {
    const { r, c } = game.selected.value
    if (e.key === 'ArrowUp') game.select(Math.max(0, r - 1), c)
    else if (e.key === 'ArrowDown') game.select(Math.min(8, r + 1), c)
    else if (e.key === 'ArrowLeft') game.select(r, Math.max(0, c - 1))
    else if (e.key === 'ArrowRight') game.select(r, Math.min(8, c + 1))
  }
}

onMounted(() => { game.init(); window.addEventListener('keydown', onKey) })
onUnmounted(() => window.removeEventListener('keydown', onKey))

watch(() => game.status.value, s => {
  if (s === 'won' || s === 'lost') { showModal.value = true; emit(s) }
})

const onModalClose = () => {
  showModal.value = false
  if (game.isCustom.value && game.status.value === 'won') {
    showCustomModal.value = true
  } else {
    game.init(difficulty.value === 'custom' ? lastNonCustom.value : difficulty.value)
  }
}

const onChangeDifficulty = diff => {
  if (diff === 'custom') {
    lastNonCustom.value = difficulty.value === 'custom' ? lastNonCustom.value : difficulty.value
    difficulty.value = 'custom'
    showCustomModal.value = true
  } else {
    difficulty.value = diff
    game.init(diff)
  }
}

const onCustomConfirm = str => {
  const puzzle = parsePuzzle(str)
  if (!puzzle || !hasSolution(puzzle)) return alert('无效的题目或无解')
  showCustomModal.value = false
  difficulty.value = 'custom'
  game.init('custom', puzzle)
}

const onCustomCancel = () => {
  showCustomModal.value = false
  difficulty.value = lastNonCustom.value
  game.init(lastNonCustom.value)
}

defineExpose({ init: game.init, hint: game.hint, getStatus: () => game.status.value })
</script>

<template>
  <div class="sudoku-game">
    <div class="container">
      <ControlBar
        :hints="game.hints.value"
        :max-hints="game.maxHints"
        :errors="game.errors.value"
        :status="game.status.value"
        :difficulty="difficulty"
        :theme="theme"
        @hint="game.hint()"
        @restart="game.init(difficulty === 'custom' ? lastNonCustom : difficulty); emit('restart')"
        @change-difficulty="onChangeDifficulty"
        @toggle-theme="toggleTheme"
      />
      <SudokuBoard
        :board="game.board.value"
        :initial="game.initial.value"
        :selected="game.selected.value"
        :locked="game.locked.value"
        :error-cell="errorCell"
        :candidates="game.candidates.value"
        :theme="theme"
        @select="({ r, c }) => game.select(r, c)"
      />
      <NumberKeyboard
        :counts="game.numberCounts.value"
        :disabled="game.status.value !== 'playing'"
        :theme="theme"
        @input="fillNumber"
      />
    </div>
    <GameModal
      :show="showModal"
      :type="game.status.value === 'won' ? 'win' : 'lose'"
      :title="game.status.value === 'won' ? '恭喜完成!' : '游戏结束'"
      :message="game.status.value === 'won' ? '你成功解开了这道数独!' : '错误次数已达上限!'"
      btn-text="继续"
      :theme="theme"
      @close="onModalClose"
    />
    <CustomModal
      :show="showCustomModal"
      :theme="theme"
      @confirm="onCustomConfirm"
      @cancel="onCustomCancel"
    />
  </div>
</template>

<style scoped>
.sudoku-game {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
  padding: 0 16px;
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 600px;
}

@media (max-width: 768px) {
  .sudoku-game { padding: 0 8px; }
  .container { gap: 12px; }
}
</style>
