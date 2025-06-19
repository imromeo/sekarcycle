import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const respponse = await fetch(
		'http://127.0.0.1:8090/api/collections/customer/records?sort=name&perPage=500'
	);
	const customersList = await respponse.json();

	// Logging
	// console.log(customers.items);

	return { customersList };
};
