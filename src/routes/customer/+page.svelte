<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import ContainerTitle from '$lib/components/containerTitle.svelte';

	export let data;
</script>

<div class="m-8 grid gap-4">
	<ContainerTitle>Customer</ContainerTitle>

	<div class="grid grid-cols-4 gap-4">
		{#each data.customersList.items as customer}
			<a href="/customer/{customer.id}">
				<Container isButton={true}>
					{customer.name}
				</Container>
			</a>
		{/each}
	</div>
</div>
