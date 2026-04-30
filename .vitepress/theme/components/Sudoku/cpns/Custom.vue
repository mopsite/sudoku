<script setup>
import { ref, watch } from 'vue'
import { useCustom } from '../stores/useCustom'
import {
  countSolutions,
  generateSolution,
  isValidBoard,
  strToBoard
} from '../scripts'

const custom = useCustom()

const inputStr = ref('')
const message = ref('')

watch(
  () => custom.visible,
  newVal => {
    if (newVal) {
      inputStr.value = ''
      message.value = ''
    }
  }
)

const handleConfirm = () => {
  const str = inputStr.value.trim()

  if (!str) {
    message.value = '请按格式输入题目'
    return
  }

  const board = strToBoard(str)
  if (!board) {
    message.value = '题目格式错误，请检查后再输入'
    return
  }

  if (!isValidBoard(board)) {
    message.value = '题目有问题，请检查后再输入'
    return
  }

  const solutionCount = countSolutions(board)
  if (solutionCount !== 1) {
    message.value =
      solutionCount === 0
        ? '该题目无解，请检查后再输入'
        : '该题目有多解，不是合法数独'
    return
  }

  const solution = generateSolution(board)
  custom.confirm(board, solution)
}

const handleCancel = () => {
  custom.cancel()
}
</script>

<template>
  <div v-if="custom.visible" class="overlay">
    <div class="custom">
      <h2>自定义题目</h2>
      <p class="hint">请输入 81 个数字，0 或 . 表示空格</p>
      <textarea
        v-model="inputStr"
        rows="3"
        placeholder="530070000600195000098000060800060003400803001700020006060000280000419000000080"
      ></textarea>
      <p class="message">{{ message || '&nbsp;' }}</p>
      <div class="buttons">
        <button @click="handleCancel">取消</button>
        <button @click="handleConfirm">确定</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .custom {
    width: 100%;
    max-width: calc(100% - 32px);
    padding: 20px 24px;
    text-align: center;
    color: var(--custom-color);
    background: var(--custom-bg);
    border: var(--custom-border);
    border-radius: var(--custom-bdrs);
    box-shadow: var(--custom-shadow);

    h2 {
      color: var(--custom-title-color);
      font-size: 1.4rem;
      font-weight: 700;
    }

    .hint {
      margin: 12px 0;
      color: var(--custom-hint-color);
      font-size: 0.9rem;
    }

    textarea {
      width: 100%;
      padding: 12px;
      color: var(--custom-textarea-color);
      font-size: 0.85rem;
      background: var(--custom-textarea-bg);
      border: var(--custom-textarea-border);
      border-radius: var(--custom-textarea-bdrs);
      resize: none;
    }

    .message {
      color: var(--custom-message-color);
      font-size: 0.85rem;
    }

    .buttons {
      margin: 5px 0 0;
      display: flex;
      gap: 20px;
      justify-content: center;

      button {
        padding: 12px 32px;
        color: var(--custom-btn-color);
        font-size: 1rem;
        font-weight: 600;
        background: var(--custom-btn-bg);
        border: var(--custom-btn-border);
        border-radius: var(--custom-btn-bdrs);
        box-shadow: var(--custom-btn-shadow);
      }
    }
  }
}
</style>
