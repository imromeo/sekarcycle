<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import ContainerTitle from '$lib/components/containerTitle.svelte';
</script>

<div class="m-8 flex gap-4">
	<div class="flex flex-col gap-4">
		<ContainerTitle>Profile</ContainerTitle>

		<Container isButton={false}>
			<p>
				Bank sampah sekar merupakan tempat untuk menyimpan sampah kalian! Lorem ipsum dolor sit
				amet, consectetur adipiscing elit. Maecenas porttitor elementum maximus. Nunc mattis id erat
				aliquet suscipit. Morbi at mauris suscipit, tempus mi at, porta augue. Nam faucibus aliquam
				accumsan. Fusce placerat lacus sit amet malesuada ullamcorper. Fusce non hendrerit arcu.
				Proin molestie, lectus vitae tempus finibus, ligula risus tempus augue, at condimentum lorem
				odio sit amet lectus. Suspendisse vel leo viverra turpis efficitur maximus in et nulla. In
				sit amet turpis lacus. Vivamus leo risus, tincidunt vel mi et, imperdiet pellentesque lorem.
				Fusce fermentum ante in varius accumsan.
			</p>
		</Container>
	</div>
	<Container isButton={false}>
		<iframe
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.30312916378182!2d116.88196863543747!3d-1.2623054031375478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df147007cca5467%3A0xfc30290203df5a08!2sBank%20Sampah%20Sekar!5e0!3m2!1sen!2sid!4v1749534929391!5m2!1sen!2sid"
			title="location"
			width="600"
			height="450"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		></iframe>
	</Container>
</div>
