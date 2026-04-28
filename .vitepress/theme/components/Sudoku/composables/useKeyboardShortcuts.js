import { onMounted, onUnmounted } from 'vue'
import { useGame } from '../stores/useGame'
import { useGameControl } from './useGameControl'
import { useTheme } from '../stores/useTheme'
import { useSound } from '../stores/useSound'

const DIFFICULTY_ORDER = ['easy', 'medium', 'hard']

export const useKeyboardShortcuts = () => {
  if (typeof window === 'undefined') return

  const game = useGame()
  const control = useGameControl()
  const theme = useTheme()
  const sound = useSound()

  const handleKeydown = e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return

    const tag = e.target.tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

    const key = e.key
    const { row, col } = game.selectedCell

    if (key >= '1' && key <= '9') {
      const num = Number(key)
      if (game.numberCounts[num] >= 9) return
      game.setCellValue(num)
      return
    }

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      e.preventDefault()

      if (row === null) {
        game.selectCell({ row: 0, col: 0 })
        return
      }

      let newRow = row
      let newCol = col

      if (key === 'ArrowUp' && row > 0) newRow--
      else if (key === 'ArrowDown' && row < 8) newRow++
      else if (key === 'ArrowLeft' && col > 0) newCol--
      else if (key === 'ArrowRight' && col < 8) newCol++

      if (newRow !== row || newCol !== col) {
        game.selectCell({ row: newRow, col: newCol })
      }
      return
    }

    const actionKey = key.toLowerCase()

    switch (actionKey) {
      case 'h':
        game.useHint()
        break
      case 'r':
        control.startNewGame()
        break
      case 's':
        sound.toggle()
        break
      case 'p':
        game.toggleMode()
        break
      case 'd': {
        const currentIdx = DIFFICULTY_ORDER.indexOf(game.level)
        const nextIdx =
          currentIdx === -1 ? 0 : (currentIdx + 1) % DIFFICULTY_ORDER.length
        control.startNewGame(DIFFICULTY_ORDER[nextIdx])
        break
      }
      case 't':
        theme.toggle()
        break
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
}
