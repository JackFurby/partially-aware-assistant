<script lang="ts">
  import { currentUser } from '$lib/stores';
  import { updateUser } from '$lib/api';
  import type { User } from '$lib/types';
  import { ArrowLeft, Shield, ShieldOff } from 'lucide-svelte';

  export let data: any;

  let user: User | null = data.user;
  let error = data.loadError ?? '';

  async function handleToggleAdmin() {
    if (!user) return;
    try {
      user = await updateUser(user.id, { is_superuser: !user.is_superuser });
    } catch (e: any) {
      error = e.message || 'Failed to update user';
    }
  }
</script>

<div style="padding:24px;max-width:500px;">
  <a href="/users" style="display:inline-flex;align-items:center;gap:4px;color:#1a1a2e;font-size:0.85rem;text-decoration:none;"><ArrowLeft size={14} /> Back to Users</a>

  {#if error}
    <div style="color:#c00;margin-top:16px;">{error}</div>
  {:else if !user}
    <div style="margin-top:16px;color:#888;">Loading…</div>
  {:else}
    <h1 style="margin:16px 0 24px;">{user.email}</h1>

    <div style="background:#f8f9fa;padding:16px;border-radius:6px;margin-bottom:16px;">
      <div style="margin-bottom:8px;">
        <strong>ID:</strong> {user.id}
      </div>
      <div style="margin-bottom:8px;">
        <strong>Status:</strong>
        <span style="padding:2px 8px;border-radius:10px;font-size:0.85rem;background:{user.is_active ? '#d4edda' : '#f8d7da'};color:{user.is_active ? '#155724' : '#721c24'};">
          {user.is_active ? 'Active' : 'Inactive'}
        </span>
      </div>
      <div style="margin-bottom:8px;">
        <strong>Role:</strong>
        {#if user.is_superuser}
          <span style="padding:2px 8px;border-radius:10px;font-size:0.85rem;background:#cce5ff;color:#004085;">Admin</span>
        {:else}
          <span style="padding:2px 8px;border-radius:10px;font-size:0.85rem;background:#e2e3e5;color:#383d41;">Standard</span>
        {/if}
      </div>
    </div>

    {#if $currentUser?.is_superuser && $currentUser.id !== user.id}
      <button on:click={handleToggleAdmin}
              style="display:flex;align-items:center;gap:6px;padding:8px 20px;background:{user.is_superuser ? '#dc3545' : '#1a1a2e'};color:white;border:none;border-radius:4px;cursor:pointer;">
        {#if user.is_superuser}<ShieldOff size={16} />{:else}<Shield size={16} />{/if}
        {user.is_superuser ? 'Remove Admin' : 'Make Admin'}
      </button>
    {/if}
  {/if}
</div>
