<script setup>
import { computed } from 'vue'

const props = defineProps({
  board: Array,
  initial: Array,
  selected: Object,
  locked: Set,
  errorCell: Object,
  candidates: Array
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
  <div class="board">
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
  gap: 6px;
  padding: 6px;
  border-radius: 8px;
  background: var(--vp-c-divider);
  width: 100%;
  max-width: 540px;
  aspect-ratio: 1;
}

.box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1px;
  background: var(--vp-c-divider);
}

.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s;
  min-width: 36px;
  min-height: 36px;
}

.num {
  font-size: clamp(18px, 4.5vw, 32px);
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1;
}

.cands {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  padding: 1px;
}

.c {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(10px, 2.2vw, 14px);
  font-weight: 500;
  color: var(--vp-c-text-2);
  opacity: 0;
  line-height: 1;
}

.c.v { opacity: 1; }

.sel-num { background: var(--vp-c-brand-soft); box-shadow: inset 0 0 0 1.5px var(--vp-c-brand-1); }
.sel-empty { background: var(--vp-c-danger-soft); box-shadow: inset 0 0 0 1.5px var(--vp-c-danger-1); }
.init .num { font-weight: 700; }
.error { animation: shake 0.4s ease-in-out; }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-2px); }
  40%, 80% { transform: translateX(2px); }
}

@media (max-width: 768px) {
  .board { max-width: 98%; padding: 4px; gap: 4px; }
  .box { gap: 0.5px; }
  .cell { min-width: 28px; min-height: 28px; }
}
</style>
