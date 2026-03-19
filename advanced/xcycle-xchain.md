---
aside: true
---

<script setup>
import { ref } from 'vue'
import { getBoard, setCells } from '../.vitepress/theme/scripts/sudoku.js'

const board1 = ref(getBoard())
board1.value[0] = 'XAXXAXXXX'
board1.value[3] = 'XXXXAXXAX'
board1.value[6] = 'XAXXXXXAX'
const specialCells1 = [
  {rows: [1, 4, 7], classes: 'bg-green'},
  {cells: ['r1c2', 'r1c5'], classes: 'bg-purple'},
  {cells: ['r4c5', 'r4c8'], classes: 'bg-yellow'},
  {cells: ['r7c2', 'r7c8'], classes: 'bg-blue'}
]

const str2 = `
030010070
005000900
000204000
300900004
060080010
020007008
006003000
700000500
040760020
`
const board2 = ref(getBoard(str2))

const board3 = ref(getBoard(str2))
setCells(board3.value, [[2, 2, 'X'], [3, 2, 'X'], [8, 2, 'X'], [9, 3, 'X'], [9, 7, 'X'], [9, 9, 'X'], [1, 6, '★'], [4, 8, '★'], [7, 1, '★'], [4, 2, 5], [4, 5, 25], [5, 6, 25], [7, 2, 5], [9, 1, 5], [9, 6, 5]])
const specialCells3 = [
  {rows: [9], cols: [2], boxes: [5], classes: 'bg-green'},
  {cells: ['r2c3', 'r8c7'], classes: 'bg-pink'},
  {cells: ['r4c2', 'r5c6', 'r9c1'], classes: 'bg-yellow font-small'},
  {cells: ['r4c5', 'r7c2', 'r9c6'], classes: 'bg-purple font-small'}
]

const board4 = ref(getBoard(str2))
setCells(board4.value, [[4, 8, '★']])
const specialCells4 = [
  {rows: [4], cols: [8], boxes: [6], classes: 'bg-green'},
  {cells: ['r4c8'], classes: 'bg-pink'}
]

const str5 = `
100000500
020300040
009000006
002600005
050040070
300002100
200000700
090001020
006000009
`
const board5 = ref(getBoard(str5))

const board6 = ref(getBoard(str5))
setCells(board6.value, [[1, 3, 'X'], [1, 4, 'X'], [1, 9, 'X'], [2, 3, 'X'], [5, 9, 'X'], [6, 3, 'X'], [6, 4, 'X'], [6, 9, 'X'], [7, 4, 'X'], [8, 3, 'X'], [8, 4, 'X'], [8, 9, 'X'], [9, 4, 'X'], [2, 5, '★'], [3, 8, '★'], [2, 9, 1], [3, 4, 1], [5, 3, 1], [5, 4, 1], [7, 3, 1], [7, 9, 1]])
const specialCells6 = [
  {cols: [3, 4, 9], classes: 'bg-green'},
  {cells: ['r1c1', 'r6c7', 'r8c6'], classes: 'bg-pink'},
  {cells: ['r2c9', 'r5c4', 'r7c3'], classes: 'bg-yellow font-small'},
  {cells: ['r3c4', 'r5c3', 'r7c9'], classes: 'bg-purple font-small'}
]

const board7 = ref(getBoard(str5))
setCells(board7.value, [[1, 8, 'X'], [1, 9, 'X'], [2, 7, 'X'], [3, 7, 'X'], [3, 8, '★'], [2, 9, 1]])
const specialCells7 = [
  {rows: [1], cols: [7], boxes: [3], classes: 'bg-green'},
  {cells: ['r1c1', 'r2c9', 'r6c7'], classes: 'bg-pink'},
  {cells: ['r2c9'], classes: 'tip'}
]

const str8 = `
001020400
040500060
307000009
090000000
005070008
000000090
100080307
070004050
002000900
`
const board8 = ref(getBoard(str8))

const board9 = ref(getBoard(str8))
setCells(board9.value, [[3, 5, 'X'], [4, 3, 'X'], [4, 5, 'X'], [6, 3, 'X'], [6, 5, 'X'], [9, 5, 'X'], [8, 1, '★'], [2, 3, 9], [2, 5, 9], [7, 3, 9], [8, 3, 9], [8, 5, 9]])
const specialCells9 = [
  {cols: [3, 5], classes: 'bg-green'},
  {cells: ['r3c9', 'r4c2', 'r6c8'], classes: 'bg-pink'},
  {cells: ['r2c3', 'r2c5'], classes: 'bg-purple font-small'},
  {cells: ['r7c3', 'r8c3', 'r8c5'], classes: 'bg-yellow font-small'}
]

const board10 = ref(getBoard(str8))
setCells(board10.value, [[7, 2, 'X'], [9, 1, 'X'], [9, 2, 'X'], [8, 1, '★'], [7, 3, 9], [8, 3, 9]])
const specialCells10 = [
  {rows: [9], cols: [2], boxes: [7], classes: 'bg-green'},
  {cells: ['r4c2', 'r9c7'], classes: 'bg-pink'},
  {cells: ['r7c3', 'r8c3'], classes: 'bg-purple font-small'}
]

const board11 = ref(getBoard(str8))
setCells(board11.value, [[2, 3, 8], [7, 3, 9], [8, 3, 9]])
const specialCells11 = [
  {rows: [2], cols: [3], boxes: [1], classes: 'bg-green'},
  {cells: ['r2c3'], classes: 'bg-pink tip'},
  {cells: ['r7c3', 'r8c3'], classes: 'bg-purple font-small'}
]
</script>

# X 环/链（X-Cycle/Chain）

## X-Cycle

当盘面中某个数字形成如下情况：

<Grid :board="board1" :specialCells="specialCells1" />

数字 A 在 R1、R4、R7 都只有 2 个可能位置，可以发现这三行的 A 有两种排列的可能：

1. {R1C2, R4C5, R7C8} = A
2. {R1C5, R4C8, R7C2} = A

不论是哪一种情况，C2、C5、C8 除它们外的其他格都不能有 A。

用链表示就是：

R1C2 == R1C5 -- R4C5 == R4C8 -- R7C8 == R7C2 -- R1C2

因为形成环后，之前所有弱链上的两端点都变成了强关系，所以 X-Cycle 的删减范围一般都比较大。我们也可以把上面的长链分为 3 段来看，效果是一样的：

1. R1C2 == R1C5 -- R4C5 == R4C8 -- R7C8 == R7C2
2. R4C5 == R4C8 -- R7C8 == R7C2 -- R1C2 == R1C5
3. R7C8 == R7C2 -- R1C2 == R1C5 -- R4C5 == R4C8

下面举个例子：

<Grid :board="board2" />

观察数字 5，在 B5、C2、R9 均只有两个可能位置（其中 B5 为 25 数对），它们恰好形成环。数字 5 的排列有两种可能情况：紫色格为 5，或者黄色格位 5。由此可以删除它们共同影响格（★ 格）的候选数 5。

用链表示就是：

R4C2 == R7C2 -- R9C1 == R9C6 -- R5C6 == R4C5 -- R4C2

根据 X-Cycle 的特性，可得：R7C2 == R9C1（排除 R7C1 的 5）、R9C6 == R5C6（排除 R1C6 的 5）、R4C5 == R4C2（排除 R4C8 的 5）。

<Grid :board="board3" :specialCells="specialCells3" />

红色格通过点算候选数为 5 和 6，由于 X-Cycle 排除了 5，故 R4C8 = 6。

<Grid :board="board4" :specialCells="specialCells4" />

## X-Chain

与 [X-Cycle](#x-cycle) 类似，同样也是偶数个节点，不过没有形成环。之前涉及单数的如 [X-Wing](./x-wing)、[Skyscraper](./skyscraper) 都是 X-Chain 的一部分。

举个例子：

<Grid :board="board5" />

这是一个 6 节点的 X-Chain，观察 C3、C4、C9 数字 1 的可能位置，只能在紫色和黄色格，且有 2 种排列情况，紫色格成立或黄色格成立，不论哪一种成立，两端点 R3C4 和 R2C9 共同影响的格内不能为 1。

用链表示就是：

R3C4 == R5C4 -- R5C3 == R7C3 -- R7C9 == R2C9

所以 R3C4 == R2C9，即 {R2C5, R3C8} ≠ 1。

<Grid :board="board6" :specialCells="specialCells6" />

由此可知，B3 的 1 只能在 R2C9。

<Grid :board="board7" :specialCells="specialCells7" />

## Group X-Chain

就像之前讲过的区块一样，需要把几格看作一组。链也存在这样的情况，我们将其称为 **Group X-Chain**。它与 [X-Chain](#x-chain) 类似，只是某个部分需要把几格当做一个整体来看。

下面举个例子：

<Grid :board="board8" />

观察 C3 和 C5,9 可能的位置有 5 个。若将 R7C3 和 R8C3 看做一个整体的话，和之间提到的摩天楼的情况是一样的。其中一端 R2C3 和 R2C5 同属于 R2，所以可以删除另一端 R7C3、R8C3、R8C5 共同作用格 R8C1 的候选数 9。

用链表示就是：

{R7C3, R8C3} == R2C3 -- R2C5 == R8C5

所以 {R7C3, R8C3} == R8C5，即 R8C1 ≠ 9。

<Grid :board="board9" :specialCells="specialCells9" />

对 B7 进行数字 9 的摒除，得到 9 在 C3。

<Grid :board="board10" :specialCells="specialCells10" />

最后可得出唯余解 R2C3 = 8。

<Grid :board="board11" :specialCells="specialCells11" />
