import { PUBLIC_PB_URL } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const now = new Date();
	const firstDay = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
	const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
	const lastDayFormatted = firstDay.slice(0, 8) + String(lastDay).padStart(2, '0');

	const response = await fetch(
		`http://${PUBLIC_PB_URL}/api/collections/transaction/records?filter=${encodeURIComponent(
			`(created>='${firstDay}' && created<='${lastDayFormatted}')`
		)}&expand=customer&sort=-created&perPage=500`
	);

	return { transactions: await response.json() };
};
