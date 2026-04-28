import {
  copyBoard,
  createEmptyBoard,
  findBestEmptyCell,
  getCandidates
} from './helpers'
import { shuffle } from './utils'
const fillBoard = board => {
  const cell = findBestEmptyCell(board)
  if (!cell) return true

  const [r, c] = cell
  const candidates = getCandidates(board, r, c)
  if (!candidates.length) return false

  for (const num of shuffle(candidates)) {
    board[r][c] = num
    if (fillBoard(board)) return true
    board[r][c] = 0
  }

  return false
}

const countSolutions = board => {
  const cell = findBestEmptyCell(board)
  if (!cell) return 1

  const [r, c] = cell
  const candidates = getCandidates(board, r, c)
  if (!candidates.length) return 0

  let count = 0
  for (const num of candidates) {
    board[r][c] = num
    count += countSolutions(board)
    board[r][c] = 0

    if (count >= 2) return 2
  }

  return count
}

const generateSolution = board => {
  board = board ? copyBoard(board) : createEmptyBoard()
  if (fillBoard(board)) return board
  return null
}

const DIFFICULTY = { easy: 28, medium: 38, hard: 48 }

const generateSudoku = (level = 'easy') => {
  const targetBlanks = DIFFICULTY[level] || 28
  const solution = generateSolution()
  const puzzle = copyBoard(solution)
  const positions = shuffle([...Array(81).keys()])
  let removedCount = 0

  for (const pos of positions) {
    if (removedCount >= targetBlanks) break

    const r = (pos / 9) | 0
    const c = pos % 9
    const backup = puzzle[r][c]

    puzzle[r][c] = 0

    if (countSolutions(puzzle) === 1) {
      removedCount++
    } else {
      puzzle[r][c] = backup
    }
  }

  return { puzzle, solution }
}

export { countSolutions, generateSolution, generateSudoku }
