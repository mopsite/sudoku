import{g as a,s as r}from"./chunks/theme.C0M_RQEx.js";import{y as o,I as S,o as V,c as q,ap as x,J as c,j as s,a as C}from"./chunks/framework.mZhLhLb0.js";const j=JSON.parse('{"title":"三/四链数（Triplet/Quad）","description":"","frontmatter":{},"headers":[],"relativePath":"advanced/triplet-quad.md","filePath":"advanced/triplet-quad.md"}'),P={name:"advanced/triplet-quad.md"},D=Object.assign(P,{setup(_){const n=`
001023004
050600003
200000000
000100050
060070080
090005000
000000001
800007090
700390600
`,p=o(a(n));r(p.value,[[5,4,"★"],[5,6,"★"],[5,9,"★"]]);const d=o(a(n));r(d.value,[[4,2,"★"],[4,3,"★"],[6,3,"★"],[5,4,"249"],[5,6,"249"],[5,9,"29"]]);const T=[{cells:["r5c4","r5c6","r5c9"],classes:"bg-purple font-small"}],u=o(a(n));r(u.value,[[4,1,"★"],[6,1,"★"],[4,2,"278"],[4,3,"278"],[6,3,"278"],[5,4,"249"],[5,6,"249"],[5,9,"29"]]);const B=[{cells:["r5c4","r5c6","r5c9"],classes:"bg-purple font-small"},{cells:["r4c2","r4c3","r6c3"],classes:"bg-yellow font-small"}],b=o(a(n));r(b.value,[[4,1,"4"],[6,1,"4"],[4,2,"278"],[4,3,"278"],[6,3,"278"],[5,4,"249"],[5,6,"249"],[5,9,"29"],[2,1,"9"]]);const k=[{rows:[2],cols:[1],boxes:[1],classes:"bg-green"},{cells:["r5c4","r5c6","r5c9"],classes:"bg-purple font-small"},{cells:["r4c2","r4c3","r6c3"],classes:"bg-yellow font-small"},{cells:["r4c1","r6c1"],classes:"bg-blue font-small"},{cells:["r2c1"],classes:"bg-pink tip"}],t=`
000001002
000030450
003000061
000070000
020806900
600010028
090080500
051004000
406007000
`,i=o(a(t));r(i.value,[[1,7,"☆"],[3,7,"☆"],[6,7,"☆"],[7,1,"★"],[7,3,"★"],[7,6,"★"]]);const m=o(a(t));r(m.value,[[1,7,"378"],[3,7,"78"],[6,7,"37"],[7,1,"237"],[7,3,"27"],[7,6,"23"],[7,8,"★"],[7,9,"★"],[8,7,"★"],[9,7,"★"]]);const R=[{cells:["r1c7","r3c7","r6c7"],classes:"bg-yellow font-small"},{cells:["r7c1","r7c3","r7c6"],classes:"bg-purple font-small"}],f=o(a(t));r(f.value,[[1,7,"378"],[3,7,"78"],[6,7,"37"],[7,1,"237"],[7,3,"27"],[7,6,"23"],[7,8,"1246"],[7,9,"1246"],[8,7,"1246"],[9,7,"1246"],[2,9,"★"],[8,9,"★"],[9,9,"★"]]);const N=[{cells:["r1c7","r3c7","r6c7"],classes:"bg-yellow font-small"},{cells:["r7c1","r7c3","r7c6"],classes:"bg-purple font-small"},{cells:["r7c8","r7c9","r8c7","r9c7"],classes:"bg-blue font-small"}],g=o(a(t));r(g.value,[[5,1,"★"],[5,8,"★"],[2,9,"79"],[8,9,"379"],[9,9,"39"]]);const w=[{cells:["r2c9","r8c9","r9c9"],classes:"bg-purple font-small"}],v=o(a(t));r(v.value,[[5,1,"13"],[5,8,"13"],[2,9,"79"],[8,9,"379"],[9,9,"39"],[5,3,"7"]]);const y=[{cells:["r2c9","r8c9","r9c9"],classes:"bg-purple font-small"},{cells:["r5c1","r5c8"],classes:"bg-yellow font-small"},{cells:["r5c3"],classes:"bg-pink tip"}];return(A,l)=>{const e=S("Grid");return V(),q("div",null,[l[0]||(l[0]=x("",3)),c(e,{board:p.value},null,8,["board"]),l[1]||(l[1]=s("p",null,"点算 ★ 三格，自左往右，可能的数字一次为 249、249、29，且它们同处于 R5，所以 R5 的其他格不能再有 2、4、9。",-1)),c(e,{board:d.value,specialCells:T},null,8,["board"]),l[2]||(l[2]=s("p",null,"数字 2、7、8 对 B4 摒除，得到 B4 的 2、7、8 只能在 ★ 三格。",-1)),c(e,{board:u.value,specialCells:B},null,8,["board"]),l[3]||(l[3]=s("p",null,"数字 4 对 B4 摒除，得到 B4 的 4 只能在 ★ 两格。从而得到唯余解 R2C1 = 9。",-1)),c(e,{board:b.value,specialCells:k},null,8,["board"]),l[4]||(l[4]=s("p",null,[C("有的地方会把数对、三链数、四链数统称为 "),s("strong",null,"数组"),C("（Subset），说明它们的本质都是一样的。四链数一般比较少用到，从前面的题目可以发现其实摒除数组和唯余数组是存在互补的关系，比如一个宫有 5 个未填数，其中有一个摒除数对的话相对就有一个唯余三链数。")],-1)),l[5]||(l[5]=s("p",null,"下面这个例子可以说是整个数组系统的总结，包括数对、三链数和四链数。",-1)),c(e,{board:i.value},null,8,["board"]),l[6]||(l[6]=s("p",null,"点算 ★ 三格，为 237 三链数；点算 ☆ 三格，为 378 三链数。",-1)),c(e,{board:m.value,specialCells:R},null,8,["board"]),l[7]||(l[7]=s("p",null,"点算 ★ 四格，或用 3、7、8、9 对 B9 摒除，可能的数字只有 1、2、4、6 四个。",-1)),c(e,{board:f.value,specialCells:N},null,8,["board"]),l[8]||(l[8]=s("p",null,"点算 ★ 三格为 379 三链数。",-1)),c(e,{board:g.value,specialCells:w},null,8,["board"]),l[9]||(l[9]=s("p",null,"数字 1 与 3 对 R5 摒除，得到 R5 的 1 与 3 只能在 ★ 两格。",-1)),l[10]||(l[10]=s("p",null,"数字 7 对 R5 摒除，最后得到 R5C3 = 7。",-1)),c(e,{board:v.value,specialCells:y},null,8,["board"])])}}});export{j as __pageData,D as default};
