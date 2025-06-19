<script lang="ts">
	import FormTransaction from './components/formTransaction.svelte';
	import TableTransaction from './components/tableTransaction.svelte';
	import TableAmount from './components/tableAmount.svelte';
	import ContainerTitle from '$lib/components/containerTitle.svelte';
	import Container from '$lib/components/container.svelte';

	export let data;
	let nameInput = data.transactions?.items?.[0]?.expand?.customer?.name || '';
</script>

<div class="m-8 flex flex-col gap-4">
	<ContainerTitle>Collect Waste</ContainerTitle>

	<form method="POST" action="?/createTransaction">
		<FormTransaction bind:nameInput />
	</form>

	<div class="grid grid-cols-2 items-start gap-4">
		<Container isButton={false}>
			{#if !data.transactions?.items?.length}
				<div class="py-8 text-center text-black">No transactions recorded this month</div>
			{:else}
				<TableTransaction transactionArray={data.transactions} />
			{/if}
		</Container>

		<Container isButton={false}>
			{#if !data.transactions?.items?.length}
				<div class="py-8 text-center text-black">No transactions recorded this month</div>
			{:else}
				<TableAmount transactionArray={data.transactions} />
			{/if}
		</Container>
	</div>
</div>
