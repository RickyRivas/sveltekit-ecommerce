<script>
	import Nav from '$lib/Nav.svelte';
	import '../styles/global.scss';
	import { browser } from '$app/environment';
</script>

<svelte:head>
	{#if browser}
		<script src="https://js.stripe.com/v3/"></script>
	{/if}
</svelte:head>

<Nav />
<slot />
