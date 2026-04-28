/**
 * 辅助函数：根据单元格的行号（row）和列号（col），返回该单元格所在的宫号
 * @param {number} row 单元格行号（1-9）
 * @param {*} col 单元格列号（1-9）
 * @returns {number} 宫号（1-9）
 */
export function getBoxNum(row, col) {
  return Math.floor((row - 1) / 3) * 3 + Math.floor((col - 1) / 3) + 1
}

/**
 * 辅助函数：将数独字符串转为数独数组
 * @param {string} str 数独字符串（由 81 个字符，每个字符均为 0-9 中的任意一位）
 * @returns {string[][]} 数独数组（一个二维数组，每个数组元素表示数独的一行）
 */
export function getBoard(str = '0'.repeat(81)) {
  const board = []
  // 去除字符串中的空白字符并转为数组
  const arr = str.replace(/[\s\u3000]/g, '').split('')

  for (let i = 0; i < 9; i++) {
    // 从 arr 数组中依次截取 9 个元素，组成一个新的数组，并将新的数组添加到 board 中
    board.push(arr.slice(i * 9, (i + 1) * 9))
  }

  return board
}

/**
 * 辅助函数：设置单元格的值
 * @param {string[][]} board 数独数组
 * @param {any[][]} values 一个二维数组，每个数组元素又包含了三个元素，依次为行号、列号、和要修改的值
 */
export function setCells(board, values) {
  values.forEach(item => {
    board[item[0] - 1][item[1] - 1] = item[2]
  })
}
