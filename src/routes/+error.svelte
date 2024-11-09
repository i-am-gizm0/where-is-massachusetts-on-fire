<script lang="ts">
	import { page } from '$app/stores';
	$: error = $page.error!;
</script>

<h1>{error.message}</h1>
<p>
	If you think you shouldn't be seeing this, please contact <a href="mailto:fire@gizm0.dev"
		>fire@gizm0.dev</a
	>
</p>
