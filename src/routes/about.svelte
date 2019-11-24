<script>
	import { theme } from '../stores';
  import Map from '../components/Map.svelte';
  import Link from '../components/Link.svelte';

	$: pStyles = `font-mono text-${$theme}-p pb-4 leading-relaxed`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-3xl pb-4`;
  $: h2Styles = `font-mono text-${$theme}-h1 text-2xl py-8`;

  const noaaLink = {
    href: 'https://tidesandcurrents.noaa.gov/tide_predictions',
    text: 'Tides and Currents Tidal Predictions portal'
  }

  const moonLink = {
    href: 'http://www.ben-daglish.net/moon.shtml',
    text: 'Ben Daglish Moon Phase Calculators'
  }

  const personalLink = {
    href: 'https://violetlingenfelter.com',
    text: 'my personal site'
  }

</script>

<svelte:head>
	<title>About | Tidal Wave</title>
</svelte:head>

<div class='flex justify-center'>
  <div class='max-w-4xl p-1 lg:p-6'>
    <h1 class={h1Styles}>About the project</h1>

    <h2 class={h2Styles}>Data Source</h2>

    <p class={pStyles}>
    	All the tidal projections being used in these visualizations are from the National Oceanic and Atmospheric Administration's (NOAA) <Link props={noaaLink} />. All charts are showing the next 30 days of projections from Moss Landing, Ocean Pier station (shown on map below).
    </p>

    <div class='flex justify-center'>
      <Map />
    </div>

    <p class={pStyles}>Lunar projections are calculated using the simple method from <Link props={moonLink} />. Lunar projections are approximations, and for this project, I opted for simplicity over accuracy. </p>

    <h2 class={h2Styles}>About me</h2>

    <p class={pStyles}>
    	I love data visualization and I love the ocean. You can check out <Link props={personalLink} /> to see more of my projects. 
    </p>
  </div>
</div>