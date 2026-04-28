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

// 初始化音频（同步+立即创建，不等待事件）
const initAudioContext = () => {
  if (audioContext) return
  audioContext = new (window.AudioContext || window.webkitAudioContext)()

  Object.entries(AUDIO_MAP).forEach(([key, url]) => {
    fetch(url)
      .then(res => res.arrayBuffer())
      .then(buf => audioContext.decodeAudioData(buf))
      .then(buf => audioBuffers.set(key, buf))
      .catch(() => {})
  })
}

// 立即初始化（解决首次点击没声音）
if (typeof window !== 'undefined') {
  initAudioContext()

  // 首次交互立即 resume（浏览器强制要求）
  const unlockAudio = () => {
    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }
    document.removeEventListener('click', unlockAudio)
  }
  document.addEventListener('click', unlockAudio, { once: true })
}

export const useSound = defineStore('sound', {
  state: () => ({
    enabled: storage.get('sudoku-sound', true)
  }),

  actions: {
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
