import b from"./Icon.968a51a4.js";import{_ as D}from"./BaseButton.vue.0599aece.js";import{d as L,C as V,E as x,s as z,a5 as P,k as n,a as i,e as f,w as k,b as e,a2 as B,a3 as C,l as g,o as s,f as T,F as q,t as A,c as E,p as F,g as H,h as K}from"./entry.94ab3b7b.js";import M from"./TagPosts.85738aed.js";import{u as $}from"./asyncData.786fb37e.js";import{q as I}from"./query.c34c6cc5.js";import{a as R}from"./index.9fb912b1.js";import"./config.99db8b24.js";import"./nuxt-link.f4eb02c7.js";import"./formatDate.d39962da.js";import"./utils.3103c68a.js";import"./preview.2579e73e.js";const j=l=>(F("data-v-5d8c7c91"),l=l(),H(),l),G={class:"blog-layout"},J={class:"blog-layout__content"},O={class:"content-area flow"},Q=j(()=>i("h1",null,"Blog",-1)),U={class:"top-wrap"},W={key:0,class:"tag-list"},X={key:1,class:"post-item"},Y={key:2},Z=L({__name:"index",async setup(l){let t,_;const d=V(!1),{data:m,pending:h,refresh:tt}=([t,_]=x(()=>$("/posts",()=>I("/posts").only(["_path","title","description","date","tags","draft"]).where([{type:"post"},{draft:{$ne:!0}}]).sort({date:-1}).find())),t=await t,_(),t),{data:N}=([t,_]=x(()=>$("tags",()=>I("/posts").only("tags").where([{type:"post"},{draft:{$ne:!0}}]).find())),t=await t,_(),t),y=(v,c)=>v.map(o=>{let p=o;return o[c]&&(p=y(o[c])),p}).flat(1),S=[...new Set(y(N.value,"tags"))];R();const r=z().public;return P({title:`Blog — ${r.siteTitle}`,meta:[{name:"description",content:r.siteDesc},{name:"og:title",content:`Blog — ${r.siteTitle}`},{name:"og:description",content:r.siteDesc},{name:"og:image",content:r.cover}]}),(v,c)=>{const w=b,o=D,p=M;return s(),n("main",null,[i("div",G,[i("div",J,[i("div",O,[Q,i("div",U,[f(o,{onClick:c[0]||(c[0]=a=>d.value=!e(d)),variant:"outline",size:"md",color:"primary"},{default:k(()=>[T(" Tags "),f(w,{class:q([e(d)?"rotate-180":""]),name:"ri:arrow-down-line"},null,8,["class"])]),_:1})]),e(d)?(s(),n("div",W,[(s(),n(B,null,C(S,(a,u)=>i("span",{class:"tag-item",key:u},[f(o,{to:"/tags/"+a,variant:"solid",size:"sm",color:"primary"},{default:k(()=>[T(A(a),1)]),_:2},1032,["to"])])),64))])):g("",!0),e(m).length>0&&!e(h)?(s(),n("div",X,[(s(!0),n(B,null,C(e(m),(a,u)=>(s(),E(p,{key:u,data:a},null,8,["data"]))),128))])):g("",!0),e(m).length<=0&&!e(h)?(s(),n("div",Y," No articles. ")):g("",!0)])])])])}}});const mt=K(Z,[["__scopeId","data-v-5d8c7c91"]]);export{mt as default};