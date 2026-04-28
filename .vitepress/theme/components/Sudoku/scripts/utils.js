const shuffle = arr => {
  const newArr = [...arr]

  for (let i = newArr.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0
    ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }

  return newArr
}

const isAvailable = typeof localStorage !== 'undefined'

const storage = {
  get(key, defaultValue = null) {
    if (!isAvailable) return defaultValue
    try {
      const val = localStorage.getItem(key)
      return val === null ? defaultValue : JSON.parse(val)
    } catch {
      return defaultValue
    }
  },

  set(key, value) {
    if (!isAvailable) return
    if (value === undefined) value = null
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  },

  remove(key) {
    if (!isAvailable) return
    try {
      localStorage.removeItem(key)
    } catch {}
  }
}

export { shuffle, storage }
