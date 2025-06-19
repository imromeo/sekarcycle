<script lang="ts">
	let { children, isButton } = $props();
</script>

<div
	class={`rounded-2xl border-2 border-gray-200 p-4 ${isButton ? 'hover:bg-primary hover:border-transparent' : ''}`}
>
	{@render children()}
</div>
