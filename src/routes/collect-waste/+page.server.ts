import { PUBLIC_PB_URL } from '$env/static/public';
import type { Actions } from './$types';

async function createCustomer(name: FormDataEntryValue | null) {
	const response = await fetch(`http://${PUBLIC_PB_URL}/api/collections/customer/records`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: name
		})
	});

	if (!response.ok) {
		return { error: `Failed to create customer: ${response.statusText}` };
	}

	const customerData = await response.json();
	console.log(customerData);
	return customerData;
}

async function fetchCustomers(name: FormDataEntryValue | null) {
	const customerRes = await fetch(
		`http://${PUBLIC_PB_URL}/api/collections/customer/records?perPage=500`
	);

	if (!customerRes.ok) {
		return { error: 'Failed to fetch customers' };
	}

	const customersData = await customerRes.json();
	const customers = customersData.items || [];
	const customer = customers.find((c: { name: string }) => c.name === name);

	return customer;
}

export const actions = {
	createTransaction: async (event) => {
		const formData = await event.request.formData();
		const name = formData.get('name')?.toLowerCase().trim();
		const type = formData.get('type')?.toLowerCase().trim();
		let amount = formData.get('amount');
		let unit = formData.get('unit');

		if (unit === 'g') {
			amount = amount / 1000;
			unit = 'kg';
		}

		let customer = await fetchCustomers(name);
		if (!customer) {
			customer = await createCustomer(name);
		}

		// Possible update: this fetch should also be a function
		const transactionRes = await fetch(
			`http://${PUBLIC_PB_URL}/api/collections/transaction/records`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					customer: customer.id,
					trash_type: type,
					trash_amount: amount,
					unit: unit,
					created: new Date()
				})
			}
		);

		if (!transactionRes.ok) {
			return { error: 'Failed to create transaction' };
		}

		return { success: true };
	}
} satisfies Actions;
