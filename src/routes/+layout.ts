// Send session to client
// accessible by $page.data
import type { LayoutLoad } from "./$types";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";

export const load: LayoutLoad = async (event) => {
    const { session } = await getSupabase(event)
    const msg = 'hey'
    return { session, msg }
}