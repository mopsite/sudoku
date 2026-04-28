<script setup>
import { useConfirm } from '../stores/useConfirm'

import IconLose from '../icons/IconLose.vue'

const confirm = useConfirm()
</script>

<template>
  <div v-if="confirm.visible" class="overlay">
    <div class="confirm">
      <IconLose />
      <p>是否放弃当前游戏？</p>

      <div class="btn-group">
        <button @click="confirm.cancel">取消</button>
        <button @click="confirm.confirm">确定</button>
      </div>
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
  z-index: 99;

  .confirm {
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--modal-color);
    background: var(--modal-bg);
    border: var(--modal-border);
    border-radius: var(--modal-bdrs);
    box-shadow: var(--modal-shadow);

    svg {
      width: 48px;
      height: 48px;
      &:hover {
        fill: none;
      }
    }

    p {
      margin: 28px 0;
      font-size: 1rem;
    }

    .btn-group {
      display: flex;
      gap: 12px;

      button {
        padding: 14px 40px;
        color: var(--modal-btn-color);
        background: var(--modal-btn-bg);
        border: var(--modal-btn-border);
        border-radius: var(--modal-btn-bdrs);
        box-shadow: var(--modal-btn-shadow);
      }
    }
  }
}
</style>
