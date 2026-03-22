<script lang="ts">
  import { currentUser } from '$lib/stores';
  import { getUsers, createUser } from '$lib/api';
  import type { User } from '$lib/types';
  import { UserPlus } from 'lucide-svelte';

  let users: User[] = [];
  let newEmail = '';
  let newPassword = '';
  let newIsAdmin = false;
  let createError = '';
  let createSuccess = '';

  $: if ($currentUser?.is_superuser && users.length === 0) {
    getUsers().then(u => users = u).catch(() => {});
  }

  async function handleCreate() {
    createError = '';
    createSuccess = '';
    if (!newEmail || !newPassword) return;
    try {
      const user = await createUser(newEmail, newPassword, newIsAdmin);
      users = [...users, user];
      newEmail = '';
      newPassword = '';
      newIsAdmin = false;
      createSuccess = `User ${user.email} created.`;
    } catch (e: any) {
      createError = e.message;
    }
  }
</script>

<div style="padding:24px;max-width:700px;">
  <h1 style="margin:0 0 24px;">Users</h1>

  {#if !$currentUser?.is_superuser}
    <p style="color:#888;">Admin access required.</p>
  {:else}
    <!-- User list -->
    <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
      <thead>
        <tr style="border-bottom:2px solid #eee;text-align:left;">
          <th style="padding:8px;">Email</th>
          <th style="padding:8px;">Status</th>
          <th style="padding:8px;">Admin</th>
          <th style="padding:8px;"></th>
        </tr>
      </thead>
      <tbody>
        {#each users as user}
          <tr style="border-bottom:1px solid #f0f0f0;">
            <td style="padding:8px;">{user.email}</td>
            <td style="padding:8px;">
              <span style="padding:2px 8px;border-radius:10px;font-size:0.8rem;background:{user.is_active ? '#d4edda' : '#f8d7da'};color:{user.is_active ? '#155724' : '#721c24'};">
                {user.is_active ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td style="padding:8px;">
              {#if user.is_superuser}
                <span style="padding:2px 8px;border-radius:10px;font-size:0.8rem;background:#cce5ff;color:#004085;">Admin</span>
              {/if}
            </td>
            <td style="padding:8px;">
              <a href="/users/{user.id}" style="color:#1a1a2e;font-size:0.85rem;">View</a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

    <!-- Create user form -->
    <h2 style="margin:0 0 12px;font-size:1.1rem;">Create User</h2>
    {#if createError}<div style="color:#c00;margin-bottom:8px;">{createError}</div>{/if}
    {#if createSuccess}<div style="color:#060;margin-bottom:8px;">{createSuccess}</div>{/if}

    <div style="background:#f8f9fa;padding:16px;border-radius:6px;display:flex;flex-direction:column;gap:10px;">
      <input type="email" bind:value={newEmail} placeholder="Email"
             style="padding:8px;border:1px solid #ddd;border-radius:4px;" />
      <input type="password" bind:value={newPassword} placeholder="Password"
             style="padding:8px;border:1px solid #ddd;border-radius:4px;" />
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
        <input type="checkbox" bind:checked={newIsAdmin} />
        Admin (superuser)
      </label>
      <button on:click={handleCreate}
              style="display:flex;align-items:center;gap:6px;padding:8px 20px;background:#1a1a2e;color:white;border:none;border-radius:4px;cursor:pointer;align-self:flex-start;">
        <UserPlus size={16} /> Create User
      </button>
    </div>
  {/if}
</div>
