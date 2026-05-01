<script setup>
import { useGame } from '../stores/useGame'

const game = useGame()

const isSelected = cell => {
  const { row, col } = game.selectedCell
  return row === cell.row && col === cell.col && cell.value === 0
}

const isHighlight = cell => {
  const { value } = game.selectedCell
  return value !== 0 && cell.value === value
}

const isCandidateActive = (cell, num) => cell.candidates.includes(num)
</script>

<template>
  <div class="board">
    <div v-for="box in game.boxes" :key="box[0].box" class="box">
      <div
        v-for="cell in box"
        :key="`${cell.row}-${cell.col}`"
        class="cell"
        :class="{ selected: isSelected(cell), highlight: isHighlight(cell) }"
        @click="game.selectCell(cell)"
      >
        <span v-if="cell.value">{{ cell.value }}</span>
        <div v-else class="candidates">
          <span
            v-for="n in 9"
            :key="n"
            class="candidate"
            :class="{ active: isCandidateActive(cell, n) }"
          >
            {{ n }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board {
  width: 100%;
  aspect-ratio: 1;
  margin: 8px 0;
  padding: var(--cpn-padding);
  display: grid;
  gap: var(--cpn-gap);
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  background: var(--cpn-bg);
  border: var(--cpn-border);
  border-radius: var(--cpn-bdrs);
  box-shadow: var(--cpn-shadow);
  backdrop-filter: var(--cpn-blur);
  -webkit-backdrop-filter: var(--cpn-blur);

  .box {
    padding: var(--box-padding);
    display: grid;
    gap: var(--box-gap);
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    background: var(--box-bg);
    border: var(--box-border);
    border-radius: var(--box-bdrs);
    box-shadow: var(--box-shadow);

    .cell {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: var(--cell-font-size);
      font-weight: var(--cell-font-weight);
      background: var(--cell-bg);
      border: var(--cell-border);
      border-radius: var(--cell-bdrs);
      box-shadow: var(--cell-shadow);
      transition: var(--cell-transition);
      cursor: pointer;

      @media (pointer: fine) {
        &:hover {
          background: var(--cell-hover-bg);
        }
      }

      &.selected {
        border: var(--cell-selected-border);
      }

      &.highlight {
        border: var(--cell-highlight-border);
      }

      .candidates {
        position: absolute;
        inset: 1px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);

        .candidate {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(0.7rem, 6%, 1.1rem);
          line-height: 1;
          visibility: hidden;

          &.active {
            visibility: visible;
          }
        }
      }
    }
  }
}
</style>
