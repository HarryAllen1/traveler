<script lang="ts">
	import { PUBLIC_MAP_ID } from '$env/static/public';
	import { Geolocation } from '$lib/Geolocation.svelte.js';
	import { geolocationCoordinatesToLatLng } from '$lib/utils.js';
	import { watch } from 'runed';
	import { onDestroy, onMount } from 'svelte';
	import type { PageProps } from './$types.js';
	import sign from './sign.svg?raw';
	import { baseRoutePolylines, stops } from './features.js';
	import { regionConstants } from '$lib/region-constants.js';

	let { data }: PageProps = $props();

	let mapElement: HTMLDivElement;

	let marker: google.maps.marker.AdvancedMarkerElement | undefined;
	const geolocation = new Geolocation();
	let headingGradient: HTMLDivElement;

	watch(
		() => geolocation.position,
		() => {
			if (geolocation.position && marker) {
				marker.position = geolocationCoordinatesToLatLng(geolocation.position);

				if (geolocation.position.heading) {
					headingGradient.classList.add('heading-gradient');
				} else {
					headingGradient.classList.remove('heading-gradient');
				}
			}
		},
	);
	onMount(() => {
		const isDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
		const map = new google.maps.Map(mapElement, {
			disableDefaultUI: true,
			center: {
				lat: 47.606_699,
				lng: -122.332_235,
			},
			mapId: PUBLIC_MAP_ID,
			colorScheme: google.maps.ColorScheme.FOLLOW_SYSTEM,
			zoom: 15,
		});

		for (const stop of data.stops.data.list) {
			const stopDiv = document.createElement('div');
			stopDiv.classList.add(
				'bg-slate-500',
				'dark:bg-slate-200',
				'text-white',
				'dark:text-black',
				'rounded-full',
				'p-1',
				'size-6',
				'border-white',
				'border-2',
				'dark:border-black',
			);
			stopDiv.innerHTML = sign;
			stops.set(stop.id, {
				data: stop,
				marker: new google.maps.marker.AdvancedMarkerElement({
					content: stopDiv,
					position: {
						lat: stop.lat,
						lng: stop.lon,
					},
					map,
				}),
			});
		}

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		for (const route of regionConstants.get('pugetsound')!) {
			for (const path of route.paths) {
				const latLngs = google.maps.geometry.encoding.decodePath(path);

				baseRoutePolylines.push(
					new google.maps.Polyline({
						map,
						strokeColor: route.color,
						path: latLngs,
					}),
				);
			}
		}

		map.addListener('bounds_changed', () => {
			const bounds = map.getBounds();
		});

		navigator.geolocation.getCurrentPosition(
			(position) => {
				map.setCenter(geolocationCoordinatesToLatLng(position.coords));
			},
			undefined,
			{ enableHighAccuracy: true },
		);

		const markerContent = document.createElement('div');
		markerContent.classList.add('relative', 'pointer-events-none');
		const circle = document.createElement('div');
		circle.classList.add(
			'absolute',
			'size-4',
			'rounded-full',
			'bg-blue-500',
			'border-2',
			'border-white',
		);
		headingGradient = document.createElement('div');
		headingGradient.classList.add('heading-gradient');
		markerContent.append(circle, headingGradient);

		marker = new google.maps.marker.AdvancedMarkerElement({
			content: markerContent,
			position: geolocation.position
				? geolocationCoordinatesToLatLng(geolocation.position)
				: undefined,
			map,
		});
	});

	onDestroy(() => {
		geolocation.destroy();
		if (marker) {
			marker.map = undefined;
		}
	});
</script>

<div id="map" class="w-dvw h-dvh" bind:this={mapElement}></div>

<style>
	@reference '../app.css';

	:global(.heading-gradient) {
		@apply absolute h-6 w-12 rounded-[50%] transition-transform duration-300;
		transform-origin: bottom center;
		transform: translate(calc(-50% + 8px), -60%);
		background: conic-gradient(
			from -45deg at bottom,
			#0000,
			var(--color-blue-500) 1deg 90deg,
			#0000 91deg
		);
		mask: linear-gradient(#0000, #000);
	}
</style>
