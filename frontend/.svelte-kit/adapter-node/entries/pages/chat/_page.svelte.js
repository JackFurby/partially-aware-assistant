import { s as sanitize_props, a as spread_props, b as slot, c as store_get, e as ensure_array_like, d as escape_html, f as attr, j as attr_style, g as stringify, u as unsubscribe_stores, h as bind_props } from "../../../chunks/index2.js";
import { p as page } from "../../../chunks/stores.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
import { g as getChat, a as getAgentModels } from "../../../chunks/api.js";
import { I as Icon } from "../../../chunks/Icon.js";
function Chevron_down($$renderer, $$props) {
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
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  Icon($$renderer, spread_props([
    { name: "chevron-down" },
    $$sanitized_props,
    {
      /**
       * @component @name ChevronDown
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtNiA5IDYgNiA2LTYiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/chevron-down
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
function Send($$renderer, $$props) {
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
        "d": "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"
      }
    ],
    ["path", { "d": "m21.854 2.147-10.94 10.939" }]
  ];
  Icon($$renderer, spread_props([
    { name: "send" },
    $$sanitized_props,
    {
      /**
       * @component @name Send
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTQuNTM2IDIxLjY4NmEuNS41IDAgMCAwIC45MzctLjAyNGw2LjUtMTlhLjQ5Ni40OTYgMCAwIDAtLjYzNS0uNjM1bC0xOSA2LjVhLjUuNSAwIDAgMC0uMDI0LjkzN2w3LjkzIDMuMThhMiAyIDAgMCAxIDEuMTEyIDEuMTF6IiAvPgogIDxwYXRoIGQ9Im0yMS44NTQgMi4xNDctMTAuOTQgMTAuOTM5IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/send
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
    let chatId;
    let data = $$props["data"];
    let agents = data.agents ?? [];
    let knowledgeBases = data.knowledgeBases ?? [];
    let models = [];
    let selectedAgentId = null;
    let selectedModel = "";
    let selectedKbId = null;
    let messageInput = "";
    let messages = [];
    let currentChatId = null;
    let streaming = false;
    let showReasoning = false;
    let ragChunks = [];
    let error = "";
    async function loadChat(id) {
      try {
        const detail = await getChat(id);
        currentChatId = detail.chat.id;
        messages = detail.messages;
        if (detail.chat.agent_id) {
          selectedAgentId = detail.chat.agent_id;
          models = await getAgentModels(detail.chat.agent_id);
        }
        if (detail.chat.model_name) selectedModel = detail.chat.model_name;
        selectedKbId = detail.chat.kb_id ?? null;
      } catch (e) {
        error = e.message;
      }
    }
    function formatDuration(ns) {
      if (!ns) return "";
      return (ns / 1e9).toFixed(2) + "s";
    }
    chatId = store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("id") ? Number(store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("id")) : null;
    if (chatId !== null && !streaming) {
      loadChat(chatId);
    } else if (chatId === null) {
      messages = [];
      currentChatId = null;
      error = "";
    }
    $$renderer2.push(`<div style="display:flex;flex-direction:column;height:100%;background:white;" class="svelte-23dtxz"><div style="padding:12px 16px;border-bottom:1px solid #eee;display:flex;gap:12px;align-items:center;flex-wrap:wrap;" class="svelte-23dtxz">`);
    $$renderer2.select(
      {
        value: (
          // Restore agent/model from chat
          // Save assistant message to chat history
          selectedAgentId
        ),
        style: "padding:6px;border:1px solid #ddd;border-radius:4px;",
        class: ""
      },
      ($$renderer3) => {
        $$renderer3.option(
          { value: null, class: "" },
          ($$renderer4) => {
            $$renderer4.push(`Select agent`);
          },
          "svelte-23dtxz"
        );
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(agents);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let agent = each_array[$$index];
          $$renderer3.option(
            { value: agent.id, class: "" },
            ($$renderer4) => {
              $$renderer4.push(`${escape_html(agent.name)}`);
            },
            "svelte-23dtxz"
          );
        }
        $$renderer3.push(`<!--]-->`);
      },
      "svelte-23dtxz"
    );
    $$renderer2.push(` `);
    $$renderer2.select(
      {
        value: selectedModel,
        style: "padding:6px;border:1px solid #ddd;border-radius:4px;",
        class: ""
      },
      ($$renderer3) => {
        $$renderer3.option(
          { value: "", class: "" },
          ($$renderer4) => {
            $$renderer4.push(`Select model`);
          },
          "svelte-23dtxz"
        );
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(models);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let m = each_array_1[$$index_1];
          $$renderer3.option(
            { value: m.model_name, class: "" },
            ($$renderer4) => {
              $$renderer4.push(`${escape_html(m.model_name)}${escape_html(m.tags.length ? ` [${m.tags.map((t) => t.name).join(",")}]` : "")}`);
            },
            "svelte-23dtxz"
          );
        }
        $$renderer3.push(`<!--]-->`);
      },
      "svelte-23dtxz"
    );
    $$renderer2.push(` `);
    $$renderer2.select(
      {
        value: selectedKbId,
        style: "padding:6px;border:1px solid #ddd;border-radius:4px;",
        class: ""
      },
      ($$renderer3) => {
        $$renderer3.option(
          { value: null, class: "" },
          ($$renderer4) => {
            $$renderer4.push(`No knowledge base`);
          },
          "svelte-23dtxz"
        );
        $$renderer3.push(`<!--[-->`);
        const each_array_2 = ensure_array_like(knowledgeBases);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let kb = each_array_2[$$index_2];
          $$renderer3.option(
            { value: kb.id, class: "" },
            ($$renderer4) => {
              $$renderer4.push(`${escape_html(kb.name)}`);
            },
            "svelte-23dtxz"
          );
        }
        $$renderer3.push(`<!--]-->`);
      },
      "svelte-23dtxz"
    );
    $$renderer2.push(` <label style="display:flex;align-items:center;gap:6px;font-size:0.85rem;cursor:pointer;" class="svelte-23dtxz"><input type="checkbox"${attr("checked", showReasoning, true)} class="svelte-23dtxz"/> Show reasoning</label></div> <div style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;" class="svelte-23dtxz"><!--[-->`);
    const each_array_3 = ensure_array_like(messages);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let msg = each_array_3[$$index_3];
      $$renderer2.push(`<div${attr_style(`display:flex;flex-direction:column;align-items:${stringify(msg.role === "user" ? "flex-end" : "flex-start")};`)} class="svelte-23dtxz"><div${attr_style(`max-width:75%;padding:10px 14px;border-radius:12px;background:${stringify(msg.role === "user" ? "#1a1a2e" : "#f0f0f0")};color:${stringify(msg.role === "user" ? "white" : "#333")};white-space:pre-wrap;word-break:break-word;`)} class="svelte-23dtxz">${escape_html(msg.message)}</div> `);
      if (msg.role === "assistant" && showReasoning) ;
      else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (msg.role === "assistant" && msg.total_duration) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div style="font-size:0.72rem;color:#aaa;margin-top:2px;" class="svelte-23dtxz">${escape_html(formatDuration(msg.total_duration))} · ${escape_html(msg.eval_count ?? 0)} tokens</div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (ragChunks.length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div style="border-top:1px solid #eee;padding-top:8px;" class="svelte-23dtxz"><button style="display:flex;align-items:center;gap:6px;background:none;border:1px solid #ddd;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:0.8rem;color:#666;" class="svelte-23dtxz">`);
      {
        $$renderer2.push("<!--[-1-->");
        Chevron_down($$renderer2, { size: 14 });
      }
      $$renderer2.push(`<!--]--> ${escape_html("Show")} source chunks (${escape_html(ragChunks.length)})</button> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (error) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div style="color:#c00;font-size:0.85rem;" class="svelte-23dtxz">${escape_html(error)}</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div style="padding:12px 16px;border-top:1px solid #eee;display:flex;gap:8px;" class="svelte-23dtxz"><textarea placeholder="Message... (Enter to send, Shift+Enter for newline)" rows="3"${attr("disabled", streaming, true)} style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;resize:none;font-family:inherit;font-size:0.9rem;" class="svelte-23dtxz">`);
    const $$body = escape_html(messageInput);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea> <button${attr("disabled", !messageInput.trim() || !selectedModel, true)} style="display:flex;align-items:center;gap:6px;padding:8px 20px;background:#1a1a2e;color:white;border:none;border-radius:6px;cursor:pointer;font-size:0.9rem;align-self:flex-end;" class="svelte-23dtxz">`);
    {
      $$renderer2.push("<!--[-1-->");
      Send($$renderer2, { size: 16 });
    }
    $$renderer2.push(`<!--]--> ${escape_html("Send")}</button></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
