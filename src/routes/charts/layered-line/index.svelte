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
</svelte:head>

<h1 class={h1Styles}>The Layered Line Chart</h1>
<LayeredLine />
<p class={pStyles}><Link props={props} /></p>