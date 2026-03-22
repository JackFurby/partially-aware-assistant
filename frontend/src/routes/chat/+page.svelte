<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { currentUser, chats } from '$lib/stores';
  import { getAgentModels, getChat, getChats } from '$lib/api';
  import type { Agent, Chat, KnowledgeBase, Message, Model, OllamaChunk, ChatIdChunk } from '$lib/types';
  import { Send, ChevronDown, ChevronUp, Loader } from 'lucide-svelte';

  export let data: any;

  // State
  let agents: Agent[] = data.agents ?? [];
  let knowledgeBases: KnowledgeBase[] = data.knowledgeBases ?? [];
  let models: Model[] = [];
  let selectedAgentId: number | null = null;
  let selectedModel = '';
  let selectedKbId: number | null = null;
  let messageInput = '';
  let messages: Message[] = [];
  let currentChatId: number | null = null;
  let streaming = false;
  let streamedContent = '';
  let streamedReasoning = '';
  let showReasoning = false;
  let ragChunks: string[] = [];
  let ragDistances: string[] = [];
  let showRagChunks = false;
  let error = '';

  $: chatId = $page.url.searchParams.get('id') ? Number($page.url.searchParams.get('id')) : null;

  // Load models when restoring a chat that has an agent set
  onMount(async () => {
    if (selectedAgentId) {
      try {
        models = await getAgentModels(selectedAgentId);
      } catch (e: any) {
        error = e.message;
      }
    }
  });

  // Load chat when URL param changes; reset state for new chat
  $: if (chatId !== null && !streaming) {
    loadChat(chatId);
  } else if (chatId === null) {
    messages = [];
    currentChatId = null;
    streamedContent = '';
    streamedReasoning = '';
    error = '';
  }

  async function loadChat(id: number) {
    try {
      const detail = await getChat(id);
      currentChatId = detail.chat.id;
      messages = detail.messages;
      // Restore agent/model from chat
      if (detail.chat.agent_id) {
        selectedAgentId = detail.chat.agent_id;
        models = await getAgentModels(detail.chat.agent_id);
      }
      if (detail.chat.model_name) selectedModel = detail.chat.model_name;
      selectedKbId = detail.chat.kb_id ?? null;
    } catch (e: any) {
      error = e.message;
    }
  }

  async function onAgentChange() {
    if (!selectedAgentId) return;
    models = await getAgentModels(selectedAgentId);
    selectedModel = models.length > 0 ? models[0].model_name : '';
  }

  async function sendMessage() {
    if (!messageInput.trim() || !selectedAgentId || !selectedModel || streaming) return;

    const userMessage = messageInput.trim();
    messageInput = '';
    error = '';
    streaming = true;
    streamedContent = '';
    streamedReasoning = '';
    ragChunks = [];
    ragDistances = [];
    showRagChunks = false;

    messages = [...messages, {
      id: Date.now(),
      chat_id: currentChatId ?? 0,
      message: userMessage,
      role: 'user',
      model_reasoning: null,
      create_datetime: new Date().toISOString()
    }];

    try {
      const isRag = selectedKbId !== null;
      const res = await fetch(isRag ? '/api/rag/query' : '/api/chat/send_message', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isRag
          ? { chat_id: currentChatId, kb_id: selectedKbId, agent_id: selectedAgentId, model_name: selectedModel, query: userMessage }
          : { chat_id: currentChatId, agent_id: selectedAgentId, model_name: selectedModel, message: userMessage, kb_id: selectedKbId }
        )
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let finalChunk: OllamaChunk | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value).split('\n').filter(l => l.trim());
        for (const line of lines) {
          try {
            const data = JSON.parse(line);

            if (data.type === 'chat_id') {
              currentChatId = (data as ChatIdChunk).chat_id;
              goto(`/chat?id=${currentChatId}`, { replaceState: true, noScroll: true });
              chats.set(await getChats());
              continue;
            }

            if (data.type === 'metadata') {
              ragChunks = data.relevant_chunks_text ?? [];
              ragDistances = data.relevant_chunks_distance ?? [];
              continue;
            }

            const chunk = data as OllamaChunk;
            if (chunk.error) { error = chunk.error; break; }
            if (chunk.message?.thinking) streamedReasoning += chunk.message.thinking;
            if (chunk.message?.content) streamedContent += chunk.message.content;
            if (chunk.done) finalChunk = chunk;
          } catch {}
        }
      }

      // Save assistant message to chat history
      if (currentChatId && streamedContent) {
        await fetch('/api/chat/save_message', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: currentChatId,
            message: streamedContent,
            model_reasoning: streamedReasoning || null,
            total_duration: finalChunk?.total_duration,
            load_duration: finalChunk?.load_duration,
            prompt_eval_count: finalChunk?.prompt_eval_count,
            prompt_eval_duration: finalChunk?.prompt_eval_duration,
            eval_count: finalChunk?.eval_count,
            eval_duration: finalChunk?.eval_duration
          })
        });
      }

      messages = [...messages, {
        id: Date.now() + 1,
        chat_id: currentChatId ?? 0,
        message: streamedContent,
        role: 'assistant',
        model_reasoning: streamedReasoning || null,
        total_duration: finalChunk?.total_duration,
        eval_count: finalChunk?.eval_count,
        create_datetime: new Date().toISOString()
      }];

    } catch (e: any) {
      error = e.message;
    } finally {
      streaming = false;
      streamedContent = '';
      streamedReasoning = '';
    }
  }

  function formatDuration(ns?: number) {
    if (!ns) return '';
    return (ns / 1e9).toFixed(2) + 's';
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }
</script>

<div style="display:flex;flex-direction:column;height:100%;background:white;">
  <!-- Header / selectors -->
  <div style="padding:12px 16px;border-bottom:1px solid #eee;display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
    <select bind:value={selectedAgentId} on:change={onAgentChange}
            style="padding:6px;border:1px solid #ddd;border-radius:4px;">
      <option value={null}>Select agent</option>
      {#each agents as agent}
        <option value={agent.id}>{agent.name}</option>
      {/each}
    </select>

    <select bind:value={selectedModel}
            style="padding:6px;border:1px solid #ddd;border-radius:4px;">
      <option value="">Select model</option>
      {#each models as m}
        <option value={m.model_name}>{m.model_name}{m.tags.length ? ` [${m.tags.map(t=>t.name).join(',')}]` : ''}</option>
      {/each}
    </select>

    <select bind:value={selectedKbId}
            style="padding:6px;border:1px solid #ddd;border-radius:4px;">
      <option value={null}>No knowledge base</option>
      {#each knowledgeBases as kb}
        <option value={kb.id}>{kb.name}</option>
      {/each}
    </select>

    <label style="display:flex;align-items:center;gap:6px;font-size:0.85rem;cursor:pointer;">
      <input type="checkbox" bind:checked={showReasoning} />
      Show reasoning
    </label>
  </div>

  <!-- Messages -->
  <div style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;">
    {#each messages as msg}
      <div style="display:flex;flex-direction:column;align-items:{msg.role === 'user' ? 'flex-end' : 'flex-start'};">
        <div style="max-width:75%;padding:10px 14px;border-radius:12px;background:{msg.role === 'user' ? '#1a1a2e' : '#f0f0f0'};color:{msg.role === 'user' ? 'white' : '#333'};white-space:pre-wrap;word-break:break-word;">
          {msg.message}
        </div>
        {#if msg.role === 'assistant' && showReasoning && msg.model_reasoning}
          <div style="max-width:75%;margin-top:4px;padding:8px 12px;border-radius:8px;background:#fff9e6;border:1px solid #ffe;font-size:0.8rem;color:#666;white-space:pre-wrap;">
            <strong>Reasoning:</strong> {msg.model_reasoning}
          </div>
        {/if}
        {#if msg.role === 'assistant' && msg.total_duration}
          <div style="font-size:0.72rem;color:#aaa;margin-top:2px;">
            {formatDuration(msg.total_duration)} · {msg.eval_count ?? 0} tokens
          </div>
        {/if}
      </div>
    {/each}

    <!-- Streaming preview -->
    {#if streaming}
      {#if showReasoning && streamedReasoning}
        <div style="display:flex;align-items:flex-start;">
          <div style="max-width:75%;padding:8px 12px;border-radius:8px;background:#fff9e6;border:1px solid #ffe;font-size:0.8rem;color:#666;white-space:pre-wrap;">
            <strong>Reasoning:</strong> {streamedReasoning}
          </div>
        </div>
      {/if}
      {#if streamedContent}
        <div style="display:flex;align-items:flex-start;">
          <div style="max-width:75%;padding:10px 14px;border-radius:12px;background:#f0f0f0;color:#333;white-space:pre-wrap;word-break:break-word;">
            {streamedContent}<span style="animation:blink 1s step-end infinite;">▌</span>
          </div>
        </div>
      {:else}
        <div style="display:flex;align-items:center;gap:6px;color:#aaa;font-size:0.85rem;">
          <Loader size={14} class="spin" /> Thinking…
        </div>
      {/if}
    {/if}

    {#if ragChunks.length > 0}
      <div style="border-top:1px solid #eee;padding-top:8px;">
        <button on:click={() => showRagChunks = !showRagChunks}
                style="display:flex;align-items:center;gap:6px;background:none;border:1px solid #ddd;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:0.8rem;color:#666;">
          {#if showRagChunks}<ChevronUp size={14} />{:else}<ChevronDown size={14} />{/if}
          {showRagChunks ? 'Hide' : 'Show'} source chunks ({ragChunks.length})
        </button>
        {#if showRagChunks}
          <div style="margin-top:8px;display:flex;flex-direction:column;gap:6px;">
            {#each ragChunks as chunk, i}
              <div style="padding:10px;background:#fffbe6;border:1px solid #ffe;border-radius:6px;font-size:0.8rem;">
                <div style="color:#888;margin-bottom:4px;">Chunk {i + 1} · distance {parseFloat(ragDistances[i]).toFixed(4)}</div>
                <div style="white-space:pre-wrap;">{chunk}</div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    {#if error}
      <div style="color:#c00;font-size:0.85rem;">{error}</div>
    {/if}
  </div>

  <!-- Input -->
  <div style="padding:12px 16px;border-top:1px solid #eee;display:flex;gap:8px;">
    <textarea bind:value={messageInput}
              on:keydown={handleKeydown}
              placeholder="Message... (Enter to send, Shift+Enter for newline)"
              rows="3"
              disabled={streaming}
              style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;resize:none;font-family:inherit;font-size:0.9rem;" />
    <button on:click={sendMessage}
            disabled={streaming || !messageInput.trim() || !selectedModel}
            style="display:flex;align-items:center;gap:6px;padding:8px 20px;background:#1a1a2e;color:white;border:none;border-radius:6px;cursor:pointer;font-size:0.9rem;align-self:flex-end;">
      {#if streaming}<Loader size={16} class="spin" />{:else}<Send size={16} />{/if}
      {streaming ? 'Sending' : 'Send'}
    </button>
  </div>
</div>

<style>
  @keyframes blink {
    50% { opacity: 0; }
  }
  :global(.spin) {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
