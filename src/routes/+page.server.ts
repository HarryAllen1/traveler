import { oba } from '$lib/oba.js';
import type { PageServerLoad } from './$types.js';

export const ssr = false;

export const load: PageServerLoad = async () => {
	const stops = await oba.stopsForLocation.list({
		lat: 47.606_699,
		lon: -122.332_235,
		radius: 1000,
	});

	return {
		stops,
	};
};
