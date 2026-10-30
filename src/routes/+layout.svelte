<script lang="ts">
	import '../styles/app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Hello world</title>
	<meta name="description" content="Hello world — an Animotion presentation." />
</svelte:head>

{@render children()}
