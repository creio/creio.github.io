import{d as S,B as A,y as B,C,j as o,D as N,E as b,b as e,o as r,k as w,F as h,c as z,G as D,t as E,H as F,h as H}from"./entry.05401410.js";import{u as j}from"./config.fcca40b3.js";import{I as q,l as G}from"./Icon.vue.818ed701.js";const $=["width","height"],J=S({__name:"Icon",props:{name:{type:String,required:!0},size:{type:String,default:""}},async setup(f){var x;let c,v;const i=f,k=A(),s=j();(x=s==null?void 0:s.nuxtIcon)!=null&&x.aliases;const m=B("icons",()=>({})),p=C(!1),a=o(()=>{var t;return(((t=s.nuxtIcon)==null?void 0:t.aliases)||{})[i.name]||i.name}),_=o(()=>{var t;return(t=m.value)==null?void 0:t[a.value]}),l=o(()=>k.vueApp.component(a.value)),n=o(()=>{var d,I,g;if(!i.size&&typeof((d=s.nuxtIcon)==null?void 0:d.size)=="boolean"&&!((I=s.nuxtIcon)!=null&&I.size))return;const t=i.size||((g=s.nuxtIcon)==null?void 0:g.size)||"1em";return String(Number(t))===t?`${t}px`:t}),u=o(()=>{var t;return((t=s==null?void 0:s.nuxtIcon)==null?void 0:t.class)??"icon"});async function y(){var t;l.value||(t=m.value)!=null&&t[a.value]||(p.value=!0,m.value[a.value]=await G(a.value).catch(()=>{}),p.value=!1)}return N(()=>a.value,y),!l.value&&([c,v]=b(()=>y()),c=await c,v()),(t,d)=>e(p)?(r(),w("span",{key:0,class:h(e(u)),width:e(n),height:e(n)},null,10,$)):e(_)?(r(),z(e(q),{key:1,icon:e(_),class:h(e(u)),width:e(n),height:e(n)},null,8,["icon","class","width","height"])):e(l)?(r(),z(D(e(l)),{key:2,class:h(e(u)),width:e(n),height:e(n)},null,8,["class","width","height"])):(r(),w("span",{key:3,class:h(e(u)),style:F({fontSize:e(n),lineHeight:e(n),width:e(n),height:e(n)})},E(f.name),7))}}),O=H(J,[["__scopeId","data-v-cf1ec82f"]]);export{O as default};