<script lang="ts">
	import '../styles/app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Chernivtsi Finance Data</title>
</svelte:head>

{@render children()}
