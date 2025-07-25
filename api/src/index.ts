import OnebusawaySDK from 'onebusaway-sdk';

export interface Env {
	ONEBUSAWAY_API_KEY: string;
}

export default {
	async fetch(request, env): Promise<Response> {
		const routes: string[] = ['stops-for-location'];
		const path = new URL(request.url).pathname;
		const oba = new OnebusawaySDK({
			apiKey: env.ONEBUSAWAY_API_KEY,
			baseURL: 'https://api.pugetsound.onebusaway.org/',
		});

		if (request.method === 'POST' && routes.includes(path)) {
			const data = await request.json();
			const module = await import(`./routes/${path}.ts`);
			return await module.handle(data, oba, request);
		}

		return Response.json(
			{
				message: 'Wrong method or wrong path',
			},
			{
				status: 400,
			},
		);
	},
} satisfies ExportedHandler<Env>;
