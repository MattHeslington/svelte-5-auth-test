<script>
	let { data, children } = $props();
	import Header from '$lib/components/header.svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	let { supabase, session } = $state(data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(async (event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<div class="w-screen h-screen">
	<Header {session} />
	<main class="px-5">
		{@render children()}
	</main>
</div>
