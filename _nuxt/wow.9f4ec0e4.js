import r from"./ContentDoc.91f919ae.js";import{u as s}from"./asyncData.5af8bde1.js";import{d as c,E as i,k as _,a as o,b as m,e as p,o as l}from"./entry.e9097903.js";import{q as u}from"./query.b7aadb1b.js";import"./ContentRenderer.db1ce3f6.js";import"./ContentRendererMarkdown.b6dd73ca.js";import"./index.a6ef77ff.js";import"./ContentQuery.93e8611c.js";import"./utils.689d4495.js";const w={class:"article-page"},d={class:"article-layout"},f=["innerHTML"],M=c({__name:"wow",async setup(h){let t,e;const{data:a}=([t,e]=i(()=>s("/wow",()=>u().where({_path:"/wow"}).findOne())),t=await t,e(),t);return(y,C)=>{const n=r;return l(),_("main",w,[o("article",d,[o("h1",{innerHTML:m(a).title},null,8,f),p(n,{path:"/wow"})])])}}});export{M as default};
