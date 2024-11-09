import type { Feature } from '$lib/apitypes';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch('/where');
	if (!response.ok) {
		error(500);
	}

	return {
		fires: (await response.json()) as Feature[]
	};
}) satisfies PageLoad;
