<script setup>
import { computed } from 'vue'

const props = defineProps({
  board: Array,
  initial: Array,
  selected: Object,
  errorCell: Object,
  candidates: Array,
  theme: { type: String, default: 'glass' }
})

const emit = defineEmits(['select'])

const boxes = computed(() => {
  const { board, initial, selected, errorCell, candidates } = props
  const selectedNum = selected && board[selected.r]?.[selected.c]
  const result = []

  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const cells = []
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const r = boxRow * 3 + i, c = boxCol * 3 + j
          const num = board[r]?.[c]
          const isSelected = selected?.r === r && selected?.c === c
          cells.push({
            r, c, num,
            isInit: initial[r]?.[c] !== 0,
            isError: errorCell?.r === r && errorCell?.c === c,
            state: isSelected ? (num ? 'sel-num' : 'sel-empty') : (selectedNum && num === selectedNum ? 'sel-num' : ''),
            candidates: candidates?.[r]?.[c] || new Set()
          })
        }
      }
      result.push(cells)
    }
  }
  return result
})
</script>

<template>
  <div class="board" :class="`theme-${theme}`">
    <div v-for="(box, bi) in boxes" :key="bi" class="box">
      <div
        v-for="cell in box" :key="cell.r * 9 + cell.c"
        class="cell"
        :class="[cell.state, { init: cell.isInit, error: cell.isError }]"
        @click="emit('select', { r: cell.r, c: cell.c })"
      >
        <span v-if="cell.num" class="num">{{ cell.num }}</span>
        <div v-else-if="cell.candidates.size" class="cands">
          <span v-for="n in 9" :key="n" class="c" :class="{ v: cell.candidates.has(n) }">{{ n }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 3px;
  padding: 6px;
  border-radius: 20px;
  width: 100%;
  max-width: 540px;
  aspect-ratio: 1;
}

.box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1px;
  padding: 2px;
  border-radius: 8px;
}

.cell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;
  min-width: 36px;
  min-height: 36px;
}

.num {
  font-size: clamp(22px, 5.5vw, 38px);
  font-weight: 600;
  line-height: 1;
}

.cands {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  padding: 2px;
}

.c {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(10px, 2.2vw, 14px);
  font-weight: 500;
  opacity: 0;
  line-height: 1;
}

.c.v { opacity: 1; }
.error { animation: shake 0.4s ease-in-out; }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-3px); }
  40%, 80% { transform: translateX(3px); }
}

/* ========== 玻璃主题 ========== */
.board.theme-glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  box-shadow: var(--glass-shadow-lg), var(--glass-highlight);
  border: 1px solid var(--glass-border);
}

.board.theme-glass .box {
  background: var(--glass-box-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--glass-box-border);
}

.board.theme-glass .cell {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-cell-blur));
  -webkit-backdrop-filter: blur(var(--glass-cell-blur));
  border: 1px solid var(--glass-cell-border);
  box-shadow: var(--glass-cell-shadow);
}

.board.theme-glass .cell:hover:not(.sel-num):not(.sel-empty) { background: var(--glass-bg-hover); transform: scale(1.02); }
.board.theme-glass .cell:active { transform: scale(0.96); }
.board.theme-glass .num { color: var(--glass-text); }
.board.theme-glass .c { color: var(--glass-text-soft); }
.board.theme-glass .sel-num { background: var(--glass-sel-num-bg); border-color: var(--glass-sel-num-border); box-shadow: var(--glass-sel-num-shadow); }
.board.theme-glass .sel-empty { background: var(--glass-sel-empty-bg); border-color: var(--glass-sel-empty-border); box-shadow: var(--glass-sel-empty-shadow); }
.board.theme-glass .init .num { font-weight: 700; }
.board.theme-glass .error { box-shadow: var(--glass-error-shadow); }

/* ========== 木质主题 ========== */
.board.theme-wood {
  background: var(--wood-bg);
  box-shadow: var(--wood-shadow-lg);
  border: 3px solid var(--wood-border);
}

.board.theme-wood .box {
  background: var(--wood-box-bg);
  border: 1px solid var(--wood-box-border);
}

.board.theme-wood .cell {
  background: var(--wood-cell);
  border: 1px solid var(--wood-border);
  box-shadow: var(--wood-cell-shadow);
}

.board.theme-wood .cell:hover:not(.sel-num):not(.sel-empty) { background: var(--wood-cell-hover); transform: scale(1.02); }
.board.theme-wood .cell:active { transform: scale(0.96); }
.board.theme-wood .num { color: var(--wood-text); }
.board.theme-wood .c { color: var(--wood-text-soft); }
.board.theme-wood .sel-num { background: var(--wood-accent-soft); border-color: var(--wood-accent); box-shadow: var(--wood-sel-num-shadow); }
.board.theme-wood .sel-empty { background: var(--wood-danger-soft); border-color: var(--wood-danger); box-shadow: var(--wood-sel-empty-shadow); }
.board.theme-wood .init .num { font-weight: 700; }
.board.theme-wood .error { box-shadow: var(--wood-error-shadow); }

@media (max-width: 768px) {
  .board { max-width: 98%; padding: 5px; gap: 3px; border-radius: 16px; }
  .box { gap: 1px; padding: 2px; border-radius: 6px; }
  .cell { min-width: 28px; min-height: 28px; border-radius: 6px; }
}

@media (max-width: 480px) {
  .board { max-width: 100%; padding: 4px; gap: 2px; border-radius: 12px; }
  .box { gap: 1px; padding: 1px; border-radius: 4px; }
  .cell { min-width: 24px; min-height: 24px; border-radius: 4px; }
  .c { font-size: clamp(8px, 1.8vw, 12px); }
}

@media (max-height: 700px) {
  .board { max-width: 480px; }
}

@media (max-height: 600px) {
  .board { max-width: 400px; padding: 3px; gap: 2px; }
  .cell { min-width: 22px; min-height: 22px; }
}
</style>
