<script>
	import LayeredLine from '../../../components/LayeredLine.svelte';
	import { theme, today } from '../../../stores';

	$: backgroundStyles = `bg-${$theme}-background`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl text-center`;

</script>

<svelte:head>
	<title>Layered Line | Tidal Waves</title>
</svelte:head>

<h1 class={h1Styles}>The Layered Line Chart</h1>
<LayeredLine />