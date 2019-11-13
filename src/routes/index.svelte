<script>
	import { theme, today } from '../stores';

	$: backgroundStyles = `bg-${$theme}-background`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl text-center`;

</script>

<svelte:head>
	<title>Tidal Wave</title>
</svelte:head>

<h1 class={h1Styles}>Welcome to Tidal Wave.</h1>
