import DefaultTheme from 'vitepress/theme'
import { createPinia } from 'pinia'

const pinia = createPinia()

import Grid from './components/Grid.vue'
import Puzzle from './components/Puzzle.vue'
import Sudoku from './components/Sudoku/index.vue'

import './styles/vars.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(pinia)
    app.component('Grid', Grid)
    app.component('Puzzle', Puzzle)
    app.component('Sudoku', Sudoku)
  }
}
