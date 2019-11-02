<script>
	import DataGetter from '../components/DataGetter.svelte';
	import { theme } from '../stores';

	$: backgroundStyles = `bg-${$theme}-background`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl text-center`;

</script>

<svelte:head>
	<title>Tidal Waves</title>
</svelte:head>

<h1 class={h1Styles}>Elkorn Slough Tidal Projections</h1>

<DataGetter />