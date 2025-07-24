import { stopsForLocation } from '$lib/api.js';
import type { StopsForLocationListResponse } from 'onebusaway-sdk/resources.mjs';
import sign from './sign.svg?raw';

// cache of stops
export const stops = new Map<
	string,
	{
		data: StopsForLocationListResponse.Data.List;
		marker: google.maps.marker.AdvancedMarkerElement;
	}
>();

export const baseRoutePolylines: google.maps.Polyline[] = [];

export const loadStops = async (map: google.maps.Map): Promise<void> => {
	const center = map.getCenter();
	const bounds = map.getBounds();

	if (!center || !bounds) {
		return;
	}

	const stops = await stopsForLocation({
		lat: center.lat(),
		lon: center.lng(),
		latSpan: bounds.getNorthEast().lat() - bounds.getSouthWest().lat(),
		lonSpan: bounds.getNorthEast().lng() - bounds.getSouthWest().lng(),
		radius: 1500,
	});

	for (const stop of stops) {
		createStopMarker(map, stop);
	}
};

export const createStopMarker = (
	map: google.maps.Map,
	stop: StopsForLocationListResponse.Data.List,
): void => {
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
	const marker = new google.maps.marker.AdvancedMarkerElement({
		content: stopDiv,
		position: {
			lat: stop.lat,
			lng: stop.lon,
		},
		map,
	});
	stops.set(stop.id, {
		data: stop,
		marker,
	});
};
