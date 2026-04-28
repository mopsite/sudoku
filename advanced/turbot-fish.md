<script setup>
import { ref } from 'vue'
import { getBoard, setCells } from '../.vitepress/theme/scripts/sudoku.js'

const board1 = ref(getBoard())
setCells(board1.value, [[1, 2, 'A'], [7, 2, 'A'], [1, 7, 'A'], [3, 8, 'A'], [7, 8, '★'], [2, 2, 'X'], [3, 2, 'X'], [4, 2, 'X'], [5, 2, 'X'], [6, 2, 'X'], [8, 2, 'X'], [9, 2, 'X'], [1, 8, 'X'], [1, 9, 'X'], [2, 7, 'X'], [2, 8, 'X'], [2, 9, 'X'], [3, 7, 'X'], [3, 9, 'X']])
const specialCells1 = [
  {cols: [2], boxes: [3], classes: 'bg-green'},
  {cells: ['r1c2', 'r7c2'], classes: 'bg-purple'},
  {cells: ['r1c7', 'r3c8'], classes: 'bg-yellow'}
]

const str2 = `
300000100
020003040
005020006
000400060
007050800
010002000
900060700
040200010
003000005
`
const board2 = ref(getBoard(str2))
setCells(board2.value, [[2, 7, 'X'], [3, 7, 'X'], [6, 7, 'X'], [8, 7, 'X'], [7, 2, 'X'], [8, 1, 'X'], [8, 3, 'X'], [9, 2, 'X'], [4, 3, '★'], [4, 7, 2], [9, 7, 2], [7, 3, 2], [9, 1, 2]])
const specialCells2 = [
  {cols: [7], boxes: [7], classes: 'bg-green'},
  {cells: ['r2c2', 'r3c5', 'r6c6', 'r8c4'], classes: 'bg-pink'},
  {cells: ['r4c7', 'r9c7'], classes: 'bg-yellow font-small'},
  {cells: ['r7c3', 'r9c1'], classes: 'bg-purple font-small'}
]

const board3 = ref(getBoard(str2))
setCells(board3.value, [[1, 3, 'X'], [2, 3, 'X'], [6, 3, 'X'], [8, 3, 'X'], [4, 3, '★'], [7, 3, 2]])
const specialCells3 = [
  {cols: [3], classes: 'bg-green'},
  {cells: ['r2c2', 'r6c6', 'r7c3', 'r8c4'], classes: 'bg-pink'},
  {cells: ['r7c3'], classes: 'tip'},
]
</script>

# 多宝鱼（Turbot Fish）

当数字 A 在一行（列）和一宫中均只有两个可能位置，且其中行（列）的一个端点和宫的一个端点处于同一行（列），则可以删除另两个端点共同作用格的候选数 A。

<Grid :board="board1" :specialCells="specialCells1" />

如上表盘中，C2 和 B3 的 A 都只有 2 个可能位置，其中 C2 的一个端点 R1C2 和 B3 的一个端点 R1C7 同属于 R1，故可以删除另两格端点 R7C2 和 R3C8 共同影响的 R7C8 的候选数 A。

用链表示就是：

R3C8 == R1C7 -- R1C2 == R7C2

所以 R3C8 == R7C2，则它们的交集 R7C8 ≠ A。

下面举个例子：

<Grid :board="board2" :specialCells="specialCells2" />

可以看出 B7 的 2 有两个可能位置 R7C3 和 R9C1，C7 的 2 可能在 R4C7 和 R9C7。其中 R9C1 和 R9C7 同属于 R9，所以可以删除另两个端点 R7C3 和 R4C7 共同影响的 R4C3 的 2。

C3 的 2 只能在 R7C3（其中 R4C3 的 2 由 Turbot Fish 删除）。

<Grid :board="board3" :specialCells="specialCells3" />
