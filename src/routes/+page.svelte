<script lang="ts">
	import '../styles/pages/home.scss';
	import ProductEl from '$lib/components/ProductEl.svelte';
	import { cart, getInventory, navigationActive } from '$lib/cart';
	import type { cartProduct } from '$lib/types';

	const inventory: any = getInventory();
	let loading = false;
	let currentId: number;
	const addToCart = async (id: number) => {
		try {
			loading = true;
			currentId = id;
			// fetch item in inventory
			const res = await fetch(`https://dummyjson.com/products/${id}`);
			const data = await res.json();
			const fetchedProduct = data;

			// // check if item is already in cart
			// // if so, increment count and return
			const inCart = $cart.find((p) => p.id === fetchedProduct.id);

			if (inCart) {
				$cart.find((p) => {
					if (p.id === id) {
						// check if item current in cart has a total count below
						// totalInventory count
						if (p.count === fetchedProduct!.stock) {
							return;
						}
						p.count = p.count + 1;
						// reactively update cart item count
						$cart = [...$cart];
					}
				});
				$navigationActive = true;
				return;
			}
			// if not in cart, create cartProduct
			const desiredItem: cartProduct = {
				id: fetchedProduct!.id,
				title: fetchedProduct!.title,
				description: fetchedProduct!.description,
				images: fetchedProduct!.images,
				price: fetchedProduct!.price,
				count: 1
			};

			// // reactively add to cart
			$cart = [...$cart, desiredItem];
			$navigationActive = true;
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	};
</script>

<h1>Add items to your cart.</h1>
<main id="home">
	<!-- ============================================ -->
	<!--                 Landing                      -->
	<!-- ============================================ -->
	<section id="landing">
		<div class="container">
			{#await $inventory}
				fetching products
			{:then data}
				<div class="items">
					{#each data as { id, title, description, price, stock, images }}
						<ProductEl
							{title}
							{description}
							{id}
							{price}
							{loading}
							{images}
							disabled={loading && id === currentId ? true : false}
							inventoryCount={stock}
							on:add-to-cart={() => {
								addToCart(id);
							}}
						/>
					{/each}
				</div>
			{:catch error}
				<p>Error: {error}</p>
			{/await}
		</div>
	</section>
</main>
