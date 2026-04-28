import{g as r,s as n}from"./chunks/theme.ByQar_cY.js";import{y as a,I as R,o as X,c as v,aC as y,J as o,j as s,a as c}from"./chunks/framework.cmjI0m29.js";const T=JSON.parse('{"title":"三/四链列（Swordfiish/Jellyfish）","description":"","frontmatter":{"aside":true},"headers":[],"relativePath":"advanced/swordfish-jellyfish.md","filePath":"advanced/swordfish-jellyfish.md"}'),S={name:"advanced/swordfish-jellyfish.md"},N=Object.assign(S,{setup(j){const u=a(r(`
0—00—00—0
/A//A//A/
0—00—00—0
0—00—00—0
/A//A//A/
0—00—00—0
0—00—00—0
/A//A//A/
0—00—00—0
`)),i=`
060000040
007006003
800030100
002407000
700000005
000305200
006020001
900100300
040000050
`,h=a(r(i)),d=a(r(i));n(d.value,[[1,1,"X"],[1,5,"X"],[1,9,"X"],[3,9,"X"],[4,1,"X"],[4,5,"X"],[4,9,"X"],[5,5,"X"],[6,5,"X"],[7,1,"X"],[9,1,"X"],[9,5,"X"],[9,9,"X"],[2,2,"★"],[2,4,"★"],[2,7,"★"],[2,8,"★"],[6,2,"★"],[6,3,"★"],[6,8,"★"],[8,2,"★"],[8,3,"★"],[8,6,"★"],[8,8,"★"],[2,1,4],[2,5,4],[6,1,4],[6,9,4],[8,5,4],[8,9,4]]);const C=[{cols:[1,5,9],classes:"bg-green"},{cells:["r1c8","r4c4","r9c2"],classes:"bg-pink"},{cells:["r2c1","r6c1"],classes:"bg-purple font-small"},{cells:["r2c5","r8c5"],classes:"bg-yellow font-small"},{cells:["r6c9","r8c9"],classes:"bg-blue font-small"}],f=a(r(i));n(f.value,[[8,6,"★"]]);const g=[{rows:[8],cols:[6],boxes:[8],classes:"bg-green"},{cells:["r8c6"],classes:"bg-pink"}],t=`
100000002
030040050
002506700
008901500
000070000
007405200
001607900
060090010
900000008
`,m=a(r(t)),b=a(r(t));n(b.value,[[1,3,"X"],[2,3,"X"],[2,4,"X"],[2,6,"X"],[2,7,"X"],[1,5,"★"],[5,1,"★"],[5,2,"★"],[5,8,"★"],[5,9,"★"],[8,1,"★"],[8,9,"★"],[9,2,"★"],[9,5,"★"],[9,8,"★"],[1,4,3],[1,6,3],[1,7,3],[5,3,3],[5,4,3],[5,6,3],[5,7,3],[8,3,3],[8,4,3],[8,6,3],[8,7,3],[9,3,3],[9,4,3],[9,6,3],[9,7,3]]);const w=[{cols:[3,4,6,7],classes:"bg-green"},{cells:["r2c2"],classes:"bg-pink"},{cells:["r5c3","r8c3","r9c3"],classes:"bg-purple font-small"},{cells:["r1c4","r5c4","r8c4","r9c4"],classes:"bg-yellow font-small"},{cells:["r1c6","r5c6","r8c6","r9c6"],classes:"bg-blue font-small"},{cells:["r1c7","r5c7","r8c7","r9c7"],classes:"bg-orange font-small"}],p=a(r(t));n(p.value,[[1,5,"★"]]);const A=[{rows:[1],cols:[5],boxes:[2],classes:"bg-green"},{cells:["r1c5"],classes:"bg-pink"}];return(x,l)=>{const e=R("Grid");return X(),v("div",null,[l[0]||(l[0]=y("",3)),o(e,{board:u.value},null,8,["board"]),l[1]||(l[1]=s("p",null,"在上表盘中，R2、R5、R8 的数字 A 均只在 C2、C5、C8，故可以删除 C2、C5、C8 除它们外其他格的候选数 A。",-1)),l[2]||(l[2]=s("p",null,"下面举个例子：",-1)),o(e,{board:h.value},null,8,["board"]),l[3]||(l[3]=s("p",null,"观察 C1、C5、C9 数字 4 可能的位置恰好在 R2、R6、R8，故 R2、R6、R8 除它们之外的其他格（★ 格）不含 4。",-1)),o(e,{board:d.value,specialCells:C},null,8,["board"]),l[4]||(l[4]=s("p",null,"点算红色个可能的数，其中 4 已经被 Swordfish 排除，故 R8C6 = 8。",-1)),o(e,{board:f.value,specialCells:g},null,8,["board"]),l[5]||(l[5]=s("h2",{id:"四链列-jellyfish",tabindex:"-1"},[c("四链列 Jellyfish "),s("a",{class:"header-anchor",href:"#四链列-jellyfish","aria-label":"Permalink to “四链列 Jellyfish”"},"​")],-1)),l[6]||(l[6]=s("p",null,[c("与 "),s("a",{href:"#三链列-swordfish"},"Swordfish"),c(" 类似，只是再进一步扩展到四行（列）。观察某一个数字 A，若在某四行（列）中数字 A 只可能存在于某相同的四列（行），则这四列（行）的其他格都不能有 A。")],-1)),l[7]||(l[7]=s("p",null,"举个例子：",-1)),o(e,{board:m.value},null,8,["board"]),l[8]||(l[8]=s("p",null,"观察 C3、C4、C6、C7 数字 3 可能的位置恰好在 R1、R5、R8、R9，故 R1、R5、R8、R9 除它们之外的其他格（★ 格）不含 3。",-1)),o(e,{board:b.value,specialCells:w},null,8,["board"]),l[9]||(l[9]=s("p",null,"点算红格可能的数，其中 3 已经被 Jellyfish 排除，故 R1C5 = 8。",-1)),o(e,{board:p.value,specialCells:A},null,8,["board"])])}}});export{T as __pageData,N as default};
