import { defineStore } from 'pinia'

export const useToast = defineStore('toast', {
  state: () => ({
    message: '',
    visible: false,
    timer: null
  }),

  actions: {
    show(msg, duration = 2000) {
      if (this.timer) clearTimeout(this.timer)

      this.message = msg
      this.visible = true

      this.timer = setTimeout(() => {
        this.hide()
      }, duration)
    },

    hide() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.visible = false
    }
  }
})
