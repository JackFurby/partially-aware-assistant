import { s as sanitize_props, a as spread_props, b as slot, c as store_get, e as ensure_array_like, j as attr_style, g as stringify, d as escape_html, f as attr, u as unsubscribe_stores, h as bind_props } from "../../../chunks/index2.js";
import { c as currentUser } from "../../../chunks/stores2.js";
import { P as Plus } from "../../../chunks/plus.js";
import { I as Icon } from "../../../chunks/Icon.js";
function Save($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
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
   */
  const iconNode = [
    [
      "path",
      {
        "d": "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
      }
    ],
    ["path", { "d": "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" }],
    ["path", { "d": "M7 3v4a1 1 0 0 0 1 1h7" }]
  ];
  Icon($$renderer, spread_props([
    { name: "save" },
    $$sanitized_props,
    {
      /**
       * @component @name Save
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTUuMiAzYTIgMiAwIDAgMSAxLjQuNmwzLjggMy44YTIgMiAwIDAgMSAuNiAxLjRWMTlhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yeiIgLz4KICA8cGF0aCBkPSJNMTcgMjF2LTdhMSAxIDAgMCAwLTEtMUg4YTEgMSAwIDAgMC0xIDF2NyIgLz4KICA8cGF0aCBkPSJNNyAzdjRhMSAxIDAgMCAwIDEgMWg3IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/save
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let isAdmin;
    let data = $$props["data"];
    let agents = data.agents ?? [];
    let selectedAgent = null;
    let newAgentName = "";
    let newAgentUrl = "";
    let ragPrompt = data.systemSettings?.rag_prompt ?? "";
    isAdmin = store_get($$store_subs ??= {}, "$currentUser", currentUser)?.is_superuser ?? false;
    $$renderer2.push(`<div style="padding:24px;max-width:800px;"><h1 style="margin:0 0 24px;">Settings</h1> <section style="margin-bottom:32px;"><h2 style="margin:0 0 12px;">Agents</h2> <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;"><!--[-->`);
    const each_array = ensure_array_like(agents);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let agent = each_array[$$index];
      $$renderer2.push(`<button${attr_style(`padding:6px 12px;border:1px solid ${stringify(selectedAgent?.id === agent.id ? "#1a1a2e" : "#ddd")};background:${stringify(selectedAgent?.id === agent.id ? "#1a1a2e" : "white")};color:${stringify(selectedAgent?.id === agent.id ? "white" : "#333")};border-radius:4px;cursor:pointer;`)}>${escape_html(agent.name)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (isAdmin) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div style="background:#f8f9fa;padding:16px;border-radius:6px;margin-bottom:16px;"><h3 style="margin:0 0 12px;font-size:1rem;">Add Agent</h3> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div style="display:flex;gap:8px;flex-wrap:wrap;"><input type="text"${attr("value", newAgentName)} placeholder="Name" style="padding:6px;border:1px solid #ddd;border-radius:4px;flex:1;min-width:120px;"/> <input type="url"${attr("value", newAgentUrl)} placeholder="http://localhost:11434" style="padding:6px;border:1px solid #ddd;border-radius:4px;flex:2;min-width:200px;"/> <button style="display:flex;align-items:center;gap:6px;padding:6px 16px;background:#1a1a2e;color:white;border:none;border-radius:4px;cursor:pointer;">`);
      Plus($$renderer2, { size: 14 });
      $$renderer2.push(`<!----> Create</button></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></section> `);
    if (isAdmin) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<section><h2 style="margin:0 0 12px;">System Settings</h2> <div style="background:#f8f9fa;padding:16px;border-radius:6px;"><label style="display:block;margin-bottom:6px;font-size:0.85rem;font-weight:600;">RAG Prompt Template</label> <textarea rows="8" style="width:100%;padding:8px;border:1px solid #ddd;border-radius:4px;font-family:monospace;font-size:0.85rem;box-sizing:border-box;">`);
      const $$body = escape_html(ragPrompt);
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</textarea> <div style="margin-top:8px;font-size:0.8rem;color:#666;">Use [context] and [query] as placeholders.</div> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <button style="display:flex;align-items:center;gap:6px;margin-top:8px;padding:8px 20px;background:#1a1a2e;color:white;border:none;border-radius:4px;cursor:pointer;">`);
      Save($$renderer2, { size: 14 });
      $$renderer2.push(`<!----> Save</button></div></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
