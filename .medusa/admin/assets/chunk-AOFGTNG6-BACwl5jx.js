import{a0 as x,r as y,b as p,j as r,bt as a,I as S}from"./index-CumSOM47.js";import{D as k}from"./table-CJ41j77G.js";var D=(l,n)=>{const i=n?`${n}_order`:"order",c=l.get(i);if(!c)return{dir:"asc"};const o=c.startsWith("-")?"desc":"asc";return{key:c.replace("-",""),dir:o}},v=({keys:l,prefix:n})=>{const[i,c]=x(),[o,d]=y.useState(D(i,n)),u=n?`${n}_order`:"order",{t:m}=p(),j=e=>{d(s=>({...s,dir:e})),h({key:o.key,dir:e})},g=e=>{d(s=>({...s,key:e})),h({key:e,dir:o.dir})},h=e=>{if(!e.key){c(t=>(t.delete(u),t));return}const s=e.dir==="asc"?e.key:`-${e.key}`;c(t=>(t.set(u,s),t))};return r.jsxs(a,{children:[r.jsx(a.Trigger,{asChild:!0,children:r.jsx(S,{size:"small",children:r.jsx(k,{})})}),r.jsxs(a.Content,{className:"z-[1]",align:"end",children:[r.jsx(a.RadioGroup,{value:o.key,onValueChange:g,children:l.map(e=>{const s=String(e.key);return r.jsx(a.RadioItem,{value:s,onSelect:t=>t.preventDefault(),children:e.label},s)})}),r.jsx(a.Separator,{}),r.jsxs(a.RadioGroup,{value:o.dir,onValueChange:j,children:[r.jsxs(a.RadioItem,{className:"flex items-center justify-between",value:"asc",onSelect:e=>e.preventDefault(),children:[m("general.ascending"),r.jsx(a.Label,{children:"1 - 30"})]}),r.jsxs(a.RadioItem,{className:"flex items-center justify-between",value:"desc",onSelect:e=>e.preventDefault(),children:[m("general.descending"),r.jsx(a.Label,{children:"30 - 1"})]})]})]})]})};export{v as D};
