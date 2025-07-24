export const noop = (): undefined => undefined;
export const geolocationCoordinatesToLatLng = (
	position: GeolocationCoordinates,
): google.maps.LatLngLiteral => ({
	lat: position.latitude,
	lng: position.longitude,
});

export const debounce = <T>(
	callback: (...args: T[]) => unknown,
	wait: number,
): ((...args: T[]) => void) => {
	let timeout: NodeJS.Timeout;

	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => callback.apply(this, args), wait);
	};
};
