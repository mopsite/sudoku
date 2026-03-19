<script setup>
import { ref } from 'vue'
import { getBoard, setCells } from '../.vitepress/theme/scripts/sudoku.js'

const str1 = `
★X★0A0000
0A0★X★000
0X00X0000
0X00X0000
0A00A0000
0X00X0000
0X00X0000
0X00X0000
0X00X0000
`
const board1 = ref(getBoard(str1))
const specialCells1 = [
  {cols: [2, 5], classes: 'bg-green'},
  {cells: ['r1c5', 'r2c2'], classes: 'bg-purple'},
  {cells: ['r5c2', 'r5c5'], classes: 'bg-yellow'}
]

const board2 = ref(getBoard())
board2.value[1] = 'XAXXXXAXX'
board2.value[7] = 'XAXXXXXAX'
setCells(board2.value, [[1, 8, '★'], [3, 8, '★'], [7, 7, '★'], [9, 7, '★']])
const specialCells2 = [
  {rows: [2, 8], classes: 'bg-green'},
  {cells: ['r2c2', 'r8c2'], classes: 'bg-yellow'},
  {cells: ['r2c7', 'r8c8'], classes: 'bg-purple'},
]

const str3 = `
004003002
010040070
800100300
500006900
090050030
006400005
009008007
070060080
600700500
`
const board3 = ref(getBoard(str3))

const board4 = ref(getBoard(str3))
setCells(board4.value, [[1, 2, 'X'], [1, 4, 'X'], [1, 7, 'X'], [1, 8, 'X'], [4, 2, 'X'], [4, 4, 'X'], [4, 8, 'X'], [4, 9, 'X'], [3, 3, '★'], [5, 1, '★'], [6, 1, '★'], [1, 1, 7], [1, 5, 7], [4, 3, 7], [4, 5, 7]])
const specialCells4 = [
  {rows: [1, 4], classes: 'bg-green'},
  {cells: ['r2c8', 'r7c9', 'r8c2', 'r9c4'], classes: 'bg-pink'},
  {cells: ['r1c1', 'r4c3'], classes: 'bg-purple font-small'},
  {cells: ['r1c5', 'r4c5'], classes: 'bg-yellow font-small'}
]

const board5 = ref(getBoard(str3))
setCells(board5.value, [[1, 2, 'X'], [2, 1, 'X'], [2, 3, 'X'], [3, 2, 'X'], [3, 3, '★'], [1, 1, 7]])
const specialCells5 = [
  {rows: [2], cols: [2], boxes: [1], classes: 'bg-green'},
  {cells: ['r1c1', 'r2c8', 'r8c2'], classes: 'bg-pink'},
  {cells: ['r1c1'], classes: 'tip'},
]
</script>

# 摩天楼（Skyscraper）

当数字 A 在某两行（列）均只存在两格可能位置，且其中一侧两数存在于同列（行）时，则可对另一侧两格共同影响的数字 A 删除。

<Grid :board="board1" :specialCells="specialCells1" />

如上所示，C2 和 C5 的数字 A 可能的位置均有 2 个，其中黄色 A 处于同一行，故可以删除另一侧紫格 A 的共同作用格（★ 格）的 A。

用链的观点来看就是：

R2C2 == R5C2 -- R5C5 == R1C5

所以 R2C2 == R1C5，即 {R1C1, R1C3, R2C4, R2C6} ≠ A。

再来看一个例子：

<Grid :board="board2" :specialCells="specialCells2" />

R2 和 R8 的数字 A 可能的位置均只有 2 个，其中黄格 A 处于同一列，故可以删除另一侧紫格 A 的共同作用格（★ 格）的 A。

同理用链表示：

R2C7 == R2C2 -- R8C2 == R8C8

所以 R2C7 == R8C8，即 {R1C8, R3C8, R7C7, R9C7} ≠ A。

下面举个例子，来看看摩天楼在实际情况中的应用。

<Grid :board="board3" />

数字 7 对 R1、R4 摒除，各有 2 个可能的位置，且一侧均在 R5，另一侧共同作用格（★ 格）可以排除 7 的可能。

<Grid :board="board4" :specialCells="specialCells4" />

B1 的 7 只能在 R1C1。

<Grid :board="board5" :specialCells="specialCells5" />
