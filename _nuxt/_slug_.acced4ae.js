import p from"./TagPosts.85738aed.js";import{d as u,s as m,a4 as d,E as f,a5 as g,k as a,a as s,t as y,b as r,a2 as h,a3 as v,o,e as b,h as x}from"./entry.94ab3b7b.js";import{u as k}from"./asyncData.786fb37e.js";import{q as w}from"./query.c34c6cc5.js";import"./nuxt-link.f4eb02c7.js";import"./BaseButton.vue.0599aece.js";import"./formatDate.d39962da.js";import"./utils.3103c68a.js";import"./preview.2579e73e.js";const C={class:"blog-layout"},B={class:"blog-layout__content"},q={class:"content-area flow"},A=u({__name:"[slug]",async setup(D){let t,n;const c=m().public,{params:{slug:e}}=d(),{data:i}=([t,n]=f(()=>k("posts",()=>w("/posts").where([{tags:{$contains:e}},{type:"post"},{draft:{$ne:!0}}]).sort({date:-1}).find())),t=await t,n(),t);return g({title:e+" tag | "+c.siteTitle}),(E,N)=>{const l=p;return o(),a("main",null,[s("div",C,[s("div",B,[s("div",q,[s("h1",null,y(r(e)),1),(o(!0),a(h,null,v(r(i),_=>(o(),a("div",{class:"post-item",key:_._path},[b(l,{data:_},null,8,["data"])]))),128))])])])])}}});const S=x(A,[["__scopeId","data-v-5740b8c2"]]);export{S as default};
