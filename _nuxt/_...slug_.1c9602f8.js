import{_ as L}from"./nuxt-link.8a1b8c30.js";import M from"./Toc.a5c0b234.js";import R from"./ContentRendererMarkdown.1f423d0e.js";import S from"./ContentRenderer.ff3856a5.js";import{d as V,a2 as $,s as E,E as H,aa as q,a3 as A,k as a,a as o,b as t,t as C,l as _,a0 as F,a1 as O,c as P,e as p,w as u,o as n,f as U,p as j,g as z,h as G}from"./entry.3577f35d.js";import{u as J}from"./asyncData.e0bf2f10.js";import{q as K}from"./query.a5b73e3d.js";import{f as Q}from"./formatDate.d39962da.js";import"./Icon.ca48fa8d.js";import"./config.b10f748a.js";import"./Icon.vue.ffb8e2e1.js";/* empty css                */import"./index.a6ef77ff.js";import"./utils.49274e84.js";const i=r=>(j("data-v-dd0aad57"),r=r(),z(),r),W={class:"article-page"},X={class:"article-layout"},Y={class:"article-meta"},Z={key:0,class:"article-meta-block"},ee=i(()=>o("h4",{class:"eyebrow"},"Опубликовано",-1)),te={key:1,class:"article-meta-block"},oe=i(()=>o("h4",{class:"eyebrow"},"Tags",-1)),se={class:"tag-list"},ne={class:"article-header"},ae=["innerHTML"],re=i(()=>o("h1",null,"No Content",-1)),ce=i(()=>o("p",null,"No content found.",-1)),ie=V({__name:"[...slug]",async setup(r){var f,y,v,k,w,x;let c,d;const m=$().path.replace(/\/$/,""),s=E().public,{data:e,error:b}=([c,d]=H(()=>J(`content-${m}`,()=>K().where({_path:m}).findOne())),c=await c,d(),c);if(b.value)throw q({statusCode:404,statusMessage:"Not Found",fatal:!0});const h=(f=e==null?void 0:e.value)!=null&&f.title?(y=e==null?void 0:e.value)==null?void 0:y.title:s.siteTitle,g=(v=e==null?void 0:e.value)!=null&&v.description?(k=e==null?void 0:e.value)==null?void 0:k.description:s.siteDesc,T=(w=e==null?void 0:e.value)!=null&&w.img?(x=e==null?void 0:e.value)==null?void 0:x.img:s.cover;return A({title:h+" | "+s.siteTitle,meta:[{hid:"description",name:"description",content:g},{hid:"og:type",property:"og:type",content:"article"},{hid:"og:url",property:"og:url",content:s.siteUrl+e.value._path},{hid:"og:title",property:"og:title",content:h+" | "+s.siteTitle},{hid:"og:description",property:"og:description",content:g},{hid:"og:image",property:"og:image",content:T}]}),(_e,pe)=>{const N=L,D=M,I=R,B=S;return n(),a("main",W,[o("article",X,[o("aside",Y,[t(e).date?(n(),a("div",Z,[ee,o("p",null,C(t(Q)(t(e).date)),1)])):_("",!0),t(e).tags?(n(),a("div",te,[oe,o("ul",se,[(n(!0),a(F,null,O(t(e).tags,l=>(n(),a("li",{key:l},[p(N,{to:"/tags/"+l,class:"hover:underline"},{default:u(()=>[U("#"+C(l),1)]),_:2},1032,["to"])]))),128))])])):_("",!0),t(e).body.toc.links!=0?(n(),P(D,{key:2,links:t(e).body.toc.links},null,8,["links"])):_("",!0)]),o("header",ne,[o("h1",{innerHTML:t(e).title},null,8,ae)]),p(B,{value:t(e)},{empty:u(()=>[re,ce]),default:u(()=>[p(I,{class:"article-body flow",ref:"nuxtContent",value:t(e)},null,8,["value"])]),_:1},8,["value"])])])}}});const Ne=G(ie,[["__scopeId","data-v-dd0aad57"]]);export{Ne as default};
