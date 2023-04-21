import{_ as H}from"./nuxt-link.8bc52c0d.js";import q from"./Toc.363337dd.js";import z from"./ContentRendererMarkdown.7cd923bc.js";import F from"./ContentRenderer.9e815b29.js";import O from"./Icon.d66a9e5f.js";import{_ as U}from"./BaseButton.vue.108c780d.js";/* empty css                       */import{d as I,a2 as B,E as D,o as a,k as r,b as e,c as y,w as p,e as i,f as v,l as u,h as S,s as j,aa as G,a3 as J,a as n,t as $,a0 as K,a1 as P,p as Q,g as W}from"./entry.f701c4c0.js";import{q as A}from"./query.05036ab5.js";/* empty css                              */import{u as X}from"./asyncData.0c2f9756.js";import{f as Y}from"./formatDate.d39962da.js";/* empty css                */import"./config.1c743073.js";import"./Icon.vue.2a07199e.js";import"./index.a6ef77ff.js";import"./utils.b013d258.js";const Z={class:"article-navigation"},tt=I({__name:"ArticleNavigation",async setup(c){let s,_;const{path:m}=B(),[o,t]=([s,_]=D(()=>A("/posts").only(["_path","title"]).sort({date:-1}).where([{type:"post"},{draft:{$ne:!0}}]).findSurround({_path:m})),s=await s,_(),s);return(k,f)=>{const l=O,d=U;return a(),r("div",Z,[e(t)?(a(),y(d,{key:0,to:e(t)._path,title:e(t).title,class:"prev-button",variant:"outline",size:"md",color:"primary"},{default:p(()=>[i(l,{name:"ri:arrow-left-line"}),v(" Назад ")]),_:1},8,["to","title"])):u("",!0),e(o)?(a(),y(d,{key:1,to:e(o)._path,title:e(o).title,class:"next-button",variant:"outline",size:"md",color:"primary"},{default:p(()=>[v(" Вперед "),i(l,{name:"ri:arrow-right-line"})]),_:1},8,["to","title"])):u("",!0)])}}}),et=S(tt,[["__scopeId","data-v-f1cf9aa5"]]),h=c=>(Q("data-v-0191091b"),c=c(),W(),c),ot={class:"article-page"},nt={class:"article-layout"},st={class:"article-meta"},at={key:0,class:"article-meta-block"},rt=h(()=>n("h4",{class:"eyebrow"},"Опубликовано",-1)),it={key:1,class:"article-meta-block"},ct=h(()=>n("h4",{class:"eyebrow"},"Tags",-1)),_t={class:"tag-list"},lt={class:"article-header"},pt=["innerHTML"],ut=h(()=>n("h1",null,"No Content",-1)),mt=h(()=>n("p",null,"No content found.",-1)),dt=I({__name:"[...slug]",async setup(c){var x,w,b,C,N,T;let s,_;const{path:m}=B(),o=j().public,{data:t,error:k}=([s,_]=D(()=>X(`content-${m}`,()=>A().where({_path:m}).findOne())),s=await s,_(),s);if(k.value)throw G({statusCode:404,statusMessage:"Not Found",fatal:!0});const f=(x=t==null?void 0:t.value)!=null&&x.title?(w=t==null?void 0:t.value)==null?void 0:w.title:o.siteTitle,l=(b=t==null?void 0:t.value)!=null&&b.description?(C=t==null?void 0:t.value)==null?void 0:C.description:o.siteDesc,d=(N=t==null?void 0:t.value)!=null&&N.img?(T=t==null?void 0:t.value)==null?void 0:T.img:o.cover;return J({title:f+" | "+o.siteTitle,meta:[{hid:"description",name:"description",content:l},{hid:"og:type",property:"og:type",content:"article"},{hid:"og:url",property:"og:url",content:o.siteUrl+t.value._path},{hid:"og:title",property:"og:title",content:f+" | "+o.siteTitle},{hid:"og:description",property:"og:description",content:l},{hid:"og:image",property:"og:image",content:d}]}),(ht,ft)=>{const L=H,M=q,R=z,V=F,E=et;return a(),r("main",ot,[n("article",nt,[n("aside",st,[e(t).date?(a(),r("div",at,[rt,n("p",null,$(e(Y)(e(t).date)),1)])):u("",!0),e(t).tags?(a(),r("div",it,[ct,n("ul",_t,[(a(!0),r(K,null,P(e(t).tags,g=>(a(),r("li",{key:g},[i(L,{to:"/tags/"+g,class:"hover:underline"},{default:p(()=>[v("#"+$(g),1)]),_:2},1032,["to"])]))),128))])])):u("",!0),e(t).body.toc.links!=0?(a(),y(M,{key:2,links:e(t).body.toc.links},null,8,["links"])):u("",!0)]),n("header",lt,[n("h1",{innerHTML:e(t).title},null,8,pt)]),i(V,{value:e(t)},{empty:p(()=>[ut,mt]),default:p(()=>[i(R,{class:"article-body flow",ref:"nuxtContent",value:e(t)},null,8,["value"])]),_:1},8,["value"]),i(E,{class:"prev-next"})])])}}});const Mt=S(dt,[["__scopeId","data-v-0191091b"]]);export{Mt as default};
