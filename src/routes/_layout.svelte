<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
	import { theme } from '../stores';

	export let segment;

	$: bodyStyles = `bg-${$theme}-background min-h-screen`;
</script>

<div class={bodyStyles}>
<Nav {segment}/>

<main class='p-12'>
	<slot></slot>
</main>

<Footer />
</div>