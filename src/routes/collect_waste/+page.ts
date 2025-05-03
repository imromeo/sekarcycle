import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('http://127.0.0.1:8090/api/collections/transaction/records?sort=-created');
	const transaction = await res.json();
	
	return { transaction };
};
