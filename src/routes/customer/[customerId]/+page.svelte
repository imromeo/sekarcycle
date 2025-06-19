<script lang="ts">
	import type { User } from '$lib/models/UserModel.js';
	import Table from '$lib/components/table.svelte';
	import Container from '$lib/components/container.svelte';
	import ContainerTitle from '$lib/components/containerTitle.svelte';

	export let data;
</script>

<div class="m-8 grid gap-4">
	<ContainerTitle>
		{data.customersList.items.find((item: User) => item.id === data.customerId)?.name}
	</ContainerTitle>

	<Container isButton={false}>
		<table class="w-full text-left text-sm">
			<thead class="border-b-2 border-gray-200 text-xs text-black">
				<tr>
					{#each ['TYPE', 'AMOUNT', 'UNIT', 'PRICE', 'DATE'] as title}
						<th class="px-6 py-3">{title}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data.transactions.items as transaction}
					{#if transaction.customer === data.customerId}
						<Table>
							{#each [transaction.trash_type, transaction.trash_amount, transaction.unit, 'Unknown', new Date(transaction.created).toLocaleDateString()] as value}
								<td class="px-6 py-4">{value}</td>
							{/each}
						</Table>
					{/if}
				{/each}
			</tbody>
		</table>
	</Container>
</div>
