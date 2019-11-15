<script>
	import { theme } from '../../stores';
	import ChartLink from '../../components/ChartLink.svelte';

	$: h1Styles = `font-mono text-${$theme}-h1 text-center text-2xl pb-8`;

	$: line = {
		img: `/line-${$theme}.png`,
		title: 'Line',
		blurb: 'The classic timeseries chart',
		href: 'charts/line'
	}

	$: layered = {
		img: `/layered-${$theme}.png`,
		title: 'Layered',
		blurb: 'Inspired by the classic timeseries chart',
		href: 'charts/layered-line'
	}

	$: ridgeline = {
		img: `/ridgeline-${$theme}.png`,
		title: 'Ridgeline',
		blurb: 'Inspired by the classic line chart',
		href: 'charts/ridgeline'
	}

	$: vertical = {
		img: `/vertical-${$theme}.png`,
		title: 'Vertical',
		blurb: 'Inspired by the classic line chart',
		href: 'charts/vertical'
	}

	$: radial = {
		img: `/radial-${$theme}.png`,
		title: 'Radial',
		blurb: 'Inspired by the classic line chart',
		href: 'charts/radial'
	}

	$: glyph = {
		img: `/glyph-${$theme}.png`,
		title: 'Glyph',
		blurb: 'Inspired by the radial chart',
		href: 'charts/glyph'
	}

	$: star = {
		img: `/star-${$theme}.png`,
		title: 'Star',
		blurb: 'Inspired by the radial chart',
		href: 'charts/star'
	}

	$: charts = [line, layered, ridgeline, vertical, radial, glyph, star];
	
</script>

<svelte:head>
	<title>Charts | Tidal Waves</title>
</svelte:head>

<div class='flex justify-center'>
	<div class='flex flex-col items-left'>

	  <h1 class={h1Styles}>The charts:</h1>

	  {#each charts as chart} 
	  	<ChartLink chart={chart} />
	  {/each}
		
	</div>
</div>