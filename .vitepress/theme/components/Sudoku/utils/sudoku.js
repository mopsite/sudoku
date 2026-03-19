/**
 * 数独核心算法 - 高性能优化版
 */

// 难度配置：移除的格子数
const DIFFICULTY = { easy: 25, medium: 35, hard: 45, expert: 55 }

// Fisher-Yates 洗牌
const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// 创建空棋盘
const createBoard = () => Array.from({ length: 9 }, () => Array(9).fill(0))

// 复制棋盘
const copyBoard = board => board.map(row => row.slice())

// 检查数字是否可放置
const isValid = (board, r, c, n) => {
  for (let i = 0; i < 9; i++) {
    if (board[r][i] === n || board[i][c] === n) return false
  }
  const br = (r / 3 | 0) * 3, bc = (c / 3 | 0) * 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[br + i][bc + j] === n) return false
    }
  }
  return true
}

// 查找空格
const findEmpty = board => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) return [i, j]
    }
  }
  return null
}

// 回溯填充
const fill = board => {
  const empty = findEmpty(board)
  if (!empty) return true
  const [r, c] = empty
  for (const n of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
    if (isValid(board, r, c, n)) {
      board[r][c] = n
      if (fill(board)) return true
      board[r][c] = 0
    }
  }
  return false
}

// 计算解的数量（最多到limit）
const countSolutions = (board, limit = 2) => {
  const empty = findEmpty(board)
  if (!empty) return 1
  const [r, c] = empty
  let count = 0
  for (let n = 1; n <= 9; n++) {
    if (isValid(board, r, c, n)) {
      board[r][c] = n
      count += countSolutions(board, limit - count)
      board[r][c] = 0
      if (count >= limit) return count
    }
  }
  return count
}

// 回溯求解
const solve = board => {
  const empty = findEmpty(board)
  if (!empty) return true
  const [r, c] = empty
  for (let n = 1; n <= 9; n++) {
    if (isValid(board, r, c, n)) {
      board[r][c] = n
      if (solve(board)) return true
      board[r][c] = 0
    }
  }
  return false
}

// 生成完整解
export const generateSolution = () => {
  const board = createBoard()
  fill(board)
  return board
}

// 生成题目
export const generatePuzzle = (difficulty = 'easy') => {
  const solution = generateSolution()
  const puzzle = copyBoard(solution)
  const remove = DIFFICULTY[difficulty] ?? 40
  const positions = shuffle([...Array(81).keys()])

  let removed = 0
  for (const pos of positions) {
    if (removed >= remove) break
    const r = (pos / 9) | 0, c = pos % 9
    const backup = puzzle[r][c]
    puzzle[r][c] = 0

    const test = copyBoard(puzzle)
    if (countSolutions(test) === 1) removed++
    else puzzle[r][c] = backup
  }
  return { puzzle, solution }
}

// 求解数独
export const solveSudoku = board => {
  const copy = copyBoard(board)
  return solve(copy) ? copy : null
}

// 检查是否完成
export const isComplete = board => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) return false
    }
  }
  return true
}

// 统计数字数量
export const countNumbers = board => {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
  if (!board?.length) return counts
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const n = board[i][j]
      if (n > 0) counts[n]++
    }
  }
  return counts
}

// 从字符串解析题目（81个字符，0或.表示空格）
export const parsePuzzle = str => {
  if (!str || str.length !== 81) return null
  const board = createBoard()
  for (let i = 0; i < 81; i++) {
    const ch = str[i]
    const n = ch === '.' || ch === '0' ? 0 : parseInt(ch, 10)
    if (isNaN(n) || n < 0 || n > 9) return null
    board[(i / 9) | 0][i % 9] = n
  }
  return board
}

// 验证题目是否有解
export const hasSolution = board => {
  const copy = copyBoard(board)
  return solve(copy)
}

export { isValid }
