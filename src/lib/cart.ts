import { writable } from "svelte/store"
import type { cartProduct } from "./types"

// FINALLY. a working store thats value is set by a new promise
export function getInventory() {
	const inventory = writable(new Promise(() => undefined))

	const load = async () => {
		const res = await fetch('https://dummyjson.com/products?limit=6')
		const data = await res.json()
		inventory.set(Promise.resolve(data.products))
	}

	load()

	return inventory;
}


// available app wide
export const cart = writable<cartProduct[]>([])
export const navigationActive = writable<boolean>(false)


