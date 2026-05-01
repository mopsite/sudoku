import { defineStore } from 'pinia'
import {
  storage,
  createEmptyBoard,
  generateSudoku,
  getRelatedCells
} from '../scripts'
import { useToast } from './useToast'
import { useSound } from './useSound'

let timer = null
const SAVE_KEY = 'sudoku_progress'

const createEmptyCandidates = () =>
  Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => []))

export const useGame = defineStore('game', {
  state: () => ({
    board: createEmptyBoard(),
    solution: createEmptyBoard(),
    level: 'easy',
    previousLevel: 'easy',
    selectedCell: { row: null, col: null, value: null, isLocked: true },
    status: 'playing',
    errors: 0,
    hints: 3,
    time: 0,
    highScores: {
      easy: 0,
      medium: 0,
      hard: 0,
      custom: 0
    },
    mode: 'pen',
    candidates: createEmptyCandidates()
  }),

  getters: {
    boxes(state) {
      const group = Array.from({ length: 9 }, () => [])

      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const row = ((i / 3) | 0) * 3 + ((j / 3) | 0)
          const col = (i % 3) * 3 + (j % 3)
          const value = state.board[row][col]

          group[i].push({
            box: i,
            row,
            col,
            value,
            isLocked: value !== 0,
            candidates: state.candidates[row][col]
          })
        }
      }

      return group
    },

    score(state) {
      if (state.status !== 'won') return 0

      let score = 100

      const timeFactors = { easy: 30, medium: 50, hard: 80 }
      const timePenalty = state.time / (timeFactors[state.level] || 30)
      score -= timePenalty

      score -= state.errors * 10
      score -= (3 - state.hints) * 15

      const difficultyBonus = { easy: 0, medium: 5, hard: 10 }
      score += difficultyBonus[state.level] || 0

      return Math.max(0, Math.min(100, Math.round(score)))
    },

    numberCounts(state) {
      const counts = Array(10).fill(0) // 索引 0-9，0 不用
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          const val = state.board[r][c]
          if (val > 0) {
            counts[val]++
          }
        }
      }
      return counts
    }
  },

  actions: {
    initPreferences() {
      this.level = storage.get('sudoku_level', 'easy')
      this.highScores = storage.get('sudoku_high_scores', {
        easy: 0,
        medium: 0,
        hard: 0,
        custom: 0
      })
    },
    startTimer() {
      if (timer) return
      timer = setInterval(() => {
        this.time++
      }, 1000)
    },

    stopTimer() {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
      this.saveProgress()
    },

    saveProgress() {
      if (this.status !== 'playing') return

      const saveData = {
        board: this.board,
        solution: this.solution,
        level: this.level,
        status: this.status,
        errors: this.errors,
        hints: this.hints,
        time: this.time,
        mode: this.mode,
        candidates: this.candidates
      }

      storage.set(SAVE_KEY, saveData)
    },

    loadProgress() {
      const saveData = storage.get(SAVE_KEY)
      if (!saveData || saveData.status !== 'playing') return false

      this.board = saveData.board
      this.solution = saveData.solution
      this.level = saveData.level
      this.selectedCell = { row: null, col: null, value: null, isLocked: true }
      this.status = saveData.status
      this.errors = saveData.errors
      this.hints = saveData.hints
      this.time = saveData.time
      this.mode = saveData.mode
      this.candidates = saveData.candidates

      this.startTimer()
      return true
    },

    clearProgress() {
      storage.remove(SAVE_KEY)
    },

    createNewGame(newLevel) {
      if (newLevel && newLevel !== this.level) {
        this.previousLevel = this.level
        this.level = newLevel
      }

      storage.set('sudoku_level', this.level)

      const { puzzle, solution } = generateSudoku(this.level)
      this.board = puzzle
      this.solution = solution
      this.selectedCell = { row: null, col: null, value: null, isLocked: true }
      this.status = 'playing'
      this.errors = 0
      this.hints = 3
      this.time = 0
      this.startTimer()
      this.mode = 'pen'
      this.candidates = createEmptyCandidates()

      this.saveProgress()
    },

    loadCustomGame(puzzle, solution) {
      this.previousLevel = this.level
      this.level = 'custom'

      this.board = puzzle
      this.solution = solution
      this.selectedCell = { row: null, col: null, value: null, isLocked: true }
      this.status = 'playing'
      this.errors = 0
      this.hints = 3
      this.time = 0
      this.mode = 'pen'
      this.candidates = createEmptyCandidates()

      this.startTimer()
      this.saveProgress()
    },

    selectCell(cell) {
      if (this.status !== 'playing') return

      const sound = useSound()
      sound.playClick()

      const { row, col } = cell
      const value = this.board[row][col]
      const isLocked = value !== 0

      this.selectedCell = { row, col, value, isLocked }
    },

    setCellValue(num) {
      if (this.status !== 'playing') return

      const toast = useToast()
      const sound = useSound()
      const { row, col, isLocked } = this.selectedCell

      if (row === null || isLocked) return toast.show('请先选择一个空格')

      if (this.mode === 'pencil') {
        const list = this.candidates[row][col]
        const idx = list.indexOf(num)
        if (idx === -1) {
          list.push(num)
          list.sort((a, b) => a - b)
        } else {
          list.splice(idx, 1)
        }
        this.saveProgress()
        return
      }

      if (num === this.solution[row][col]) {
        this.board[row][col] = num
        this.selectedCell.value = num
        this.selectedCell.isLocked = true
        this._removeCandidateFromRelate(row, col, num)
        this.candidates[row][col] = []
        if (this.isComplete()) {
          sound.playWin()
          toast.hide()
          this.status = 'won'
          this.stopTimer()
          this.updateHighScore()
          this.clearProgress()
        } else {
          sound.playRight()
          this.saveProgress()
        }
      } else {
        this.errors++

        if (this.errors >= 3) {
          sound.playLose()
          toast.hide()
          this.status = 'lost'
          this.stopTimer()
          this.clearProgress()
        } else {
          sound.playWrong()
          toast.show(`填数错误，还剩 ${3 - this.errors} 次机会`)
          this.saveProgress()
        }
      }
    },

    isComplete() {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (this.board[r][c] !== this.solution[r][c]) return false
        }
      }
      return true
    },

    useHint() {
      if (this.status !== 'playing' || this.hints <= 0) return

      const toast = useToast()
      const sound = useSound()
      const { row, col, isLocked } = this.selectedCell

      if (row === null || isLocked) return toast.show('请先选择一个空格')

      const currentNum = this.solution[row][col]
      this.board[row][col] = currentNum
      this.hints--
      this.selectedCell.value = currentNum
      this.selectedCell.isLocked = true
      this._removeCandidateFromRelate(row, col, currentNum)
      this.candidates[row][col] = []

      if (this.isComplete()) {
        sound.playWin()
        toast.hide()
        this.status = 'won'
        this.stopTimer()
        this.updateHighScore()
        this.clearProgress()
      } else {
        sound.playRight()
        this.saveProgress()
      }
    },

    updateHighScore() {
      if (this.status !== 'won') return

      const currentScore = this.score
      const currentLevel = this.level

      if (currentScore > this.highScores[currentLevel] || 0) {
        this.highScores[currentLevel] = currentScore
        storage.set('sudoku_high_scores', this.highScores)
      }
    },

    toggleMode() {
      this.mode = this.mode === 'pen' ? 'pencil' : 'pen'
      this.saveProgress()
    },

    _removeCandidateFromRelate(row, col, num) {
      const relatedKeys = getRelatedCells(row, col)
      relatedKeys.forEach(key => {
        const [r, c] = key.split('-').map(Number)
        this._removeCandidate(r, c, num)
      })
    },

    _removeCandidate(row, col, num) {
      const list = this.candidates[row][col]
      const idx = list.indexOf(num)
      if (idx !== -1) list.splice(idx, 1)
    }
  }
})
