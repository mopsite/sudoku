// stores/useCustom.js
import { defineStore } from 'pinia'

export const useCustom = defineStore('custom', {
  state: () => ({
    visible: false,
    resolvePromise: null
  }),

  actions: {
    show() {
      return new Promise(resolve => {
        this.visible = true
        this.resolvePromise = resolve
      })
    },

    confirm(puzzle, solution) {
      if (this.resolvePromise) {
        this.resolvePromise({ success: true, puzzle, solution })
      }
      this.visible = false
    },

    cancel() {
      if (this.resolvePromise) {
        this.resolvePromise({ success: false })
      }
      this.visible = false
    }
  }
})
