<script>
	import { theme } from '../../stores';
	import ChartLink from '../../components/ChartLink.svelte';

	$: h1Styles = `font-mono text-${$theme}-h1 text-center text-2xl lg:text-3xl pb-8`;

	$: line = {
		img: `/line-${$theme}.png`,
		title: 'Line',
		blurb: 'The classic timeseries chart',
		href: 'charts/line'
	}

	$: radial = {
		img: `/radial-${$theme}.png`,
		title: 'Radial Line',
		blurb: 'The line chart but circular',
		href: 'charts/radial'
	}

	$: layered = {
		img: `/layered-${$theme}.png`,
		title: 'Layered',
		blurb: 'Inspired by the line chart',
		href: 'charts/layered-line'
	}

	$: ridgeline = {
		img: `/ridgeline-${$theme}.png`,
		title: 'Ridgeline',
		blurb: 'Inspired by the layered chart',
		href: 'charts/ridgeline'
	}

	$: lunar = {
		img: `/lunar-${$theme}.png`,
		title: 'Vertical Lunar',
		blurb: 'Inspired by the line chart',
		href: 'charts/vertical-lunar'
	}

	$: vertical = {
		img: `/vertical-${$theme}.png`,
		title: 'Vertical',
		blurb: 'Inspired by the lunar chart and the line chart',
		href: 'charts/vertical'
	}

	$: glyph = {
		img: `/glyph-${$theme}.png`,
		title: 'Lunar',
		blurb: 'The lunar predicitons for the month',
		href: 'charts/glyph'
	}

	$: star = {
		img: `/star-${$theme}.png`,
		title: 'Star',
		blurb: 'Inspired by the radial chart',
		href: 'charts/star'
	}

	$: charts = [line, radial, layered, ridgeline, lunar, vertical];
	
</script>

<svelte:head>
	<title>Tidal Charts | Tidal Waves</title>
</svelte:head>

<div class='flex justify-center'>
	<div class='flex flex-col items-left'>

	  <h1 class={h1Styles}>Tidal Charts</h1>

	  {#each charts as chart} 
	  	<ChartLink chart={chart} />
	  {/each}
		
	</div>
</div>