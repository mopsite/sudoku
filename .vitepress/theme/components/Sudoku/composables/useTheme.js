import { ref, watch, readonly } from 'vue'

// 主题状态（模块级单例）
const currentTheme = ref('glass')
const themes = ['glass', 'wood']

// 更新 DOM 属性
const updateDOM = (theme) => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-sudoku-theme', theme)
  }
}

// 初始化
updateDOM(currentTheme.value)

// 监听主题变化
watch(currentTheme, updateDOM)

// 导出主题管理 Hook
export function useTheme() {
  return {
    theme: readonly(currentTheme),
    toggle: () => {
      currentTheme.value = themes[(themes.indexOf(currentTheme.value) + 1) % 2]
    }
  }
}
