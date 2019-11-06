<script>
	import Vertical from '../../components/Vertical.svelte';
	import { theme, today } from '../../stores';

	$: backgroundStyles = `bg-${$theme}-background`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl text-center`;

</script>

<svelte:head>
	<title>Tidal Waves</title>
</svelte:head>

<h1 class={h1Styles}>Moss Landing Tidal Projections</h1>
<Vertical />