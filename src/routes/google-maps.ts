import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
	apiKey: PUBLIC_GOOGLE_MAPS_API_KEY,
	version: 'weekly',
	libraries: ['marker', 'geometry', 'maps', 'core'],
});

export const loadLibraries = async (): Promise<void> => {
	await loader.importLibrary('core');
	await loader.importLibrary('marker');
	await loader.importLibrary('geometry');
	await loader.importLibrary('maps');
};
