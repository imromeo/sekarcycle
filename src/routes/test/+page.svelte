<script>
    let { data } = $props();
	let query = $state('');
	let activeIndex = $state(-1); 

	const dataq = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'];

	const suggestions = $derived(
		query ? dataq.filter((item) => item.toLowerCase().includes(query.toLowerCase())) : []
	);

	const showSuggestions = $derived(suggestions.length > 0 && query.length > 0);

	function handleKeyDown(e) {
		const actions = {
			ArrowDown: () => (activeIndex = Math.min(activeIndex + 1, suggestions.length - 1)),
			ArrowUp: () => (activeIndex = Math.max(activeIndex - 1, -1)),
			Enter: () => activeIndex >= 0 && selectSuggestion(suggestions[activeIndex]),
			Escape: () => (query = '')
		};

		if (actions[e.key]) {
			e.preventDefault();
			actions[e.key]();
		}
	}

	function selectSuggestion(suggestion) {
		query = suggestion;
		activeIndex = -1;
	}

	$effect(() => {
		if (query) activeIndex = -1; // Reset on query change
	});
</script>

<div class="relative w-64">
	<input
		bind:value={query}
		onkeydown={handleKeyDown}
		onfocus={() => (activeIndex = -1)}
		class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		placeholder="Type to search..."
	/>

	{#if showSuggestions}
		<ul
			class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg"
		>
			{#each suggestions as suggestion, i}
				<li
					onmousedown={() => selectSuggestion(suggestion)}
					class="cursor-pointer p-2 hover:bg-gray-100 {i === activeIndex ? 'bg-blue-50' : ''}"
				>
					{suggestion}
				</li>
			{/each}
		</ul>
	{/if}
</div>
