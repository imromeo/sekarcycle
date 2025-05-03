<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="grid grid-cols-[auto_1fr]">
	<nav id="sidebar" class="h-screen w-64 border-r-2 border-gray-200 bg-[#ffffff] p-8">
		<img class="" src="svg/logo.svg" alt="logo" />
		<ul>
			<li>
				<a href="/dashboard" class="flex items-center my-8">
					<!-- <svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#000000"
					>
						<path
							d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
						/>
					</svg> -->
					Dashboard
				</a>
			</li>
			<li>
				<a href="/collect_waste" class="flex items-center my-8">
					<!-- <svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#000000"
					>
						<path
							d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
						/>
					</svg> -->
					Collect Waste
				</a>
			</li>
		</ul>
	</nav>
	{@render children()}
</div>
