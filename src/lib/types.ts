export type inventoryProduct = {
	id: number,
	title: string,
	description: string,
	price: number,
	inventoryCount: number,
}

// type for products in cart
export type cartProduct = {
	id: number,
	title: string,
	description: string,
	images: string[],
	price: number,
	count: number
}

export type stripe_line_item = {
    price_data: {
        currency: 'USD';
        unit_amount: number
        product_data: {
            name: string,
            description: string,
            images: HTMLImageElement[],
        },
    }
    adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: number
    },
    quantity: number;
}