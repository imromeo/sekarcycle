<script>
	import Button from '$lib/components/button.svelte';

	let { nameInput } = $props();
	let typeInput = $state('');
	let amountInput = $state(1);
    let categoryInput = $state('kg');
</script>

<div class="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-4">
	<!-- Customer input -->
	<div class="relative mb-5" id="search-container">
		<div class="relative flex items-center">
			<div class="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-200">
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

			<input
				type="text"
				name="name"
				bind:value={nameInput}
				class=" block w-full rounded-lg border-2 border-gray-200 p-2.5 pl-10 text-sm text-black placeholder:text-gray-200 focus:border-[#FFF2B3] focus:outline-none"
				placeholder="Search or enter new customer name"
				required
			/>
		</div>
	</div>

	<!-- Trash type input -->
	<div class="mb-5">
		<input
			type="text"
			name="type"
			bind:value={typeInput}
			class="block w-full rounded-lg border-2 border-gray-200 bg-white p-2.5 text-sm text-black placeholder:text-gray-200 focus:border-[#FFF2B3] focus:outline-none"
			placeholder="Type"
			required
		/>
	</div>

	<!-- Unit -->
	<div class="mb-5">
		<select
			name="unit"
			bind:value={categoryInput}
			class="block w-full rounded-lg border-2 border-gray-200 bg-white p-2.5 text-sm text-black focus:border-[#FFF2B3] focus:outline-none"
			required
		>
			<option value="kg">kg</option>
			<option value="g">g</option>
			<option value="liter">liter</option>
			<option value="buah/lembar">buah/lembar</option>
		</select>
	</div>

	<!-- Trash amount  -->
	<div class="mb-5">
		<input
			type="number"
			step=".01"
			name="amount"
			bind:value={amountInput}
			min="0.01"
			class="block w-full rounded-lg border-2 border-gray-200 p-2.5 text-sm text-black focus:border-[#FFF2B3] focus:outline-none"
			required
		/>
	</div>

	<Button type="submit">Submit</Button>
</div>
