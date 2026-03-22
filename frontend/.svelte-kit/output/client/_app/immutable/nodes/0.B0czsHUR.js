import{R as ke,g as Ne}from"../chunks/gvWUTYZp.js";import{B as Me}from"../chunks/B1RfysOE.js";import{D as Pe,l as j,s as B,c as y,f as h,b as f,p as je,P as Be,B as A,C as Se,j as Z,a as Ae,E as Ce,M as P,m as u,u as z,F as J,x as Q,q as X,y as n,o as g,G as k,z as i,k as U,A as G,n as Ee,v as E,aY as He,aZ as Le}from"../chunks/DqBfkzXV.js";import{i as Oe}from"../chunks/CPmz-PHo.js";import{I as S,s as b,e as ee,i as ae}from"../chunks/DeV37mvF.js";import{a as te,p as Ve}from"../chunks/D5kJnWJH.js";import{p as qe}from"../chunks/cFr7UPiW.js";import{currentUser as F,chats as C}from"../chunks/BbRMVWqf.js";import{P as De}from"../chunks/CX5cn_23.js";function oe(a,e){throw(!Me||Pe)&&(isNaN(a)||a<300||a>308)?new Error("Invalid status code"):new ke(a,e.toString())}const Ie=!1;async function Re({url:a,fetch:e}){if(a.pathname==="/login")return{user:null};const r=await e("/api/users/me",{credentials:"include"}).catch(()=>null);if(!r||!r.ok)throw oe(302,"/login");const s=await r.json().catch(()=>null);if(!s)throw oe(302,"/login");const t=await e("/api/chats",{credentials:"include"}).catch(()=>null),_=t!=null&&t.ok?await t.json().catch(()=>[]):[];return{user:s,chats:_}}const ia=Object.freeze(Object.defineProperty({__proto__:null,load:Re,ssr:Ie},Symbol.toStringTag,{value:"Module"}));function Ue(a,e){const r=j(e,["children","$$slots","$$events","$$legacy"]);/**
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
 */const s=[["path",{d:"M12 7v14"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}]];S(a,B({name:"book-open"},()=>r,{get iconNode(){return s},children:(t,_)=>{var o=y(),c=h(o);b(c,e,"default",{}),f(t,o)},$$slots:{default:!0}}))}function Ge(a,e){const r=j(e,["children","$$slots","$$events","$$legacy"]);/**
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
 */const s=[["path",{d:"m16 17 5-5-5-5"}],["path",{d:"M21 12H9"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}]];S(a,B({name:"log-out"},()=>r,{get iconNode(){return s},children:(t,_)=>{var o=y(),c=h(o);b(c,e,"default",{}),f(t,o)},$$slots:{default:!0}}))}function Fe(a,e){const r=j(e,["children","$$slots","$$events","$$legacy"]);/**
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
 */const s=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}]];S(a,B({name:"message-square"},()=>r,{get iconNode(){return s},children:(t,_)=>{var o=y(),c=h(o);b(c,e,"default",{}),f(t,o)},$$slots:{default:!0}}))}function Ke(a,e){const r=j(e,["children","$$slots","$$events","$$legacy"]);/**
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
 */const s=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];S(a,B({name:"settings"},()=>r,{get iconNode(){return s},children:(t,_)=>{var o=y(),c=h(o);b(c,e,"default",{}),f(t,o)},$$slots:{default:!0}}))}function Te(a,e){const r=j(e,["children","$$slots","$$events","$$legacy"]);/**
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
 */const s=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}],["circle",{cx:"9",cy:"7",r:"4"}]];S(a,B({name:"users"},()=>r,{get iconNode(){return s},children:(t,_)=>{var o=y(),c=h(o);b(c,e,"default",{}),f(t,o)},$$slots:{default:!0}}))}var We=E('<a href="/users" style="display:flex;align-items:center;gap:8px;padding:8px 16px;color:#eee;text-decoration:none;"><!> Users</a>'),Ye=E('<a style="display:block;padding:4px 16px;color:#ccc;text-decoration:none;font-size:0.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"> </a>'),Ze=E('<div style="padding:6px 16px 2px;font-size:0.75rem;color:#888;"> </div> <!>',1),Je=E('<div style="display:flex;height:100vh;font-family:sans-serif;"><aside style="width:240px;background:#1a1a2e;color:#eee;display:flex;flex-direction:column;overflow:hidden;"><div style="padding:16px;border-bottom:1px solid #333;"><strong>Partially Aware</strong></div> <nav style="padding:8px 0;border-bottom:1px solid #333;"><a href="/chat" style="display:flex;align-items:center;gap:8px;padding:8px 16px;color:#eee;text-decoration:none;"><!> Chat</a> <a href="/rag" style="display:flex;align-items:center;gap:8px;padding:8px 16px;color:#eee;text-decoration:none;"><!> Knowledge Bases</a> <a href="/settings" style="display:flex;align-items:center;gap:8px;padding:8px 16px;color:#eee;text-decoration:none;"><!> Settings</a> <!></nav> <div style="flex:1;min-height:0;overflow-y:auto;padding:8px 0;"><a href="/chat" style="display:flex;align-items:center;gap:6px;padding:6px 16px;margin:4px 8px;background:#16213e;color:#eee;text-decoration:none;border-radius:4px;font-size:0.85rem;"><!> New Chat</a> <!></div> <div style="padding:12px 16px;border-top:1px solid #333;font-size:0.8rem;color:#aaa;"><div> </div> <button style="display:flex;align-items:center;gap:6px;margin-top:6px;background:none;border:1px solid #555;color:#aaa;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:0.8rem;"><!> Logout</button></div></aside> <main style="flex:1;overflow:auto;background:#f8f9fa;"><!></main></div>');function da(a,e){je(e,!1);const r=()=>J(C,"$chats",t),s=()=>J(qe,"$page",t),[t,_]=Ce(),o=Q(),c=Q();let p=Be(e,"data",8);async function re(){await Ve(),F.set(null),C.set([]),Ne("/login")}function se(d){const l={};for(const v of d){const m=v.create_datetime.slice(0,10);l[m]||(l[m]=[]),l[m].push(v)}return Object.entries(l).sort(([v],[m])=>m.localeCompare(v))}A(()=>(P(p()),F),()=>{var d;(d=p())!=null&&d.user&&F.set(p().user)}),A(()=>(P(p()),C),()=>{var d;(d=p())!=null&&d.chats&&C.set(p().chats)}),A(()=>r(),()=>{X(o,se(r()))}),A(()=>s(),()=>{X(c,s().url.pathname==="/login")}),Se(),Oe();var K=y(),ne=h(K);{var ie=d=>{var l=y(),v=h(l);b(v,e,"default",{}),f(d,l)},de=d=>{var l=Je(),v=n(l),m=g(n(v),2),H=n(m),le=n(H);Fe(le,{size:16}),k(),i(H);var L=g(H,2),ce=n(L);Ue(ce,{size:16}),k(),i(L);var O=g(L,2),pe=n(O);Ke(pe,{size:16}),k(),i(O);var ue=g(O,2);{var fe=N=>{var x=We(),$=n(x);Te($,{size:16}),k(),i(x),f(N,x)};Z(ue,N=>{P(p()),z(()=>{var x,$;return($=(x=p())==null?void 0:x.user)==null?void 0:$.is_superuser})&&N(fe)})}i(m);var V=g(m,2),q=n(V),ve=n(q);De(ve,{size:14}),k(),i(q);var ge=g(q,2);ee(ge,1,()=>u(o),ae,(N,x)=>{var $=He(()=>Le(u(x),2));let he=()=>u($)[0],$e=()=>u($)[1];var Y=Ze(),R=h(Y),ye=n(R,!0);i(R);var be=g(R,2);ee(be,1,$e,ae,(we,w)=>{var M=Ye(),ze=n(M,!0);i(M),U(()=>{te(M,"href",`/chat?id=${u(w),z(()=>u(w).id)??""}`),te(M,"title",(u(w),z(()=>u(w).name))),G(ze,(u(w),z(()=>u(w).name)))}),f(we,M)}),U(()=>G(ye,he())),f(N,Y)}),i(V);var T=g(V,2),D=n(T),me=n(D,!0);i(D);var I=g(D,2),_e=n(I);Ge(_e,{size:12}),k(),i(I),i(T),i(v);var W=g(v,2),xe=n(W);b(xe,e,"default",{}),i(W),i(l),U(()=>G(me,(P(p()),z(()=>p().user.email)))),Ee("click",I,re),f(d,l)};Z(ne,d=>{u(c),P(p()),z(()=>{var l;return u(c)||!((l=p())!=null&&l.user)})?d(ie):d(de,-1)})}f(a,K),Ae(),_()}export{da as component,ia as universal};
