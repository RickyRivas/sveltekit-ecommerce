<script lang="ts">
	import '../styles/layout/Navigation.scss';
	import { cart, navigationActive } from './cart';
	let cartTotal: number = 0;
	let loading = false;

	const removefromCart = (id: number) => {
		$cart = $cart.filter((p) => p.id !== id);
		if (!$cart.length) {
			$navigationActive = false;
		}
	};

	const increment = async (id: number) => {
		try {
			const res = await fetch(`https://dummyjson.com/products/${id}`);
			const data = await res.json();
			const inventoryTotal = data.stock;
			// find item and prevent user from incrementing count value
			// above total inventory count
			$cart.find((p) => {
				if (p.id === id && p.count < inventoryTotal) {
					p.count = p.count + 1;
					$cart = $cart;
					return;
				}
			});
		} catch (error) {
			console.error(error);
		}
	};

	const decrement = (id: number) => {
		$cart.find((p) => {
			if (p.id === id) {
				if (p.count > 1) {
					p.count = p.count - 1;
					$cart = $cart;
				} else {
					// remove entirely if current count is 1
					removefromCart(id);
				}
			}
		});
	};

	$: {
		cartTotal = 0;
		for (const item of $cart) {
			const total = item.count * item.price;
			cartTotal = cartTotal + total;
		}
	}

	const toggle = () => {
		$navigationActive = !$navigationActive;
		document.body.classList.toggle('is-active');
	};

	const checkout = async () => {
		try {
			loading = true;
			const res = await fetch('/api/products', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify($cart)
			});
			const data = await res.json();

			window.location = data.checkoutUrl;
		} catch (error) {
			console.log(error);
		} finally {
			loading = false;
		}
	};
	// s
</script>

<header>
	<nav>
		<button class="cart-total" on:click={toggle}>
			<img
				class=""
				src="/cart.svg"
				alt="cart"
				width="25"
				height="25"
				loading="lazy"
				decoding="async"
			/>
			<span>
				{$cart.length}
			</span>
		</button>
		<div class="slide {$navigationActive ? 'is-active' : ''}">
			<!--  -->
			<div class="header">
				<div class="flex">
					<button
						class="hamburger hamburger--squeeze {$navigationActive ? 'is-active' : ''}"
						aria-label="toggle"
						on:click={toggle}
					>
						<span class="hamburger-box">
							<span class="hamburger-inner" />
						</span>
					</button>
					<p>Your Bag</p>
				</div>
				<p class="count">{$cart.length} Items</p>
			</div>
			<!-- -->
			<div class="cart-items">
				{#if !$cart.length}
					<p>Please add something to your cart</p>
				{:else}
					{#each $cart as item}
						<div class="cart-item">
							<div class="img-container">
								<img
									class=""
									src={item.images[0]}
									alt=""
									width="25"
									height="25"
									loading="lazy"
									decoding="async"
								/>
							</div>
							<div class="body">
								<div class="flex">
									<div>
										<span class="quantity">{item.count}X</span>
										<h5 class="title">{item.title}</h5>
									</div>
									<div class="price {item.count > 1 ? 'active' : ''}">
										<p class="price" data-price={item.price}>
											${item.price * item.count}
										</p>
										<span>${item.price} each</span>
									</div>
								</div>
								<div class="btns">
									<button
										class="btn"
										on:click={() => {
											decrement(item.id);
										}}>-</button
									>
									<button
										class="btn"
										on:click={() => {
											removefromCart(item.id);
										}}>Remove item</button
									>
									<button
										class="btn"
										on:click={() => {
											increment(item.id);
										}}>+</button
									>
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>
			<div class="footer">
				<div class="est-total">
					<p>Estimated Total</p>
					<span>${cartTotal}</span>
				</div>
				<button id="checkout" disabled={$cart.length === 0} on:click={checkout}>
					{#if loading}
						Please wait...
					{:else}
						Checkout
					{/if}
				</button>
			</div>
		</div>
	</nav>
</header>
