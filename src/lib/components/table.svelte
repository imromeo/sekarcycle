<script lang="ts">
	let { children } = $props();
</script>

<tr class="hover:bg-primary border-b-2 border-gray-200 bg-white hover:border-transparent">
	{@render children()}
</tr>
