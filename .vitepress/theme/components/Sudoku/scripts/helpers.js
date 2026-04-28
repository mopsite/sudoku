const createEmptyBoard = () => Array.from({ length: 9 }, () => Array(9).fill(0))
const copyBoard = board => board.map(row => [...row])

const getCandidates = (board, r, c) => {
  const candidates = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])

  for (let i = 0; i < 9; i++) {
    candidates.delete(board[r][i])
    candidates.delete(board[i][c])
  }

  const br = ((r / 3) | 0) * 3
  const bc = ((c / 3) | 0) * 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      candidates.delete(board[br + i][bc + j])
    }
  }

  return [...candidates]
}

const findBestEmptyCell = board => {
  let bestCell = null
  let min = 10

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== 0) continue

      const len = getCandidates(board, r, c).length

      if (len === 1) return [r, c]

      if (len < min) {
        min = len
        bestCell = [r, c]
      }
    }
  }

  return bestCell
}

const RELATED_CELLS_CACHE = Array.from({ length: 9 }, (_, r) =>
  Array.from({ length: 9 }, (_, c) => {
    const related = new Set()
    for (let i = 0; i < 9; i++) related.add(`${r}-${i}`)
    for (let i = 0; i < 9; i++) related.add(`${i}-${c}`)
    const br = Math.floor(r / 3) * 3
    const bc = Math.floor(c / 3) * 3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        related.add(`${br + i}-${bc + j}`)
      }
    }
    return Array.from(related)
  })
)

const getRelatedCells = (row, col) => RELATED_CELLS_CACHE[row][col]

const strToBoard = str => {
  if (!str) return null
  str = str.replace(/\s+/g, '')
  if (str.length !== 81) return null

  const board = createEmptyBoard()
  let idx = 0

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const ch = str[idx++]
      const num = ch === '.' || ch === '0' ? 0 : +ch
      if (isNaN(num) || num < 0 || num > 9) return null
      board[r][c] = num
    }
  }

  return board
}

const isValidBoard = board => {
  for (let i = 0; i < 9; i++) {
    const rowSet = new Set()
    const colSet = new Set()
    const boxSet = new Set()

    for (let j = 0; j < 9; j++) {
      const rowVal = board[i][j]
      if (rowVal !== 0) {
        if (rowSet.has(rowVal)) return false
        rowSet.add(rowVal)
      }

      const colVal = board[j][i]
      if (colVal !== 0) {
        if (colSet.has(colVal)) return false
        colSet.add(colVal)
      }

      const br = ((i / 3) | 0) * 3 + ((j / 3) | 0)
      const bc = (i % 3) * 3 + (j % 3)
      const boxVal = board[br][bc]
      if (boxVal !== 0) {
        if (boxSet.has(boxVal)) return false
        boxSet.add(boxVal)
      }
    }
  }
  return true
}

export {
  createEmptyBoard,
  copyBoard,
  getCandidates,
  findBestEmptyCell,
  getRelatedCells,
  strToBoard,
  isValidBoard
}
