<script setup>
import { computed } from 'vue'
import { useGame } from '../stores/useGame'
import { useGameControl } from '../composables/useGameControl'

import IconWin from '../icons/IconWin.vue'
import IconLose from '../icons/IconLose.vue'

const game = useGame()
const control = useGameControl()

const modalInfo = computed(() => {
  if (game.status === 'won') {
    return {
      title: '恭喜完成',
      message: `本局得分：${game.score} | 历史最高：${game.highScores[game.level]}`
    }
  } else {
    return {
      title: '游戏结束',
      message: '3 次错误机会已用完'
    }
  }
})
</script>

<template>
  <div v-if="game.status !== 'playing'" class="overlay">
    <div class="modal">
      <div class="icon" :class="game.status === 'won' ? 'won' : 'lost'">
        <IconWin v-if="game.status === 'won'" />
        <IconLose v-else />
      </div>
      <h2>{{ modalInfo.title }}</h2>
      <p>{{ modalInfo.message }}</p>
      <button @click="control.handleContinue()">继续</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--modal-color);
    background: var(--modal-bg);
    border: var(--modal-border);
    border-radius: var(--modal-bdrs);
    box-shadow: var(--modal-shadow);
    backdrop-filter: var(--cpn-blur);
    -webkit-backdrop-filter: var(--cpn-blur);

    .icon {
      width: 72px;
      height: 72px;
      margin: 0 auto 20px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      &.won {
        background: var(--icon-won-bg);
        box-shadow: var(--icon-won-shadow);
      }

      &.lost {
        background: var(--icon-lost-bg);
        box-shadow: var(--icon-lost-shadow);
      }

      svg {
        width: 36px;
        height: 36px;
        fill: none;
        @media (pointer: fine) {
          &:hover {
            fill: none;
          }
        }
      }
    }

    h2 {
      margin: 0 0 10px;
      font-size: 1.6rem;
      font-weight: 700;
    }

    p {
      margin: 0 0 28px;
      font-size: 1rem;
    }

    button {
      padding: 14px 40px;
      font-size: 1rem;
      font-weight: 600;
      color: var(--modal-btn-color);
      background: var(--modal-btn-bg);
      border: var(--modal-btn-border);
      border-radius: var(--modal-btn-bdrs);
      box-shadow: var(--modal-btn-shadow);
    }
  }
}
</style>
