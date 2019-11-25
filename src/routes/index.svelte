<script>
	import { theme } from '../stores';
	import Fig from '../components/Fig.svelte';
	import Link from '../components/Link.svelte';

	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl xl:text-4xl lg:text-3xl text-center`;
	$: h2Styles = `font-mono text-${$theme}-h1 text-xl lg:text-2xl pb-2`;
	$: pStyles = `font-mono text-${$theme}-p pb-4 leading-relaxed lg:text-lg xl:text-lg`;
	$: img1 = `/index-1-${$theme}.png`; 

	const divStyles = 'py-2 lg:py-4';

	const fig1 = {
		text: 'A screenshot of the layered line chart from 11-22-19.',
		link: 'charts/layered-line',
		linkText: 'See the live chart here.'
	}
	
	const chartLink = {
		href: 'charts/',
		text: 'See the charts here'
	}
	
</script>

<svelte:head>
	<title>Tidal Wave</title>
</svelte:head>

<div class='flex justify-center'>
  <div class='max-w-4xl p-1 lg:p-6'>
		<div class={divStyles}>
			<h1 class={h1Styles}>Welcome to Tidal Wave</h1>
		</div>
		<div class={divStyles}>
			<p class={pStyles}>Tidal wave is a visual exploration of tidal projections. By focusing on more artistic visualizations, we can begin to see some of the hidden daily and monthly patterns that exist in the data. </p>
		</div>

		<img alt='Line' src={img1}>
		<Fig text={fig1.text} link={fig1.link} linkText={fig1.linkText}/>

		<div class={divStyles}>
			<span class='text-center'>
			<h2 class={h2Styles}><Link props={chartLink} /></h2>
			</span>
		</div>
	</div>
</div>
