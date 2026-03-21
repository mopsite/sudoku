import{g as a,s as C}from"./chunks/theme.CIrocZqk.js";import{y as r,I as N,o as G,c as I,j as s,a as o,J as n,ao as v}from"./chunks/framework.B1MRjf2M.js";const W=JSON.parse('{"title":"X 环/链（X-Cycle/Chain）","description":"","frontmatter":{"aside":true},"headers":[],"relativePath":"advanced/xcycle-xchain.md","filePath":"advanced/xcycle-xchain.md"}'),D={name:"advanced/xcycle-xchain.md"},q=Object.assign(D,{setup(E){const c=r(a());c.value[0]="XAXXAXXXX",c.value[3]="XXXXAXXAX",c.value[6]="XAXXXXXAX";const m=[{rows:[1,4,7],classes:"bg-green"},{cells:["r1c2","r1c5"],classes:"bg-purple"},{cells:["r4c5","r4c8"],classes:"bg-yellow"},{cells:["r7c2","r7c8"],classes:"bg-blue"}],i=`
030010070
005000900
000204000
300900004
060080010
020007008
006003000
700000500
040760020
`,f=r(a(i)),t=r(a(i));C(t.value,[[2,2,"X"],[3,2,"X"],[8,2,"X"],[9,3,"X"],[9,7,"X"],[9,9,"X"],[1,6,"★"],[4,8,"★"],[7,1,"★"],[4,2,5],[4,5,25],[5,6,25],[7,2,5],[9,1,5],[9,6,5]]);const y=[{rows:[9],cols:[2],boxes:[5],classes:"bg-green"},{cells:["r2c3","r8c7"],classes:"bg-pink"},{cells:["r4c2","r5c6","r9c1"],classes:"bg-yellow font-small"},{cells:["r4c5","r7c2","r9c6"],classes:"bg-purple font-small"}],b=r(a(i));C(b.value,[[4,8,"★"]]);const A=[{rows:[4],cols:[8],boxes:[6],classes:"bg-green"},{cells:["r4c8"],classes:"bg-pink"}],R=`
100000500
020300040
009000006
002600005
050040070
300002100
200000700
090001020
006000009
`,k=r(a(R)),X=r(a(R));C(X.value,[[1,3,"X"],[1,4,"X"],[1,9,"X"],[2,3,"X"],[5,9,"X"],[6,3,"X"],[6,4,"X"],[6,9,"X"],[7,4,"X"],[8,3,"X"],[8,4,"X"],[8,9,"X"],[9,4,"X"],[2,5,"★"],[3,8,"★"],[2,9,1],[3,4,1],[5,3,1],[5,4,1],[7,3,1],[7,9,1]]);const T=[{cols:[3,4,9],classes:"bg-green"},{cells:["r1c1","r6c7","r8c6"],classes:"bg-pink"},{cells:["r2c9","r5c4","r7c3"],classes:"bg-yellow font-small"},{cells:["r3c4","r5c3","r7c9"],classes:"bg-purple font-small"}],u=r(a(R));C(u.value,[[1,8,"X"],[1,9,"X"],[2,7,"X"],[3,7,"X"],[3,8,"★"],[2,9,1]]);const w=[{rows:[1],cols:[7],boxes:[3],classes:"bg-green"},{cells:["r1c1","r2c9","r6c7"],classes:"bg-pink"},{cells:["r2c9"],classes:"tip"}],p=`
001020400
040500060
307000009
090000000
005070008
000000090
100080307
070004050
002000900
`,P=r(a(p)),d=r(a(p));C(d.value,[[3,5,"X"],[4,3,"X"],[4,5,"X"],[6,3,"X"],[6,5,"X"],[9,5,"X"],[8,1,"★"],[2,3,9],[2,5,9],[7,3,9],[8,3,9],[8,5,9]]);const S=[{cols:[3,5],classes:"bg-green"},{cells:["r3c9","r4c2","r6c8"],classes:"bg-pink"},{cells:["r2c3","r2c5"],classes:"bg-purple font-small"},{cells:["r7c3","r8c3","r8c5"],classes:"bg-yellow font-small"}],g=r(a(p));C(g.value,[[7,2,"X"],[9,1,"X"],[9,2,"X"],[8,1,"★"],[7,3,9],[8,3,9]]);const B=[{rows:[9],cols:[2],boxes:[7],classes:"bg-green"},{cells:["r4c2","r9c7"],classes:"bg-pink"},{cells:["r7c3","r8c3"],classes:"bg-purple font-small"}],x=r(a(p));C(x.value,[[2,3,8],[7,3,9],[8,3,9]]);const V=[{rows:[2],cols:[3],boxes:[1],classes:"bg-green"},{cells:["r2c3"],classes:"bg-pink tip"},{cells:["r7c3","r8c3"],classes:"bg-purple font-small"}];return(j,l)=>{const e=N("Grid");return G(),I("div",null,[l[0]||(l[0]=s("h1",{id:"x-环-链-x-cycle-chain",tabindex:"-1"},[o("X 环/链（X-Cycle/Chain） "),s("a",{class:"header-anchor",href:"#x-环-链-x-cycle-chain","aria-label":"Permalink to “X 环/链（X-Cycle/Chain）”"},"​")],-1)),l[1]||(l[1]=s("h2",{id:"x-cycle",tabindex:"-1"},[o("X-Cycle "),s("a",{class:"header-anchor",href:"#x-cycle","aria-label":"Permalink to “X-Cycle”"},"​")],-1)),l[2]||(l[2]=s("p",null,"当盘面中某个数字形成如下情况：",-1)),n(e,{board:c.value,specialCells:m},null,8,["board"]),l[3]||(l[3]=v("",8)),n(e,{board:f.value},null,8,["board"]),l[4]||(l[4]=s("p",null,"观察数字 5，在 B5、C2、R9 均只有两个可能位置（其中 B5 为 25 数对），它们恰好形成环。数字 5 的排列有两种可能情况：紫色格为 5，或者黄色格位 5。由此可以删除它们共同影响格（★ 格）的候选数 5。",-1)),l[5]||(l[5]=s("p",null,"用链表示就是：",-1)),l[6]||(l[6]=s("p",null,"R4C2 == R7C2 -- R9C1 == R9C6 -- R5C6 == R4C5 -- R4C2",-1)),l[7]||(l[7]=s("p",null,"根据 X-Cycle 的特性，可得：R7C2 == R9C1（排除 R7C1 的 5）、R9C6 == R5C6（排除 R1C6 的 5）、R4C5 == R4C2（排除 R4C8 的 5）。",-1)),n(e,{board:t.value,specialCells:y},null,8,["board"]),l[8]||(l[8]=s("p",null,"红色格通过点算候选数为 5 和 6，由于 X-Cycle 排除了 5，故 R4C8 = 6。",-1)),n(e,{board:b.value,specialCells:A},null,8,["board"]),l[9]||(l[9]=v("",3)),n(e,{board:k.value},null,8,["board"]),l[10]||(l[10]=s("p",null,"这是一个 6 节点的 X-Chain，观察 C3、C4、C9 数字 1 的可能位置，只能在紫色和黄色格，且有 2 种排列情况，紫色格成立或黄色格成立，不论哪一种成立，两端点 R3C4 和 R2C9 共同影响的格内不能为 1。",-1)),l[11]||(l[11]=s("p",null,"用链表示就是：",-1)),l[12]||(l[12]=s("p",null,"R3C4 == R5C4 -- R5C3 == R7C3 -- R7C9 == R2C9",-1)),l[13]||(l[13]=s("p",null,"所以 R3C4 == R2C9，即 {R2C5, R3C8} ≠ 1。",-1)),n(e,{board:X.value,specialCells:T},null,8,["board"]),l[14]||(l[14]=s("p",null,"由此可知，B3 的 1 只能在 R2C9。",-1)),n(e,{board:u.value,specialCells:w},null,8,["board"]),l[15]||(l[15]=s("h2",{id:"group-x-chain",tabindex:"-1"},[o("Group X-Chain "),s("a",{class:"header-anchor",href:"#group-x-chain","aria-label":"Permalink to “Group X-Chain”"},"​")],-1)),l[16]||(l[16]=s("p",null,[o("就像之前讲过的区块一样，需要把几格看作一组。链也存在这样的情况，我们将其称为 "),s("strong",null,"Group X-Chain"),o("。它与 "),s("a",{href:"#x-chain"},"X-Chain"),o(" 类似，只是某个部分需要把几格当做一个整体来看。")],-1)),l[17]||(l[17]=s("p",null,"下面举个例子：",-1)),n(e,{board:P.value},null,8,["board"]),l[18]||(l[18]=s("p",null,"观察 C3 和 C5,9 可能的位置有 5 个。若将 R7C3 和 R8C3 看做一个整体的话，和之间提到的摩天楼的情况是一样的。其中一端 R2C3 和 R2C5 同属于 R2，所以可以删除另一端 R7C3、R8C3、R8C5 共同作用格 R8C1 的候选数 9。",-1)),l[19]||(l[19]=s("p",null,"用链表示就是：",-1)),l[20]||(l[20]=s("p",null,"{R7C3, R8C3} == R2C3 -- R2C5 == R8C5",-1)),l[21]||(l[21]=s("p",null,"所以 {R7C3, R8C3} == R8C5，即 R8C1 ≠ 9。",-1)),n(e,{board:d.value,specialCells:S},null,8,["board"]),l[22]||(l[22]=s("p",null,"对 B7 进行数字 9 的摒除，得到 9 在 C3。",-1)),n(e,{board:g.value,specialCells:B},null,8,["board"]),l[23]||(l[23]=s("p",null,"最后可得出唯余解 R2C3 = 8。",-1)),n(e,{board:x.value,specialCells:V},null,8,["board"])])}}});export{W as __pageData,q as default};
