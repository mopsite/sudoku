<script setup>
import { ref } from 'vue'
import { getBoxNum } from '../scripts/sudoku'

const props = defineProps({
  title: {
    type: Object,
    default: () => ({ row: true, col: true })
  },
  onlyBox: {
    type: Boolean,
    default: false
  },
  board: {
    type: Array,
    default: () => Array.from({ length: 9 }, () => [])
  },
  specialCells: {
    type: Array,
    default: () => []
  }
})

const getCellValue = (row, col) => {
  if (!props.board[row - 1]) return ''
  const val = props.board[row - 1][col - 1]
  return val == 0 ? '' : val
}

const getCellClasses = (row, col) => {
  const box = getBoxNum(row, col)
  const baseClasses = [`cell row${row} col${col} box${box}`]

  if (!props.specialCells || props.specialCells.length === 0) {
    return baseClasses
  }

  const activeClasses = {}

  for (const item of props.specialCells) {
    if (!item.classes) continue

    const isRowMatch = item.rows ? item.rows.includes(row) : false
    const isColMatch = item.cols ? item.cols.includes(col) : false
    const isBoxMatch = item.boxes ? item.boxes.includes(box) : false
    const isCellMatch = item.cells
      ? item.cells.includes(`r${row}c${col}`)
      : false

    if (isRowMatch || isColMatch || isBoxMatch || isCellMatch) {
      activeClasses[item.classes] = true
    }
  }

  return [...baseClasses, activeClasses]
}

const opacity = ref(0)
const tipClick = () => (opacity.value = opacity.value === 0 ? 1 : 0)
</script>

<template>
  <div class="grid">
    <table @click="tipClick">
      <tbody v-if="!onlyBox">
        <tr v-if="title.col">
          <td v-if="title.row"></td>
          <td v-for="i in 9">C{{ i }}</td>
        </tr>
        <tr v-for="m in 9">
          <td v-if="title.row">R{{ m }}</td>
          <td v-for="n in 9" :class="getCellClasses(m, n)">
            <span>{{ getCellValue(m, n) }}</span>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr v-for="m in 3">
          <td
            v-for="n in 3"
            :class="['box', { 'bg-green': ((m - 1) * 3 + n) % 2 !== 0 }]"
          >
            <p>第 {{ (m - 1) * 3 + n }} 宫</p>
            <p>B{{ (m - 1) * 3 + n }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.grid {
  display: flex;
  justify-content: center;

  table {
    text-align: center;
    border-collapse: collapse;
    cursor: pointer;

    tr,
    td {
      padding: 0;
      margin: 0;
      border: none;
      background: none;
    }

    td {
      width: 40px;
      height: 40px;
    }

    .cell {
      border: 1px solid;
      font-weight: 700;
    }

    .row1 {
      border-top-width: var(--bold-board);
    }

    .row3,
    .row6,
    .row9 {
      border-bottom-width: var(--bold-board);
    }

    .col1 {
      border-left-width: var(--bold-board);
    }

    .col3,
    .col6,
    .col9 {
      border-right-width: var(--bold-board);
    }

    .box {
      width: 126px;
      height: 126px;
      border: solid var(--bold-board);

      p {
        margin: 0;
        padding: 0;
        font-weight: 700;
        font-size: 18px;
      }
    }
  }

  .tip {
    span {
      color: var(--pink);
      opacity: v-bind(opacity);
    }
  }

  .bg-green {
    background-color: var(--green);
  }

  .bg-pink {
    background-color: var(--pink);

    span {
      color: #fff;
    }
  }

  .bg-purple {
    background-color: var(--purple);

    span {
      color: #fff;
    }
  }

  .bg-yellow {
    background-color: var(--yellow);

    span {
      color: #fff;
    }
  }

  .bg-blue {
    background-color: var(--blue);

    span {
      color: #fff;
    }
  }

  .bg-orange {
    background-color: var(--orange);

    span {
      color: #fff;
    }
  }

  .font-small {
    font-size: var(--font-small);
  }
}
</style>
