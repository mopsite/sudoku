import { useGame } from '../stores/useGame'
import { useConfirm } from '../stores/useConfirm'
import { useCustom } from '../stores/useCustom'

export const useGameControl = () => {
  const game = useGame()
  const confirm = useConfirm()
  const custom = useCustom()

  const startNewGame = async newLevel => {
    if (!newLevel) newLevel = game.level

    if (newLevel === 'custom') {
      game.stopTimer()

      const prevLevel = game.level

      const result = await custom.show()
      if (result.success) {
        game.loadCustomGame(result.puzzle, result.solution)
      } else {
        game.startTimer()
      }

      return
    }

    if (game.status === 'playing') {
      game.stopTimer()

      const prevLevel = game.level
      game.level = newLevel

      const isConfirmed = await confirm.show()
      if (!isConfirmed) {
        game.level = prevLevel
        game.startTimer()
        return
      }
    }

    game.createNewGame(newLevel)
  }

  const handleContinue = async () => {
    if (game.level === 'custom') {
      game.stopTimer()

      const prevLevel = game.previousLevel

      const result = await custom.show()
      if (result.success) {
        game.previousLevel = prevLevel
        game.loadCustomGame(result.puzzle, result.solution)
      } else {
        game.level = prevLevel
        game.createNewGame(prevLevel)
      }
    } else {
      game.createNewGame()
    }
  }

  return { startNewGame, handleContinue }
}
