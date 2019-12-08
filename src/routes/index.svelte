<script>
	import { theme } from '../stores';
	import Map from '../components/Map.svelte';
	import Fig from '../components/Fig.svelte';
	import Link from '../components/Link.svelte';
	import GlossaryLink from '../components/GlossaryLink.svelte';

	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl xl:text-4xl lg:text-3xl text-center`;
	$: h2Styles = `font-mono text-${$theme}-h1 text-xl lg:text-2xl pb-2`;
	$: pStyles = `font-mono text-${$theme}-p pb-4 leading-relaxed lg:text-lg xl:text-lg`;
	$: img1 = `/index-1-${$theme}.png`;

	const divStyles = 'py-2 lg:py-4';

	const fig1 = {
		text: 'A screenshot of the layered line chart from 11-22-19.',
		link: 'charts/layered-line',
		linkText: 'See the live chart here.',
	}

	const fig2 = {
		text: 'Moss landing is in central California, about 28 miles from Hollister, my hometown.',
		number: 2,
	}
	
	const chartLink = {
		href: 'charts/',
		text: 'See the charts here'
	}

	const adrienLink = {
    href: 'https://www.adriensegal.com/tidal-datum',
    text: "Adrien Segal's Tidal Datum"
  }

  const noaaLink = {
    href: 'https://tidesandcurrents.noaa.gov/tide_predictions',
    text: 'Tides and Currents Tidal Predictions portal'
  }

  const moonLink = {
    href: 'http://www.ben-daglish.net/moon.shtml',
    text: 'Ben Daglish Moon Phase Calculators'
  }

  const personalLink = {
    href: 'https://violetlingenfelter.com/projects/',
    text: 'my other projects'
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
			<p class={pStyles}>Tidal wave is a visual exploration of NOAA's high/low tidal projections. By focusing on more artistic interpretations of the <GlossaryLink term={'marigram'} />, we can begin to see some of the daily and monthly patterns that exist in the tides. This project was inspired by <Link props={adrienLink}/>.</p>
		</div>

		<img alt='Line' src={img1}>
		<Fig text={fig1.text} link={fig1.link} linkText={fig1.linkText}/>

		<div class='py-2'></div>

    <div class={divStyles}>
    	<h2 class={h2Styles}>Data Source</h2>
	    <p class={pStyles}>
	    	All the tidal projections being used in these visualizations are from the National Oceanic and Atmospheric Administration's (NOAA) <Link props={noaaLink} />. All charts are showing the next 30 days of projections from Moss Landing, Ocean Pier station (shown on map below).
	    </p>

	    <div class='flex justify-center'>
	      <Map />
	    </div>
	    <Fig text={fig2.text} number={fig2.number}/>

	    <div class='py-2'></div>

	    <p class={pStyles}><GlossaryLink term={'Age of moon'} /> is calculated using the simple method from <Link props={moonLink} />. Lunar projections are approximations, and for this project, I opted for simplicity over accuracy. </p>
	  </div>

	  <div class={divStyles}>
	    <h2 class={h2Styles}>About me</h2>
	    <p class={pStyles}>
	    	I'm Violet. I love data visualization and the ocean. You can also check out <Link props={personalLink} />. 
	    </p>
  	</div>
	</div>
</div>
