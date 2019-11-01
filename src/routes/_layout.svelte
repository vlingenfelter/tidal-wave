<script>
	import Nav from '../components/Nav.svelte';
	import { theme } from '../stores';

	export let segment;

	$: bodyStyles = `p-6 bg-${$theme}-background`;
</script>

<Nav {segment}/>

<main class={bodyStyles}>
	<slot></slot>
</main>