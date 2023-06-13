<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import Nav from '$lib/Nav.svelte';
	import '../styles/global.scss';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	// Synchronizing the page store
	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<svelte:head>
	{#if browser}
		<script src="https://js.stripe.com/v3/"></script>
	{/if}
</svelte:head>

<Nav />
<slot />
