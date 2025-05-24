<script lang="ts">
	import { onMount } from 'svelte';
	import TransactionTable, { loadTableData } from './components/transactionTable.svelte';
	import TotalTable, { loadTableTotal } from './components/amountTable.svelte';
	import TransactionForm from './components/transactionForm.svelte';

	export let data;

	// Get the customer id from the first transaction
	const customerId = data.transactions.items[0].customer;
	const customer = data.customers.items.find((c: { id: string }) => c.id === customerId);
	let nameInput = customer.name;

	interface Customer {
		collectionId: string;
		collectionName: string;
		id: string;
		trash_type: string;
		trash_amount: number;
		customer: string;
		created: string;
		updated: string;
	}

	interface Transaction {
		collectionId: string;
		collectionName: string;
		id: string;
		name: string;
		created: string;
		updated: string;
	}

	onMount(() => {
		loadTableData(data.transactions.items, data.customers.items);
		loadTableTotal(data.transactions.items);
	});
</script>

<div class="bg-white p-8">
	<form method="POST" action="?/createTransaction">
		<TransactionForm bind:nameInput />
	</form>
	<div class="grid grid-cols-2 items-start gap-4">
		<div class="relative overflow-x-auto rounded-2xl border-2 border-gray-200 bg-white p-4">
			<TransactionTable />
		</div>
		<div class="relative overflow-x-auto rounded-2xl border-2 border-gray-200 bg-white p-4">
			<TotalTable />
		</div>
	</div>
</div>
