<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	let error: Error | undefined = $state();

	let status = $state('loading');

	const interval = setInterval(() => {
		if (
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			globalThis.google?.maps?.Map &&
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			globalThis.google?.maps.ColorScheme &&
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			!!globalThis.google?.maps?.geometry?.encoding?.decodePath
		) {
			status = 'loaded';
			clearInterval(interval);
		}
	});
</script>

{#if status === 'loading'}
	<p>Loading...</p>
{:else if status === 'loaded'}
	{@render children?.()}
{:else if status === 'error'}
	<p style="color: red;">Failed to load Google Maps: {error?.message ?? 'Unknown error'}</p>
{/if}
