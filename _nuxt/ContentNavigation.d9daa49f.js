import{u as f}from"./asyncData.bebf816d.js";import{s as v,v as d,d as l,x as _,j as g,y as h,m as y,q as s}from"./entry.05401410.js";import{q as w,h as m,e as C,j as $}from"./query.511cc320.js";import{_ as j}from"./nuxt-link.fb55b6b3.js";import{w as c,s as N,u as P,a as x}from"./utils.4f7982bd.js";import"./Icon.vue.818ed701.js";/* empty css                       *//* empty css                      *//* empty css                     *//* empty css                *//* empty css                              *//* empty css                           *//* empty css                     */import"./index.esm.0c882f34.js";/* empty css                      *//* empty css                    */const T=async n=>{const{content:t}=v().public;typeof(n==null?void 0:n.params)!="function"&&(n=w(n));const a=n.params(),i=t.experimental.stripQueryParameters?c(`/navigation/${`${m(a)}.${t.integrity}`}/${C(a)}.json`):c(`/navigation/${m(a)}.${t.integrity}.json`);if(N())return(await d(()=>import("./client-db.363c2569.js"),["./client-db.363c2569.js","./entry.05401410.js","./entry.4d31bc93.css","./utils.4f7982bd.js","./query.511cc320.js","./index.a6ef77ff.js"],import.meta.url).then(o=>o.generateNavigation))(a);const e=await $fetch(i,{method:"GET",responseType:"json",params:t.experimental.stripQueryParameters?void 0:{_params:$(a),previewToken:P("previewToken").value}});if(typeof e=="string"&&e.startsWith("<!DOCTYPE html>"))throw new Error("Not found");return e};const q=l({name:"ContentNavigation",props:{query:{type:Object,required:!1,default:void 0}},async setup(n){const{query:t}=_(n),a=g(()=>{var e;return typeof((e=t.value)==null?void 0:e.params)=="function"?t.value.params():t.value});if(!a.value&&h("dd-navigation").value){const{navigation:e}=x();return{navigation:e}}const{data:i}=await f(`content-navigation-${m(a.value)}`,()=>T(a.value));return{navigation:i}},render(n){const t=y(),{navigation:a}=n,i=o=>s(j,{to:o._path},()=>o.title),e=(o,p)=>s("ul",p?{"data-level":p}:null,o.map(r=>r.children?s("li",null,[i(r),e(r.children,p+1)]):s("li",null,i(r)))),u=o=>e(o,0);return t!=null&&t.default?t.default({navigation:a,...this.$attrs}):u(a)}});export{q as default};
