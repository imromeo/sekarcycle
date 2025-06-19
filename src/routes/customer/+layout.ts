import { PUBLIC_PB_URL } from '$env/static/public';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const respponse = await fetch(
		`http://${PUBLIC_PB_URL}/api/collections/customer/records?sort=name&perPage=500`
	);
	const customersList = await respponse.json();

	// Logging
	// console.log(customers.items);

	return { customersList };
};
