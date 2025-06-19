<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import ContainerTitle from '$lib/components/containerTitle.svelte';
	import Table from '$lib/components/table.svelte';
	import ChartMonth from './components/chartMonth.svelte';

	let { data } = $props();
	let months = ['All'];
	let current = $state('All');

	data.transactions.forEach(({ created }) => {
		const monthName = new Date(created).toLocaleString('default', { month: 'long' });
		if (!months.includes(monthName)) {
			months.push(monthName);
		}
	});

	let filteredTransactions = $derived(
		current === 'All'
			? data.transactions
			: data.transactions.filter((t) => {
					const monthName = new Date(t.created).toLocaleString('default', { month: 'long' });
					return monthName === current;
				})
	);
</script>

<div class="m-8 grid gap-4">
	<div class="flex gap-4">
		<a href="/statistics">
			<div class="bg-primary rounded-2xl p-4">Back</div>
		</a>

		<ContainerTitle>{data.year}</ContainerTitle>

		<select class="bg-primary rounded-2xl p-4" bind:value={current}>
			{#each months as month}
				<option value={month}>{month}</option>
			{/each}
		</select>
	</div>
	{#key current}
		<Container isButton={false}>
			<ChartMonth transaction={filteredTransactions} />
		</Container>

		<Container isButton={false}>
			<table class="w-full text-left text-sm">
				<thead class="border-b-2 border-gray-200 text-xs text-black">
					<tr>
						{#each ['TYPE', 'AMOUNT', 'UNIT', 'DATE'] as title}
							<th class="px-6 py-3">{title}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each filteredTransactions as transaction}
						<Table>
							{#each [transaction.expand.customer.name, transaction.trash_amount, transaction.unit, new Date(transaction.created).toLocaleDateString()] as value}
								<td class="px-6 py-4">{value}</td>
							{/each}
						</Table>
					{/each}
				</tbody>
			</table>
		</Container>
	{/key}
</div>
