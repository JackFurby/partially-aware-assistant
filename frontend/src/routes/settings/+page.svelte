<script lang="ts">
  import { currentUser } from '$lib/stores';
  import {
    getAgentModels, createAgent, addModel, addModelTags, updateSystemSettings
  } from '$lib/api';
  import type { Agent, Model } from '$lib/types';
  import { Plus, Tag, Download, Save, Loader } from 'lucide-svelte';

  export let data: any;

  let agents: Agent[] = data.agents ?? [];
  let selectedAgent: Agent | null = null;
  let agentModels: Model[] = [];

  // New agent form
  let newAgentName = '';
  let newAgentUrl = '';
  let agentError = '';
  let agentSuccess = '';

  // Add model form
  let newModelName = '';
  let modelError = '';

  // Add tag form
  let tagModelName = '';
  let tagInput = '';

  // System settings form
  let ragPrompt = data.systemSettings?.rag_prompt ?? '';
  let settingsSuccess = '';

  // Pull model
  let pullModelName = '';
  let pullProgress = '';
  let pulling = false;

  async function selectAgent(agent: Agent) {
    selectedAgent = agent;
    agentModels = await getAgentModels(agent.id);
    newModelName = '';
    tagModelName = agentModels.length > 0 ? agentModels[0].model_name : '';
  }

  async function handleCreateAgent() {
    agentError = '';
    agentSuccess = '';
    if (!newAgentName || !newAgentUrl) return;
    try {
      const agent = await createAgent(newAgentName, newAgentUrl);
      agents = [...agents, agent];
      newAgentName = '';
      newAgentUrl = '';
      agentSuccess = `Agent "${agent.name}" created.`;
    } catch (e: any) {
      agentError = e.message;
    }
  }

  async function handleAddModel() {
    if (!selectedAgent || !newModelName) return;
    modelError = '';
    try {
      const m = await addModel(selectedAgent.id, newModelName);
      agentModels = [...agentModels, m];
      newModelName = '';
    } catch (e: any) {
      modelError = e.message;
    }
  }

  async function handleAddTags() {
    if (!selectedAgent || !tagModelName || !tagInput) return;
    const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean);
    try {
      await addModelTags(selectedAgent.id, tagModelName, tags);
      agentModels = await getAgentModels(selectedAgent.id);
      tagInput = '';
    } catch (e: any) {
      alert(e.message);
    }
  }

  async function handleSaveSettings() {
    settingsSuccess = '';
    try {
      await updateSystemSettings(ragPrompt);
      settingsSuccess = 'Settings saved.';
    } catch (e: any) {
      alert(e.message);
    }
  }

  async function handlePull() {
    if (!selectedAgent || !pullModelName) return;
    pulling = true;
    pullProgress = '';
    try {
      const res = await fetch(`/api/agents/${selectedAgent.id}/pull/${encodeURIComponent(pullModelName)}`, {
        credentials: 'include'
      });
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        for (const line of text.split('\n')) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              pullProgress = data.status ?? '';
            } catch {}
          }
        }
      }
      pullProgress = 'Done!';
    } catch (e: any) {
      pullProgress = `Error: ${e.message}`;
    } finally {
      pulling = false;
    }
  }

  $: isAdmin = $currentUser?.is_superuser ?? false;
</script>

<div style="padding:24px;max-width:800px;">
  <h1 style="margin:0 0 24px;">Settings</h1>

  <!-- Agents section -->
  <section style="margin-bottom:32px;">
    <h2 style="margin:0 0 12px;">Agents</h2>

    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
      {#each agents as agent}
        <button on:click={() => selectAgent(agent)}
                style="padding:6px 12px;border:1px solid {selectedAgent?.id === agent.id ? '#1a1a2e' : '#ddd'};background:{selectedAgent?.id === agent.id ? '#1a1a2e' : 'white'};color:{selectedAgent?.id === agent.id ? 'white' : '#333'};border-radius:4px;cursor:pointer;">
          {agent.name}
        </button>
      {/each}
    </div>

    {#if isAdmin}
      <div style="background:#f8f9fa;padding:16px;border-radius:6px;margin-bottom:16px;">
        <h3 style="margin:0 0 12px;font-size:1rem;">Add Agent</h3>
        {#if agentError}<div style="color:#c00;margin-bottom:8px;">{agentError}</div>{/if}
        {#if agentSuccess}<div style="color:#060;margin-bottom:8px;">{agentSuccess}</div>{/if}
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <input type="text" bind:value={newAgentName} placeholder="Name"
                 style="padding:6px;border:1px solid #ddd;border-radius:4px;flex:1;min-width:120px;" />
          <input type="url" bind:value={newAgentUrl} placeholder="http://localhost:11434"
                 style="padding:6px;border:1px solid #ddd;border-radius:4px;flex:2;min-width:200px;" />
          <button on:click={handleCreateAgent}
                  style="display:flex;align-items:center;gap:6px;padding:6px 16px;background:#1a1a2e;color:white;border:none;border-radius:4px;cursor:pointer;">
            <Plus size={14} /> Create
          </button>
        </div>
      </div>
    {/if}

    {#if selectedAgent}
      <div style="background:#f8f9fa;padding:16px;border-radius:6px;">
        <h3 style="margin:0 0 12px;font-size:1rem;">Models for {selectedAgent.name}</h3>

        <!-- Model list -->
        {#each agentModels as m}
          <div style="padding:6px 0;border-bottom:1px solid #eee;font-size:0.9rem;">
            <strong>{m.model_name}</strong>
            {#if m.tags.length}
              {#each m.tags as tag}
                <span style="margin-left:6px;padding:2px 6px;background:#e0e7ff;border-radius:10px;font-size:0.75rem;">{tag.name}</span>
              {/each}
            {/if}
          </div>
        {/each}

        {#if isAdmin}
          <!-- Add model -->
          <div style="margin-top:12px;display:flex;gap:8px;">
            <input type="text" bind:value={newModelName} placeholder="model:tag"
                   style="padding:6px;border:1px solid #ddd;border-radius:4px;flex:1;" />
            <button on:click={handleAddModel}
                    style="display:flex;align-items:center;gap:6px;padding:6px 12px;background:#1a1a2e;color:white;border:none;border-radius:4px;cursor:pointer;">
              <Plus size={14} /> Add Model
            </button>
          </div>
          {#if modelError}<div style="color:#c00;font-size:0.85rem;margin-top:4px;">{modelError}</div>{/if}

          <!-- Add tags -->
          <div style="margin-top:12px;">
            <div style="margin-bottom:6px;font-size:0.85rem;font-weight:600;">Add Tags to Model</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <select bind:value={tagModelName}
                      style="padding:6px;border:1px solid #ddd;border-radius:4px;">
                {#each agentModels as m}
                  <option value={m.model_name}>{m.model_name}</option>
                {/each}
              </select>
              <input type="text" bind:value={tagInput} placeholder="tag1, tag2"
                     style="padding:6px;border:1px solid #ddd;border-radius:4px;flex:1;" />
              <button on:click={handleAddTags}
                      style="display:flex;align-items:center;gap:6px;padding:6px 12px;background:#1a1a2e;color:white;border:none;border-radius:4px;cursor:pointer;">
                <Tag size={14} /> Add Tags
              </button>
            </div>
          </div>

          <!-- Pull model -->
          <div style="margin-top:12px;">
            <div style="margin-bottom:6px;font-size:0.85rem;font-weight:600;">Pull Model from Ollama</div>
            <div style="display:flex;gap:8px;">
              <input type="text" bind:value={pullModelName} placeholder="model:tag"
                     style="padding:6px;border:1px solid #ddd;border-radius:4px;flex:1;" />
              <button on:click={handlePull} disabled={pulling}
                      style="display:flex;align-items:center;gap:6px;padding:6px 12px;background:#1a1a2e;color:white;border:none;border-radius:4px;cursor:pointer;">
                {#if pulling}<Loader size={14} class="spin" />{:else}<Download size={14} />{/if}
                {pulling ? 'Pulling…' : 'Pull'}
              </button>
            </div>
            {#if pullProgress}
              <div style="margin-top:6px;font-size:0.85rem;color:#666;">{pullProgress}</div>
            {/if}
          </div>
        {/if}
      </div>
    {/if}
  </section>

  <!-- System settings (admin only) -->
  {#if isAdmin}
    <section>
      <h2 style="margin:0 0 12px;">System Settings</h2>
      <div style="background:#f8f9fa;padding:16px;border-radius:6px;">
        <label style="display:block;margin-bottom:6px;font-size:0.85rem;font-weight:600;">RAG Prompt Template</label>
        <textarea bind:value={ragPrompt} rows="8"
                  style="width:100%;padding:8px;border:1px solid #ddd;border-radius:4px;font-family:monospace;font-size:0.85rem;box-sizing:border-box;" />
        <div style="margin-top:8px;font-size:0.8rem;color:#666;">Use [context] and [query] as placeholders.</div>
        {#if settingsSuccess}<div style="color:#060;margin-top:6px;">{settingsSuccess}</div>{/if}
        <button on:click={handleSaveSettings}
                style="display:flex;align-items:center;gap:6px;margin-top:8px;padding:8px 20px;background:#1a1a2e;color:white;border:none;border-radius:4px;cursor:pointer;">
          <Save size={14} /> Save
        </button>
      </div>
    </section>
  {/if}
</div>

<style>
  :global(.spin) {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
