import{_ as L}from"./nuxt-link.6c252b2c.js";import M from"./Toc.b40c26e4.js";import R from"./ContentRendererMarkdown.9c2aad6a.js";import S from"./ContentRenderer.27cf7995.js";import{d as V,a2 as E,s as H,E as $,aa as q,a3 as A,k as r,a as o,b as t,t as C,l as _,a0 as F,a1 as O,c as U,e as p,w as u,o as n,f as j,p as z,g as G,h as J}from"./entry.0cade926.js";import{u as K}from"./asyncData.1d0ae75c.js";import{q as P}from"./query.4c64c992.js";import{f as Q}from"./formatDate.d39962da.js";import"./Icon.29c4888e.js";import"./config.9d9d5f2c.js";import"./Icon.vue.83c5577b.js";/* empty css                */import"./index.a6ef77ff.js";import"./utils.876aaf0c.js";const c=a=>(z("data-v-265081f7"),a=a(),G(),a),W={class:"article-page"},X={class:"article-layout"},Y={class:"article-meta"},Z={key:0,class:"article-meta-block"},ee=c(()=>o("h4",{class:"eyebrow"},"Опубликовано",-1)),te={key:1,class:"article-meta-block"},oe=c(()=>o("h4",{class:"eyebrow"},"Tags",-1)),se={class:"tag-list"},ne={class:"article-header"},re=["innerHTML"],ae=c(()=>o("h1",null,"No Content",-1)),ie=c(()=>o("p",null,"No content found.",-1)),ce=V({__name:"[...slug]",async setup(a){var f,y,v,k,w,x;let i,m;const{path:d}=E(),s=H().public,{data:e,error:b}=([i,m]=$(()=>K(`content-${d}`,()=>P().where({_path:d}).findOne())),i=await i,m(),i);if(b.value)throw q({statusCode:404,statusMessage:"Not Found",fatal:!0});const h=(f=e==null?void 0:e.value)!=null&&f.title?(y=e==null?void 0:e.value)==null?void 0:y.title:s.siteTitle,g=(v=e==null?void 0:e.value)!=null&&v.description?(k=e==null?void 0:e.value)==null?void 0:k.description:s.siteDesc,T=(w=e==null?void 0:e.value)!=null&&w.img?(x=e==null?void 0:e.value)==null?void 0:x.img:s.cover;return A({title:h+" | "+s.siteTitle,meta:[{hid:"description",name:"description",content:g},{hid:"og:type",property:"og:type",content:"article"},{hid:"og:url",property:"og:url",content:s.siteUrl+e.value._path},{hid:"og:title",property:"og:title",content:h+" | "+s.siteTitle},{hid:"og:description",property:"og:description",content:g},{hid:"og:image",property:"og:image",content:T}]}),(le,_e)=>{const N=L,D=M,I=R,B=S;return n(),r("main",W,[o("article",X,[o("aside",Y,[t(e).date?(n(),r("div",Z,[ee,o("p",null,C(t(Q)(t(e).date)),1)])):_("",!0),t(e).tags?(n(),r("div",te,[oe,o("ul",se,[(n(!0),r(F,null,O(t(e).tags,l=>(n(),r("li",{key:l},[p(N,{to:"/tags/"+l,class:"hover:underline"},{default:u(()=>[j("#"+C(l),1)]),_:2},1032,["to"])]))),128))])])):_("",!0),t(e).body.toc.links!=0?(n(),U(D,{key:2,links:t(e).body.toc.links},null,8,["links"])):_("",!0)]),o("header",ne,[o("h1",{innerHTML:t(e).title},null,8,re)]),p(B,{value:t(e)},{empty:u(()=>[ae,ie]),default:u(()=>[p(I,{class:"article-body flow",ref:"nuxtContent",value:t(e)},null,8,["value"])]),_:1},8,["value"])])])}}});const Te=J(ce,[["__scopeId","data-v-265081f7"]]);export{Te as default};
