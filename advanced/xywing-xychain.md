---
aside: true
---

<script setup>
import { ref } from 'vue'
import { getBoard, setCells } from '../.vitepress/theme/scripts/sudoku.js'

const board1 = ref(getBoard())
board1.value[1][1] = 12
board1.value[1][3] = 23
board1.value[1][5] = 13

const board2 = ref(getBoard())
board2.value[1][1] = 12
board2.value[1][3] = 23
board2.value[4][3] = 13

const board3 = ref(getBoard())
setCells(board3.value, [[2, 1, '~z'], [2, 3, '~z'], [3, 4, '~z'], [3, 5, '~z'], [3, 6, '~z'], [2, 2, 'xy'], [2, 4, 'xz'], [3, 3, 'yz']])
const specialCells3 = [
  {cells: ['r2c1', 'r2c3', 'r3c4', 'r3c5', 'r3c6'], classes: 'bg-pink'}
]

const board4= ref(getBoard())
setCells(board4.value, [[5, 4, '~z'], [2, 2, 'xy'], [2, 4, 'xz'], [5, 2, 'yz']])
const specialCells4 = [
  {cells: ['r5c4'], classes: 'bg-pink'}
]

const board5 = ref(getBoard())
board5.value[1][1] = 'xy'
board5.value[1][4] = 'xy'
board5.value[3][5] = 'yz'

const str6 = `
975462381
643010592
001395764
059174030
710536040
364289157
400051873
107043025
530020410
`
const board6 = ref(getBoard(str6))
board6.value[7][1] = 89
board6.value[7][6] = 69
board6.value[8][2] = 68
board6.value[8][8] = '~6'
const specialCells6 = [
  {cells: ['r9c9'], classes: 'bg-pink font-small'},
  {cells: ['r8c2', 'r8c7', 'r9c3'], classes: 'bg-purple font-small'}
]

const str7 = `
691743285
800190376
730086941
010657428
578010693
400839517
080061702
250978104
107320809
`
const board7 = ref(getBoard(str7))
board7.value[1][1] = 24
board7.value[1][5] = 25
board7.value[8][5] = 45
board7.value[8][1] = '~4'
const specialCells7 = [
  {cells: ['r9c2'], classes: 'bg-pink font-small'},
  {cells: ['r2c2', 'r2c6', 'r9c6'], classes: 'bg-purple font-small'}
]

const puzzles = [
  '009080000016002038008000076740000000000605000000000043520000300860400290000030800',
  '009015008000000000710320060070800005040000080300004020060091053000000000100460900',
  '000000006009060040003259001400008020001000400060700003200394700010080600900000000',
  '000000079002008501600004000184000000090301080000000195000100003508700600240000000',
  '000106400020040000500209070000000019300607004260000000050908002000050040009304000'
]

const board8 = ref(getBoard())
setCells(board8.value, [[2, 1, '~z'], [2, 3, '~z'], [3, 4, '~z'], [3, 5, '~z'], [3, 6, '~z'], [2, 2, 'xy'], [2, 4, 'xw'], [2, 5, 'wz'], [3, 3, 'yz']])
const specialCells8 = [
  {cells: ['r2c1', 'r2c3', 'r3c4', 'r3c5', 'r3c6'], classes: 'bg-pink'}
]

const board9 = ref(getBoard())
setCells(board9.value, [[1, 1, '~z'], [1, 2, '~z'], [1, 3, '~z'], [3, 4, '~z'], [3, 5, '~z'], [3, 6, '~z'], [2, 2, 'xy'], [2, 4, 'xw'], [1, 5, 'wz'], [3, 3, 'yz']])
const specialCells9 = [
  {cells: ['r1c1', 'r1c2', 'r1c3', 'r3c4', 'r3c5', 'r3c6'], classes: 'bg-pink'}
]

const board10 = ref(getBoard())
setCells(board10.value, [[3, 4, '~z'], [4, 3, '~z'], [2, 2, 'xy'], [2, 4, 'xw'], [4, 4, 'wz'], [3, 3, 'yz']])
const specialCells10 = [
  {cells: ['r3c4', 'r4c3'], classes: 'bg-pink'}
]

const str11 = `
629587431
017094000
040106079
491800700
006709142
702401090
163978524
200040910
904010300
`
const board11 = ref(getBoard(str11))
board11.value[1][0] = 38
board11.value[1][3] = 23
board11.value[8][3] = 26
board11.value[8][7] = 68
board11.value[1][7] = '~8'
const specialCells11 = [
  {cells: ['r2c8'], classes: 'bg-pink font-small'},
  {cells: ['r2c1', 'r2c4', 'r9c4', 'r9c8'], classes: 'bg-purple font-small'}
]

const board12 = ref(getBoard(str11))
board12.value[1][3] = 23
board12.value[2][4] = 23
board12.value[2][6] = 28
board12.value[8][3] = 26
board12.value[8][7] = 68
board12.value[1][7] = '~8'
const specialCells12 = [
  {cells: ['r2c8'], classes: 'bg-pink font-small'},
  {cells: ['r3c5', 'r3c7', 'r2c4', 'r9c4', 'r9c8'], classes: 'bg-purple font-small'}
]
</script>

# XY-Wing/Chain

当各格都是双候选数的三链数，其中组成格之一偏离大家庭到达某些位置时，就形成了 XY-Wing。

<Grid :board="board1" />

<Grid :board="board2" />

一个 XY-Wing 由 xy 格（意思为仅含 x、y 两个候选数），xz 格 及 yz 格组成。一般 XY-Wing 是要在填写相对数量的候选数时才容易看出来，所以相对来说是比较难观察的技巧。

XY-Chain 是 XY-Wing 的衍生，需要牵扯到更多格，但本质上讲只是把几格当一格看而已。

与其他进阶技巧相同，使用 XY-Wing 后可能出现摒除解或余数解，也可能只是隐藏其他技巧。

## XY-Wing

XY-Wing 的解构可以分为两种：

1. xy 格与 xz 格或者 yz 格同宫
2. xy 格、xz 格、yz 格在三个不同宫

第一种情况可以删减的格比较多：

<Grid :board="board3" :specialCells="specialCells3" />

我们可以做出这样的推导：R2C2 可能为 x 或 y。当 R2C2 = x 时，可以得到，R2C4 = z；当 R2C2 = y 时，可以得到，R3C3 = z。可见不论 R2C2 是 x 还是 y，R2C4 与 R3C3 中至少有一个是 z，所以它们共同影响的区域（红色格）不含候选数 z，可以删除。

第二种情况可以删减的仅一格：

<Grid :board="board4" :specialCells="specialCells4" />

R2C2 可能为 x 或 y。当 R2C2 = x 时，可以得到 R2C4 = z；当 R2C2 = y 时，可以得到 R5C2 = z。不论 R2C2 是 x 还是 y，R2C4 与 R5C2 中至少有一个是 z，所以 R5C4 可以删除 z。

刚结束 XY-Wing 的时候可能会有这样的错误认识：

<Grid :board="board5" />

这样的结构可以做出删减吗？请观察一下跟前两种结构的不同之处。

承袭前面的推导思路，当 R2C5 = y 时，并不能得到 R4C6 = z，所以推导进行不下去。前面的推导之所以能继续下去是因为 xz 格与 yz 格都是在 xy 格的可见范围内的。也就是 xz 格与 yz 格必须在 xy 格的 peer（等位群格位）中才能构成 XY-Wing 的结构。

下面是第一种结构（xy 格与 xz 格，或者 xy 格 与 yz 格同宫）的例子：

<Grid :board="board6" :specialCells="specialCells6" />

R8C2(89) 为 xy 格，R8C7(69) 为 yz 格，R9C3(68) 为 xz 格。即 x 为 8，y 为 9，z 为 6。R8C7 与 R9C3 交集且是空格的为 R9C9，故可以删除它的候选数 6，得解 R9C9 = 9。

下面是第二种结构（xy 格、xz 格、yz 格在三个不同的宫）的例子：

<Grid :board="board7" :specialCells="specialCells7" />

R2C6(25) 为 xy 格，R2C2(24) 为 yz 格，R9C6(45) 为 xz 格。即 x 为 5，y 为 2，z 为 4。R2C2 与 R9C6 的交集为 R9C2，故可以删除它的候选数 4，得解 R9C6 = 4。

以下几道题通过摒除法即可达到 XY-Wing 的盘势。

<Puzzle :puzzles />

## XY-Chain

当涉及的爽候选数格数变多时，被称为 XY-Chain，其原理与 [XY-Wing](#xy-wing) 相同，我们来看一下涉及四格的示意图（这里新增的候选数被命名为 w）：

<Grid :board="board8" :specialCells="specialCells8" />

当 R2C2 = x 时，可以得到 R2C4 = w，从而得到 R2C5 = z；当 R2C2 = y 时，可以得到 R3C3 = z。因此能看出，R2C5(z) 和 R3C3(z) 至少有一个成立，故可以删除它们交集格中的候选数 z。

<Grid :board="board9" :specialCells="specialCells9" />

当 R2C2 = x 时，可以得到 R2C4 = w，从而得到 R1C5 = z；当 R2C2 = y 时，可以得到 R3C3 = z。因此能看出，R1C5(z) 和 R3C3(z) 至少有一个成立，故可以删除它们交集格中的候选数 z。

<Grid :board="board10" :specialCells="specialCells10" />

当 R2C2 = x 时，可以得到 R2C4 = w，从而得到 R4C4 = z；当 R2C2 = y 时，可以得到 R3C3 = z。因此能看出，R4C4(z) 和 R3C3(z) 至少有一个成立，故可以删除它们交集格中的候选数 z。

与之前 XY-Wing 作比较后，可以发现随着 wz 格位置的变动，可以呈现出各种不同的删减效果。

下面来看一个例子：

<Grid :board="board11" :specialCells="specialCells11" />

此时观察 R2C1、R2C4、R9C4、R9C8 形成的 XY-Chain 结构，有两种思考角度：

- 从 R9C4(xy) 出发，若为 6(y)，则 R9C8(yz) 为 8(z)；若为 2(x)，则 R2C4(xw) 为 3(w)，从而得到 R2C1(wz) 为 8(z)。
- 从 R2C4(xy) 出发，若为 3(y)，则 R2C1(yz) 为 8(z)；若为 2(x)，则 R9C4(xw) 为 6(w)，从而得到 R9C8(wz) 为 8(z)。

由此可将 R2C1 与 R9C8 共同影响格 R2C8 的 8 删除。

最后来看一看由五格形成的 XY-Chain 结构。还是上面的例子：

<Grid :board="board12" :specialCells="specialCells12" />

从 R9C4 出发，若 R9C4 = 2，则往 R2C4 走，得到 R2C4 = 3，R3C5 = 2，R3C7 = 8；若 R9C4 = 6，则 R9C8 = 8。可见 R3C7 和 R9C8 必有一格为 8，故可以删除它们共同影响格 R2C8 的候选数 8。
