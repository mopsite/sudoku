---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
titleTemplate: 从入门到精通

hero:
  name: '数独 - Sudoku'
  text: '从入门到精通'
  tagline: 一款非常受欢迎的数字逻辑谜题
  image:
    src: /logo.png
  actions:
    - theme: brand
      text: 解法技巧
      link: /basic/starting
    - theme: alt
      text: 演练场
      link: /playground

features:
  - icon: 🔢
    title: 数独游戏
    details: 数独是一种用数字进行演算的逻辑游戏。玩家需要将盘面填满，使得每行、列、宫都是数字 1~9。
  - icon: 🍁
    title: 解法技巧
    details: 技巧包含唯一数、摒除法等基础解法，区块摒除、数对法等进阶解法，和一些链相关的高级技巧。
  - icon: ✏️
    title: 关于本站
    details: 本站分为两个部分：技巧和演练场。当你掌握了一些基础解法之后，就可以到演练场开始游戏了。
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-next));
  --vp-home-hero-image-background-image: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-next));
  --vp-home-hero-image-filter: blur(40px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(72px);
  }
}
</style>
