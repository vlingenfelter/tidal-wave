<script>
	import Line from '../../../components/Line.svelte';
	import { theme, today } from '../../../stores';

	$: backgroundStyles = `bg-${$theme}-background`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl text-center`;

</script>

<svelte:head>
	<title>Line | Tidal Waves</title>
</svelte:head>

<h1 class={h1Styles}>The Line Chart</h1>
<Line />