import n from"./ContentQuery.3d1d4a93.js";import{d as c,m as l,q as u}from"./entry.94ab3b7b.js";import"./asyncData.786fb37e.js";import"./query.c34c6cc5.js";import"./utils.3103c68a.js";import"./preview.2579e73e.js";const p=(r,t)=>u("pre",null,JSON.stringify({message:"You should use slots with <ContentList>",slot:r,data:t},null,2)),v=c({name:"ContentList",props:{path:{type:String,required:!1,default:void 0},query:{type:Object,required:!1,default:void 0}},render(r){const t=l(),{path:f,query:a}=r,m={...a||{},path:f||(a==null?void 0:a.path)||"/"};return u(n,m,{default:t!=null&&t.default?({data:e,refresh:o,isPartial:d})=>t.default({list:e,refresh:o,isPartial:d,...this.$attrs}):e=>p("default",e.data),empty:e=>t!=null&&t.empty?t.empty(e):p("default",e==null?void 0:e.data),"not-found":e=>{var o;return t!=null&&t["not-found"]?(o=t==null?void 0:t["not-found"])==null?void 0:o.call(t,e):p("not-found",e==null?void 0:e.data)}})}});export{v as default};
