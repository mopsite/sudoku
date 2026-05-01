import{g as r,s as p}from"./chunks/theme.56htIf-E.js";import{y as a,I as g,o as A,c as m,j as s,a as v,J as o}from"./chunks/framework.cmjI0m29.js";const N=JSON.parse('{"title":"摩天楼（Skyscraper）","description":"","frontmatter":{},"headers":[],"relativePath":"advanced/skyscraper.md","filePath":"advanced/skyscraper.md"}'),k={name:"advanced/skyscraper.md"},S=Object.assign(k,{setup(y){const d=a(r(`
★X★0A0000
0A0★X★000
0X00X0000
0X00X0000
0A00A0000
0X00X0000
0X00X0000
0X00X0000
0X00X0000
`)),u=[{cols:[2,5],classes:"bg-green"},{cells:["r1c5","r2c2"],classes:"bg-purple"},{cells:["r5c2","r5c5"],classes:"bg-yellow"}],n=a(r());n.value[1]="XAXXXXAXX",n.value[7]="XAXXXXXAX",p(n.value,[[1,8,"★"],[3,8,"★"],[7,7,"★"],[9,7,"★"]]);const C=[{rows:[2,8],classes:"bg-green"},{cells:["r2c2","r8c2"],classes:"bg-yellow"},{cells:["r2c7","r8c8"],classes:"bg-purple"}],t=`
004003002
010040070
800100300
500006900
090050030
006400005
009008007
070060080
600700500
`,b=a(r(t)),X=a(r(t));p(X.value,[[1,2,"X"],[1,4,"X"],[1,7,"X"],[1,8,"X"],[4,2,"X"],[4,4,"X"],[4,8,"X"],[4,9,"X"],[3,3,"★"],[5,1,"★"],[6,1,"★"],[1,1,7],[1,5,7],[4,3,7],[4,5,7]]);const i=[{rows:[1,4],classes:"bg-green"},{cells:["r2c8","r7c9","r8c2","r9c4"],classes:"bg-pink"},{cells:["r1c1","r4c3"],classes:"bg-purple font-small"},{cells:["r1c5","r4c5"],classes:"bg-yellow font-small"}],c=a(r(t));p(c.value,[[1,2,"X"],[2,1,"X"],[2,3,"X"],[3,2,"X"],[3,3,"★"],[1,1,7]]);const R=[{rows:[2],cols:[2],boxes:[1],classes:"bg-green"},{cells:["r1c1","r2c8","r8c2"],classes:"bg-pink"},{cells:["r1c1"],classes:"tip"}];return(w,l)=>{const e=g("Grid");return A(),m("div",null,[l[0]||(l[0]=s("h1",{id:"摩天楼-skyscraper",tabindex:"-1"},[v("摩天楼（Skyscraper） "),s("a",{class:"header-anchor",href:"#摩天楼-skyscraper","aria-label":"Permalink to “摩天楼（Skyscraper）”"},"​")],-1)),l[1]||(l[1]=s("p",null,"当数字 A 在某两行（列）均只存在两格可能位置，且其中一侧两数存在于同列（行）时，则可对另一侧两格共同影响的数字 A 删除。",-1)),o(e,{board:d.value,specialCells:u},null,8,["board"]),l[2]||(l[2]=s("p",null,"如上所示，C2 和 C5 的数字 A 可能的位置均有 2 个，其中黄色 A 处于同一行，故可以删除另一侧紫格 A 的共同作用格（★ 格）的 A。",-1)),l[3]||(l[3]=s("p",null,"用链的观点来看就是：",-1)),l[4]||(l[4]=s("p",null,"R2C2 == R5C2 -- R5C5 == R1C5",-1)),l[5]||(l[5]=s("p",null,"所以 R2C2 == R1C5，即 {R1C1, R1C3, R2C4, R2C6} ≠ A。",-1)),l[6]||(l[6]=s("p",null,"再来看一个例子：",-1)),o(e,{board:n.value,specialCells:C},null,8,["board"]),l[7]||(l[7]=s("p",null,"R2 和 R8 的数字 A 可能的位置均只有 2 个，其中黄格 A 处于同一列，故可以删除另一侧紫格 A 的共同作用格（★ 格）的 A。",-1)),l[8]||(l[8]=s("p",null,"同理用链表示：",-1)),l[9]||(l[9]=s("p",null,"R2C7 == R2C2 -- R8C2 == R8C8",-1)),l[10]||(l[10]=s("p",null,"所以 R2C7 == R8C8，即 {R1C8, R3C8, R7C7, R9C7} ≠ A。",-1)),l[11]||(l[11]=s("p",null,"下面举个例子，来看看摩天楼在实际情况中的应用。",-1)),o(e,{board:b.value},null,8,["board"]),l[12]||(l[12]=s("p",null,"数字 7 对 R1、R4 摒除，各有 2 个可能的位置，且一侧均在 R5，另一侧共同作用格（★ 格）可以排除 7 的可能。",-1)),o(e,{board:X.value,specialCells:i},null,8,["board"]),l[13]||(l[13]=s("p",null,"B1 的 7 只能在 R1C1。",-1)),o(e,{board:c.value,specialCells:R},null,8,["board"])])}}});export{N as __pageData,S as default};
