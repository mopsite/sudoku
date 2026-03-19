import DefaultTheme from 'vitepress/theme'

import Grid from './components/Grid.vue'
import Puzzle from './components/Puzzle.vue'
import Sudoku from './components/Sudoku/index.vue'

import './styles/vars.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Grid', Grid)
    app.component('Puzzle', Puzzle)
    app.component('Sudoku', Sudoku)
  }
}
