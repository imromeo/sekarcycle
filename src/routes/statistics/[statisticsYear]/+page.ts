import type { PageLoad } from './$types';
import type { Transaction } from '$lib/models/TransactionModel';
import { PUBLIC_PB_URL } from '$env/static/public';

export const load: PageLoad = async ({ fetch, params }) => {
	const currentYear = params.statisticsYear;
	const transactionsByMonth: Transaction[] = [];

	for (let month = 1; month <= 12; month++) {
		const monthStartDate = `${currentYear}-${String(month).padStart(2, '0')}-01`;
		const monthEndDate = new Date(Number(currentYear), month, 0).getDate();
		const formattedMonthEndDate = `${currentYear}-${String(month).padStart(2, '0')}-${String(monthEndDate).padStart(2, '0')}`;

		try {
			const response = await fetch(
				`http://${PUBLIC_PB_URL}/api/collections/transaction/records?filter=${encodeURIComponent(
					`(created>='${monthStartDate}' && created<='${formattedMonthEndDate}')`
				)}&sort=created&expand=customer&perPage=500`
			);
			const { items } = await response.json();

			items.forEach((transaction: Transaction) => {
				transactionsByMonth.push(transaction);
			});
		} catch (error) {
			console.error(`Failed to fetch transactions for month ${month}`, error);
		}
	}

	return {
		transactions: transactionsByMonth,
		year: currentYear
	};
};
