import { PUBLIC_PB_URL } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch(
		`http://${PUBLIC_PB_URL}/api/collections/transaction/records?expand=customer&sort=-created`
	);

	const data = await response.json();

	return { transactions: data };
};
