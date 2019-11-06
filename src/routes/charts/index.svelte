<script>
	import { theme } from '../../stores';

	const img = 'h-16 w-16 lg:h-32 lg:w-32';
	const anchor = 'flex flex-row items-center py-6';
	const caption = 'flex flex-col pl-8';

	$: pStyles = `font-mono text-${$theme}-p pt-4`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-center text-2xl pb-8`;
	$: h2Styles = `font-mono text-${$theme}-h1 text-xl`;
	$: line = `/line-${$theme}.png`;
	$: ridgeline = `/ridgeline-${$theme}.png`;
	$: vertical = `/vertical-${$theme}.png`;
</script>

<svelte:head>
	<title>Charts</title>
</svelte:head>

<div class='flex justify-center'>
<div class='flex flex-col items-left'>
  <h1 class={h1Styles}>All the Charts</h1>

	<a class={anchor} rel='prefetch' href='charts/line'>
		<img alt='Line' class={img} src={line}>
		<div class={caption}>
			<h2 class={h2Styles}>Line</h2>
			<p class={pStyles}>The classic timeseries chart</p>
		</div>
	</a>

	<a class={anchor} rel='prefetch' href='charts/ridgeline'>
		<img alt='Ridgeline plot' class={img} src={ridgeline}>
		<div class={caption}>
			<h2 class={h2Styles}>Ridgeline</h2>
			<p class={pStyles}>Inspired by the classic line chart</p>
		</div>
	</a>

	<a class={anchor} rel='prefetch' href='charts/vertical'>
		<img alt='vertical' class={img} src={vertical}>
		<div class={caption}>
			<h2 class={h2Styles}>Vertical</h2>
			<p class={pStyles}>Inpspired by the classic line chart</p>
		</div>
	</a>
</div>
</div>