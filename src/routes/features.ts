import type { StopsForLocationListResponse } from 'onebusaway-sdk/resources.mjs';

// cache of stops
export const stops = new Map<
	string,
	{
		data: StopsForLocationListResponse.Data.List;
		marker: google.maps.marker.AdvancedMarkerElement;
	}
>();

export const baseRoutePolylines: google.maps.Polyline[] = [];
