<script setup>
import { ref, watch } from 'vue'
import { copyToClipboard } from '../scripts/utils'

defineProps({
  title: {
    type: String,
    default: ''
  },
  puzzles: {
    type: Array,
    default: () => []
  }
})

const activeIndex = ref(-1)

let timer = null
watch(activeIndex, newValue => {
  if (newValue !== -1) {
    timer = setTimeout(() => {
      activeIndex.value = -1
    }, 2000)
  }
})

function copyClick(text, index) {
  if (timer) clearTimeout(timer)
  copyToClipboard(text)
  activeIndex.value = index
}
</script>

<template>
  <div class="puzzles">
    <table>
      <thead v-if="title">
        <tr>
          <th>{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(puzzle, index) in puzzles">
          <td
            class="puzzle"
            :class="{ tip: activeIndex === index }"
            @click="copyClick(puzzle, index)"
          >
            <span>{{ puzzle }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.puzzles {
  display: flex;
  justify-content: center;

  .puzzle {
    cursor: pointer;
  }

  .tip::before {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    content: '复制成功';
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background: #333;
    border-radius: 2px;
    z-index: 10;
    white-space: nowrap;
  }
}
</style>
