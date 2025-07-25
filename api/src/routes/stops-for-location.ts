import OnebusawaySDK from 'onebusaway-sdk';
import { StopsForLocationListParams } from 'onebusaway-sdk/resources.mjs';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
	'Access-Control-Max-Age': '86400',
};

export const handle = async (
	data: StopsForLocationListParams,
	oba: OnebusawaySDK,
	request: Request,
) => {
	const respHeaders = {
		...corsHeaders,
		// Allow all future content Request headers to go back to browser
		// such as Authorization (Bearer) or X-Client-Name-Version
		'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers'),
	};
	return Response.json(await oba.stopsForLocation.list(data), {
		headers: respHeaders,
	});
};
