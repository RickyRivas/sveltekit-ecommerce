<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let title: string,
		description: string,
		price: number,
		inventoryCount: number,
		id: number,
		loading: boolean,
		disabled: boolean,
		images: string[];
</script>

<div class="item">
	<div class="img-container">
		<img src={images[0]} alt="product img" />
	</div>
	<div class="body">
		<h3>{title}</h3>
		<p>{description}</p>
		<p>Price: ${price}</p>
		<p>Total in stock: {inventoryCount}</p>
		<button
			class="btn"
			{disabled}
			on:click={(id) => {
				dispatch('add-to-cart', id);
			}}
		>
			{#if loading && disabled}
				adding to cart...
			{:else}
				Add to cart
			{/if}
		</button>
	</div>
</div>
