import { useGame } from '../stores/useGame'
import { useTheme } from '../stores/useTheme'
import { useSound } from '../stores/useSound'

export function useAppInit() {
  const game = useGame()
  const theme = useTheme()
  const sound = useSound()

  const initPreferences = () => {
    game.initPreferences()
    theme.initPreferences()
    sound.initPreferences()
  }

  return { initPreferences }
}
