import { f as attr, d as escape_html } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let email = "";
    let password = "";
    let loading = false;
    $$renderer2.push(`<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#1a1a2e;"><div style="background:white;padding:40px;border-radius:8px;width:320px;box-shadow:0 4px 20px rgba(0,0,0,0.3);"><h2 style="margin:0 0 24px;text-align:center;color:#1a1a2e;">Partially Aware</h2> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <form><label style="display:block;margin-bottom:4px;font-size:0.85rem;font-weight:600;">Email</label> <input type="email"${attr("value", email)} required="" style="width:100%;padding:8px;border:1px solid #ddd;border-radius:4px;margin-bottom:16px;box-sizing:border-box;"/> <label style="display:block;margin-bottom:4px;font-size:0.85rem;font-weight:600;">Password</label> <input type="password"${attr("value", password)} required="" style="width:100%;padding:8px;border:1px solid #ddd;border-radius:4px;margin-bottom:24px;box-sizing:border-box;"/> <button type="submit"${attr("disabled", loading, true)} style="width:100%;padding:10px;background:#1a1a2e;color:white;border:none;border-radius:4px;cursor:pointer;font-size:1rem;">${escape_html("Sign in")}</button></form></div></div>`);
  });
}
export {
  _page as default
};
