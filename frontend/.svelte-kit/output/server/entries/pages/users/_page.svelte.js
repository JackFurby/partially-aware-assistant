import { s as sanitize_props, a as spread_props, b as slot, c as store_get, e as ensure_array_like, d as escape_html, j as attr_style, g as stringify, f as attr, u as unsubscribe_stores } from "../../../chunks/index2.js";
import { c as currentUser } from "../../../chunks/stores2.js";
import { b as getUsers } from "../../../chunks/api.js";
import { I as Icon } from "../../../chunks/Icon.js";
function User_plus($$renderer, $$props) {
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
    ["path", { "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
    ["circle", { "cx": "9", "cy": "7", "r": "4" }],
    ["line", { "x1": "19", "x2": "19", "y1": "8", "y2": "14" }],
    ["line", { "x1": "22", "x2": "16", "y1": "11", "y2": "11" }]
  ];
  Icon($$renderer, spread_props([
    { name: "user-plus" },
    $$sanitized_props,
    {
      /**
       * @component @name UserPlus
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg2YTQgNCAwIDAgMC00IDR2MiIgLz4KICA8Y2lyY2xlIGN4PSI5IiBjeT0iNyIgcj0iNCIgLz4KICA8bGluZSB4MT0iMTkiIHgyPSIxOSIgeTE9IjgiIHkyPSIxNCIgLz4KICA8bGluZSB4MT0iMjIiIHgyPSIxNiIgeTE9IjExIiB5Mj0iMTEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/user-plus
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
    let users = [];
    let newEmail = "";
    let newPassword = "";
    let newIsAdmin = false;
    if (store_get($$store_subs ??= {}, "$currentUser", currentUser)?.is_superuser && users.length === 0) {
      getUsers().then((u) => users = u).catch(() => {
      });
    }
    $$renderer2.push(`<div style="padding:24px;max-width:700px;"><h1 style="margin:0 0 24px;">Users</h1> `);
    if (!store_get($$store_subs ??= {}, "$currentUser", currentUser)?.is_superuser) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p style="color:#888;">Admin access required.</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<table style="width:100%;border-collapse:collapse;margin-bottom:32px;"><thead><tr style="border-bottom:2px solid #eee;text-align:left;"><th style="padding:8px;">Email</th><th style="padding:8px;">Status</th><th style="padding:8px;">Admin</th><th style="padding:8px;"></th></tr></thead><tbody><!--[-->`);
      const each_array = ensure_array_like(users);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let user = each_array[$$index];
        $$renderer2.push(`<tr style="border-bottom:1px solid #f0f0f0;"><td style="padding:8px;">${escape_html(user.email)}</td><td style="padding:8px;"><span${attr_style(`padding:2px 8px;border-radius:10px;font-size:0.8rem;background:${stringify(user.is_active ? "#d4edda" : "#f8d7da")};color:${stringify(user.is_active ? "#155724" : "#721c24")};`)}>${escape_html(user.is_active ? "Active" : "Inactive")}</span></td><td style="padding:8px;">`);
        if (user.is_superuser) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span style="padding:2px 8px;border-radius:10px;font-size:0.8rem;background:#cce5ff;color:#004085;">Admin</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></td><td style="padding:8px;"><a${attr("href", `/users/${stringify(user.id)}`)} style="color:#1a1a2e;font-size:0.85rem;">View</a></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table> <h2 style="margin:0 0 12px;font-size:1.1rem;">Create User</h2> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div style="background:#f8f9fa;padding:16px;border-radius:6px;display:flex;flex-direction:column;gap:10px;"><input type="email"${attr("value", newEmail)} placeholder="Email" style="padding:8px;border:1px solid #ddd;border-radius:4px;"/> <input type="password"${attr("value", newPassword)} placeholder="Password" style="padding:8px;border:1px solid #ddd;border-radius:4px;"/> <label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox"${attr("checked", newIsAdmin, true)}/> Admin (superuser)</label> <button style="display:flex;align-items:center;gap:6px;padding:8px 20px;background:#1a1a2e;color:white;border:none;border-radius:4px;cursor:pointer;align-self:flex-start;">`);
      User_plus($$renderer2, { size: 16 });
      $$renderer2.push(`<!----> Create User</button></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
