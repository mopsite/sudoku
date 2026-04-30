<script setup>
import { computed } from 'vue'
import { useGame } from '../stores/useGame'
import { useGameControl } from '../composables/useGameControl'
import { useCustom } from '../stores/useCustom'
import { useSound } from '../stores/useSound'
import { useTheme } from '../stores/useTheme'

import IconHint from '../icons/IconHint.vue'
import IconRestart from '../icons/IconRestart.vue'
import IconTheme from '../icons/IconTheme.vue'
import IconSoundOn from '../icons/IconSoundOn.vue'
import IconSoundOff from '../icons/IconSoundOff.vue'

const game = useGame()
const control = useGameControl()
const custom = useCustom()
const sound = useSound()
const theme = useTheme()

const handleLevelChange = e => {
  control.startNewGame(e.target.value)
}

const displayLevel = computed(() => {
  if (custom.visible) return 'custom'
  return game.level
})

const formattedTime = computed(() => {
  const minutes = Math.floor(game.time / 60)
  const seconds = game.time % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})
</script>

<template>
  <div class="control-bar">
    <select class="btn level" :value="displayLevel" @change="handleLevelChange">
      <option value="easy">简单</option>
      <option value="medium">中等</option>
      <option value="hard">困难</option>
      <option value="custom">自定义</option>
    </select>
    <div
      class="btn"
      :class="{ disabled: game.hints <= 0 }"
      @click="game.hints > 0 && game.useHint()"
    >
      <IconHint />
    </div>
    <div class="btn" @click="control.startNewGame()"><IconRestart /></div>
    <div class="btn" @click="theme.toggle"><IconTheme /></div>
    <div class="btn" @click="sound.toggle">
      <IconSoundOn v-if="sound.enabled" />
      <IconSoundOff v-else />
    </div>
    <div class="btn timer">{{ formattedTime }}</div>
  </div>
</template>

<style scoped>
.control-bar {
  width: 80%;
  margin: 0 auto;
  padding: var(--cpn-padding);
  display: flex;
  gap: var(--cpn-gap);
  background: var(--cpn-bg);
  border: var(--cpn-border);
  border-radius: var(--cpn-bdrs);
  box-shadow: var(--cpn-shadow);

  .btn {
    flex: 1;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--cell-bg);
    border: var(--cell-border);
    border-radius: var(--cell-bdrs);
    box-shadow: var(--cell-shadow);
    cursor: pointer;

    &.level,
    &.timer {
      flex: 2;
      aspect-ratio: auto;
      text-align: center;
      text-align-last: center;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      user-select: none;
    }

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
