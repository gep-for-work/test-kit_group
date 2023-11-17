import{D as T,i as k,e as h,o as l,c as u,b as c,F as b,f as v,t as $,a as M,r as N,s as P,h as L,E as D,m as U}from"./index-ce070541.js";const K=T("transactions",()=>{const e="transactionList";let t=[];try{const i=localStorage.getItem(e);i&&(t=JSON.parse(i))}catch{console.error('Deny access to "localStorage"')}let o=k(t);function s(i){o=i}function r(i){const y={id:o.length+1,...i};o.push(y);try{localStorage.setItem(e,JSON.stringify(o))}catch{}}return{list:o,setList:s,addToList:r}});const A={class:"table"},B={class:"table__head"},E={class:"table__body"},O={key:0,class:"table__pagination"},F=["colspan"],j=["disabled"],z={class:"table__pagination__page"},H=["disabled"],R={__name:"Table",props:{items:{type:Array,default:()=>[]},countItemsToView:{type:Number,default:10},modelValue:{type:Number}},emits:["update:modelValue"],setup(e,{emit:t}){const o=t,s=e,r=h({get(){return s.modelValue},set(a){o("update:modelValue",a)}}),i=h(()=>Math.ceil(s.items.length/s.countItemsToView)),y=h(()=>{const a=(s.modelValue-1)*s.countItemsToView;return s.items.slice(a,a+s.countItemsToView)}),w=h(()=>s.items.length?Object.keys(s.items[0]).length:0),V=a=>{let n=[];return a.includes("-")?n=a.split("-"):a.includes("_")?n=a.split("_"):n=a.split(/(?=[A-Z])/),n[0]=n[0].charAt(0).toUpperCase()+n[0].slice(1),n.join(" ")};return(a,n)=>(l(),u("table",A,[c("thead",B,[c("tr",null,[(l(!0),u(b,null,v(e.items[0],(d,m)=>(l(),u("th",{key:m},$(V(m)),1))),128))])]),c("tbody",E,[(l(!0),u(b,null,v(y.value,(d,m)=>(l(),P(D,{key:d.id||m,tag:"tr"},{default:L(()=>[(l(!0),u(b,null,v(d,(I,C)=>(l(),u("td",{key:`${d.id||m}_${C}`},$(I),1))),128))]),_:2},1024))),128))]),i.value>1?(l(),u("tfoot",O,[c("tr",null,[c("td",{colspan:w.value},[c("button",{class:"table__pagination__item",onClick:n[0]||(n[0]=d=>r.value--),disabled:r.value===1}," ← ",8,j),c("span",z,$(r.value),1),c("button",{class:"table__pagination__item",onClick:n[1]||(n[1]=d=>r.value++),disabled:r.value===i.value}," → ",8,H)],8,F)])])):M("",!0),N(a.$slots,"caption")]))}},_=(e=0,t=1)=>(e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e),p=1e4,g=1e5,S={USD:{name:"United States dollar",reserve:_(p,g)},UAH:{name:"Ukrainian hryvnia",reserve:_(p,g)},EUR:{name:"Euro",reserve:_(p,g)},PLN:{name:"Polish złoty",reserve:_(p,g)},CZK:{name:"Czech koruna",reserve:_(p,g)}},Z=T("currencies",()=>{const e="-";let t={};for(const o in S)for(const s in S)if(o!==s){const r=_(1,10);t[`${o}${e}${s}`]={rate:r},t[`${s}${e}${o}`]={rate:1/r}}return{currencies:k(S),currenciesPair:k(t),pairSeparator:U(e)}});function f(e){return e<10?`0${e}`:e}const x=e=>{const t=new Date(e.timestamp);return{id:e.id,віддаю:`${e.from.amount} ${e.from.currency}`,отримую:`${e.to.amount} ${e.to.currency}`,"по курсу":`1 = ${e.rate}`,дата:`${f(t.getDate())}.${f(t.getMonth())}.${t.getFullYear()} ${f(t.getHours())}:${f(t.getMinutes())}`}};export{R as _,K as a,x as f,Z as u};
