/**
 * 将文本复制到剪贴板
 * @param {string} text - 要复制的文本内容
 * @returns {Promise<void>} - 成功/失败的Promise
 */
export async function copyToClipboard(text) {
  try {
    // 核心API：写入文本到剪贴板
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('复制失败：', err)
  }
}
