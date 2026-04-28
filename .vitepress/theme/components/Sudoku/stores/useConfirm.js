// stores/useConfirm.js
import { defineStore } from 'pinia'

export const useConfirm = defineStore('confirm', {
  state: () => ({
    visible: false,
    message: '',
    resolvePromise: null
  }),

  actions: {
    show() {
      return new Promise(resolve => {
        this.visible = true
        this.resolvePromise = resolve
      })
    },

    confirm() {
      if (this.resolvePromise) {
        this.resolvePromise(true)
      }
      this.visible = false
    },

    cancel() {
      if (this.resolvePromise) {
        this.resolvePromise(false)
      }
      this.visible = false
    }
  }
})
