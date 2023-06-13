// Protecting API routes by checking if user has a valid session cookie

import type { RequestHandler } from "./$types";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { json, redirect } from '@sveltejs/kit'

export const GET: RequestHandler = async (event) => {
    const { session, supabaseClient } = await getSupabase(event)
    
    if (!session) {
        throw redirect(303, '/')
    }

    const { data } = await supabaseClient.from('test').select('*')
    
    return json({ data })
}