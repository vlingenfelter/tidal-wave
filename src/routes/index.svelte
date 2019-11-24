<script>
	import { theme } from '../stores';
	import Fig from '../components/Fig.svelte';

	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl lg:text-3xl text-center`;
	$: h2Styles = `font-mono text-${$theme}-h1 text-xl lg:text-2xl pb-2`;
	$: pStyles = `font-mono text-${$theme}-p pb-4 leading-relaxed`;
	$: img1 = `/index-1-${$theme}.png`; 

	const divStyles = 'py-2 lg:py-4';
	const text = 'A screenshot of the layered line chart from 11-22-19. '
	
</script>

<svelte:head>
	<title>Tidal Wave</title>
</svelte:head>

<div class='flex justify-center'>
  <div class='max-w-4xl p-1 lg:p-6'>
		<div class={divStyles}>
			<h1 class={h1Styles}>Welcome to Tidal Wave</h1>
		</div>

		<img alt='Line' src={img1}>
		<Fig {text} link='charts/layered-line' linkText={'See the live chart here.'}/>

		<div class={divStyles}>
			<h2 class={h2Styles}> What?</h2>
			<p class={pStyles}>This is a visual exploration of tidal projections: part art, part data visualization. </p>
		</div>

		<div class={divStyles}>
			<p class={pStyles}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</div>
	</div>
</div>
