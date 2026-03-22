import { redirect } from '@sveltejs/kit';

export const ssr = false;

export async function load({ url, fetch }) {
  // Don't auth-check the login page itself
  if (url.pathname === '/login') return { user: null };

  const res = await fetch('/api/users/me', { credentials: 'include' }).catch(() => null);

  if (!res || !res.ok) {
    throw redirect(302, '/login');
  }

  const user = await res.json().catch(() => null);
  if (!user) throw redirect(302, '/login');

  const chatsRes = await fetch('/api/chats', { credentials: 'include' }).catch(() => null);
  const chats = chatsRes?.ok ? await chatsRes.json().catch(() => []) : [];

  return { user, chats };
}
