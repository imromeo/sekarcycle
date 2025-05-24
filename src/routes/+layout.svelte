<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="grid grid-cols-[auto_1fr]">
	<nav id="sidebar" class="h-screen w-64 border-r-2 border-gray-200 bg-[#ffffff] p-8">
		<img class="" src="svg/logo.svg" alt="logo" />
		<ul>
			<li>
				<a href="/" class="flex items-center my-8">
					Profile
				</a>
			</li>
			<li>
				<a href="/statistics" class="flex items-center my-8">
					Statistics
				</a>
			</li>
			<li>
				<a href="/collect-waste" class="flex items-center my-8">
					Collect Waste
				</a>
			</li>
		</ul>
	</nav>
	{@render children()}
</div>
