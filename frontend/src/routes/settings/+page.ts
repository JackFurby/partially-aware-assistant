export async function load({ fetch, parent }) {
  await parent(); // ensure auth check runs first

  const [agentsRes, settingsRes] = await Promise.all([
    fetch('/api/agents', { credentials: 'include' }).catch(() => null),
    fetch('/api/system/settings', { credentials: 'include' }).catch(() => null),
  ]);

  const agents = agentsRes?.ok ? await agentsRes.json().catch(() => []) : [];
  const systemSettings = settingsRes?.ok ? await settingsRes.json().catch(() => null) : null;

  return { agents, systemSettings };
}
