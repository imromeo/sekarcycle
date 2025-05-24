import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const [transactionRes, customerRes] = await Promise.all([
		fetch('http://127.0.0.1:8090/api/collections/transaction/records?sort=-created'),
		fetch('http://127.0.0.1:8090/api/collections/customer/records?perPage=100')
	]);
	const transactions = await transactionRes.json();
	const customers = await customerRes.json();

	// // If need logging
	// console.log(transactions.items);
	// console.log(customers.items[0].name);

	return { transactions, customers };
};
