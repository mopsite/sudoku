<script setup>
import { ref } from 'vue'
import { getBoard, setCells } from '../.vitepress/theme/scripts/sudoku.js'

const board1 = ref(getBoard())
board1.value[0] = 'XXAXXXAXX'
setCells(board1.value, [[2, 1, 'X'], [4, 1, 'X'], [5, 1, 'X'], [6, 1, 'X'], [8, 1, 'X'], [9, 1, 'X'], [3, 1, 'A'], [7, 1, 'A'], [7, 7, '★']])
const specialCells1 = [
  {rows: [1], cols: [1], classes: 'bg-green'},
  {cells: ['r1c3', 'r1c7'], classes: 'bg-purple'},
  {cells: ['r3c1', 'r7c1'], classes: 'bg-yellow'}
]

const str2 = `
002016004
030700008
500000000
000200030
070060090
040009000
000000002
300005040
600980700
`
const board2 = ref(getBoard(str2))

const board3 = ref(getBoard(str2))
setCells(board3.value, [[1, 1, 'X'], [4, 1, 'X'], [5, 1, 'X'], [6, 1, 'X'], [9, 2, 'X'], [9, 8, 'X'], [9, 9, 'X'], [2, 1, 4], [7, 1, 4], [9, 3, 4], [9, 6, 4], [2, 6, '★']])
const specialCells3 = [
  {rows: [9], cols: [1], classes: 'bg-green'},
  {cells: ['r1c9', 'r6c2', 'r8c8'], classes: 'bg-pink'},
  {cells: ['r2c1', 'r7c1'], classes: 'bg-purple font-small'},
  {cells: ['r9c3', 'r9c6'], classes: 'bg-yellow font-small'}
]

const board4 = ref(getBoard(str2))
setCells(board4.value, [[2, 6, 2]])
const specialCells4 = [
  {rows: [2], cols: [6], boxes: [2], classes: 'bg-green'},
  {cells: ['r2c6'], classes: 'bg-pink tip'}
]
</script>

# 双线风筝（Two Strings Kite）

当数字 A 在一行、一列均只有 2 个可能位置，行的一个端点和列的一个端点属于同一宫，则可以删除另两格端点的共同作用格。

<Grid :board="board1" :specialCells="specialCells1" />

上面表盘中 R1 的 A 可能在 R1C3 和 R1C7，C1 的 A 可能在 R3C1 和 R7C1，它们各自的一个端点 R1C3 和 R3C1 同属于 B1，所以可以删除另外两格端点 R1C7 和 R7C1 共同作用格 R7C7 的候选数 A。

用链表示就是：

R1C7 == R1C3 -- R3C1 == R7C1

所以 R1C7 == R7C1，即 R7C7 ≠ A。

下面来看一个例子：

<Grid :board="board2" />

C1 和 R9 的 4 都只有两个位置，且 R7C1 和 R9C3 同属于 B7，故可以删除 R2C1 和 R9C6 共同影响的 R2C6 的候选数 4。

<Grid :board="board3" :specialCells="specialCells3" />

红色格根据盘面点算还剩 2 和 4 的可能，其中 4 已经被双线风筝删除，得唯余解 R2C6 = 2。

<Grid :board="board4" :specialCells="specialCells4" />
