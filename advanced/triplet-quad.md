<script setup>
import { ref } from 'vue'
import { getBoard, setCells } from '../.vitepress/theme/scripts/sudoku.js'

const str1 = `
001023004
050600003
200000000
000100050
060070080
090005000
000000001
800007090
700390600
`
const board1 = ref(getBoard(str1))
setCells(board1.value, [[5, 4, '★'], [5, 6, '★'], [5, 9, '★']])

const board2 = ref(getBoard(str1))
setCells(board2.value, [[4, 2, '★'], [4, 3, '★'], [6, 3, '★'], [5, 4, '249'], [5, 6, '249'], [5, 9, '29']])
const specialCells2 = [
  {cells: ['r5c4', 'r5c6', 'r5c9'], classes: 'bg-purple font-small'}
]

const board3 = ref(getBoard(str1))
setCells(board3.value, [[4, 1, '★'], [6, 1, '★'], [4, 2, '278'], [4, 3, '278'], [6, 3, '278'], [5, 4, '249'], [5, 6, '249'], [5, 9, '29']])
const specialCells3 = [
  {cells: ['r5c4', 'r5c6', 'r5c9'], classes: 'bg-purple font-small'},
  {cells: ['r4c2', 'r4c3', 'r6c3'], classes: 'bg-yellow font-small'},
]

const board4 = ref(getBoard(str1))
setCells(board4.value, [[4, 1, '4'], [6, 1, '4'], [4, 2, '278'], [4, 3, '278'], [6, 3, '278'], [5, 4, '249'], [5, 6, '249'], [5, 9, '29'], [2, 1, '9']])
const specialCells4 = [
  {rows: [2], cols: [1], boxes: [1], classes: 'bg-green'},
  {cells: ['r5c4', 'r5c6', 'r5c9'], classes: 'bg-purple font-small'},
  {cells: ['r4c2', 'r4c3', 'r6c3'], classes: 'bg-yellow font-small'},
  {cells: ['r4c1', 'r6c1'], classes: 'bg-blue font-small'},
  {cells: ['r2c1'], classes: 'bg-pink tip'},
]

const str5 = `
000001002
000030450
003000061
000070000
020806900
600010028
090080500
051004000
406007000
`
const board5 = ref(getBoard(str5))
setCells(board5.value, [[1, 7, '☆'], [3, 7, '☆'], [6, 7, '☆'], [7, 1, '★'], [7, 3, '★'], [7, 6, '★']])

const board6 = ref(getBoard(str5))
setCells(board6.value, [[1, 7, '378'], [3, 7, '78'], [6, 7, '37'], [7, 1, '237'], [7, 3, '27'], [7, 6, '23'], [7, 8, '★'], [7, 9, '★'], [8, 7, '★'], [9, 7, '★']])
const specialCells6 = [
  {cells: ['r1c7', 'r3c7', 'r6c7'], classes: 'bg-yellow font-small'},
  {cells: ['r7c1', 'r7c3', 'r7c6'], classes: 'bg-purple font-small'}
]

const board7 = ref(getBoard(str5))
setCells(board7.value, [[1, 7, '378'], [3, 7, '78'], [6, 7, '37'], [7, 1, '237'], [7, 3, '27'], [7, 6, '23'], [7, 8, '1246'], [7, 9, '1246'], [8, 7, '1246'], [9, 7, '1246'], [2, 9, '★'], [8, 9, '★'], [9, 9, '★']])
const specialCells7 = [
  {cells: ['r1c7', 'r3c7', 'r6c7'], classes: 'bg-yellow font-small'},
  {cells: ['r7c1', 'r7c3', 'r7c6'], classes: 'bg-purple font-small'},
  {cells: ['r7c8', 'r7c9', 'r8c7', 'r9c7'], classes: 'bg-blue font-small'}
]

const board8 = ref(getBoard(str5))
setCells(board8.value, [[5, 1, '★'], [5, 8, '★'], [2, 9, '79'], [8, 9, '379'], [9, 9, '39']])
const specialCells8 = [
  {cells: ['r2c9', 'r8c9', 'r9c9'], classes: 'bg-purple font-small'},
]

const board9 = ref(getBoard(str5))
setCells(board9.value, [[5, 1, '13'], [5, 8, '13'], [2, 9, '79'], [8, 9, '379'], [9, 9, '39'], [5, 3, '7']])
const specialCells9 = [
  {cells: ['r2c9', 'r8c9', 'r9c9'], classes: 'bg-purple font-small'},
  {cells: ['r5c1', 'r5c8'], classes: 'bg-yellow font-small'},
  {cells: ['r5c3'], classes: 'bg-pink tip'}
]
</script>

# 三/四链数（Triplet/Quad）

三链数与[数对法](./pairs)的观察方法相同，只是扩展到 3 个数或 3 格。这三个需属于同行或同列或同宫。

下面这个例子同时用到了摒除三链数（Hidden Triplet）和唯余三链数（Naked Triplet），并会把前面讲到的[区块摒除法](./locked-candidates)和[唯一余数法](../basic/naked-single)复习一下。

<Grid :board="board1" />

点算 ★ 三格，自左往右，可能的数字一次为 249、249、29，且它们同处于 R5，所以 R5 的其他格不能再有 2、4、9。

<Grid :board="board2" :specialCells="specialCells2" />

数字 2、7、8 对 B4 摒除，得到 B4 的 2、7、8 只能在 ★ 三格。

<Grid :board="board3" :specialCells="specialCells3" />

数字 4 对 B4 摒除，得到 B4 的 4 只能在 ★ 两格。从而得到唯余解 R2C1 = 9。

<Grid :board="board4" :specialCells="specialCells4" />

有的地方会把数对、三链数、四链数统称为 **数组**（Subset），说明它们的本质都是一样的。四链数一般比较少用到，从前面的题目可以发现其实摒除数组和唯余数组是存在互补的关系，比如一个宫有 5 个未填数，其中有一个摒除数对的话相对就有一个唯余三链数。

下面这个例子可以说是整个数组系统的总结，包括数对、三链数和四链数。

<Grid :board="board5" />

点算 ★ 三格，为 237 三链数；点算 ☆ 三格，为 378 三链数。

<Grid :board="board6" :specialCells="specialCells6" />

点算 ★ 四格，或用 3、7、8、9 对 B9 摒除，可能的数字只有 1、2、4、6 四个。

<Grid :board="board7" :specialCells="specialCells7" />

点算 ★ 三格为 379 三链数。

<Grid :board="board8" :specialCells="specialCells8" />

数字 1 与 3 对 R5 摒除，得到 R5 的 1 与 3 只能在 ★ 两格。

数字 7 对 R5 摒除，最后得到 R5C3 = 7。

<Grid :board="board9" :specialCells="specialCells9" />
