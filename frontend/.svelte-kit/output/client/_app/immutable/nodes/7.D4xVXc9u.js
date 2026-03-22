import{l as ne,s as le,c as ce,f as T,b as l,p as ve,B as xe,C as fe,j as $,a as me,E as ue,m as e,v as m,F as _e,x as _,o,y as d,u as f,z as s,q as i,k as G,A as w,G as O,n as ge}from"../chunks/DqBfkzXV.js";import{i as ye}from"../chunks/CPmz-PHo.js";import{I as be,s as he,e as $e,i as we}from"../chunks/DeV37mvF.js";import{g as Q,s as ke,a as Ue,r as H,c as ze}from"../chunks/D5kJnWJH.js";import{b as R,a as Ae}from"../chunks/DvTTIovI.js";import{currentUser as Ee}from"../chunks/BbRMVWqf.js";function Ce(k,g){const u=ne(g,["children","$$slots","$$events","$$legacy"]);/**
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
 */const U=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{cx:"9",cy:"7",r:"4"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11"}]];be(k,le({name:"user-plus"},()=>u,{get iconNode(){return U},children:(z,c)=>{var n=ce(),v=T(n);he(v,g,"default",{}),l(z,n)},$$slots:{default:!0}}))}var Ie=m('<p style="color:#888;">Admin access required.</p>'),Pe=m('<span style="padding:2px 8px;border-radius:10px;font-size:0.8rem;background:#cce5ff;color:#004085;">Admin</span>'),qe=m('<tr style="border-bottom:1px solid #f0f0f0;"><td style="padding:8px;"> </td><td style="padding:8px;"><span> </span></td><td style="padding:8px;"><!></td><td style="padding:8px;"><a style="color:#1a1a2e;font-size:0.85rem;">View</a></td></tr>'),Ne=m('<div style="color:#c00;margin-bottom:8px;"> </div>'),Se=m('<div style="color:#060;margin-bottom:8px;"> </div>'),je=m('<table style="width:100%;border-collapse:collapse;margin-bottom:32px;"><thead><tr style="border-bottom:2px solid #eee;text-align:left;"><th style="padding:8px;">Email</th><th style="padding:8px;">Status</th><th style="padding:8px;">Admin</th><th style="padding:8px;"></th></tr></thead><tbody></tbody></table> <h2 style="margin:0 0 12px;font-size:1.1rem;">Create User</h2> <!> <!> <div style="background:#f8f9fa;padding:16px;border-radius:6px;display:flex;flex-direction:column;gap:10px;"><input type="email" placeholder="Email" style="padding:8px;border:1px solid #ddd;border-radius:4px;"/> <input type="password" placeholder="Password" style="padding:8px;border:1px solid #ddd;border-radius:4px;"/> <label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox"/> Admin (superuser)</label> <button style="display:flex;align-items:center;gap:6px;padding:8px 20px;background:#1a1a2e;color:white;border:none;border-radius:4px;cursor:pointer;align-self:flex-start;"><!> Create User</button></div>',1),Be=m('<div style="padding:24px;max-width:700px;"><h1 style="margin:0 0 24px;">Users</h1> <!></div>');function Je(k,g){ve(g,!1);const u=()=>_e(Ee,"$currentUser",U),[U,z]=ue();let c=_([]),n=_(""),v=_(""),y=_(!1),b=_(""),h=_("");async function W(){if(i(b,""),i(h,""),!(!e(n)||!e(v)))try{const r=await ze(e(n),e(v),e(y));i(c,[...e(c),r]),i(n,""),i(v,""),i(y,!1),i(h,`User ${r.email} created.`)}catch(r){i(b,r.message)}}xe(()=>(u(),e(c),Q),()=>{var r;(r=u())!=null&&r.is_superuser&&e(c).length===0&&Q().then(p=>i(c,p)).catch(()=>{})}),fe(),ye();var A=Be(),X=o(d(A),2);{var Y=r=>{var p=Ie();l(r,p)},Z=r=>{var p=je(),E=T(p),M=o(d(E));$e(M,5,()=>e(c),we,(a,t)=>{var x=qe(),N=d(x),re=d(N,!0);s(N);var S=o(N),j=d(S),se=d(j,!0);s(j),s(S);var B=o(S),de=d(B);{var ie=F=>{var pe=Pe();l(F,pe)};$(de,F=>{e(t),f(()=>e(t).is_superuser)&&F(ie)})}s(B);var L=o(B),oe=d(L);s(L),s(x),G(()=>{w(re,(e(t),f(()=>e(t).email))),ke(j,`padding:2px 8px;border-radius:10px;font-size:0.8rem;background:${e(t),f(()=>e(t).is_active?"#d4edda":"#f8d7da")??""};color:${e(t),f(()=>e(t).is_active?"#155724":"#721c24")??""};`),w(se,(e(t),f(()=>e(t).is_active?"Active":"Inactive"))),Ue(oe,"href",`/users/${e(t),f(()=>e(t).id)??""}`)}),l(a,x)}),s(M),s(E);var V=o(E,4);{var ee=a=>{var t=Ne(),x=d(t,!0);s(t),G(()=>w(x,e(b))),l(a,t)};$(V,a=>{e(b)&&a(ee)})}var D=o(V,2);{var te=a=>{var t=Se(),x=d(t,!0);s(t),G(()=>w(x,e(h))),l(a,t)};$(D,a=>{e(h)&&a(te)})}var J=o(D,2),C=d(J);H(C);var I=o(C,2);H(I);var P=o(I,2),K=d(P);H(K),O(),s(P);var q=o(P,2),ae=d(q);Ce(ae,{size:16}),O(),s(q),s(J),R(C,()=>e(n),a=>i(n,a)),R(I,()=>e(v),a=>i(v,a)),Ae(K,()=>e(y),a=>i(y,a)),ge("click",q,W),l(r,p)};$(X,r=>{u(),f(()=>{var p;return!((p=u())!=null&&p.is_superuser)})?r(Y):r(Z,-1)})}s(A),l(k,A),me(),z()}export{Je as component};
