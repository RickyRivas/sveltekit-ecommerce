import { SECRET_STRIPE_KEY} from "$env/static/private"
import type { RequestHandler } from "./$types"
import type { stripe_line_item } from "$lib/types";
import Stripe from 'stripe'

const stripe = new Stripe(SECRET_STRIPE_KEY, {
  apiVersion: '2022-11-15',
});

export const POST: RequestHandler = async ({ request, fetch }) => {
    // fetch inventory and do security checking
    const getInventory = async () => {
  		const res = await fetch('https://dummyjson.com/products?limit=6')
		const data = await res.json()
        return data
    }
    const inventory = await getInventory()

    // extract id + qty from request
    const data = await request.json();
    let keys: any[] = []
    for (const d of data) {
        keys = [...keys, {
           id: d.id,
           quantity: d.count
        }]
    }

    // create line items and create new stripe checkout session
    let line_items: stripe_line_item[] = []

    for (const key of keys) {
        const product = inventory.products.find((i: any) => i.id === key.id)
        line_items = [...line_items, {
            price_data: {
                currency: 'USD',
                unit_amount: product.price * 100,
                product_data: {
                    name: product.title,
                    description: product.description,
                    images: product.images
                }
            },
             adjustable_quantity: {
                enabled: true,
                minimum: 1,
                maximum: product.stock
            },
            quantity: key.quantity
        }]
    }

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        success_url: 'http://127.0.0.1:5173/',
        cancel_url: 'http://127.0.0.1:5173/',
        line_items: [...line_items],
        metadata: {
                items: JSON.stringify([
                    {
                        sku: '',
                        name: '',
                    },
                ]),
            },

    })
    if (session) {
        return new Response(JSON.stringify({checkoutUrl: session.url }), { status: 200 })
      
    } else {
        return new Response(JSON.stringify({message: 'Error'}), {status: 401})
  }
    
    
    
    // return new Response(JSON.stringify({message: 'yeah'}), {status: 200})
}
