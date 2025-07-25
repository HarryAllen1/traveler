import type {
	StopsForAgencyListResponse,
	StopsForLocationListParams,
} from 'onebusaway-sdk/resources.mjs';

export const stopsForLocation = async (
	query: StopsForLocationListParams,
): Promise<StopsForAgencyListResponse.List[]> => {
	const response = await fetch('https://traveler-api.harryallen.dev/stops-for-location', {
		body: JSON.stringify(query),
		mode: 'no-cors',
		method: 'POST',
	});

	return ((await response.json()) as { data: StopsForAgencyListResponse }).data.list;
};
