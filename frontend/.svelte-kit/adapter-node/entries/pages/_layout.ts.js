import { redirect } from "@sveltejs/kit";
const ssr = false;
async function load({ url, fetch }) {
  if (url.pathname === "/login") return { user: null };
  const res = await fetch("/api/users/me", { credentials: "include" }).catch(() => null);
  if (!res || !res.ok) {
    throw redirect(302, "/login");
  }
  const user = await res.json().catch(() => null);
  if (!user) throw redirect(302, "/login");
  const chatsRes = await fetch("/api/chats", { credentials: "include" }).catch(() => null);
  const chats = chatsRes?.ok ? await chatsRes.json().catch(() => []) : [];
  return { user, chats };
}
export {
  load,
  ssr
};
