import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import { oba } from '$lib/oba.js';
import type { StopsForLocationListParams } from 'onebusaway-sdk/resources.mjs';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	return json(await oba.stopsForLocation.list(data as StopsForLocationListParams));
};
