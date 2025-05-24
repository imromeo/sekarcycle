<script lang="ts" context="module">
	export function loadTableData(transactions: any[], customers: any[]) {
		const table = document.getElementById('transaction') as HTMLTableElement;

		transactions.forEach((transaction) => {
			try {
				let row = table.insertRow();
				// Add the same classes as the static rows
				row.className = 'border-b-2 border-gray-200 bg-white hover:bg-[#FFF2B3]';

				// Create the Name cell as a <th>
				let nameCell = document.createElement('th');
				nameCell.scope = 'row'; // Set the scope for accessibility
				nameCell.className = 'px-6 py-4 font-medium whitespace-nowrap text-black';
				nameCell.id = transaction.id;
				
				customers.forEach((customer: any) => {
					if (transaction.customer === customer.id) {
						nameCell.innerHTML = customer.name;
						row.appendChild(nameCell);
					}
				});

				// Create the Type cell as a <td>
				let typeCell = row.insertCell(1);
				typeCell.className = 'px-6 py-4';
				typeCell.innerHTML = transaction.trash_type;

				// Create the Amount cell as a <td>
				let amountCell = row.insertCell(2);
				amountCell.className = 'px-6 py-4';
				amountCell.innerHTML = String(transaction.trash_amount);

				// Create the Price cell as a <td>
				let unitCell = row.insertCell(3);
				unitCell.className = 'px-6 py-4';
				unitCell.innerHTML = String(transaction.field);

				// Create the Price cell as a <td>
				let priceCell = row.insertCell(4);
				priceCell.className = 'px-6 py-4';
				priceCell.innerHTML = String(transaction.price);
			} catch (error) {
				console.error('Error loading customer data:', error);
			}
		});
	}
</script>

<table class="w-full text-left text-sm">
	<thead class="border-b-2 border-gray-200 text-xs text-black uppercase">
		<tr>
			<th scope="col" class="px-6 py-3">Name</th>
			<th scope="col" class="px-6 py-3">Type</th>
			<th scope="col" class="px-6 py-3">Amount</th>
			<th scope="col" class="px-6 py-3">Unit</th>
			<th scope="col" class="px-6 py-3">Price</th>
		</tr>
	</thead>
	<tbody id="transaction"></tbody>
</table>
