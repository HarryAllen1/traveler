import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replaceAll('%PUBLIC_GOOGLE_MAPS_API_KEY%', PUBLIC_GOOGLE_MAPS_API_KEY),
	});
