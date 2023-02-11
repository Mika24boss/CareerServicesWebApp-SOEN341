import{S as ot,i as it,s as st,a as lt,e as V,c as ct,b as K,g as pe,t as B,d as he,f as F,h as H,j as ft,o as Ae,k as ut,l as dt,m as pt,n as Ee,p as C,q as ht,r as mt,u as _t,v as X,w as Y,x as Oe,y as Q,z as Z,A as ue}from"./chunks/index-20c84258.js";import{S as tt,I as x,g as ze,f as Me,a as ke,b as de,s as q,i as We,c as ae,P as Ge,d as gt,e as wt,h as yt}from"./chunks/singletons-317f8e08.js";import{u as vt}from"./chunks/parse-b67c4dc9.js";function bt(r,e){return r==="/"||e==="ignore"?r:e==="never"?r.endsWith("/")?r.slice(0,-1):r:e==="always"&&!r.endsWith("/")?r+"/":r}function Et(r){return r.split("%25").map(decodeURI).join("%25")}function kt(r){for(const e in r)r[e]=decodeURIComponent(r[e]);return r}const Rt=["href","pathname","search","searchParams","toString","toJSON"];function St(r,e){const n=new URL(r);for(const s of Rt){let l=n[s];Object.defineProperty(n,s,{get(){return e(),l},enumerable:!0,configurable:!0})}return Lt(n),n}function Lt(r){Object.defineProperty(r,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const Pt="/__data.json";function At(r){return r.replace(/\/$/,"")+Pt}function Ut(...r){let e=5381;for(const n of r)if(typeof n=="string"){let s=n.length;for(;s;)e=e*33^n.charCodeAt(--s)}else if(ArrayBuffer.isView(n)){const s=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);let l=s.length;for(;l;)e=e*33^s[--l]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}const me=window.fetch;window.fetch=(r,e)=>((r instanceof Request?r.method:(e==null?void 0:e.method)||"GET")!=="GET"&&re.delete(Ie(r)),me(r,e));const re=new Map;function $t(r,e){const n=Ie(r,e),s=document.querySelector(n);if(s!=null&&s.textContent){const{body:l,...d}=JSON.parse(s.textContent),t=s.getAttribute("data-ttl");return t&&re.set(n,{body:l,init:d,ttl:1e3*Number(t)}),Promise.resolve(new Response(l,d))}return me(r,e)}function Ot(r,e,n){if(re.size>0){const s=Ie(r,n),l=re.get(s);if(l){if(performance.now()<l.ttl&&["default","force-cache","only-if-cached",void 0].includes(n==null?void 0:n.cache))return new Response(l.body,l.init);re.delete(s)}}return me(e,n)}function Ie(r,e){let s=`script[data-sveltekit-fetched][data-url=${JSON.stringify(r instanceof Request?r.url:r)}]`;if(e!=null&&e.headers||e!=null&&e.body){const l=[];e.headers&&l.push([...new Headers(e.headers)].join(",")),e.body&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&l.push(e.body),s+=`[data-hash="${Ut(...l)}"]`}return s}const It=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function Tt(r){const e=[];return{pattern:r==="/"?/^\/$/:new RegExp(`^${Nt(r).map(s=>{const l=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(s);if(l)return e.push({name:l[1],matcher:l[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const d=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(s);if(d)return e.push({name:d[1],matcher:d[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!s)return;const t=s.split(/\[(.+?)\](?!\])/);return"/"+t.map((w,_)=>{if(_%2){if(w.startsWith("x+"))return Re(String.fromCharCode(parseInt(w.slice(2),16)));if(w.startsWith("u+"))return Re(String.fromCharCode(...w.slice(2).split("-").map(P=>parseInt(P,16))));const g=It.exec(w);if(!g)throw new Error(`Invalid param: ${w}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,R,S,D,j]=g;return e.push({name:D,matcher:j,optional:!!R,rest:!!S,chained:S?_===1&&t[0]==="":!1}),S?"(.*?)":R?"([^/]*)?":"([^/]+?)"}return Re(w)}).join("")}).join("")}/?$`),params:e}}function Dt(r){return!/^\([^)]+\)$/.test(r)}function Nt(r){return r.slice(1).split("/").filter(Dt)}function jt(r,e,n){const s={},l=r.slice(1);let d=0;for(let t=0;t<e.length;t+=1){const p=e[t],w=l[t-d];if(p.chained&&p.rest&&d){s[p.name]=l.slice(t-d,t+1).filter(_=>_).join("/"),d=0;continue}if(w===void 0){p.rest&&(s[p.name]="");continue}if(!p.matcher||n[p.matcher](w)){s[p.name]=w;continue}if(p.optional&&p.chained){d++;continue}return}if(!d)return s}function Re(r){return r.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function xt(r,e,n,s){const l=new Set(e);return Object.entries(n).map(([p,[w,_,g]])=>{const{pattern:R,params:S}=Tt(p),D={id:p,exec:j=>{const P=R.exec(j);if(P)return jt(P,S,s)},errors:[1,...g||[]].map(j=>r[j]),layouts:[0,..._||[]].map(t),leaf:d(w)};return D.errors.length=D.layouts.length=Math.max(D.errors.length,D.layouts.length),D});function d(p){const w=p<0;return w&&(p=~p),[w,r[p]]}function t(p){return p===void 0?p:[l.has(p),r[p]]}}function Ct(r){let e,n,s;var l=r[0][0];function d(t){return{props:{data:t[2],form:t[1]}}}return l&&(e=X(l,d(r))),{c(){e&&Y(e.$$.fragment),n=V()},l(t){e&&Oe(e.$$.fragment,t),n=V()},m(t,p){e&&Q(e,t,p),K(t,n,p),s=!0},p(t,p){const w={};if(p&4&&(w.data=t[2]),p&2&&(w.form=t[1]),l!==(l=t[0][0])){if(e){pe();const _=e;B(_.$$.fragment,1,0,()=>{Z(_,1)}),he()}l?(e=X(l,d(t)),Y(e.$$.fragment),F(e.$$.fragment,1),Q(e,n.parentNode,n)):e=null}else l&&e.$set(w)},i(t){s||(e&&F(e.$$.fragment,t),s=!0)},o(t){e&&B(e.$$.fragment,t),s=!1},d(t){t&&H(n),e&&Z(e,t)}}}function qt(r){let e,n,s;var l=r[0][0];function d(t){return{props:{data:t[2],$$slots:{default:[Vt]},$$scope:{ctx:t}}}}return l&&(e=X(l,d(r))),{c(){e&&Y(e.$$.fragment),n=V()},l(t){e&&Oe(e.$$.fragment,t),n=V()},m(t,p){e&&Q(e,t,p),K(t,n,p),s=!0},p(t,p){const w={};if(p&4&&(w.data=t[2]),p&523&&(w.$$scope={dirty:p,ctx:t}),l!==(l=t[0][0])){if(e){pe();const _=e;B(_.$$.fragment,1,0,()=>{Z(_,1)}),he()}l?(e=X(l,d(t)),Y(e.$$.fragment),F(e.$$.fragment,1),Q(e,n.parentNode,n)):e=null}else l&&e.$set(w)},i(t){s||(e&&F(e.$$.fragment,t),s=!0)},o(t){e&&B(e.$$.fragment,t),s=!1},d(t){t&&H(n),e&&Z(e,t)}}}function Vt(r){let e,n,s;var l=r[0][1];function d(t){return{props:{data:t[3],form:t[1]}}}return l&&(e=X(l,d(r))),{c(){e&&Y(e.$$.fragment),n=V()},l(t){e&&Oe(e.$$.fragment,t),n=V()},m(t,p){e&&Q(e,t,p),K(t,n,p),s=!0},p(t,p){const w={};if(p&8&&(w.data=t[3]),p&2&&(w.form=t[1]),l!==(l=t[0][1])){if(e){pe();const _=e;B(_.$$.fragment,1,0,()=>{Z(_,1)}),he()}l?(e=X(l,d(t)),Y(e.$$.fragment),F(e.$$.fragment,1),Q(e,n.parentNode,n)):e=null}else l&&e.$set(w)},i(t){s||(e&&F(e.$$.fragment,t),s=!0)},o(t){e&&B(e.$$.fragment,t),s=!1},d(t){t&&H(n),e&&Z(e,t)}}}function Xe(r){let e,n=r[5]&&Ye(r);return{c(){e=ut("div"),n&&n.c(),this.h()},l(s){e=dt(s,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var l=pt(e);n&&n.l(l),l.forEach(H),this.h()},h(){Ee(e,"id","svelte-announcer"),Ee(e,"aria-live","assertive"),Ee(e,"aria-atomic","true"),C(e,"position","absolute"),C(e,"left","0"),C(e,"top","0"),C(e,"clip","rect(0 0 0 0)"),C(e,"clip-path","inset(50%)"),C(e,"overflow","hidden"),C(e,"white-space","nowrap"),C(e,"width","1px"),C(e,"height","1px")},m(s,l){K(s,e,l),n&&n.m(e,null)},p(s,l){s[5]?n?n.p(s,l):(n=Ye(s),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(s){s&&H(e),n&&n.d()}}}function Ye(r){let e;return{c(){e=ht(r[6])},l(n){e=mt(n,r[6])},m(n,s){K(n,e,s)},p(n,s){s&64&&_t(e,n[6])},d(n){n&&H(e)}}}function Bt(r){let e,n,s,l,d;const t=[qt,Ct],p=[];function w(g,R){return g[0][1]?0:1}e=w(r),n=p[e]=t[e](r);let _=r[4]&&Xe(r);return{c(){n.c(),s=lt(),_&&_.c(),l=V()},l(g){n.l(g),s=ct(g),_&&_.l(g),l=V()},m(g,R){p[e].m(g,R),K(g,s,R),_&&_.m(g,R),K(g,l,R),d=!0},p(g,[R]){let S=e;e=w(g),e===S?p[e].p(g,R):(pe(),B(p[S],1,1,()=>{p[S]=null}),he(),n=p[e],n?n.p(g,R):(n=p[e]=t[e](g),n.c()),F(n,1),n.m(s.parentNode,s)),g[4]?_?_.p(g,R):(_=Xe(g),_.c(),_.m(l.parentNode,l)):_&&(_.d(1),_=null)},i(g){d||(F(n),d=!0)},o(g){B(n),d=!1},d(g){p[e].d(g),g&&H(s),_&&_.d(g),g&&H(l)}}}function Ft(r,e,n){let{stores:s}=e,{page:l}=e,{components:d}=e,{form:t}=e,{data_0:p=null}=e,{data_1:w=null}=e;ft(s.page.notify);let _=!1,g=!1,R=null;return Ae(()=>{const S=s.page.subscribe(()=>{_&&(n(5,g=!0),n(6,R=document.title||"untitled page"))});return n(4,_=!0),S}),r.$$set=S=>{"stores"in S&&n(7,s=S.stores),"page"in S&&n(8,l=S.page),"components"in S&&n(0,d=S.components),"form"in S&&n(1,t=S.form),"data_0"in S&&n(2,p=S.data_0),"data_1"in S&&n(3,w=S.data_1)},r.$$.update=()=>{r.$$.dirty&384&&s.page.set(l)},[d,t,p,w,_,g,R,s,l]}class Ht extends ot{constructor(e){super(),it(this,e,Ft,Bt,st,{stores:7,page:8,components:0,form:1,data_0:2,data_1:3})}}const Jt="modulepreload",Kt=function(r,e){return new URL(r,e).href},Qe={},W=function(e,n,s){if(!n||n.length===0)return e();const l=document.getElementsByTagName("link");return Promise.all(n.map(d=>{if(d=Kt(d,s),d in Qe)return;Qe[d]=!0;const t=d.endsWith(".css"),p=t?'[rel="stylesheet"]':"";if(!!s)for(let g=l.length-1;g>=0;g--){const R=l[g];if(R.href===d&&(!t||R.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${p}`))return;const _=document.createElement("link");if(_.rel=t?"stylesheet":Jt,t||(_.as="script",_.crossOrigin=""),_.href=d,document.head.appendChild(_),t)return new Promise((g,R)=>{_.addEventListener("load",g),_.addEventListener("error",()=>R(new Error(`Unable to preload CSS for ${d}`)))})})).then(()=>e())},zt={},_e=[()=>W(()=>import("./chunks/0-29504a4e.js"),["./chunks/0-29504a4e.js","./components/pages/_layout.svelte-91ddde76.js","./chunks/index-20c84258.js","./chunks/stores-01986410.js","./chunks/singletons-317f8e08.js","./chunks/index-295d139c.js","./assets/_layout-8454f68e.css"],import.meta.url),()=>W(()=>import("./chunks/1-74f574fc.js"),["./chunks/1-74f574fc.js","./components/error.svelte-baa6dcf2.js","./chunks/index-20c84258.js","./chunks/stores-01986410.js","./chunks/singletons-317f8e08.js","./chunks/index-295d139c.js"],import.meta.url),()=>W(()=>import("./chunks/2-0f1b1cf6.js"),["./chunks/2-0f1b1cf6.js","./chunks/_page-da46b06b.js","./components/pages/_page.svelte-2d8e86c2.js","./chunks/index-20c84258.js","./chunks/index-295d139c.js","./assets/_page-265a38f0.css"],import.meta.url),()=>W(()=>import("./chunks/3-ab927a2e.js"),["./chunks/3-ab927a2e.js","./chunks/_page-6a6e5f22.js","./chunks/environment-9aa685ef.js","./components/pages/about/_page.svelte-e8ec50a4.js","./chunks/index-20c84258.js"],import.meta.url),()=>W(()=>import("./chunks/4-c0fd5938.js"),["./chunks/4-c0fd5938.js","./components/pages/sverdle/_page.svelte-564faa36.js","./chunks/index-20c84258.js","./chunks/parse-b67c4dc9.js","./chunks/singletons-317f8e08.js","./chunks/index-295d139c.js","./assets/_page-9d501049.css"],import.meta.url),()=>W(()=>import("./chunks/5-0dc4909f.js"),["./chunks/5-0dc4909f.js","./chunks/_page-9c76c2d7.js","./chunks/environment-9aa685ef.js","./components/pages/sverdle/how-to-play/_page.svelte-2a458fcd.js","./chunks/index-20c84258.js","./assets/_page-89a9e780.css"],import.meta.url)],nt=[],Mt={"/":[2],"/about":[3],"/sverdle":[-5],"/sverdle/how-to-play":[5]},Wt={handleError:({error:r})=>{console.error(r)}};let Ue=class{constructor(e,n){this.status=e,typeof n=="string"?this.body={message:n}:n?this.body=n:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}},Ze=class{constructor(e,n){this.status=e,this.location=n}};async function Gt(r){var e;for(const n in r)if(typeof((e=r[n])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(r).map(async([s,l])=>[s,await l])));return r}function Xt(r){return r.filter(e=>e!=null)}const Se=xt(_e,nt,Mt,zt),at=_e[0],$e=_e[1];at();$e();let G={};try{G=JSON.parse(sessionStorage[tt])}catch{}function Le(r){G[r]=ae()}function Yt({target:r,base:e}){var He;const n=document.documentElement,s=[];let l=null;const d={before_navigate:[],after_navigate:[]};let t={branch:[],error:null,url:null},p=!1,w=!1,_=!0,g=!1,R=!1,S=!1,D=!1,j,P=(He=history.state)==null?void 0:He[x];P||(P=Date.now(),history.replaceState({...history.state,[x]:P},"",location.href));const ge=G[P];ge&&(history.scrollRestoration="manual",scrollTo(ge.x,ge.y));let J,Te,oe;async function De(){oe=oe||Promise.resolve(),await oe,oe=null;const a=new URL(location.href),o=le(a,!0);l=null,await je(o,a,[])}async function we(a,{noScroll:o=!1,replaceState:c=!1,keepFocus:i=!1,state:u={},invalidateAll:f=!1},h,v){return typeof a=="string"&&(a=new URL(a,ze(document))),fe({url:a,scroll:o?ae():null,keepfocus:i,redirect_chain:h,details:{state:u,replaceState:c},nav_token:v,accepted:()=>{f&&(D=!0)},blocked:()=>{},type:"goto"})}async function Ne(a){const o=le(a,!1);if(!o)throw new Error(`Attempted to preload a URL that does not belong to this app: ${a}`);return l={id:o.id,promise:qe(o).then(c=>(c.type==="loaded"&&c.state.error&&(l=null),c))},l.promise}async function ie(...a){const c=Se.filter(i=>a.some(u=>i.exec(u))).map(i=>Promise.all([...i.layouts,i.leaf].map(u=>u==null?void 0:u[1]())));await Promise.all(c)}async function je(a,o,c,i,u={},f){var v,y;Te=u;let h=a&&await qe(a);if(h||(h=await Fe(o,{id:null},await ne(new Error(`Not found: ${o.pathname}`),{url:o,params:{},route:{id:null}}),404)),o=(a==null?void 0:a.url)||o,Te!==u)return!1;if(h.type==="redirect")if(c.length>10||c.includes(o.pathname))h=await se({status:500,error:await ne(new Error("Redirect loop"),{url:o,params:{},route:{id:null}}),url:o,route:{id:null}});else return we(new URL(h.location,o).href,{},[...c,o.pathname],u),!1;else((y=(v=h.props)==null?void 0:v.page)==null?void 0:y.status)>=400&&await q.updated.check()&&await te(o);if(s.length=0,D=!1,g=!0,i&&i.details){const{details:m}=i,E=m.replaceState?0:1;m.state[x]=P+=E,history[m.replaceState?"replaceState":"pushState"](m.state,"",o)}if(l=null,w?(t=h.state,h.props.page&&(h.props.page.url=o),j.$set(h.props)):xe(h),i){const{scroll:m,keepfocus:E}=i,{activeElement:$}=document;await ue();const N=document.activeElement!==$&&document.activeElement!==document.body;if(!E&&!N&&await Pe(),_){const L=o.hash&&document.querySelector(decodeURIComponent(o.hash));m?scrollTo(m.x,m.y):L?L.scrollIntoView():scrollTo(0,0)}}else await ue();_=!0,h.props.page&&(J=h.props.page),f&&f(),g=!1}function xe(a){var i;t=a.state;const o=document.querySelector("style[data-sveltekit]");o&&o.remove(),J=a.props.page,j=new Ht({target:r,props:{...a.props,stores:q},hydrate:!0});const c={from:null,to:{params:t.params,route:{id:((i=t.route)==null?void 0:i.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter"};d.after_navigate.forEach(u=>u(c)),w=!0}async function ee({url:a,params:o,branch:c,status:i,error:u,route:f,form:h}){let v="never";for(const L of c)(L==null?void 0:L.slash)!==void 0&&(v=L.slash);a.pathname=bt(a.pathname,v),a.search=a.search;const y={type:"loaded",state:{url:a,params:o,branch:c,error:u,route:f},props:{components:Xt(c).map(L=>L.node.component)}};h!==void 0&&(y.props.form=h);let m={},E=!J,$=0;for(let L=0;L<Math.max(c.length,t.branch.length);L+=1){const b=c[L],O=t.branch[L];(b==null?void 0:b.data)!==(O==null?void 0:O.data)&&(E=!0),b&&(m={...m,...b.data},E&&(y.props[`data_${$}`]=m),$+=1)}return(!t.url||a.href!==t.url.href||t.error!==u||h!==void 0&&h!==J.form||E)&&(y.props.page={error:u,params:o,route:{id:(f==null?void 0:f.id)??null},status:i,url:new URL(a),form:h??null,data:E?m:J.data}),y}async function ye({loader:a,parent:o,url:c,params:i,route:u,server_data_node:f}){var m,E,$;let h=null;const v={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},y=await a();if((m=y.universal)!=null&&m.load){let N=function(...b){for(const O of b){const{href:T}=new URL(O,c);v.dependencies.add(T)}};const L={route:{get id(){return v.route=!0,u.id}},params:new Proxy(i,{get:(b,O)=>(v.params.add(O),b[O])}),data:(f==null?void 0:f.data)??null,url:St(c,()=>{v.url=!0}),async fetch(b,O){let T;b instanceof Request?(T=b.url,O={body:b.method==="GET"||b.method==="HEAD"?void 0:await b.blob(),cache:b.cache,credentials:b.credentials,headers:b.headers,integrity:b.integrity,keepalive:b.keepalive,method:b.method,mode:b.mode,redirect:b.redirect,referrer:b.referrer,referrerPolicy:b.referrerPolicy,signal:b.signal,...O}):T=b;const k=new URL(T,c).href;return N(k),w?Ot(T,k,O):$t(T,O)},setHeaders:()=>{},depends:N,parent(){return v.parent=!0,o()}};h=await y.universal.load.call(null,L)??null,h=h?await Gt(h):null}return{node:y,loader:a,server:f,universal:(E=y.universal)!=null&&E.load?{type:"data",data:h,uses:v}:null,data:h??(f==null?void 0:f.data)??null,slash:(($=y.universal)==null?void 0:$.trailingSlash)??(f==null?void 0:f.slash)}}function Ce(a,o,c,i,u){if(D)return!0;if(!i)return!1;if(i.parent&&a||i.route&&o||i.url&&c)return!0;for(const f of i.params)if(u[f]!==t.params[f])return!0;for(const f of i.dependencies)if(s.some(h=>h(new URL(f))))return!0;return!1}function ve(a,o){return(a==null?void 0:a.type)==="data"?{type:"data",data:a.data,uses:{dependencies:new Set(a.uses.dependencies??[]),params:new Set(a.uses.params??[]),parent:!!a.uses.parent,route:!!a.uses.route,url:!!a.uses.url},slash:a.slash}:(a==null?void 0:a.type)==="skip"?o??null:null}async function qe({id:a,invalidating:o,url:c,params:i,route:u}){if((l==null?void 0:l.id)===a)return l.promise;const{errors:f,layouts:h,leaf:v}=u,y=[...h,v];f.forEach(k=>k==null?void 0:k().catch(()=>{})),y.forEach(k=>k==null?void 0:k[1]().catch(()=>{}));let m=null;const E=t.url?a!==t.url.pathname+t.url.search:!1,$=t.route?u.id!==t.route.id:!1,N=y.reduce((k,U,I)=>{var M;const A=t.branch[I],z=!!(U!=null&&U[0])&&((A==null?void 0:A.loader)!==U[1]||Ce(k.some(Boolean),$,E,(M=A.server)==null?void 0:M.uses,i));return k.push(z),k},[]);if(N.some(Boolean)){try{m=await et(c,N)}catch(k){return se({status:500,error:await ne(k,{url:c,params:i,route:{id:u.id}}),url:c,route:u})}if(m.type==="redirect")return m}const L=m==null?void 0:m.nodes;let b=!1;const O=y.map(async(k,U)=>{var M;if(!k)return;const I=t.branch[U],A=L==null?void 0:L[U];if((!A||A.type==="skip")&&k[1]===(I==null?void 0:I.loader)&&!Ce(b,$,E,(M=I.universal)==null?void 0:M.uses,i))return I;if(b=!0,(A==null?void 0:A.type)==="error")throw A;return ye({loader:k[1],url:c,params:i,route:u,parent:async()=>{var Ke;const Je={};for(let be=0;be<U;be+=1)Object.assign(Je,(Ke=await O[be])==null?void 0:Ke.data);return Je},server_data_node:ve(A===void 0&&k[0]?{type:"skip"}:A??null,I==null?void 0:I.server)})});for(const k of O)k.catch(()=>{});const T=[];for(let k=0;k<y.length;k+=1)if(y[k])try{T.push(await O[k])}catch(U){if(U instanceof Ze)return{type:"redirect",location:U.location};let I=500,A;if(L!=null&&L.includes(U))I=U.status??I,A=U.error;else if(U instanceof Ue)I=U.status,A=U.body;else{if(await q.updated.check())return await te(c);A=await ne(U,{params:i,url:c,route:{id:u.id}})}const z=await Ve(k,T,f);return z?await ee({url:c,params:i,branch:T.slice(0,z.idx).concat(z.node),status:I,error:A,route:u}):await Fe(c,{id:u.id},A,I)}else T.push(void 0);return await ee({url:c,params:i,branch:T,status:200,error:null,route:u,form:o?void 0:null})}async function Ve(a,o,c){for(;a--;)if(c[a]){let i=a;for(;!o[i];)i-=1;try{return{idx:i+1,node:{node:await c[a](),loader:c[a],data:{},server:null,universal:null}}}catch{continue}}}async function se({status:a,error:o,url:c,route:i}){const u={};let f=null;if(nt[0]===0)try{const m=await et(c,[!0]);if(m.type!=="data"||m.nodes[0]&&m.nodes[0].type!=="data")throw 0;f=m.nodes[0]??null}catch{(c.origin!==location.origin||c.pathname!==location.pathname||p)&&await te(c)}const v=await ye({loader:at,url:c,params:u,route:i,parent:()=>Promise.resolve({}),server_data_node:ve(f)}),y={node:await $e(),loader:$e,universal:null,server:null,data:null};return await ee({url:c,params:u,branch:[v,y],status:a,error:o,route:null})}function le(a,o){if(We(a,e))return;const c=ce(a);for(const i of Se){const u=i.exec(c);if(u)return{id:a.pathname+a.search,invalidating:o,route:i,params:kt(u),url:a}}}function ce(a){return Et(a.pathname.slice(e.length)||"/")}function Be({url:a,type:o,intent:c,delta:i}){var v,y;let u=!1;const f={from:{params:t.params,route:{id:((v=t.route)==null?void 0:v.id)??null},url:t.url},to:{params:(c==null?void 0:c.params)??null,route:{id:((y=c==null?void 0:c.route)==null?void 0:y.id)??null},url:a},willUnload:!c,type:o};i!==void 0&&(f.delta=i);const h={...f,cancel:()=>{u=!0}};return R||d.before_navigate.forEach(m=>m(h)),u?null:f}async function fe({url:a,scroll:o,keepfocus:c,redirect_chain:i,details:u,type:f,delta:h,nav_token:v,accepted:y,blocked:m}){const E=le(a,!1),$=Be({url:a,type:f,delta:h,intent:E});if(!$){m();return}Le(P),y(),R=!0,w&&q.navigating.set($),await je(E,a,i,{scroll:o,keepfocus:c,details:u},v,()=>{R=!1,d.after_navigate.forEach(N=>N($)),q.navigating.set(null)})}async function Fe(a,o,c,i){return a.origin===location.origin&&a.pathname===location.pathname&&!p?await se({status:i,error:c,url:a,route:o}):await te(a)}function te(a){return location.href=a.href,new Promise(()=>{})}function rt(){let a;n.addEventListener("mousemove",f=>{const h=f.target;clearTimeout(a),a=setTimeout(()=>{i(h,2)},20)});function o(f){i(f.composedPath()[0],1)}n.addEventListener("mousedown",o),n.addEventListener("touchstart",o,{passive:!0});const c=new IntersectionObserver(f=>{for(const h of f)h.isIntersecting&&(ie(ce(new URL(h.target.href))),c.unobserve(h.target))},{threshold:0});function i(f,h){const v=Me(f,n);if(!v)return;const{url:y,external:m}=ke(v,e);if(m)return;const E=de(v);E.reload||(h<=E.preload_data?Ne(y):h<=E.preload_code&&ie(ce(y)))}function u(){c.disconnect();for(const f of n.querySelectorAll("a")){const{url:h,external:v}=ke(f,e);if(v)continue;const y=de(f);y.reload||(y.preload_code===Ge.viewport&&c.observe(f),y.preload_code===Ge.eager&&ie(ce(h)))}}d.after_navigate.push(u),u()}return{after_navigate:a=>{Ae(()=>(d.after_navigate.push(a),()=>{const o=d.after_navigate.indexOf(a);d.after_navigate.splice(o,1)}))},before_navigate:a=>{Ae(()=>(d.before_navigate.push(a),()=>{const o=d.before_navigate.indexOf(a);d.before_navigate.splice(o,1)}))},disable_scroll_handling:()=>{(g||!w)&&(_=!1)},goto:(a,o={})=>we(a,o,[]),invalidate:a=>{if(typeof a=="function")s.push(a);else{const{href:o}=new URL(a,location.href);s.push(c=>c.href===o)}return De()},invalidateAll:()=>(D=!0,De()),preload_data:async a=>{const o=new URL(a,ze(document));await Ne(o)},preload_code:ie,apply_action:async a=>{if(a.type==="error"){const o=new URL(location.href),{branch:c,route:i}=t;if(!i)return;const u=await Ve(t.branch.length,c,i.errors);if(u){const f=await ee({url:o,params:t.params,branch:c.slice(0,u.idx).concat(u.node),status:a.status??500,error:a.error,route:i});t=f.state,j.$set(f.props),ue().then(Pe)}}else if(a.type==="redirect")we(a.location,{invalidateAll:!0},[]);else{const o={form:a.data,page:{...J,form:a.data,status:a.status}};j.$set(o),a.type==="success"&&ue().then(Pe)}},_start_router:()=>{var a;history.scrollRestoration="manual",addEventListener("beforeunload",o=>{var i;let c=!1;if(!R){const u={from:{params:t.params,route:{id:((i=t.route)==null?void 0:i.id)??null},url:t.url},to:null,willUnload:!0,type:"leave",cancel:()=>c=!0};d.before_navigate.forEach(f=>f(u))}c?(o.preventDefault(),o.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){Le(P);try{sessionStorage[tt]=JSON.stringify(G)}catch{}}}),(a=navigator.connection)!=null&&a.saveData||rt(),n.addEventListener("click",o=>{if(o.button||o.which!==1||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey||o.defaultPrevented)return;const c=Me(o.composedPath()[0],n);if(!c)return;const{url:i,external:u,target:f}=ke(c,e);if(!i)return;if(f==="_parent"||f==="_top"){if(window.parent!==window)return}else if(f&&f!=="_self")return;const h=de(c);if(!(c instanceof SVGAElement)&&i.protocol!==location.protocol&&!(i.protocol==="https:"||i.protocol==="http:"))return;if(u||h.reload){Be({url:i,type:"link"})||o.preventDefault(),R=!0;return}const[y,m]=i.href.split("#");if(m!==void 0&&y===location.href.split("#")[0]){S=!0,Le(P),t.url=i,q.page.set({...J,url:i}),q.page.notify();return}fe({url:i,scroll:h.noscroll?ae():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:i.href===location.href},accepted:()=>o.preventDefault(),blocked:()=>o.preventDefault(),type:"link"})}),n.addEventListener("submit",o=>{if(o.defaultPrevented)return;const c=HTMLFormElement.prototype.cloneNode.call(o.target),i=o.submitter;if(((i==null?void 0:i.formMethod)||c.method)!=="get")return;const f=new URL((i==null?void 0:i.hasAttribute("formaction"))&&(i==null?void 0:i.formAction)||c.action);if(We(f,e))return;const h=o.target,{noscroll:v,reload:y}=de(h);if(y)return;o.preventDefault(),o.stopPropagation();const m=new FormData(h),E=i==null?void 0:i.getAttribute("name");E&&m.append(E,(i==null?void 0:i.getAttribute("value"))??""),f.search=new URLSearchParams(m).toString(),fe({url:f,scroll:v?ae():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:!1},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"})}),addEventListener("popstate",o=>{var c;if((c=o.state)!=null&&c[x]){if(o.state[x]===P)return;const i=G[o.state[x]];if(t.url.href.split("#")[0]===location.href.split("#")[0]){G[P]=ae(),P=o.state[x],scrollTo(i.x,i.y);return}const u=o.state[x]-P;fe({url:new URL(location.href),scroll:i,keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{P=o.state[x]},blocked:()=>{history.go(-u)},type:"popstate",delta:u})}}),addEventListener("hashchange",()=>{S&&(S=!1,history.replaceState({...history.state,[x]:++P},"",location.href))});for(const o of document.querySelectorAll("link"))o.rel==="icon"&&(o.href=o.href);addEventListener("pageshow",o=>{o.persisted&&q.navigating.set(null)})},_hydrate:async({status:a=200,error:o,node_ids:c,params:i,route:u,data:f,form:h})=>{p=!0;const v=new URL(location.href);({params:i={},route:u={id:null}}=le(v,!1)||{});let y;try{const m=c.map(async(E,$)=>{const N=f[$];return ye({loader:_e[E],url:v,params:i,route:u,parent:async()=>{const L={};for(let b=0;b<$;b+=1)Object.assign(L,(await m[b]).data);return L},server_data_node:ve(N)})});y=await ee({url:v,params:i,branch:await Promise.all(m),status:a,error:o,form:h,route:Se.find(({id:E})=>E===u.id)??null})}catch(m){if(m instanceof Ze){await te(new URL(m.location,location.href));return}y=await se({status:m instanceof Ue?m.status:500,error:await ne(m,{url:v,params:i,route:u}),url:v,route:u})}xe(y)}}}async function et(r,e){var d;const n=new URL(r);n.pathname=At(r.pathname),n.searchParams.append("x-sveltekit-invalidated",e.map(t=>t?"1":"").join("_"));const s=await me(n.href),l=await s.json();if(!s.ok)throw new Error(l);return(d=l.nodes)==null||d.forEach(t=>{(t==null?void 0:t.type)==="data"&&(t.data=vt(t.data),t.uses={dependencies:new Set(t.uses.dependencies??[]),params:new Set(t.uses.params??[]),parent:!!t.uses.parent,route:!!t.uses.route,url:!!t.uses.url})}),l}function ne(r,e){return r instanceof Ue?r.body:Wt.handleError({error:r,event:e})??{message:e.route.id!=null?"Internal Error":"Not Found"}}function Pe(){const r=document.querySelector("[autofocus]");if(r)r.focus();else{const e=document.body,n=e.getAttribute("tabindex");return e.tabIndex=-1,e.focus({preventScroll:!0}),n!==null?e.setAttribute("tabindex",n):e.removeAttribute("tabindex"),new Promise(s=>{setTimeout(()=>{var l;s((l=getSelection())==null?void 0:l.removeAllRanges())})})}}async function an({env:r,hydrate:e,paths:n,target:s,version:l}){gt(n),yt(l);const d=Yt({target:s,base:n.base});wt({client:d}),e?await d._hydrate(e):d.goto(location.href,{replaceState:!0}),d._start_router()}export{an as start};
