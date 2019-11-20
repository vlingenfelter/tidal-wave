<script>
	import { theme } from '../stores';

	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl lg:text-3xl text-center`;
	$: h2Styles = `font-mono text-${$theme}-h2 text-xl lg:text-2xl pb-2`;
	$: pStyles = `font-mono text-${$theme}-p pb-4 leading-relaxed`;
	$: img1 = `/index-1-${$theme}.png` 
</script>

<svelte:head>
	<title>Tidal Wave</title>
</svelte:head>

<div class='flex justify-center'>
  <div class='max-w-3xl p-1 lg:p-6'>
		<div class='py-2 lg:py-4'>
			<h1 class={h1Styles}>Welcome to Tidal Wave</h1>
		</div>

		<img alt='Line' src={img1}>

		<div class='py-2 lg:py-4'>
			<h2 class={h2Styles}> What?</h2>
			<p class={pStyles}>This is a visual exploration of tidal projections: part art, part data visualization</p>
		</div>

		<div class='py-2 lg:py-4'>
			<p class={pStyles}>This is a visual exploration of tidal projections: part art, part data visualization</p>
		</div>
	</div>
</div>
