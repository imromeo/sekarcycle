import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const currentYear = new Date().getFullYear();
	const yearsWithTransactions: number[] = [];

	for (let year = 2000; year <= currentYear; year++) {
		const yearStartDate = `${year}-01-01`;
		const yearEndDate = `${year}-12-31`;

		const yearFilter = `(created>='${yearStartDate}' && created<='${yearEndDate}')`;
		const yearFilterEncoded = encodeURIComponent(yearFilter);
		const url = `http://127.0.0.1:8090/api/collections/transaction/records?filter=${yearFilterEncoded}`;

		try {
			const response = await fetch(url);
			const data = await response.json();

			if (data.totalItems > 0) {
				yearsWithTransactions.push(year);
				// Logging
				// console.log(`Found transactions for year: ${year}`);
			}
		} catch (error) {
			console.error(`Failed to fetch transactions for year ${year}:`, error);
		}
	}

	yearsWithTransactions.sort((a, b) => b - a);

	// Logging
	// console.log('Years with transactions:', yearsWithTransactions);

	return { yearsWithTransactions };
};
