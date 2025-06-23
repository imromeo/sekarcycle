<script lang="ts">
	import Container from '$lib/components/container.svelte';
</script>

<div class="m-8 flex gap-4">
	<div class="flex flex-col gap-4">
		<div class="bg-secondary rounded-2xl p-4 font-semibold text-white">
			<p class="font-bold">Profile</p>
		</div>

		<div class={`flex-1 rounded-2xl border-2 border-gray-200 p-4`}>
			<p>
				Bank Sampah Sekar merupakan lembaga berbasis komunitas yang
				berlokasi di RT 18, Kelurahan Gunung Bahagia, Kota Balikpapan. Didirikan sebagai bentuk
				kepedulian terhadap isu lingkungan, Bank Sampah Sekar bertujuan untuk mendorong pengelolaan
				sampah yang lebih bijak dan berkelanjutan melalui partisipasi aktif warga. Dalam
				operasionalnya, bank sampah ini melayani penyetoran sampah anorganik dari masyarakat yang
				dicatat sebagai tabungan, sehingga memberikan manfaat lingkungan sekaligus nilai ekonomi.
				<br>
				<br>
				Dengan semangat kolaboratif dan edukatif, Bank Sampah Sekar juga aktif dalam
				menyelenggarakan kegiatan sosial dan pelatihan lingkungan, termasuk edukasi pemilahan sampah
				dan pembuatan ecoenzim. Melalui dukungan sistem digital SekarCycle dan media sosial, Bank
				Sampah Sekar terus berinovasi untuk menjadi pusat pembelajaran, pemberdayaan, dan aksi nyata
				dalam pengelolaan sampah berbasis komunitas.
			</p>
		</div>
	</div>
	<Container isButton={false}>
		<iframe
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.30312916378182!2d116.88196863543747!3d-1.2623054031375478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df147007cca5467%3A0xfc30290203df5a08!2sBank%20Sampah%20Sekar!5e0!3m2!1sen!2sid!4v1749534929391!5m2!1sen!2sid"
			title="location"
			width="600"
			height="700"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		></iframe>
	</Container>
</div>
