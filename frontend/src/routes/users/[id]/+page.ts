export async function load({ params, fetch }) {
  const res = await fetch(`/api/users/${params.id}`, { credentials: 'include' }).catch(() => null);

  if (!res || !res.ok) {
    return { user: null, loadError: `Failed to load user (HTTP ${res?.status ?? 'network error'})` };
  }

  const user = await res.json().catch(() => null);
  return { user, loadError: user ? '' : 'Invalid response from server' };
}
