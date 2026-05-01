import { onMounted, onUnmounted } from 'vue'
import { useGame } from '../stores/useGame'

export const useVisibilityPause = () => {
  if (typeof window === 'undefined') return

  const game = useGame()

  const handleVisibilityChange = () => {
    if (document.hidden) {
      game.stopTimer()
    } else {
      if (game.status === 'playing') game.startTimer()
    }
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  })
}
