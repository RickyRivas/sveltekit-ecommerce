<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	console.log(data);
	$: ({ user, tableData } = data);
</script>

<h2>Profile Page</h2>
<div>Protected conten for {user.email}</div>
<pre>{JSON.stringify(tableData, null, 2)}</pre>
<pre>{JSON.stringify(user, null, 2)}</pre>

<style>
	h2 {
		margin-top: 3em;
	}
</style>
