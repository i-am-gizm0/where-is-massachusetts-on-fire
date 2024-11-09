import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getGISData } from '$lib/server/api';

export const GET = (async () => {
	try {
		return new Response(JSON.stringify(await getGISData()), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (e) {
		console.error(e);
		error(500, typeof e === 'string' ? e : undefined);
	}
}) satisfies RequestHandler;
