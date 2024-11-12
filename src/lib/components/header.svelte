<script>
	let { session } = $props();
	import { enhance } from '$app/forms';
</script>

<header>
	<a href="/">logo</a>
	{#if session}
		<form method="POST" action="auth?/signout" use:enhance>
			<button>Logout</button>
		</form>
	{:else}
		<form method="POST" action="auth?/oauth" use:enhance>
			<button name="provider" value="github">Login with GitHub</button>
		</form>
	{/if}
</header>
