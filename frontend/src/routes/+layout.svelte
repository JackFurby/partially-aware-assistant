<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { currentUser, chats } from '$lib/stores';
  import { logout } from '$lib/api';
  import type { Chat } from '$lib/types';
  import { MessageSquare, BookOpen, Settings, Users, Plus, LogOut } from 'lucide-svelte';

  /** @type {import('./$types').LayoutData} */
  export let data: any;

  // Sync load data into stores
  $: if (data?.user) currentUser.set(data.user);
  $: if (data?.chats) chats.set(data.chats);

  async function handleLogout() {
    await logout();
    currentUser.set(null);
    chats.set([]);
    goto('/login');
  }

  function groupByDate(chatList: Chat[]) {
    const groups: Record<string, Chat[]> = {};
    for (const chat of chatList) {
      const date = chat.create_datetime.slice(0, 10);
      if (!groups[date]) groups[date] = [];
      groups[date].push(chat);
    }
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
  }

  $: chatGroups = groupByDate($chats);
  $: isLogin = $page.url.pathname === '/login';
</script>

{#if isLogin || !data?.user}
  <slot />
{:else}
  <div style="display:flex;height:100vh;font-family:sans-serif;">
    <!-- Sidebar -->
    <aside style="width:240px;background:#1a1a2e;color:#eee;display:flex;flex-direction:column;overflow:hidden;">
      <div style="padding:16px;border-bottom:1px solid #333;">
        <strong>Partially Aware</strong>
      </div>

      <nav style="padding:8px 0;border-bottom:1px solid #333;">
        <a href="/chat" style="display:flex;align-items:center;gap:8px;padding:8px 16px;color:#eee;text-decoration:none;"><MessageSquare size={16} /> Chat</a>
        <a href="/rag" style="display:flex;align-items:center;gap:8px;padding:8px 16px;color:#eee;text-decoration:none;"><BookOpen size={16} /> Knowledge Bases</a>
        <a href="/settings" style="display:flex;align-items:center;gap:8px;padding:8px 16px;color:#eee;text-decoration:none;"><Settings size={16} /> Settings</a>
        {#if data?.user?.is_superuser}
          <a href="/users" style="display:flex;align-items:center;gap:8px;padding:8px 16px;color:#eee;text-decoration:none;"><Users size={16} /> Users</a>
        {/if}
      </nav>

      <!-- Chat history sidebar -->
      <div style="flex:1;min-height:0;overflow-y:auto;padding:8px 0;">
        <a href="/chat"
           style="display:flex;align-items:center;gap:6px;padding:6px 16px;margin:4px 8px;background:#16213e;color:#eee;text-decoration:none;border-radius:4px;font-size:0.85rem;">
          <Plus size={14} /> New Chat
        </a>
        {#each chatGroups as [date, group]}
          <div style="padding:6px 16px 2px;font-size:0.75rem;color:#888;">{date}</div>
          {#each group as chat}
            <a href="/chat?id={chat.id}"
               style="display:block;padding:4px 16px;color:#ccc;text-decoration:none;font-size:0.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
               title={chat.name}>
              {chat.name}
            </a>
          {/each}
        {/each}
      </div>

      <div style="padding:12px 16px;border-top:1px solid #333;font-size:0.8rem;color:#aaa;">
        <div>{data.user.email}</div>
        <button on:click={handleLogout}
                style="display:flex;align-items:center;gap:6px;margin-top:6px;background:none;border:1px solid #555;color:#aaa;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:0.8rem;">
          <LogOut size={12} /> Logout
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <main style="flex:1;overflow:auto;background:#f8f9fa;">
      <slot />
    </main>
  </div>
{/if}
