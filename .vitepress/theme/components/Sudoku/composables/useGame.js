import { ref, computed, shallowRef } from 'vue'
import { generatePuzzle, isComplete, countNumbers, solveSudoku } from '../utils/sudoku.js'

const MAX_ERRORS = 3
const MAX_HINTS = 3

export function useGame() {
  const board = ref([])
  const solution = ref([])
  const initial = ref([])
  const selected = ref(null)
  const status = ref('playing')
  const errors = ref(0)
  const hints = ref(0)
  const locked = shallowRef(new Set())
  const candidates = shallowRef([])
  const isCustom = ref(false)

  const numberCounts = computed(() => countNumbers(board.value))

  const init = (diff = 'medium', customPuzzle = null) => {
    let puzzle, sol
    if (customPuzzle) {
      puzzle = customPuzzle
      sol = solveSudoku(puzzle)
      isCustom.value = true
    } else {
      const result = generatePuzzle(diff)
      puzzle = result.puzzle
      sol = result.solution
      isCustom.value = false
    }
    board.value = puzzle
    solution.value = sol
    initial.value = puzzle.map(r => r.slice())
    selected.value = null
    status.value = 'playing'
    errors.value = 0
    hints.value = 0
    locked.value = new Set()
    const newCandidates = []
    for (let i = 0; i < 9; i++) {
      newCandidates[i] = []
      for (let j = 0; j < 9; j++) {
        newCandidates[i][j] = new Set()
      }
    }
    candidates.value = newCandidates
  }

  const select = (r, c) => {
    if (status.value === 'playing') selected.value = { r, c }
  }

  const triggerUpdate = () => {
    candidates.value = candidates.value.map(row => row.map(s => new Set(s)))
  }

  const removeCandidates = (r, c, n) => {
    const arr = candidates.value
    for (let i = 0; i < 9; i++) {
      arr[r][i].delete(n)
      arr[i][c].delete(n)
    }
    const br = (r / 3 | 0) * 3, bc = (c / 3 | 0) * 3
    for (let i = br; i < br + 3; i++)
      for (let j = bc; j < bc + 3; j++)
        arr[i][j].delete(n)
    triggerUpdate()
  }

  const toggleCandidate = n => {
    if (!selected.value || status.value !== 'playing') return
    const { r, c } = selected.value
    if (initial.value[r][c] !== 0 || locked.value.has(r * 9 + c)) return
    const cell = candidates.value[r][c]
    cell.has(n) ? cell.delete(n) : cell.add(n)
    triggerUpdate()
  }

  const fill = n => {
    if (!selected.value || status.value !== 'playing') return false
    const { r, c } = selected.value
    const key = r * 9 + c
    if (initial.value[r][c] !== 0 || locked.value.has(key)) return false

    if (solution.value[r][c] === n) {
      board.value[r][c] = n
      const newLocked = new Set(locked.value)
      newLocked.add(key)
      locked.value = newLocked
      candidates.value[r][c].clear()
      removeCandidates(r, c, n)
      if (isComplete(board.value)) status.value = 'won'
      return true
    }
    errors.value++
    if (errors.value >= MAX_ERRORS) status.value = 'lost'
    return false
  }

  const hint = () => {
    if (hints.value >= MAX_HINTS || status.value !== 'playing') return null
    let r, c
    if (selected.value && board.value[selected.value.r][selected.value.c] === 0) {
      r = selected.value.r
      c = selected.value.c
    } else {
      const empty = []
      for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++)
          if (board.value[i][j] === 0) empty.push([i, j])
      if (!empty.length) return null
      ;[r, c] = empty[Math.random() * empty.length | 0]
    }
    const n = solution.value[r][c]
    board.value[r][c] = n
    const newLocked = new Set(locked.value)
    newLocked.add(r * 9 + c)
    locked.value = newLocked
    candidates.value[r][c].clear()
    removeCandidates(r, c, n)
    hints.value++
    if (isComplete(board.value)) status.value = 'won'
    return { r, c, n }
  }

  return {
    board, initial, selected, status, errors, hints, candidates,
    isCustom, numberCounts, maxHints: MAX_HINTS,
    init, select, fill, hint, toggleCandidate
  }
}
