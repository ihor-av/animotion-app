<script lang="ts">
	import '../styles/app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Фінанси Чернівців у відкритих даних</title>
</svelte:head>

{@render children()}
