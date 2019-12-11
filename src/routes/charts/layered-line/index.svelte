<script>
	import LayeredLine from '../../../components/LayeredLine.svelte';
	import Link from '../../../components/Link.svelte';
	import { theme, today } from '../../../stores';

	$: backgroundStyles = `bg-${$theme}-background`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl text-center`;
	$: pStyles = `font-mono text-${$theme}-p py-4 text-center`;

	const props = {
    href: '/charts/layered-line/explained',
    text: 'See how this chart was made',
  }

</script>

<svelte:head>
	<title>Layered Line | Tidal Waves</title>
	<meta name='description' content="The layered line chart is a chart depicting tidal high/low predictions, and a part of tidal wave, a visual exploration of NOAA's high/low tidal projections">
</svelte:head>

<h1 class={h1Styles}>The Layered Line Chart</h1>
<LayeredLine />
<p class={pStyles}><Link props={props} /></p>