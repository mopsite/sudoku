<script setup>
import { computed } from 'vue'

const props = defineProps({
  board: Array,
  initial: Array,
  selected: Object,
  locked: Set,
  errorCell: Object,
  candidates: Array,
  theme: { type: String, default: 'glass' }
})

const emit = defineEmits(['select'])

const boxes = computed(() => {
  const result = []
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const cells = []
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const r = boxRow * 3 + i, c = boxCol * 3 + j
          const num = props.board[r]?.[c]
          const isSelected = props.selected?.r === r && props.selected?.c === c
          const isInit = props.initial[r]?.[c] !== 0
          const sameNum = props.selected && num && props.board[props.selected.r]?.[props.selected.c] === num
          cells.push({
            r, c, num, isInit,
            isError: props.errorCell?.r === r && props.errorCell?.c === c,
            state: isSelected ? (num ? 'sel-num' : 'sel-empty') : (sameNum ? 'sel-num' : ''),
            candidates: props.candidates?.[r]?.[c] || new Set()
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
  gap: 8px;
  padding: 12px;
  border-radius: 20px;
  width: 100%;
  max-width: 540px;
  aspect-ratio: 1;
}

.box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 3px;
  padding: 4px;
  border-radius: 12px;
}

.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 36px;
  min-height: 36px;
}

.num {
  font-size: clamp(22px, 5.5vw, 38px);
  font-weight: 600;
  line-height: 1;
}

.cands {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  height: 100%;
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
  background: rgba(210, 180, 210, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(190, 145, 190, 0.45);
}

.board.theme-glass .cell {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(200, 155, 200, 0.55);
  box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.8), inset 0 -2px 3px rgba(120, 60, 120, 0.1), 0 2px 4px rgba(120, 60, 120, 0.08);
}

.board.theme-glass .cell:hover:not(.sel-num):not(.sel-empty) { background: var(--glass-bg-hover); transform: scale(1.02); }
.board.theme-glass .cell:active { transform: scale(0.96); }
.board.theme-glass .num { color: var(--glass-text); }
.board.theme-glass .c { color: var(--glass-text-soft); }
.board.theme-glass .sel-num { background: rgba(170, 80, 160, 0.25); border-color: rgba(170, 80, 160, 0.8); box-shadow: 0 0 30px rgba(170, 80, 160, 0.45), inset 0 2px 0 rgba(255, 255, 255, 0.7); }
.board.theme-glass .sel-empty { background: rgba(200, 70, 100, 0.25); border-color: rgba(200, 70, 100, 0.8); box-shadow: 0 0 30px rgba(200, 70, 100, 0.45), inset 0 2px 0 rgba(255, 255, 255, 0.7); }
.board.theme-glass .init .num { font-weight: 700; }
.board.theme-glass .error { box-shadow: 0 0 20px rgba(255, 59, 48, 0.5); }

/* ========== 木质主题 ========== */
.board.theme-wood {
  background: var(--wood-bg);
  box-shadow: var(--wood-shadow-lg);
  border: 3px solid var(--wood-border);
}

.board.theme-wood .box {
  background: rgba(101, 67, 33, 0.15);
  border: 1px solid rgba(139, 90, 43, 0.3);
}

.board.theme-wood .cell {
  background: var(--wood-cell);
  border: 1px solid var(--wood-border);
  box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.4), inset 0 -2px 4px rgba(101, 67, 33, 0.15), 0 3px 6px rgba(101, 67, 33, 0.25);
}

.board.theme-wood .cell:hover:not(.sel-num):not(.sel-empty) { background: var(--wood-cell-hover); transform: scale(1.02); }
.board.theme-wood .cell:active { transform: scale(0.96); }
.board.theme-wood .num { color: var(--wood-text); }
.board.theme-wood .c { color: var(--wood-text-soft); }
.board.theme-wood .sel-num { background: var(--wood-accent-soft); border-color: var(--wood-accent); box-shadow: 0 0 15px rgba(139, 90, 43, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.4), inset 0 -2px 4px rgba(101, 67, 33, 0.15); }
.board.theme-wood .sel-empty { background: var(--wood-danger-soft); border-color: var(--wood-danger); box-shadow: 0 0 15px rgba(180, 60, 30, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.4), inset 0 -2px 4px rgba(101, 67, 33, 0.15); }
.board.theme-wood .init .num { font-weight: 700; }
.board.theme-wood .error { box-shadow: 0 0 20px rgba(180, 60, 30, 0.5); }

@media (max-width: 768px) {
  .board { max-width: 98%; padding: 8px; gap: 6px; border-radius: 16px; }
  .box { gap: 2px; padding: 3px; border-radius: 8px; }
  .cell { min-width: 28px; min-height: 28px; border-radius: 6px; }
}
</style>
