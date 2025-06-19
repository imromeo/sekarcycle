<script lang="ts">
	import Table from '$lib/components/table.svelte';

	const { transactionArray } = $props();
</script>

<table class="w-full text-left text-sm">
	<thead class="border-b-2 border-gray-200 text-xs text-black">
		<tr>
			{#each ['NAME', 'TYPE', 'AMOUNT', 'UNIT', 'DATE'] as title}
				<th class="px-6 py-3">{title}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each transactionArray.items as transaction}
			<Table>
				{#each [transaction.expand.customer.name, transaction.trash_type, transaction.trash_amount, transaction.unit, new Date(transaction.created).toLocaleDateString()] as value}
					<td class="px-6 py-4">{value}</td>
				{/each}
			</Table>
		{/each}
	</tbody>
</table>
