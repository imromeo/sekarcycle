<script lang="ts">
	import type { PageProps } from './$types';
	import { onMount } from 'svelte';

	// Define interfaces for your data structures
	interface Customer {
		id: string;
		name: string;
		// Add other properties as needed
	}

	interface Transaction {
		customer: string;
		trash_type: string;
		trash_amount: number;
		price: string | number;
		// Add other properties as needed
	}

	let { data }: PageProps = $props();
	let name = $state('');
	let type = $state('');
	let amount = $state(1);
	let selectedCustomerId = $state('');
	let selectedTransaction = $state<Transaction | null>(null);
	let searchQuery = $state('');
	let allCustomers = $state<Customer[]>([]);
	let filteredCustomers = $state<Customer[]>([]);
	let showSearchResults = $state(false);
	let formSubmitting = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');

	onMount(() => {
		console.log(data.transaction.items);
		loadTableData(data.transaction.items);
		fetchAllCustomers();
	});

	async function fetchAllCustomers() {
		try {
			const res = await fetch('http://127.0.0.1:8090/api/collections/customer/records?perPage=100');
			const data = await res.json();
			allCustomers = data.items || [];
			filteredCustomers = [...allCustomers];
		} catch (error) {
			console.error('Error fetching customers:', error);
			errorMessage = 'Failed to fetch customers. Please try again.';
		}
	}

	function filterCustomers() {
		if (!searchQuery.trim()) {
			filteredCustomers = [...allCustomers];
			return;
		}

		const query = searchQuery.toLowerCase().trim();
		filteredCustomers = allCustomers.filter((customer) =>
			customer.name.toLowerCase().includes(query)
		);
		showSearchResults = true;
	}

	function selectCustomer(customer: Customer) {
		name = customer.name;
		selectedCustomerId = customer.id;
		searchQuery = customer.name;
		showSearchResults = false;
	}

	function handleSearchFocus() {
		if (searchQuery) {
			filterCustomers();
			showSearchResults = true;
		}
	}

	function handleClickOutside(event: MouseEvent) {
		const searchContainer = document.getElementById('search-container');
		if (searchContainer && !searchContainer.contains(event.target as Node)) {
			showSearchResults = false;
		}
	}

	async function createCustomer(customerName: string): Promise<Customer | null> {
		try {
			const response = await fetch('http://127.0.0.1:8090/api/collections/customer/records', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: customerName
				})
			});

			if (!response.ok) {
				throw new Error(`Failed to create customer: ${response.statusText}`);
			}

			const newCustomer = await response.json();

			// Add the new customer to our local list
			allCustomers = [...allCustomers, newCustomer];

			return newCustomer;
		} catch (error) {
			console.error('Error creating customer:', error);
			return null;
		}
	}

	async function createTransaction(customerId: string, trashType: string, trashAmount: number) {
		try {
			// Calculate price - this is a placeholder, adjust according to your pricing logic
			const price = trashAmount * 10; // Simple example pricing

			const response = await fetch('http://127.0.0.1:8090/api/collections/transaction/records', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					customer: customerId,
					trash_type: trashType,
					trash_amount: trashAmount,
					price: price
				})
			});

			if (!response.ok) {
				throw new Error(`Failed to create transaction: ${response.statusText}`);
			}

			return await response.json();
		} catch (error) {
			console.error('Error creating transaction:', error);
			throw error;
		}
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		formSubmitting = true;
		errorMessage = '';
		successMessage = '';

		try {
			let customerId = selectedCustomerId;
			const customerName = searchQuery.trim();

			if (!customerName) {
				errorMessage = 'Please enter a customer name';
				formSubmitting = false;
				return;
			}

			if (!type) {
				errorMessage = 'Please enter a trash type';
				formSubmitting = false;
				return;
			}

			// Check if we need to create a new customer
			if (!customerId) {
				// Check if a customer with this name already exists
				const existingCustomer = allCustomers.find(
					(customer) => customer.name.toLowerCase() === customerName.toLowerCase()
				);

				if (existingCustomer) {
					// Use the existing customer's ID
					customerId = existingCustomer.id;
				} else {
					// Create a new customer
					const newCustomer = await createCustomer(customerName);
					if (newCustomer) {
						customerId = newCustomer.id;
					} else {
						errorMessage = 'Failed to create new customer. Please try again.';
						formSubmitting = false;
						return;
					}
				}
			}

			// Now create the transaction
			const newTransaction = await createTransaction(customerId, type, amount);

			// Update the UI
			successMessage = 'Transaction created successfully!';

			// Reload the table data or add the new transaction to the table
			const existingData = data.transaction.items || [];
			loadTableData([newTransaction]);

			// Clear the form
			clearForm();
		} catch (error) {
			console.error('Error submitting form:', error);
			errorMessage = 'An error occurred while processing your request. Please try again.';
		} finally {
			formSubmitting = false;
		}
	}

	async function loadTableData(data: Transaction[]) {
		const table = document.getElementById('transaction') as HTMLTableElement;
		if (!table) return;

		const customerIds = [...new Set(data.map((transaction) => transaction.customer))];

		const customerPromises = customerIds.map((id) =>
			fetch(`http://127.0.0.1:8090/api/collections/customer/records/${id}`).then(
				(response: { json: () => any }) => response.json()
			)
		);

		const customers = await Promise.all(customerPromises);

		// Create a lookup map for quick access
		const customerMap = new Map();
		customers.forEach((customer) => {
			customerMap.set(customer.id, customer);
		});

		data.forEach(async (transaction) => {
			try {
				const customer = customerMap.get(transaction.customer);
				if (!customer) return;

				let row = table.insertRow();
				// Add the same classes as the static rows
				row.className = 'border-b-2 border-gray-200 bg-white hover:bg-[#FFF2B3] cursor-pointer';

				// Create the Name cell as a <th>
				let nameCell = document.createElement('th');
				nameCell.scope = 'row'; // Set the scope for accessibility
				nameCell.className = 'px-6 py-4 font-medium whitespace-nowrap text-black';
				nameCell.id = transaction.customer;
				nameCell.innerHTML = customer.name;
				row.appendChild(nameCell);

				// Create the Type cell as a <td>
				let typeCell = row.insertCell(1);
				typeCell.className = 'px-6 py-4';
				typeCell.innerHTML = transaction.trash_type;

				// Create the Amount cell as a <td>
				let amountCell = row.insertCell(2);
				amountCell.className = 'px-6 py-4';
				amountCell.innerHTML = String(transaction.trash_amount);

				// Create the Price cell as a <td>
				let priceCell = row.insertCell(3);
				priceCell.className = 'px-6 py-4';
				priceCell.innerHTML = String(transaction.price);

				// Add click event listener to the row
				row.addEventListener('click', () => {
					// Fill the form with the row data
					name = customer.name;
					type = transaction.trash_type;
					amount = transaction.trash_amount;
					selectedCustomerId = transaction.customer;
					selectedTransaction = transaction;
					searchQuery = customer.name;
				});
			} catch (error) {
				console.error('Error loading customer data:', error);
			}
		});
	}

	function clearForm() {
		name = '';
		type = '';
		amount = 1;
		selectedCustomerId = '';
		selectedTransaction = null;
		searchQuery = '';
		errorMessage = '';
		successMessage = '';
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="bg-white p-8">
	<div class="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-4">
		<form class="mx-auto" onsubmit={handleSubmit}>
			{#if errorMessage}
				<div class="mb-4 rounded border border-red-400 bg-red-100 p-4 text-red-700">
					{errorMessage}
				</div>
			{/if}

			{#if successMessage}
				<div class="mb-4 rounded border border-green-400 bg-green-100 p-4 text-green-700">
					{successMessage}
				</div>
			{/if}

			<!-- Search container with Google-like search bar -->
			<div class="relative mb-5" id="search-container">
				<div class="relative flex items-center">
					<!-- Search icon -->
					<div class="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>

					<!-- Search input -->
					<input
						type="text"
						id="name"
						name="name"
						bind:value={searchQuery}
						oninput={filterCustomers}
						onfocus={handleSearchFocus}
						class="block w-full rounded-lg border-2 border-gray-200 p-2.5 pl-10 text-sm text-black focus:border-black focus:ring-2 focus:ring-black focus:outline-none"
						placeholder="Search or enter new customer name"
						required
					/>

					<!-- Clear button -->
					{#if searchQuery}
						<button
							aria-label="clear"
							type="button"
							class="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
							onclick={() => {
								searchQuery = '';
								name = '';
								selectedCustomerId = '';
								filterCustomers();
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					{/if}
				</div>

				<!-- Search results dropdown -->
				{#if showSearchResults && filteredCustomers.length > 0}
					<div
						class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border-2 border-gray-200 bg-white shadow-lg"
					>
						<ul class="py-1">
							{#each filteredCustomers as customer}
								<li
									class="cursor-pointer px-4 py-2 text-black hover:bg-[#FFF2B3]"
									onclick={() => selectCustomer(customer)}
								>
									{customer.name}
								</li>
							{/each}
						</ul>
					</div>
				{:else if showSearchResults && searchQuery && filteredCustomers.length === 0}
					<div class="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
						<p class="px-4 py-2 text-gray-400">
							No customers found. Enter a name to create a new customer.
						</p>
					</div>
				{/if}
			</div>

			<div class="mb-5">
				<input
					type="text"
					id="type"
					name="type"
					bind:value={type}
					class="block w-full rounded-lg border-2 border-gray-200 bg-gray-50 p-2.5 text-sm text-black focus:border-black focus:ring-2 focus:ring-black focus:outline-none"
					placeholder="Type"
					required
				/>
			</div>

			<div class="mb-5">
				<input
					type="number"
					step="any"
					id="amount"
					name="amount"
					bind:value={amount}
					min="1"
					class="block w-full rounded-lg border-2 border-gray-200 p-2.5 text-sm text-black focus:border-black focus:ring-2 focus:ring-black focus:outline-none"
					required
				/>
			</div>

			<input type="hidden" name="customerId" value={selectedCustomerId} />

			<button
				type="submit"
				disabled={formSubmitting}
				class="w-full rounded-lg bg-[#FFD500] px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-[#FFF2B3] focus:ring-4 focus:ring-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
			>
				{formSubmitting ? 'Submitting...' : 'Submit'}
			</button>

			<button
				type="button"
				class="ml-2 rounded-lg bg-gray-200 px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-gray-300 focus:ring-4 focus:ring-black focus:outline-none sm:w-auto"
				onclick={clearForm}
				disabled={formSubmitting}
			>
				Clear
			</button>
		</form>
	</div>

	<div class="relative overflow-x-auto border-2 border-gray-200 bg-white p-4 sm:rounded-lg">
		<table class="w-full text-left text-sm rtl:text-left">
			<thead class="border-b-2 border-gray-200 text-xs text-black uppercase">
				<tr>
					<th scope="col" class="px-6 py-3">Name</th>
					<th scope="col" class="px-6 py-3">Type</th>
					<th scope="col" class="px-6 py-3">Amount</th>
					<th scope="col" class="px-6 py-3">Price</th>
				</tr>
			</thead>
			<tbody id="transaction"></tbody>
		</table>
	</div>
</div>
