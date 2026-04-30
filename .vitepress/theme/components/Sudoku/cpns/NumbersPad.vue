<script setup>
import { useGame } from '../stores/useGame'

import IconPen from '../icons/IconPen.vue'
import IconPencil from '../icons/IconPencil.vue'

const game = useGame()

const isCandidateMarked = num => {
  if (game.mode !== 'pencil') return false

  const { row, col } = game.selectedCell
  if (row === null) return false

  return game.candidates[row][col].includes(num)
}
</script>

<template>
  <div class="numbers-pad">
    <div class="btn" @click="game.toggleMode">
      <IconPen v-if="game.mode === 'pen'" />
      <IconPencil v-else />
    </div>
    <div
      v-for="num in 9"
      :key="num"
      class="btn num"
      :class="{
        'no-style': game.mode === 'pencil' && !isCandidateMarked(num),
        marked: isCandidateMarked(num)
      }"
      :style="{
        visibility: game.numberCounts[num] >= 9 ? 'hidden' : 'visible'
      }"
      @click="game.setCellValue(num)"
    >
      {{ num }}
    </div>
  </div>
</template>

<style scoped>
.numbers-pad {
  width: 100%;
  padding: var(--cpn-padding);
  display: flex;
  gap: var(--cpn-gap);
  background: var(--cpn-bg);
  border: var(--cpn-border);
  border-radius: var(--cpn-bdrs);
  box-shadow: var(--cpn-shadow);

  .btn {
    flex: 1;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--cell-font-size);
    font-style: italic;
    background: var(--cell-bg);
    border: var(--cell-border);
    border-radius: var(--cell-bdrs);
    box-shadow: var(--cell-shadow);
    cursor: pointer;

    &:hover:is(.num) {
      color: var(--cell-hover-color);
      background: var(--cell-hover-bg);
    }

    @media (pointer: coarse) {
      &:hover:is(.num) {
        color: inherit;
        background: inherit;
      }
    }

    &.no-style {
      background: none;
      box-shadow: none;
      border-color: transparent;
    }

    &.marked {
      border: var(--cell-border);
    }
  }
}
</style>
