/**
 * 游戏状态管理 - 极简版
 */
import { ref, computed } from 'vue'
import { generatePuzzle, isComplete, countNumbers } from '../utils/sudoku.js'

const MAX_ERRORS = 3
const MAX_HINTS = 3

export function useGame() {
  // 核心状态
  const board = ref([])
  const solution = ref([])
  const initial = ref([])
  const selected = ref(null)
  const status = ref('playing')
  const errors = ref(0)
  const hints = ref(0)
  const locked = ref(new Set())

  // 候选数状态：candidates[r][c] 是一个 Set，存储该格的候选数
  const candidates = ref([])

  // 计算属性
  const numberCounts = computed(() => countNumbers(board.value))

  // 初始化候选数数组
  const initCandidates = () => {
    candidates.value = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => new Set())
    )
  }

  // 初始化游戏
  const init = () => {
    const { puzzle, solution: sol } = generatePuzzle('medium')
    board.value = puzzle
    solution.value = sol
    initial.value = puzzle.map(r => r.slice())
    selected.value = null
    status.value = 'playing'
    errors.value = 0
    hints.value = 0
    locked.value = new Set()
    initCandidates()
  }

  // 选择单元格
  const select = (r, c) => {
    if (status.value !== 'playing') return
    selected.value = { r, c }
  }

  // 填入候选数
  const toggleCandidate = n => {
    if (!selected.value || status.value !== 'playing') return
    const { r, c } = selected.value
    const key = r * 9 + c

    // 不能在初始格或已锁定的格子上添加候选数
    if (initial.value[r][c] !== 0 || locked.value.has(key)) return

    const cellCandidates = candidates.value[r][c]
    if (cellCandidates.has(n)) {
      cellCandidates.delete(n)
    } else {
      cellCandidates.add(n)
    }
    // 触发响应式更新 - 深拷贝
    candidates.value = candidates.value.map(row => row.map(cell => new Set(cell)))
  }

  // 删除受影响单元格中的候选数
  const removeCandidateFromAffected = (r, c, n) => {
    // 删除同行、同列、同宫中的候选数 n
    for (let i = 0; i < 9; i++) {
      // 同行
      if (candidates.value[r][i].has(n)) {
        candidates.value[r][i].delete(n)
      }
      // 同列
      if (candidates.value[i][c].has(n)) {
        candidates.value[i][c].delete(n)
      }
    }
    // 同宫
    const boxRow = Math.floor(r / 3) * 3
    const boxCol = Math.floor(c / 3) * 3
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (candidates.value[i][j].has(n)) {
          candidates.value[i][j].delete(n)
        }
      }
    }
    // 触发响应式更新 - 深拷贝
    candidates.value = candidates.value.map(row => row.map(cell => new Set(cell)))
  }

  // 填入数字
  const fill = n => {
    if (!selected.value || status.value !== 'playing') return false
    const { r, c } = selected.value
    const key = r * 9 + c

    if (initial.value[r][c] !== 0 || locked.value.has(key)) return false

    if (solution.value[r][c] === n) {
      board.value[r][c] = n
      locked.value.add(key)
      // 清除当前格的候选数
      candidates.value[r][c].clear()
      // 删除受影响单元格中的候选数
      removeCandidateFromAffected(r, c, n)
      if (isComplete(board.value)) status.value = 'won'
      return true
    } else {
      errors.value++
      if (errors.value >= MAX_ERRORS) status.value = 'lost'
      return false
    }
  }

  // 使用提示
  const hint = () => {
    if (hints.value >= MAX_HINTS || status.value !== 'playing') return null

    let r, c
    if (selected.value && board.value[selected.value.r][selected.value.c] === 0) {
      r = selected.value.r
      c = selected.value.c
    } else {
      // 找到所有空格
      const empty = []
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (board.value[i][j] === 0) empty.push([i, j])
        }
      }
      if (!empty.length) return null
      ;[r, c] = empty[Math.random() * empty.length | 0]
    }

    const n = solution.value[r][c]
    board.value[r][c] = n
    locked.value.add(r * 9 + c)
    // 清除当前格的候选数
    candidates.value[r][c].clear()
    // 删除受影响单元格中的候选数
    removeCandidateFromAffected(r, c, n)
    hints.value++
    if (isComplete(board.value)) status.value = 'won'
    return { r, c, n }
  }

  return {
    board,
    solution,
    initial,
    selected,
    status,
    errors,
    hints,
    locked,
    candidates,
    numberCounts,
    maxErrors: MAX_ERRORS,
    maxHints: MAX_HINTS,
    init,
    select,
    fill,
    hint,
    toggleCandidate
  }
}
