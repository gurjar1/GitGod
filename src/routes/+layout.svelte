<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<meta name="description" content="GitGod - Discover the Gods of Open Source. Curated collections of the best GitHub projects ranked by power, longevity, and community passion." />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Header />
	<main class="flex-1 py-8">
		{@render children()}
	</main>
	<Footer />
</div>
