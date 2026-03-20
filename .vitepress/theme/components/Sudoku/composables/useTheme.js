import { ref, watch, readonly } from 'vue'

// 主题配置
const THEME_CONFIG = {
  themes: ['glass', 'wood'],
  storageKey: 'sudoku-theme',
  defaultTheme: 'glass',
  dataAttribute: 'data-sudoku-theme'
}

// 检查是否在浏览器环境
function isBrowser() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

// 获取存储的主题
function getStoredTheme() {
  if (!isBrowser()) return THEME_CONFIG.defaultTheme
  return localStorage.getItem(THEME_CONFIG.storageKey) || THEME_CONFIG.defaultTheme
}

// 主题状态（模块级单例）
const currentTheme = ref(getStoredTheme())

// 初始化主题属性
function initTheme() {
  if (!isBrowser()) return
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
  if (!isBrowser()) return
  localStorage.setItem(THEME_CONFIG.storageKey, theme)
}

// 更新 DOM 属性
function updateDOMAttribute(theme) {
  if (!isBrowser()) return
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
