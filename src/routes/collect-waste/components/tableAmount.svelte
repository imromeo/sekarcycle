<script lang="ts">
	import Table from '$lib/components/table.svelte';
	import { TransactionController } from '$lib/controllers/TransactionController';

	const { transactionArray } = $props();

	const transactionController = new TransactionController();

	const trashData = transactionController.aggregateType(transactionArray.items);
	const trashAmount = transactionController.aggregateUnit(transactionArray.items);
</script>

<table class="w-full text-left text-sm">
	<thead class="border-b-2 border-gray-200 text-xs text-black">
		<tr>
			{#each ['TYPE', 'AMOUNT', 'UNIT', 'PRICE'] as title}
				<th class="px-6 py-3">{title}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each Object.entries(trashData).sort( ([, a], [, b]) => a.unit.localeCompare(b.unit) ) as [trashType, { amount, unit }]}
			<Table>
				{#each [trashType, amount, unit, 'Unknown'] as value}
					<td class="px-6 py-4">{value}</td>
				{/each}
			</Table>
		{/each}
	</tbody>
</table>

<div class="mt-4 ml-2 text-sm font-bold">
	{#each Object.entries(trashAmount).sort( ([unitA], [unitB]) => unitA.localeCompare(unitB) ) as [unit, amount]}
		<p>{unit}: {amount}</p>
	{/each}
</div>
