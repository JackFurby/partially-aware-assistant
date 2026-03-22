import{l as Q,s as W,c as X,f as Y,b as _,p as ce,P as ve,x as m,m as e,j as H,k,n as P,a as ue,q as s,y as d,o as p,v as w,z as r,G as fe,A as b,u as y}from"../chunks/DqBfkzXV.js";import{i as ge}from"../chunks/CPmz-PHo.js";import{I as Z,s as R,e as I,i as L}from"../chunks/DeV37mvF.js";import{b as J,d as me,r as _e,e as xe,u as he}from"../chunks/D5kJnWJH.js";import{b as ye}from"../chunks/DvTTIovI.js";import{L as be}from"../chunks/BHoYqX_R.js";function we(g,v){const c=Q(v,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const l=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];Z(g,W({name:"trash-2"},()=>c,{get iconNode(){return l},children:(i,u)=>{var n=X(),x=Y(n);R(x,v,"default",{}),_(i,n)},$$slots:{default:!0}}))}function $e(g,v){const c=Q(v,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const l=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];Z(g,W({name:"upload"},()=>c,{get iconNode(){return l},children:(i,u)=>{var n=X(),x=Y(n);R(x,v,"default",{}),_(i,n)},$$slots:{default:!0}}))}async function ze({fetch:g,parent:v}){await v();const[c,l]=await Promise.all([g("/api/agents",{credentials:"include"}).catch(()=>null),g("/api/rag/knowledge_bases",{credentials:"include"}).catch(()=>null)]),i=c!=null&&c.ok?await c.json().catch(()=>[]):[],u=l!=null&&l.ok?await l.json().catch(()=>[]):[];return{agents:i,knowledgeBases:u}}const Ie=Object.freeze(Object.defineProperty({__proto__:null,load:ze},Symbol.toStringTag,{value:"Module"}));var Me=w('<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;border:1px solid #eee;border-radius:6px;margin-bottom:8px;"><div style="flex:1;min-width:0;"><div style="font-weight:600;font-size:0.9rem;"> </div> <div style="font-size:0.75rem;color:#888;"> </div></div> <button style="display:flex;align-items:center;gap:4px;padding:4px 8px;background:none;border:1px solid #fcc;color:#c00;border-radius:4px;cursor:pointer;font-size:0.75rem;"><!> Delete</button></div>'),ke=w('<div style="color:#888;font-size:0.9rem;">No knowledge bases yet.</div>'),Ne=w('<div style="color:#c00;margin-bottom:8px;font-size:0.85rem;"> </div>'),Be=w("<option> </option>"),je=w("<option> </option>"),Ue=w('<div style="padding:24px;max-width:600px;"><h1 style="margin:0 0 24px;">Knowledge Bases</h1> <div style="margin-bottom:24px;"><!> <!></div> <section style="background:#f8f9fa;padding:16px;border-radius:6px;"><h2 style="margin:0 0 12px;font-size:1rem;">Upload New Knowledge Base</h2> <!> <div style="display:flex;flex-direction:column;gap:8px;"><input type="text" placeholder="Name" style="padding:6px;border:1px solid #ddd;border-radius:4px;"/> <select style="padding:6px;border:1px solid #ddd;border-radius:4px;"></select> <select style="padding:6px;border:1px solid #ddd;border-radius:4px;"></select> <input type="file" accept=".txt,.md,.csv" style="font-size:0.85rem;"/> <button style="display:flex;align-items:center;justify-content:center;gap:6px;padding:8px;background:#1a1a2e;color:white;border:none;border-radius:4px;cursor:pointer;"><!> </button></div></section></div>');function Le(g,v){ce(v,!1);let c=ve(v,"data",8),l=c().agents??[],i=m(c().knowledgeBases??[]),u=m(""),n=m(l.length>0?l[0].id:null),x=m([]),$=m(""),N=m(null),z=m(!1),B=m("");async function O(){if(!e(n))return;const a=await me(e(n));s(x,a.map(t=>t.model_name)),s($,e(x)[0]??"")}e(n)&&O();async function ee(){if(!(!e(u)||!e(n)||!e($)||!e(N))){s(z,!0),s(B,"");try{const a=await he(e(u),e(n),e($),e(N));s(i,[a,...e(i)]),s(u,""),s(N,null)}catch(a){s(B,a.message)}finally{s(z,!1)}}}async function ae(a){if(confirm("Delete this knowledge base?"))try{await xe(a),s(i,e(i).filter(t=>t.id!==a))}catch(t){alert(t.message)}}ge();var K=Ue(),A=p(d(K),2),S=d(A);I(S,1,()=>e(i),L,(a,t)=>{var o=Me(),h=d(o),f=d(h),de=d(f,!0);r(f);var C=p(f,2),le=d(C);r(C),r(h);var E=p(h,2),pe=d(E);we(pe,{size:12}),fe(),r(E),r(o),k(()=>{b(de,(e(t),y(()=>e(t).name))),b(le,`${e(t),y(()=>e(t).document_filename)??""} · ${e(t),y(()=>e(t).embedding_model)??""}`)}),P("click",E,()=>ae(e(t).id)),_(a,o)});var te=p(S,2);{var oe=a=>{var t=ke();_(a,t)};H(te,a=>{e(i),y(()=>e(i).length===0)&&a(oe)})}r(A);var T=p(A,2),V=p(d(T),2);{var re=a=>{var t=Ne(),o=d(t,!0);r(t),k(()=>b(o,e(B))),_(a,t)};H(V,a=>{e(B)&&a(re)})}var q=p(V,2),D=d(q);_e(D);var M=p(D,2);I(M,5,()=>l,L,(a,t)=>{var o=Be(),h=d(o,!0);r(o);var f={};k(()=>{b(h,(e(t),y(()=>e(t).name))),f!==(f=(e(t),y(()=>e(t).id)))&&(o.value=(o.__value=(e(t),y(()=>e(t).id)))??"")}),_(a,o)}),r(M);var j=p(M,2);I(j,5,()=>e(x),L,(a,t)=>{var o=je(),h=d(o,!0);r(o);var f={};k(()=>{b(h,e(t)),f!==(f=e(t))&&(o.value=(o.__value=e(t))??"")}),_(a,o)}),r(j);var F=p(j,2),U=p(F,2),G=d(U);{var se=a=>{be(a,{size:16,class:"spin"})},ie=a=>{$e(a,{size:16})};H(G,a=>{e(z)?a(se):a(ie,-1)})}var ne=p(G);r(U),r(q),r(T),r(K),k(()=>{U.disabled=e(z),b(ne,` ${e(z)?"Uploading…":"Upload"}`)}),ye(D,()=>e(u),a=>s(u,a)),J(M,()=>e(n),a=>s(n,a)),P("change",M,O),J(j,()=>e($),a=>s($,a)),P("change",F,a=>{var t;return s(N,((t=a.target.files)==null?void 0:t[0])??null)}),P("click",U,ee),_(g,K),ue()}export{Le as component,Ie as universal};
