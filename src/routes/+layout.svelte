<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="grid grid-cols-[auto_1fr]">
	<nav id="sidebar" class="bg-secondary sticky top-0 h-dvh self-start border-r-2 p-8">
		<div class="flex items-center">
			<div class="flex aspect-square h-14 rounded-2xl bg-white p-2">
				<img class="" src="/svg/logo.svg" alt="logo" />
			</div>
			<div
				class=" text-green-gay ml-2 flex h-14 items-center rounded-2xl bg-white px-4 text-xl font-semibold"
			>
				Sekarcycle
			</div>
		</div>
		<ul>
			<li>
				<a href="/" class="my-8 flex items-center text-white"> Profile </a>
			</li>
			<li>
				<a href="/statistics/" class="my-8 flex items-center text-white">Statistics</a>
			</li>
			<li>
				<a href="/collect-waste" class="my-8 flex items-center text-white">Collect Waste</a>
			</li>
			<li>
				<a href="/customer" class="my-8 flex items-center text-white">Customer </a>
			</li>
		</ul>
	</nav>
	<main>
		{@render children()}
	</main>
</div>
