import{g as b,s as r}from"./chunks/theme.CeAf3sdT.js";import{_ as x,y as l,I as T,o as P,c as Y,aC as u,J as v,j as a}from"./chunks/framework.cmjI0m29.js";const J=JSON.parse('{"title":"链的逻辑（Chain）","description":"","frontmatter":{"aside":true},"headers":[],"relativePath":"advanced/chain.md","filePath":"advanced/chain.md"}'),S={name:"advanced/chain.md"},W=Object.assign(S,{setup(V){const n=`
009741680
784265931
016938074
175892463
803650100
602310008
058126040
061473800
407589016
`,c=l(b(n)),p=l(b(n));r(p.value,[[1,2,"★"],[7,1,"★"],[8,1,"★"],[3,1,2],[3,7,2],[9,2,2],[9,7,2]]);const A=[{cells:["r3c1","r3c7","r9c2","r9c7"],classes:"bg-purple font-small"}],s=`
059700064
478106095
603594870
005809046
086450930
904600758
561300429
342961587
897245613
`,y=l(b(s)),o=l(b(s));r(o.value,[[1,1,"★"],[1,7,1],[3,9,1],[5,1,1],[5,9,1]]);const g=[{cells:["r1c7","r3c9","r5c1","r5c9"],classes:"bg-purple font-small"}],i=l(b(s));r(i.value,[[1,1,"★"],[3,2,1],[3,9,1],[5,1,1],[5,9,1]]);const B=[{cells:["r3c2","r3c9","r5c1","r5c9"],classes:"bg-purple font-small"}],C=l(b(`
854376912
002459800
069218005
207605300
086932★5★
005701200
928563070
571894623
643127589
`));r(C.value,[[4,2,"1=9"],[4,8,"9=4"],[5,1,"1=4"]]);const k=[{cells:["r4c2","r4c8","r5c1"],classes:"bg-purple font-small"}],e=l(b(`
415263700
238197645
697845132
304709500
0005384★★
000604307
923471856
841956273
006382914
`));r(e.value,[[4,2,"6=8"],[4,9,"8=1"],[5,1,"1=7"],[5,2,"7=6"]]);const m=[{cells:["r4c2","r4c9","r5c1","r5c2"],classes:"bg-purple font-small"}],D=l(b(`
87★701643
374800519
916345278
280400351
571783426
463152897
130674980
708239160
600518730
`)),f=[{cells:["r1c2","r1c4","r2c2","r5c2","r5c4"],classes:"bg-purple font-small"}],R=l(b(`
987561243
213000506
654030001
598627314
176453829
432918657
360000402
809006035
700300068
`));r(R.value,[[8,5,"4=7"],[8,7,"7=1"],[9,5,"4=9"],[9,7,"9=1"]]);const X=[{cells:["r8c5","r8c7","r9c5","r9c7"],classes:"bg-purple font-small"}];return(F,d)=>{const t=T("Grid");return P(),Y("div",null,[d[0]||(d[0]=u("",47)),v(t,{board:c.value},null,8,["board"]),d[1]||(d[1]=a("p",null,"根据强弱关系，我们找到了一条符合 A == B -- C == D 的强弱链组：",-1)),d[2]||(d[2]=a("p",null,"R3C1(2) == R3C7(2) -- R9C7(2) == R9C2(2)",-1)),d[3]||(d[3]=a("p",null,"根据上文提到的逻辑关系，可以得到 R3C1 = 2 与 R9C2 = 2 至少有一个成立，所以可以删去它们等位群格位的交集（★ 格）的候选数 2。",-1)),v(t,{board:p.value,specialCells:A},null,8,["board"]),d[4]||(d[4]=a("p",null,"我们可以从强弱关系的逻辑把上述这条链走一遍，共有以下两种情况：",-1)),d[5]||(d[5]=a("ol",null,[a("li",null,"R3C1 = 2"),a("li",null,"R3C1 ≠ 2，则 R3C7 = 2（强关系），R9C7 ≠ 2（弱关系），R9C2 = 2（强关系）")],-1)),d[6]||(d[6]=a("p",null,"也就是 R3C1 和 R9C2 至少有一个是 2（强关系）。如果 R3C7 和 R9C7 之间用强关系的逻辑看的话，从 R3C7 = 2 是无法得到 R9C7 ≠ 2 的，这条推理也就到此为止，无法进行下去。",-1)),d[7]||(d[7]=a("div",{class:"danger custom-block"},[a("p",{class:"custom-block-title"},"注意"),a("p",null,"很多人认为强关系包括了弱关系。因为“非 A 即 B”的逻辑是不包含“是 A 非 B”的逻辑的，所以这当然是错误的观点。强弱关系是两种不同的逻辑，且是相互独立的。")],-1)),d[8]||(d[8]=a("p",null,"有时运用不同的强弱强链，能达到相同的删减效果，下面就是一个例子：",-1)),v(t,{board:y.value},null,8,["board"]),d[9]||(d[9]=a("p",null,"方法 1：使用 R5C1 == R5C9 -- R3C9 == R1C7 的强弱强链。",-1)),v(t,{board:o.value,specialCells:g},null,8,["board"]),d[10]||(d[10]=a("p",null,"方法 2：使用 R3C2 == R3C9 -- R5C9 == R5C1 的强弱强链。",-1)),v(t,{board:i.value,specialCells:B},null,8,["board"]),d[11]||(d[11]=a("p",null,"以上两种观察方法都可以删除 R1C1 的候选数 1。",-1)),d[12]||(d[12]=a("p",null,"上面的几个例子都是关于单一数的强弱强链，在数独的解题技巧里，我们将这类称为 X-Chain。当把链的条数增加的时候，也就是 A == B -- C == D -- E == F 时，也能推导出 A 与 F 至少有一个为真，这里就不做枚举了。下面来看一下牵扯到异数的强弱强的例子。",-1)),d[13]||(d[13]=a("p",null,"要说异数强弱强的关系肯定要提到 XY-Wing 了，下面是一个 XY-Wing 的例子（紫色三格中的候选数由点算即得）：",-1)),v(t,{board:C.value,specialCells:k},null,8,["board"]),d[14]||(d[14]=a("p",null,"如果 R4C2 = 1 则 R5C1 = 4；如果 R4C2 = 9，则 R4C8 = 4。所以不论 R4C2 是 1 还是 9，R5C1 与 R4C8 中至少有一个是 4，从而得到 R5C1 与 R4C8 的等位群格位交集部分（★ 格）不含 4。",-1)),d[15]||(d[15]=a("p",null,"这样是不是有点猜测的味道呢？很多人都说高级技巧是把猜的东西合理化，其实不然。用强弱强链的观点可以这样看：",-1)),d[16]||(d[16]=a("p",null,"R5C1(4) == R5C1(1) -- R4C2(1) == R4C2(9) -- R4C8(9) == R4C8(4)",-1)),d[17]||(d[17]=a("p",null,"由此可推出 R5C1(4) == R4C8(4)，这样观察起来才会更加逻辑化。",-1)),d[18]||(d[18]=a("p",null,"与 XY-Wing 较相近的要数 XY-Chain。",-1)),d[19]||(d[19]=a("p",null,"XY-Wing 由三格组成，分别为 xy 格、xz 格、yz 格。XY-Chain 不止三格，需要把一些格合并当做 XY-Wing 组成格之一来看。下面来看一个例子：",-1)),v(t,{board:e.value,specialCells:m},null,8,["board"]),d[20]||(d[20]=a("p",null,"以 XY-Wing 的观点来看的话，可以将 R4C2 作 xy 格，R4C9 作 xz 格，{R5C1, R5C2} 作为 yz 格。",-1)),d[21]||(d[21]=a("p",null,"以强弱强的观点来看略复杂，因为有 4 条强链组成，以 R5C1 为起点依次观察交替的强链和弱链，可以得出以下结论：",-1)),d[22]||(d[22]=a("p",null,"R5C1(1) == R5C1(7) -- R5C2(7) == R5C2(6) -- R4C2(6) == R4C2(8) -- R4C9(8) == R4C9(1)",-1)),d[23]||(d[23]=a("p",null,"可以得到两端点 R5C1(1) 与 R4C9(1) 至少有一个成立，可以删除两者交集（★ 格）的候选数 1。",-1)),d[24]||(d[24]=a("p",null,"有的时候我们可以把两格看作一组，如下例子：",-1)),v(t,{board:D.value,specialCells:f},null,8,["board"]),d[25]||(d[25]=a("p",null,"R1C4(7) == R5C4(7) -- R5C2(7) == {R1C2, R2C2}(7)",-1)),d[26]||(d[26]=a("p",null,"得到 {R1C2, R2C2} 与 R1C4 至少有一个为 7，所以可以删除它们等位群格位的交集 R1C3 的候选数 7。",-1)),d[27]||(d[27]=a("p",null,"XY-Chain 的首尾若能连接起来就成为了 XY-Cycle。",-1)),v(t,{board:R.value,specialCells:X},null,8,["board"]),d[28]||(d[28]=u("",5))])}}}),L=x(W,[["__scopeId","data-v-5dd7926b"]]);export{J as __pageData,L as default};
