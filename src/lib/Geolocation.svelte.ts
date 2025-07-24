import { SvelteDate } from 'svelte/reactivity';
import { fancyConfirm } from './confirm.js';

/**
 * Watches the geolocation of the current device.
 */
export class Geolocation {
	#subscribe: number | undefined;
	/**
	 * The current position of the device.
	 * @type {google.maps.LatLngLiteral}
	 */
	public position: GeolocationCoordinates | undefined = $state();
	/**
	 * The time which the device's position was last updated.
	 * @type {SvelteDate}
	 */
	public timestamp: SvelteDate = new SvelteDate();

	constructor() {
		this.#subscribe = navigator.geolocation.watchPosition(
			({ coords, timestamp }) => {
				this.position = coords;
				this.timestamp = new SvelteDate(timestamp);
			},
			(error) => {
				if (error.code === error.PERMISSION_DENIED) {
					fancyConfirm(
						'Geolocation permission denied',
						'Please enable geolocation in your browser settings.',
						[['OK', true]],
					);
				}
			},
			{
				enableHighAccuracy: true,
			},
		);
	}

	public destroy(): void {
		if (this.#subscribe) {
			navigator.geolocation.clearWatch(this.#subscribe);
			this.#subscribe = undefined;
		}
	}
}
