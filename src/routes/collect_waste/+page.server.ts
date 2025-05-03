import type { Actions } from './$types';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const request = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				trash_type: formData.get('type'),
				trash_amount: formData.get('amount')
			})
		};
		fetch('http://127.0.0.1:8090/api/collections/transaction/records', request)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	}
} satisfies Actions;
