<script lang="ts">
	import { type Snippet } from 'svelte';
	import '../app.css';
	import ApiProvider from '$lib/APIProvider.svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>Traveler</title>
</svelte:head>

<ApiProvider>
	{@render children?.()}
</ApiProvider>
