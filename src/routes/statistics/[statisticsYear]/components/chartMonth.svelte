<script lang="ts">
	import { TransactionController } from '$lib/controllers/TransactionController';
	import { Chart, type ChartItem } from 'chart.js/auto';
	import { onMount } from 'svelte';

	let canvas: ChartItem;

	const { transaction } = $props();

	const transactionController = new TransactionController();
	let trashData = transactionController.aggregateType(transaction);

	const sortedEntries = Object.entries(trashData).sort((a, b) => a[0].localeCompare(b[0]));
	trashData = Object.fromEntries(sortedEntries);

	const unitColors: Record<string, string> = {
		kg: 'rgba(255, 99, 132, 0.7)',
		liter: 'rgba(54, 162, 235, 0.7)',
		pcs: 'rgba(255, 206, 86, 0.7)'
	};

	const data = {
		labels: Object.keys(trashData),
		datasets: [
			{
				label: 'Amount',
				data: Object.values(trashData).map((item) => item.amount),
				backgroundColor: Object.values(trashData).map(
					(item) => unitColors[item.unit] || 'rgba(153, 102, 255, 0.7)'
				)
			}
		]
	};

	onMount(
		() =>
			new Chart(canvas, {
				type: 'bar',
				data,
				options: {
					plugins: {
						legend: {
							display: true,
							position: 'top',
							labels: {
								generateLabels: () =>
									[...new Set(Object.values(trashData).map((item) => item.unit))].map((unit) => ({
										text: unit,
										fillStyle: unitColors[unit] || 'rgba(153, 102, 255, 0.7)',
										strokeStyle: unitColors[unit] || 'rgba(153, 102, 255, 0.7)'
									}))
							}
						}
					}
				}
			})
	);
</script>

<canvas bind:this={canvas}></canvas>
