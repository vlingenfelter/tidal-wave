<script>
	import VerticalLunar from '../../../components/VerticalLunar.svelte';
	import { theme, today } from '../../../stores';
	import Link from '../../../components/Link.svelte';

	$: backgroundStyles = `bg-${$theme}-background`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl text-center`;
	$: pStyles = `font-mono text-${$theme}-p py-4 text-center`;

	const props = {
    href: '/charts/vertical-lunar/explained',
    text: 'See how this chart was made',
  }

</script>

<svelte:head>
	<title>Vertical Lunar | Tidal Waves</title>
	<meta name='description' content="The vertical lunar chart is a chart depicting tidal high/low predictions and lunar phase, and a part of tidal wave, a visual exploration of NOAA's high/low tidal projections">
</svelte:head>

<h1 class={h1Styles}>Vertical Lunar Chart</h1>
<VerticalLunar />
<p class={pStyles}><Link props={props} /></p>