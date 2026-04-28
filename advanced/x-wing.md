<script setup>
import { ref } from 'vue'
import { getBoard, setCells } from '../.vitepress/theme/scripts/sudoku.js'

const board1 = ref(getBoard())
board1.value[1] = '/A//A////'
board1.value[4] = '/A//A////'

const board2 = ref(getBoard())
board2.value[1] = '/A//0////'
board2.value[4] = '/0//A////'

const board3 = ref(getBoard())
board3.value[1] = '/0//A////'
board3.value[4] = '/A//0////'

const board4 = ref(getBoard())
board4.value[1] = '/A//A////'
board4.value[4] = '/A//A////'
setCells(board4.value, [[1, 2, '—'], [3, 2, '—'], [4, 2, '—'], [6, 2, '—'], [7, 2, '—'], [8, 2, '—'], [9, 2, '—'], [1, 5, '—'], [3, 5, '—'], [4, 5, '—'], [6, 5, '—'], [7, 5, '—'], [8, 5, '—'], [9, 5, '—']])

const str5 = `
002000030
900100006
040007500
800200100
000010000
005008007
008300040
600001003
090000200
`
const board5 = ref(getBoard(str5))

const board6 = ref(getBoard(str5))
setCells(board6.value, [[2, 3, 'X'], [2, 8, 'X'], [4, 3, 'X'], [4, 8, 'X'], [5, 3, 'X'], [5, 8, 'X'], [6, 8, 'X'], [8, 3, 'X'], [8, 8, 'X'], [3, 3, '★'], [9, 3, '★'], [3, 8, '☆'], [9, 8, '☆']])
const specialCells6 = [
  {cols: [3, 8], classes: 'bg-green'},
  {cells: ['r2c4', 'r4c7', 'r5c5', 'r8c6'], classes: 'bg-pink'}
]

const board7 = ref(getBoard(str5))
setCells(board7.value, [[3, 1, 3], [3, 3, 1], [3, 8, 1], [9, 3, 1], [9, 8, 1]])
const specialCells7 = [
  {rows: [3], cols: [1], boxes: [1], classes: 'bg-green'},
  {cells: ['r3c3', 'r9c3'], classes: 'bg-purple font-small'},
  {cells: ['r3c8', 'r9c8'], classes: 'bg-yellow font-small'},
  {cells: ['r3c1'], classes: 'bg-pink tip'}
]
</script>

# 四角对角线（X-Wing）

四角对角线是日本书里面对 **X-Wing** 的称呼，国内的书和网站称 **矩形删除** 或 **X 翼** 之类的比较多，一般还是直接用应为的 X-Wing 即可。四角对角线是一种高级的数独技巧，用于在数独游戏中消除候选数字。

观察某一个数字 A，若在某两行（列）中数字 A 只可能存在于某相同的两列（行），则这两列（行）的其他格都不能有 A。

<Grid :board="board1" />

如上表盘所示，R2 和 R5 的 A 只能在 C2 和 C5，对于 C2 和 C5 的 A 可能有以下两种排列：

<Grid :board="board2" />
<Grid :board="board3" />

不论是哪一种情况，C2 和 C5 其他格都不能是 A。

<Grid :board="board4" />

下面举个例子：

<Grid :board="board5" />

数字 1 分别对 C3 和 C8 摒除，得到 C3 的 1 在 ★ 两格，C8 的 1 在 ☆ 两格。所以，R3 和 R9 除它们外的其他格都不能是 1。

<Grid :board="board6" :specialCells="specialCells6" />

点算红色空单元格，本来还剩 1 和 3 的可能，其中 1 已经被 X-Wing 摒除，故 R3C1 = 3。

<Grid :board="board7" :specialCells="specialCells7" />

从链的角度观察就是：

R3C3(1) == R9C3(1) -- R9C8(1) == R3C8(1)

所以，R3C3(1) == R3C8(1)，即 R3C3 和 R3C8 的交集部分不能为 1。
