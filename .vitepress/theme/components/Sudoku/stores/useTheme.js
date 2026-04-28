import { defineStore } from 'pinia'
import { storage } from '../scripts'

const THEMES = ['default']
const STORAGE_KEY = 'sudoku_theme'

export const useTheme = defineStore('theme', {
  state: () => ({
    current: storage.get(STORAGE_KEY, THEMES[0])
  }),

  actions: {
    toggle() {
      const idx = THEMES.indexOf(this.current)
      this.current = THEMES[(idx + 1) % THEMES.length]
      storage.set(STORAGE_KEY, this.current)
    }
  }
})
