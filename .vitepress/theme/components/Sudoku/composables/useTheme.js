import { ref, watch, readonly } from 'vue'

// 主题配置
const THEME_CONFIG = {
  themes: ['glass', 'wood'],
  storageKey: 'sudoku-theme',
  defaultTheme: 'glass',
  dataAttribute: 'data-sudoku-theme'
}

// 主题状态（模块级单例）
const currentTheme = ref(
  localStorage.getItem(THEME_CONFIG.storageKey) || THEME_CONFIG.defaultTheme
)

// 初始化主题属性
function initTheme() {
  document.documentElement.setAttribute(
    THEME_CONFIG.dataAttribute,
    currentTheme.value
  )
}

// 切换到下一个主题
function toggleTheme() {
  const themes = THEME_CONFIG.themes
  const currentIndex = themes.indexOf(currentTheme.value)
  const nextIndex = (currentIndex + 1) % themes.length
  currentTheme.value = themes[nextIndex]
}

// 保存主题到本地存储
function saveTheme(theme) {
  localStorage.setItem(THEME_CONFIG.storageKey, theme)
}

// 更新 DOM 属性
function updateDOMAttribute(theme) {
  document.documentElement.setAttribute(THEME_CONFIG.dataAttribute, theme)
}

// 监听主题变化
watch(currentTheme, (newTheme) => {
  saveTheme(newTheme)
  updateDOMAttribute(newTheme)
})

// 初始化
initTheme()

// 导出主题管理 Hook
export function useTheme() {
  return {
    theme: readonly(currentTheme),
    currentTheme: currentTheme.value,
    toggle: toggleTheme,
    themes: THEME_CONFIG.themes
  }
}
