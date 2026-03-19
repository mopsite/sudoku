<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import SudokuBoard from './cpns/SudokuBoard.vue'
import NumberKeyboard from './cpns/NumberKeyboard.vue'
import ControlBar from './cpns/ControlBar.vue'
import GameModal from './cpns/GameModal.vue'
import { useGame } from './composables/useGame.js'

const emit = defineEmits(['win', 'lose', 'restart'])
const game = useGame()
const showModal = ref(false)
const errorCell = ref(null)

// 填入数字或候选数
const fillNumber = (n, isCandidateMode) => {
  if (isCandidateMode) {
    // 候选数模式
    game.toggleCandidate(n)
  } else {
    // 确定数模式
    const success = game.fill(n)
    if (!success && game.selected.value) {
      // 填错时，给当前单元格添加错误效果
      errorCell.value = { ...game.selected.value }
      setTimeout(() => errorCell.value = null, 400)
    }
  }
}

// 键盘事件
const onKey = e => {
  if (game.status.value !== 'playing') return
  if (e.key >= '1' && e.key <= '9') fillNumber(+e.key)
  else if (game.selected.value) {
    const { r, c } = game.selected.value
    if (e.key === 'ArrowUp') game.select(Math.max(0, r - 1), c)
    else if (e.key === 'ArrowDown') game.select(Math.min(8, r + 1), c)
    else if (e.key === 'ArrowLeft') game.select(r, Math.max(0, c - 1))
    else if (e.key === 'ArrowRight') game.select(r, Math.min(8, c + 1))
  }
}

onMounted(() => {
  game.init()
  window.addEventListener('keydown', onKey)
})

onUnmounted(() => window.removeEventListener('keydown', onKey))

// 监听游戏状态
watch(() => game.status.value, s => {
  if (s === 'won' || s === 'lost') {
    showModal.value = true
    emit(s)
  }
})

// 模态框关闭
const onModalClose = () => {
  showModal.value = false
  game.init()
}

defineExpose({
  init: game.init,
  hint: game.hint,
  getStatus: () => game.status.value
})
</script>

<template>
  <div class="sudoku-game">
    <div class="container">
      <ControlBar
        :hints="game.hints.value"
        :max-hints="game.maxHints"
        :errors="game.errors.value"
        :status="game.status.value"
        @hint="game.hint()"
        @restart="game.init(); emit('restart')"
      />

      <SudokuBoard
        :board="game.board.value"
        :initial="game.initial.value"
        :selected="game.selected.value"
        :locked="game.locked.value"
        :error-cell="errorCell"
        :candidates="game.candidates.value"
        @select="({ r, c }) => game.select(r, c)"
      />

      <NumberKeyboard
        :counts="game.numberCounts.value"
        :disabled="game.status.value !== 'playing'"
        @input="fillNumber"
      />
    </div>

    <GameModal
      :show="showModal"
      :type="game.status.value === 'won' ? 'win' : 'lose'"
      :title="game.status.value === 'won' ? '恭喜完成!' : '游戏结束'"
      :message="game.status.value === 'won' ? '你成功解开了这道数独!' : '错误次数已达上限!'"
      btn-text="继续"
      @close="onModalClose"
    />
  </div>
</template>

<style scoped>
.sudoku-game {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
