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
	
</script>

<svelte:head>
	<title>Charts</title>
</svelte:head>

<div class='flex justify-center'>
	<div class='flex flex-col items-left'>

	  <h1 class={h1Styles}>All the Charts</h1>

		<ChartLink chart={line} />
		<ChartLink chart={ridgeline} />
		<ChartLink chart={vertical} />

	</div>
</div>