import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const currentCustomer = params.customerId;
	const response = await fetch(
		`http://127.0.0.1:8090/api/collections/transaction/records?filter=${encodeURIComponent(
			`(customer='${currentCustomer}')`
		)}&expand=customer&sort=-created&perPage=500`
	);
	const customerTranactions = await response.json();

	// Logging
	// console.log(customerTranactions);

	return {
		transactions: customerTranactions,
		customerId: currentCustomer
	};
};
