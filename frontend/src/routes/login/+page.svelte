<script lang="ts">
  import { goto } from '$app/navigation';
  import { currentUser } from '$lib/stores';
  import { login } from '$lib/api';

  let email = '';
  let password = '';
  let error = '';
  let loading = false;

  async function handleLogin() {
    error = '';
    loading = true;
    try {
      await login(email, password);
      // Refresh user store
      const { getMe, getChats } = await import('$lib/api');
      const { chats } = await import('$lib/stores');
      const user = await getMe();
      currentUser.set(user);
      const chatList = await getChats();
      chats.set(chatList);
      goto('/chat');
    } catch (e: any) {
      error = e.message ?? 'Login failed';
    } finally {
      loading = false;
    }
  }
</script>

<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#1a1a2e;">
  <div style="background:white;padding:40px;border-radius:8px;width:320px;box-shadow:0 4px 20px rgba(0,0,0,0.3);">
    <h2 style="margin:0 0 24px;text-align:center;color:#1a1a2e;">Partially Aware</h2>

    {#if error}
      <div style="background:#fee;border:1px solid #fcc;color:#c00;padding:8px 12px;border-radius:4px;margin-bottom:16px;font-size:0.9rem;">
        {error}
      </div>
    {/if}

    <form on:submit|preventDefault={handleLogin}>
      <label style="display:block;margin-bottom:4px;font-size:0.85rem;font-weight:600;">Email</label>
      <input type="email" bind:value={email} required
             style="width:100%;padding:8px;border:1px solid #ddd;border-radius:4px;margin-bottom:16px;box-sizing:border-box;" />

      <label style="display:block;margin-bottom:4px;font-size:0.85rem;font-weight:600;">Password</label>
      <input type="password" bind:value={password} required
             style="width:100%;padding:8px;border:1px solid #ddd;border-radius:4px;margin-bottom:24px;box-sizing:border-box;" />

      <button type="submit" disabled={loading}
              style="width:100%;padding:10px;background:#1a1a2e;color:white;border:none;border-radius:4px;cursor:pointer;font-size:1rem;">
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  </div>
</div>
