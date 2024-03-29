// Server-side data fetching with RLS
import type { PageLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { redirect } from '@sveltejs/kit'

export const load: PageLoad = async (event) => {
    const { session, supabaseClient } = await getSupabase(event)
    
    // checking
    if (!session) {
        throw redirect(303, '/');
    }

    const { data: tableData } = await supabaseClient.from('test').select('*')
    
    return {
        user: session.user,
        tableData
    }
}