import{u as I,a as A}from"./chunk-PCFUZKDS-cCjaqnDx.js";import{a6 as u,R as B,aN as H,j as t,b as P,r as S,a8 as M,a9 as N,e as D,aO as O,t as f,E as V,B as x,V as K}from"./index-CumSOM47.js";import{u as L,_ as q}from"./chunk-B2JT2FOA-CZA508ZK.js";import"./lodash-T6dfyGG_.js";import{u as G}from"./chunk-FZRIVT5D-Bf9TJUbV.js";import"./chunk-GJUPECDU-Cn_sAn5F.js";import{K as Q}from"./chunk-6HTZNHPT-D5epqLsO.js";import{R as l,u as U}from"./chunk-4TC5YS65-CJO4PBQt.js";import{C as y}from"./checkbox-BZqGELSv.js";import{c as X}from"./index-lCtoakS0.js";import"./chunk-IQBAUTU5-CZkqECXD.js";import"./chunk-ADOCJB6L-SS4fJgbV.js";import"./chunk-P3UUX2T6-B_L_Wd4q.js";import"./chunk-C76H5USB-fHzqAGgp.js";import"./chunk-YEDAFXMB-CmxJxcX3.js";import"./chunk-AOFGTNG6-BACwl5jx.js";import"./table-CJ41j77G.js";import"./chunk-EMIHDNB7-BFCssnbH.js";import"./plus-mini-TV-S3sTQ.js";import"./command-bar-CMOCImbm.js";import"./index-DpFNmgeY.js";import"./chunk-PFKKVLZX-CRVaKurV.js";import"./format-C4rG8IYt.js";import"./_isIndex-DHJw3reu.js";import"./x-mark-mini-CD0jaHW3.js";import"./date-picker-Bo-FcHn6.js";import"./popover-d7egIYsV.js";import"./triangle-left-mini-Ds9h06S9.js";import"./index-CqdUg1oN.js";import"./prompt-CeC6TAgs.js";var Z=u.object({product_ids:u.array(u.string())}),m=50,p="p",$=({categoryId:c,products:o=[]})=>{const{t:e}=P(),{handleSuccess:a}=U(),[d,n]=S.useState(o.reduce((r,i)=>(r[i.id]=!0,r),{})),s=M({defaultValues:{product_ids:[]},resolver:N(Z)}),b=r=>{const i=typeof r=="function"?r(d):r;s.setValue("product_ids",Object.keys(i),{shouldDirty:!0,shouldTouch:!0}),n(i)},{searchParams:j,raw:C}=I({pageSize:m,prefix:p}),{products:v,count:g,isPending:_,isError:E,error:R}=D({...j}),h=W(),k=G(["categories"]),{table:T}=L({data:v,columns:h,getRowId:r=>r.id,count:g,pageSize:m,prefix:p,enableRowSelection:r=>!o.some(i=>i.id===r.original.id),enablePagination:!0,rowSelection:{state:d,updater:b}}),{mutateAsync:w,isPending:F}=O(c),z=s.handleSubmit(async r=>{await w({add:r.product_ids},{onSuccess:()=>{f.success(e("categories.products.add.successToast",{count:r.product_ids.length-o.length})),a()},onError:i=>{f.error(i.message)}})});if(E)throw R;return t.jsx(l.Form,{form:s,children:t.jsxs(Q,{onSubmit:z,className:"flex h-full flex-col overflow-hidden",children:[t.jsx(l.Header,{children:t.jsxs("div",{className:"flex items-center justify-end gap-x-2",children:[s.formState.errors.product_ids&&t.jsx(V,{variant:"error",children:s.formState.errors.product_ids.message}),t.jsx(l.Close,{asChild:!0,children:t.jsx(x,{size:"small",variant:"secondary",children:e("actions.cancel")})}),t.jsx(x,{size:"small",type:"submit",isLoading:F,children:e("actions.save")})]})}),t.jsx(l.Body,{className:"size-full overflow-hidden",children:t.jsx(q,{table:T,columns:h,pageSize:m,count:g,queryObject:C,filters:k,orderBy:[{key:"title",label:e("fields.title")},{key:"created_at",label:e("fields.createdAt")},{key:"updated_at",label:e("fields.updatedAt")}],prefix:p,isLoading:_,layout:"fill",pagination:!0,search:"autofocus"})})]})})},J=X(),W=()=>{const{t:c}=P(),o=A();return S.useMemo(()=>[J.display({id:"select",header:({table:e})=>t.jsx(y,{checked:e.getIsSomePageRowsSelected()?"indeterminate":e.getIsAllPageRowsSelected(),onCheckedChange:a=>e.toggleAllPageRowsSelected(!!a)}),cell:({row:e})=>{const a=!e.getCanSelect(),d=e.getIsSelected()||a,n=t.jsx(y,{checked:d,disabled:a,onCheckedChange:s=>e.toggleSelected(!!s),onClick:s=>{s.stopPropagation()}});return a?t.jsx(K,{content:c("categories.products.add.disabledTooltip"),side:"right",children:n}):n}}),...o],[c,o])},Te=()=>{const{id:c}=B(),{product_category:o,isPending:e,isFetching:a,isError:d,error:n}=H(c,{fields:"products.id"}),s=!e&&!a&&!!o;if(d)throw n;return t.jsx(l,{children:s&&t.jsx($,{categoryId:o.id,products:o.products})})};export{Te as Component};
