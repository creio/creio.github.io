import E from"./Icon.83e4ec92.js";import{_ as P}from"./BaseButton.vue.a759e5bd.js";/* empty css                       */import q from"./TagPosts.3d64464f.js";import{d as F,C as h,j as R,E as B,$ as U,D as j,s as H,a3 as K,k as n,a as r,e as y,w as L,b as e,a0 as S,a1 as A,l as v,o as s,f as D,F as M,t as G,c as J,p as O,g as Q,h as W}from"./entry.05401410.js";import{u as w}from"./asyncData.bebf816d.js";import{q as C}from"./query.511cc320.js";import{a as X}from"./index.a3e37bfc.js";import"./config.fcca40b3.js";import"./Icon.vue.818ed701.js";import"./nuxt-link.fb55b6b3.js";import"./formatDate.d39962da.js";/* empty css                     */import"./utils.4f7982bd.js";const Y=l=>(O("data-v-304363ce"),l=l(),Q(),l),Z={class:"blog-layout"},tt={class:"blog-layout__content"},et={class:"content-area flow"},st=Y(()=>r("h1",null,"Blog",-1)),at={class:"top-wrap"},ot={key:0,class:"tag-list"},nt={key:1,class:"post-item"},rt={key:2},it=F({__name:"index",async setup(l){let t,p;const _=h(!1),d=h(""),I=h(null),x=R(()=>[d.value.charAt(0).toUpperCase()+d.value.slice(1).toLowerCase(),d.value.toLowerCase(),d.value.toUpperCase()]),{data:f,pending:$,refresh:N}=([t,p]=B(()=>w("/posts",()=>C("/posts").only(["_path","title","description","date","tags","draft"]).where([{title:{$containsAny:x.value}},{type:"post"},{draft:{$ne:!0}}]).sort({date:-1}).find())),t=await t,p(),t),{data:b}=([t,p]=B(()=>w("tags",()=>C("/posts").only("tags").where([{type:"post"},{draft:{$ne:!0}}]).find())),t=await t,p(),t);U(async()=>{await w("/posts",()=>C("/posts").only(["_path","title","description","date","tags","draft"]).where([{title:{$containsAny:x.value}},{type:"post"},{draft:{$ne:!0}}]).sort({date:-1}).find())});const T=(u,c)=>u.map(a=>{let m=a;return a[c]&&(m=T(a[c])),m}).flat(1),V=[...new Set(T(b.value,"tags"))],{ctrl_Slash:z}=X();j(z,u=>{u&&(I.value.focus(),N())});const i=H().public;return K({title:`Blog — ${i.siteTitle}`,meta:[{name:"description",content:i.siteDesc},{name:"og:title",content:`Blog — ${i.siteTitle}`},{name:"og:description",content:i.siteDesc},{name:"og:image",content:i.cover}]}),(u,c)=>{const k=E,a=P,m=q;return s(),n("main",null,[r("div",Z,[r("div",tt,[r("div",et,[st,r("div",at,[y(a,{onClick:c[0]||(c[0]=o=>_.value=!e(_)),variant:"outline",size:"md",color:"primary"},{default:L(()=>[D(" Tags "),y(k,{class:M([e(_)?"rotate-180":""]),name:"ri:arrow-down-line"},null,8,["class"])]),_:1})]),e(_)?(s(),n("div",ot,[(s(),n(S,null,A(V,(o,g)=>r("span",{class:"tag-item",key:g},[y(a,{to:"/tags/"+o,variant:"solid",size:"sm",color:"primary"},{default:L(()=>[D(G(o),1)]),_:2},1032,["to"])])),64))])):v("",!0),e(f).length>0&&!e($)?(s(),n("div",nt,[(s(!0),n(S,null,A(e(f),(o,g)=>(s(),J(m,{key:g,data:o},null,8,["data"]))),128))])):v("",!0),e(f).length<=0&&!e($)?(s(),n("div",rt," No articles. ")):v("",!0)])])])])}}});const xt=W(it,[["__scopeId","data-v-304363ce"]]);export{xt as default};