<script>
	import DataGetter from '../components/DataGetter.svelte';
	import { theme } from '../stores';

	$: backgroundStyles = `bg-${$theme}-background`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl`;

</script>

<svelte:head>
	<title>Tidal Waves</title>
</svelte:head>

<h1 class={h1Styles}>Index</h1>

<DataGetter />