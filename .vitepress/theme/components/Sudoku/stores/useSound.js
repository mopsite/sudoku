import { defineStore } from 'pinia'
import { storage } from '../scripts'

import click from '../sounds/click.mp3'
import right from '../sounds/right.mp3'
import wrong from '../sounds/wrong.mp3'
import win from '../sounds/win.mp3'
import lose from '../sounds/lose.mp3'

const AUDIO_MAP = {
  click,
  right,
  wrong,
  win,
  lose
}

let audioContext = null
const audioBuffers = new Map()

export const useSound = defineStore('sound', {
  state: () => ({
    enabled: true
  }),

  actions: {
    initPreferences() {
      this.enabled = storage.get('sudoku-sound', true)
      this.initAudio()
    },

    initAudio() {
      if (typeof window === 'undefined' || audioContext) return

      audioContext = new (window.AudioContext || window.webkitAudioContext)()

      Object.entries(AUDIO_MAP).forEach(([key, url]) => {
        fetch(url)
          .then(res => res.arrayBuffer())
          .then(buf => audioContext.decodeAudioData(buf))
          .then(buf => audioBuffers.set(key, buf))
          .catch(() => {})
      })

      const unlockAudio = () => {
        if (audioContext.state === 'suspended') {
          audioContext.resume()
        }
        document.removeEventListener('click', unlockAudio)
      }
      document.addEventListener('click', unlockAudio, { once: true })
    },

    async play(key) {
      if (!this.enabled || !audioContext) return

      // 核心修复：确保音频上下文处于运行状态
      if (audioContext.state === 'suspended') {
        await audioContext.resume()
      }

      const buffer = audioBuffers.get(key)
      if (!buffer) return

      const source = audioContext.createBufferSource()
      source.buffer = buffer
      source.connect(audioContext.destination)
      source.start(0)
    },

    toggle() {
      this.enabled = !this.enabled
      storage.set('sudoku-sound', this.enabled)
    },

    playClick() {
      this.play('click')
    },
    playRight() {
      this.play('right')
    },
    playWrong() {
      this.play('wrong')
    },
    playWin() {
      this.play('win')
    },
    playLose() {
      this.play('lose')
    }
  }
})
