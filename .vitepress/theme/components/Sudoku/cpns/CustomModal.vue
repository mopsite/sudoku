<script setup>
import { ref } from 'vue'

const props = defineProps({ show: Boolean, theme: { type: String, default: 'glass' } })
const emit = defineEmits(['confirm', 'cancel'])

const input = ref('')
const error = ref('')

const handleConfirm = () => {
  const str = input.value.trim()
  if (str.length !== 81) { error.value = '请输入81个数字字符'; return }
  if (!/^[0-9.]+$/.test(str)) { error.value = '只能包含数字0-9或点号'; return }
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
  <div v-if="show" class="overlay" :class="`theme-${theme}`">
    <div class="modal">
      <h3>自定义题目</h3>
      <p class="tip">请输入81个数字字符（0表示空格）</p>
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
</template>

<style scoped>
.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 101;
}

.modal {
  padding: 28px;
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
}

h3 {
  margin: 0 0 8px;
  font-size: 1.25rem;
  font-weight: 600;
}

.tip {
  margin: 0 0 14px;
  font-size: 0.875rem;
}

textarea {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-family: monospace;
  resize: none;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

.error {
  margin: 10px 0 0;
  font-size: 0.8rem;
}

.btns {
  display: flex;
  gap: 12px;
  margin-top: 18px;
}

.btn {
  flex: 1;
  padding: 12px 18px;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* ========== 玻璃主题 ========== */
.overlay.theme-glass {
  background: transparent;
}

.overlay.theme-glass .modal {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  box-shadow: var(--glass-shadow-lg), var(--glass-highlight);
  border: 1px solid var(--glass-border);
}

.overlay.theme-glass h3 { color: var(--glass-text); }
.overlay.theme-glass .tip { color: var(--glass-text-soft); }
.overlay.theme-glass textarea { background: rgba(255, 255, 255, 0.3); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid var(--glass-border); color: var(--glass-text); box-shadow: var(--glass-highlight); }
.overlay.theme-glass textarea::placeholder { color: var(--glass-text-soft); opacity: 0.7; }
.overlay.theme-glass textarea:focus { outline: none; border-color: var(--glass-accent); }
.overlay.theme-glass .error { color: var(--glass-danger); }
.overlay.theme-glass .cancel { background: var(--glass-bg); color: var(--glass-text); border: 1px solid var(--glass-border); box-shadow: var(--glass-highlight); }
.overlay.theme-glass .cancel:hover { background: var(--glass-bg-hover); }
.overlay.theme-glass .confirm { background: var(--glass-accent); color: #fff; }
.overlay.theme-glass .confirm:hover { transform: scale(1.02); }

/* ========== 木质主题 ========== */
.overlay.theme-wood {
  background: transparent;
}

.overlay.theme-wood .modal {
  background: var(--wood-cell);
  box-shadow: 0 12px 32px rgba(101, 67, 33, 0.35);
  border: 2px solid var(--wood-border);
}

.overlay.theme-wood h3 { color: var(--wood-text); }
.overlay.theme-wood .tip { color: var(--wood-text-soft); }
.overlay.theme-wood textarea { background: var(--wood-cell); border: 1px solid var(--wood-border); color: var(--wood-text); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3); }
.overlay.theme-wood textarea::placeholder { color: var(--wood-text-soft); opacity: 0.7; }
.overlay.theme-wood textarea:focus { outline: none; border-color: var(--wood-accent); }
.overlay.theme-wood .error { color: var(--wood-danger); }
.overlay.theme-wood .cancel { background: var(--wood-cell); color: var(--wood-text); border: 1px solid var(--wood-border); }
.overlay.theme-wood .cancel:hover { background: var(--wood-cell-hover); }
.overlay.theme-wood .confirm { background: var(--wood-accent); color: #fff; }
.overlay.theme-wood .confirm:hover { transform: scale(1.02); }
</style>
