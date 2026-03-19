/**
 * 主题管理 - 优化版
 */
import { ref, watch } from 'vue'

const THEMES = ['glass', 'wood']

export function useTheme() {
  const theme = ref(localStorage.getItem('sudoku-theme') || 'glass')

  const applyTheme = t => document.documentElement.setAttribute('data-theme', t)

  watch(theme, val => {
    localStorage.setItem('sudoku-theme', val)
    applyTheme(val)
  })

  applyTheme(theme.value)

  const toggle = () => {
    theme.value = THEMES[(THEMES.indexOf(theme.value) + 1) % THEMES.length]
  }

  return { theme, toggle }
}
