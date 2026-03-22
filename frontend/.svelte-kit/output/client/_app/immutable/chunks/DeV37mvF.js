import{aj as q,ak as ue,al as de,h as p,am as F,an as ce,ao as X,m as L,ap as _e,aq as pe,ar as ae,a2 as P,as as D,at as me,au as Ee,D as U,av as we,aw as ne,g as Se,ax as C,T as J,ay as ve,az as ke,aA as Te,Y as be,aB as Q,aC as Ce,aD as Ae,x as Ne,aE as re,aF as Ie,aG as Me,aH as he,aI as ge,aJ as G,ab as xe,aK as De,aL as Re,aM as ze,aN as Oe,S as Fe,aO as He,aP as We,aQ as ye,aR as Be,aS as Le,aT as Pe,aU as Ve,aV as Ye,aW as qe,X as Xe,l as ie,p as Ge,P as z,b as se,a as Ue,aX as Je,y as Ke,M as O,u as te,c as Qe,f as Ze,o as $e,z as je,aY as ea,aZ as aa}from"./DqBfkzXV.js";import{i as na}from"./CPmz-PHo.js";import{o as fe}from"./D5kJnWJH.js";function ra(e,a){return a}function ia(e,a,l){for(var o=[],u=a.length,t,s=a.length,f=0;f<u;f++){let _=a[f];ge(_,()=>{if(t){if(t.pending.delete(_),t.done.add(_),t.pending.size===0){var c=e.outrogroups;K(e,Q(t.done)),c.delete(t),c.size===0&&(e.outrogroups=null)}}else s-=1},!1)}if(s===0){var r=o.length===0&&l!==null;if(r){var d=l,i=d.parentNode;ze(i),i.append(d),e.items.clear()}K(e,a,!r)}else t={pending:new Set(a),done:new Set},(e.outrogroups??(e.outrogroups=new Set)).add(t)}function K(e,a,l=!0){var o;if(e.pending.size>0){o=new Set;for(const s of e.pending.values())for(const f of s)o.add(e.items.get(f).e)}for(var u=0;u<a.length;u++){var t=a[u];if(o!=null&&o.has(t)){t.f|=C;const s=document.createDocumentFragment();Oe(t,s)}else Fe(a[u],l)}}var le;function sa(e,a,l,o,u,t=null){var s=e,f=new Map,r=(a&de)!==0;if(r){var d=e;s=p?F(ce(d)):d.appendChild(q())}p&&X();var i=null,_=Te(()=>{var h=l();return be(h)?h:h==null?[]:Q(h)}),c,g=new Map,m=!0;function S(h){(T.effect.f&Me)===0&&(T.pending.delete(h),T.fallback=i,ta(T,c,s,a,o),i!==null&&(c.length===0?(i.f&C)===0?he(i):(i.f^=C,B(i,null,s)):ge(i,()=>{i=null})))}function n(h){T.pending.delete(h)}var v=ue(()=>{c=L(_);var h=c.length;let E=!1;if(p){var H=_e(s)===pe;H!==(h===0)&&(s=ae(),F(s),P(!1),E=!0)}for(var I=new Set,w=Se,R=ke(),b=0;b<h;b+=1){p&&D.nodeType===me&&D.data===Ee&&(s=D,E=!0,P(!1));var x=c[b],A=o(x,b);if(U){var W=o(x,b);A!==W&&we(String(b),String(A),String(W))}var k=m?null:f.get(A);k?(k.v&&ne(k.v,x),k.i&&ne(k.i,b),R&&w.unskip_effect(k.e)):(k=fa(f,m?s:le??(le=q()),x,A,b,u,a,l),m||(k.e.f|=C),f.set(A,k)),I.add(A)}if(h===0&&t&&!i&&(m?i=J(()=>t(s)):(i=J(()=>t(le??(le=q()))),i.f|=C)),h>I.size&&(U?la(c,o):ve("","","")),p&&h>0&&F(ae()),!m)if(g.set(w,I),R){for(const[V,Y]of f)I.has(V)||w.skip_effect(Y.e);w.oncommit(S),w.ondiscard(n)}else S(w);E&&P(!0),L(_)}),T={effect:v,items:f,pending:g,outrogroups:null,fallback:i};m=!1,p&&(s=D)}function y(e){for(;e!==null&&(e.f&De)===0;)e=e.next;return e}function ta(e,a,l,o,u){var x,A,W,k,V,Y,Z,$,j;var t=(o&Re)!==0,s=a.length,f=e.items,r=y(e.effect.first),d,i=null,_,c=[],g=[],m,S,n,v;if(t)for(v=0;v<s;v+=1)m=a[v],S=u(m,v),n=f.get(S).e,(n.f&C)===0&&((A=(x=n.nodes)==null?void 0:x.a)==null||A.measure(),(_??(_=new Set)).add(n));for(v=0;v<s;v+=1){if(m=a[v],S=u(m,v),n=f.get(S).e,e.outrogroups!==null)for(const N of e.outrogroups)N.pending.delete(n),N.done.delete(n);if((n.f&C)!==0)if(n.f^=C,n===r)B(n,null,l);else{var T=i?i.next:r;n===e.effect.last&&(e.effect.last=n.prev),n.prev&&(n.prev.next=n.next),n.next&&(n.next.prev=n.prev),M(e,i,n),M(e,n,T),B(n,T,l),i=n,c=[],g=[],r=y(i.next);continue}if((n.f&G)!==0&&(he(n),t&&((k=(W=n.nodes)==null?void 0:W.a)==null||k.unfix(),(_??(_=new Set)).delete(n))),n!==r){if(d!==void 0&&d.has(n)){if(c.length<g.length){var h=g[0],E;i=h.prev;var H=c[0],I=c[c.length-1];for(E=0;E<c.length;E+=1)B(c[E],h,l);for(E=0;E<g.length;E+=1)d.delete(g[E]);M(e,H.prev,I.next),M(e,i,H),M(e,I,h),r=h,i=I,v-=1,c=[],g=[]}else d.delete(n),B(n,r,l),M(e,n.prev,n.next),M(e,n,i===null?e.effect.first:i.next),M(e,i,n),i=n;continue}for(c=[],g=[];r!==null&&r!==n;)(d??(d=new Set)).add(r),g.push(r),r=y(r.next);if(r===null)continue}(n.f&C)===0&&c.push(n),i=n,r=y(n.next)}if(e.outrogroups!==null){for(const N of e.outrogroups)N.pending.size===0&&(K(e,Q(N.done)),(V=e.outrogroups)==null||V.delete(N));e.outrogroups.size===0&&(e.outrogroups=null)}if(r!==null||d!==void 0){var w=[];if(d!==void 0)for(n of d)(n.f&G)===0&&w.push(n);for(;r!==null;)(r.f&G)===0&&r!==e.fallback&&w.push(r),r=y(r.next);var R=w.length;if(R>0){var b=(o&de)!==0&&s===0?l:null;if(t){for(v=0;v<R;v+=1)(Z=(Y=w[v].nodes)==null?void 0:Y.a)==null||Z.measure();for(v=0;v<R;v+=1)(j=($=w[v].nodes)==null?void 0:$.a)==null||j.fix()}ia(e,w,b)}}t&&xe(()=>{var N,ee;if(_!==void 0)for(n of _)(ee=(N=n.nodes)==null?void 0:N.a)==null||ee.apply()})}function fa(e,a,l,o,u,t,s,f){var r=(s&Ce)!==0?(s&Ae)===0?Ne(l,!1,!1):re(l):null,d=(s&Ie)!==0?re(u):null;return U&&r&&(r.trace=()=>{f()[(d==null?void 0:d.v)??u]}),{v:r,i:d,e:J(()=>(t(a,r??l,d??u,f),()=>{e.delete(o)}))}}function B(e,a,l){if(e.nodes)for(var o=e.nodes.start,u=e.nodes.end,t=a&&(a.f&C)===0?a.nodes.start:l;o!==null;){var s=He(o);if(t.before(o),o===u)return;o=s}}function M(e,a,l){a===null?e.effect.first=l:a.next=l,l===null?e.effect.last=a:l.prev=a}function la(e,a){const l=new Map,o=e.length;for(let u=0;u<o;u++){const t=a(e[u],u);if(l.has(t)){const s=String(l.get(t)),f=String(u);let r=String(t);r.startsWith("[object ")&&(r=null),ve(s,f,r)}l.set(t,u)}}function oa(e,a,l,o,u){var f;p&&X();var t=(f=a.$$slots)==null?void 0:f[l],s=!1;t===!0&&(t=a.children,s=!0),t===void 0||t(e,s?()=>o:o)}function ua(e,a,l,o,u,t){let s=p;p&&X();var f=null;p&&D.nodeType===We&&(f=D,X());var r=p?D:e,d=new Be(r,!1);ue(()=>{const i=a()||null;var _=Pe;if(i===null){d.ensure(null,null);return}return d.ensure(i,c=>{if(i){if(f=p?f:Le(i,_),Ve(f,f),o){p&&Ye(i)&&f.append(document.createComment(""));var g=p?ce(f):f.appendChild(q());p&&(g===null?P(!1):F(g)),o(f,g)}qe.nodes.end=f,c.before(f)}p&&F(c)}),()=>{}},ye),Xe(()=>{}),s&&(P(!0),F(r))}/**
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
 */const da={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
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
 */const ca=e=>{for(const a in e)if(a.startsWith("aria-")||a==="role"||a==="title")return!0;return!1};/**
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
 */const oe=(...e)=>e.filter((a,l,o)=>!!a&&a.trim()!==""&&o.indexOf(a)===l).join(" ").trim();var va=Je("<svg><!><!></svg>");function pa(e,a){const l=ie(a,["children","$$slots","$$events","$$legacy"]),o=ie(l,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);Ge(a,!1);let u=z(a,"name",8,void 0),t=z(a,"color",8,"currentColor"),s=z(a,"size",8,24),f=z(a,"strokeWidth",8,2),r=z(a,"absoluteStrokeWidth",8,!1),d=z(a,"iconNode",24,()=>[]);na();var i=va();fe(i,(g,m,S)=>({...da,...g,...o,width:s(),height:s(),stroke:t(),"stroke-width":m,class:S}),[()=>ca(o)?void 0:{"aria-hidden":"true"},()=>(O(r()),O(f()),O(s()),te(()=>r()?Number(f())*24/Number(s()):f())),()=>(O(oe),O(u()),O(l),te(()=>oe("lucide-icon","lucide",u()?`lucide-${u()}`:"",l.class)))]);var _=Ke(i);sa(_,1,d,ra,(g,m)=>{var S=ea(()=>aa(L(m),2));let n=()=>L(S)[0],v=()=>L(S)[1];var T=Qe(),h=Ze(T);ua(h,n,!0,(E,H)=>{fe(E,()=>({...v()}))}),se(g,T)});var c=$e(_);oa(c,a,"default",{}),je(i),se(e,i),Ue()}export{pa as I,sa as e,ra as i,oa as s};
