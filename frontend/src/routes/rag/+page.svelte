<script lang="ts">
  import { getAgentModels, uploadKnowledgeBase, deleteKnowledgeBase } from '$lib/api';
  import type { Agent, KnowledgeBase } from '$lib/types';
  import { Trash2, Upload, Loader } from 'lucide-svelte';

  export let data: any;

  let agents: Agent[] = data.agents ?? [];
  let knowledgeBases: KnowledgeBase[] = data.knowledgeBases ?? [];

  // Upload form
  let uploadName = '';
  let uploadAgentId: number | null = agents.length > 0 ? agents[0].id : null;
  let uploadModels: string[] = [];
  let uploadEmbeddingModel = '';
  let uploadFile: File | null = null;
  let uploading = false;
  let uploadError = '';

  async function refreshUploadModels() {
    if (!uploadAgentId) return;
    const ms = await getAgentModels(uploadAgentId);
    uploadModels = ms.map(m => m.model_name);
    uploadEmbeddingModel = uploadModels[0] ?? '';
  }

  // Load models for initial agent
  if (uploadAgentId) refreshUploadModels();

  async function handleUpload() {
    if (!uploadName || !uploadAgentId || !uploadEmbeddingModel || !uploadFile) return;
    uploading = true;
    uploadError = '';
    try {
      const kb = await uploadKnowledgeBase(uploadName, uploadAgentId, uploadEmbeddingModel, uploadFile);
      knowledgeBases = [kb, ...knowledgeBases];
      uploadName = '';
      uploadFile = null;
    } catch (e: any) {
      uploadError = e.message;
    } finally {
      uploading = false;
    }
  }

  async function handleDelete(kbId: number) {
    if (!confirm('Delete this knowledge base?')) return;
    try {
      await deleteKnowledgeBase(kbId);
      knowledgeBases = knowledgeBases.filter(kb => kb.id !== kbId);
    } catch (e: any) {
      alert(e.message);
    }
  }
</script>

<div style="padding:24px;max-width:600px;">
  <h1 style="margin:0 0 24px;">Knowledge Bases</h1>

  <!-- Existing KBs -->
  <div style="margin-bottom:24px;">
    {#each knowledgeBases as kb}
      <div style="display:flex;align-items:center;gap:8px;padding:10px 12px;border:1px solid #eee;border-radius:6px;margin-bottom:8px;">
        <div style="flex:1;min-width:0;">
          <div style="font-weight:600;font-size:0.9rem;">{kb.name}</div>
          <div style="font-size:0.75rem;color:#888;">{kb.document_filename} · {kb.embedding_model}</div>
        </div>
        <button on:click={() => handleDelete(kb.id)}
                style="display:flex;align-items:center;gap:4px;padding:4px 8px;background:none;border:1px solid #fcc;color:#c00;border-radius:4px;cursor:pointer;font-size:0.75rem;">
          <Trash2 size={12} /> Delete
        </button>
      </div>
    {/each}
    {#if knowledgeBases.length === 0}
      <div style="color:#888;font-size:0.9rem;">No knowledge bases yet.</div>
    {/if}
  </div>

  <!-- Upload form -->
  <section style="background:#f8f9fa;padding:16px;border-radius:6px;">
    <h2 style="margin:0 0 12px;font-size:1rem;">Upload New Knowledge Base</h2>
    {#if uploadError}<div style="color:#c00;margin-bottom:8px;font-size:0.85rem;">{uploadError}</div>{/if}

    <div style="display:flex;flex-direction:column;gap:8px;">
      <input type="text" bind:value={uploadName} placeholder="Name"
             style="padding:6px;border:1px solid #ddd;border-radius:4px;" />

      <select bind:value={uploadAgentId} on:change={refreshUploadModels}
              style="padding:6px;border:1px solid #ddd;border-radius:4px;">
        {#each agents as a}<option value={a.id}>{a.name}</option>{/each}
      </select>

      <select bind:value={uploadEmbeddingModel}
              style="padding:6px;border:1px solid #ddd;border-radius:4px;">
        {#each uploadModels as m}<option value={m}>{m}</option>{/each}
      </select>

      <input type="file" accept=".txt,.md,.csv"
             on:change={(e) => uploadFile = (e.target as HTMLInputElement).files?.[0] ?? null}
             style="font-size:0.85rem;" />

      <button on:click={handleUpload} disabled={uploading}
              style="display:flex;align-items:center;justify-content:center;gap:6px;padding:8px;background:#1a1a2e;color:white;border:none;border-radius:4px;cursor:pointer;">
        {#if uploading}<Loader size={16} class="spin" />{:else}<Upload size={16} />{/if}
        {uploading ? 'Uploading…' : 'Upload'}
      </button>
    </div>
  </section>
</div>

<style>
  :global(.spin) {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
