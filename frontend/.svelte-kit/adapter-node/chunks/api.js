const opts = () => ({
  credentials: "include",
  headers: { "Content-Type": "application/json" }
});
async function req(path, init) {
  const res = await fetch(path, { ...opts(), ...init, headers: { ...opts().headers, ...init?.headers } });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? `HTTP ${res.status}`);
  }
  return res.json();
}
async function getChat(id) {
  return req(`/api/chats/${id}`);
}
async function getAgentModels(agentId) {
  return req(`/api/agents/${agentId}/models`);
}
async function getUsers() {
  return req("/api/users");
}
export {
  getAgentModels as a,
  getUsers as b,
  getChat as g
};
