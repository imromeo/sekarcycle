<script lang="ts" context="module">
	export function loadTableTotal(transactions: any[]) {
		const table = document.getElementById('total') as HTMLTableElement;
		if (!table) return;

		// Clear existing rows
		table.innerHTML = '';

		// Group transactions by trash_type
		const grouped = transactions.reduce(
			(acc, transaction) => {
				const type = transaction.trash_type;
				let amountInKg = transaction.trash_amount;
				let unit = transaction.field;
				let originalUnit = transaction.field;

				if (unit === 'g') {
					amountInKg = transaction.trash_amount / 1000;
					unit = 'kg';
				}

				if (!acc[type]) {
					acc[type] = {
						amount: 0,
						unit: unit,
						originalUnit: originalUnit, // Store the original unit
						convertedToKg: unit === 'kg' // Flag if conversion happened
					};
				}

				if (unit === 'kg') {
					acc[type].convertedToKg = true; // Mark that this type has been converted
				}

				acc[type].amount += amountInKg;
				return acc;
			},
			{} as Record<
				string,
				{ amount: number; unit: string; originalUnit: string; convertedToKg: boolean }
			>
		);

		// Insert rows
		for (const [trashType, data] of Object.entries(grouped)) {
			const row = table.insertRow();
			row.className = 'border-b-2 border-gray-200 bg-white hover:bg-[#FFF2B3]';

			// Type cell (th)
			const nameCell = document.createElement('th');
			nameCell.scope = 'row';
			nameCell.className = 'px-6 py-4 font-medium whitespace-nowrap text-black';
			nameCell.textContent = trashType;
			row.appendChild(nameCell);

			// Amount cell
			const amountCell = row.insertCell();
			amountCell.className = 'px-6 py-4';
			amountCell.textContent = data.amount.toFixed(3);

			// Unit cell
			const unitCell = row.insertCell();
			unitCell.className = 'px-6 py-4';
			unitCell.textContent = data.convertedToKg ? 'kg' : data.originalUnit; // Use original if not converted
		}

		// Calculate and display totals
		calculateAndDisplayTotals(transactions);
	}

	function calculateAndDisplayTotals(transactions: any[]) {
		const totals: { [unit: string]: number } = {};

		transactions.forEach((transaction) => {
			let unit = transaction.field;
			let amount = transaction.trash_amount;

			// Convert to kg for accurate totals calculation
			if (unit === 'g') {
				amount = transaction.trash_amount / 1000;
				unit = 'kg';
			}

			if (!totals[unit]) {
				totals[unit] = 0;
			}
			totals[unit] += amount;
		});

		// Display totals - you'll need a container in your HTML for this
		const totalsContainer = document.getElementById('totals-container');
		if (totalsContainer) {
			totalsContainer.innerHTML = ''; // Clear existing totals
			for (const unit in totals) {
				const totalElement = document.createElement('p');
				totalElement.textContent = `Total (${unit}): ${totals[unit].toFixed(2)}`;
				totalsContainer.appendChild(totalElement);
			}
		}
	}
</script>

<table class="w-full text-left text-sm">
	<thead class="border-b-2 border-gray-200 text-xs text-black uppercase">
		<tr>
			<th scope="col" class="px-6 py-3">Type</th>
			<th scope="col" class="px-6 py-3">Amount</th>
			<th scope="col" class="px-6 py-3">Unit</th>
		</tr>
	</thead>
	<tbody id="total"></tbody>
</table>

<!-- Add a container for displaying totals -->
<div id="totals-container" class="ml-2 mt-4 text-sm font-bold"></div>
<!-- COMPONENTIZE ALL THIS BS -->