import { PUBLIC_PB_URL } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const currentCustomer = params.customerId;
	const response = await fetch(
		`http://${PUBLIC_PB_URL}/api/collections/transaction/records?filter=${encodeURIComponent(
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
