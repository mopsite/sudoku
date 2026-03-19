<script setup>
import { ref } from 'vue'

const props = defineProps({ show: Boolean })
const emit = defineEmits(['confirm', 'cancel'])

const input = ref('')
const error = ref('')

const handleConfirm = () => {
  const str = input.value.trim()
  if (str.length !== 81) {
    error.value = '请输入81个数字字符'
    return
  }
  if (!/^[0-9.]+$/.test(str)) {
    error.value = '只能包含数字0-9或点号'
    return
  }
  emit('confirm', str)
  input.value = ''
  error.value = ''
}

const handleCancel = () => {
  emit('cancel')
  input.value = ''
  error.value = ''
}
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="overlay" @click.self="handleCancel">
      <div class="modal">
        <h3>自定义题目</h3>
        <p class="tip">请输入81个数字字符（0或.表示空格）</p>
        <textarea
          v-model="input"
          placeholder="例如：530070000600195000098000060800060003400803001700020006060000280000419005000080079"
          rows="4"
        />
        <p v-if="error" class="error">{{ error }}</p>
        <div class="btns">
          <button class="btn cancel" @click="handleCancel">取消</button>
          <button class="btn confirm" @click="handleConfirm">确定</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}

.modal {
  background: var(--vp-c-bg);
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

h3 {
  margin: 0 0 8px;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tip {
  margin: 0 0 12px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: monospace;
  resize: none;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  box-sizing: border-box;
}

textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.error {
  margin: 8px 0 0;
  font-size: 0.8rem;
  color: var(--vp-c-danger-1);
}

.btns {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.btn {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}

.cancel {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.cancel:hover { background: var(--vp-c-bg-alt); }

.confirm {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}

.confirm:hover { opacity: 0.9; }
</style>
