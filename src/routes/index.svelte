<script>
	import { theme, today } from '../stores';
	import ChartLink from '../components/ChartLink.svelte';

	$: line = {
		img: `/line-${$theme}.png`,
		title: 'Line',
		blurb: 'The classic timeseries chart',
		href: 'charts/line'
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
		blurb: 'Inspired by the classic line chart',
		href: 'charts/glyph'
	}

	$: backgroundStyles = `bg-${$theme}-background`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl text-center`;

</script>

<svelte:head>
	<title>Tidal Waves</title>
</svelte:head>

<h1 class={h1Styles}>Welcome to Tidal Waves.</h1>

<!-- <div class='flex justify-center'>
	<div class='flex flex-col items-left'>

	  <h1 class={h1Styles}>The charts:</h1>

		<ChartLink chart={line} />
		<ChartLink chart={ridgeline} />
		<ChartLink chart={vertical} />
		<ChartLink chart={radial} />
		<ChartLink chart={glyph} />

	</div>
</div>
 -->
