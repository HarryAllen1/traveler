import 'onebusaway-sdk/shims/web';

import { PUBLIC_OBA_API_KEY } from '$env/static/public';
import { OnebusawaySDK } from 'onebusaway-sdk';

export const oba = new OnebusawaySDK({
	apiKey: PUBLIC_OBA_API_KEY,
	baseURL: 'https://api.pugetsound.onebusaway.org/',
});
