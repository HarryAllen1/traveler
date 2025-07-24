export const noop = (): undefined => undefined;
export const geolocationCoordinatesToLatLng = (
	position: GeolocationCoordinates,
): google.maps.LatLngLiteral => ({
	lat: position.latitude,
	lng: position.longitude,
});
