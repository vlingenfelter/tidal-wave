<script>
	import { theme } from '../stores';
  import Map from '../components/Map.svelte';

	$: pStyles = `font-mono text-${$theme}-p pb-4 leading-relaxed`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-3xl pb-4`;
  $: h2Styles = `font-mono text-${$theme}-h1 text-2xl py-8`;
  $: anchorStyles = `underline hover:text-${$theme}-h1`
</script>

<svelte:head>
	<title>About | Tidal Wave</title>
</svelte:head>

<div class='flex justify-center'>
  <div class='max-w-3xl p-1 lg:p-6'>
    <h1 class={h1Styles}>About the project</h1>

    <h2 class={h2Styles}>Data Source</h2>

    <p class={pStyles}>
    	All of the tidal projections being used in this website are from the National Oceanic and Atmospheric Administration's (NOAA) <a class={anchorStyles} href='https://tidesandcurrents.noaa.gov/tide_predictions'> Tides and Currents Tidal Predictions portal</a>. All charts are showing data from Moss Landing, Ocean Pier station (shown on map below).
    </p>

    <div class='flex justify-center'>
      <Map />
    </div>

    <h2 class={h2Styles}>About me</h2>

    <p class={pStyles}>
    	You can check out <a class={anchorStyles} href='https://violetlingenfelter.com'>my personal website</a> to see more of my projects. 
    </p>
  </div>
</div>