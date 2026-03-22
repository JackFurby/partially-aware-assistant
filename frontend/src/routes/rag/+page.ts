export async function load({ fetch, parent }) {
  await parent();

  const [agentsRes, kbRes] = await Promise.all([
    fetch('/api/agents', { credentials: 'include' }).catch(() => null),
    fetch('/api/rag/knowledge_bases', { credentials: 'include' }).catch(() => null),
  ]);

  const agents = agentsRes?.ok ? await agentsRes.json().catch(() => []) : [];
  const knowledgeBases = kbRes?.ok ? await kbRes.json().catch(() => []) : [];

  return { agents, knowledgeBases };
}
