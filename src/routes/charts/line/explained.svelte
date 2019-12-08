<script>
	import { theme } from '../../../stores';
	import { exampleData } from '../../../../static/exampleData';
	import DataTable from '../../../components/DataTable.svelte';
	import Fig from '../../../components/Fig.svelte';
	import Link from '../../../components/Link.svelte';
	import GlossaryLink from '../../../components/GlossaryLink.svelte';

	$: pStyles = `font-mono text-${$theme}-p py-4 leading-relaxed lg:text-lg xl:text-lg`;
  $: h1Styles = `font-mono text-${$theme}-h1 text-center text-3xl pb-4`;
  $: h2Styles = `font-mono text-${$theme}-h1 text-2xl py-8`;

  const divStyles = 'py-2 lg:py-4';

  const noaaLink = {
    href: 'https://tidesandcurrents.noaa.gov/tide_predictions',
    text: 'Tides and Currents Tidal Predictions portal'
  }

  const fig1 = {
		text: 'A table showing data from November 8, 2019 and November 9, 2019 showing tidal high/low projections for Moss Landing, Ocean Pier station.',
		number: 1,
	}

</script>

<svelte:head>
	<title>Line, Explained | Tidal Waves</title>
</svelte:head>

<div class='flex justify-center'>
  <div class='max-w-4xl p-1 lg:p-6'>
    <div class={divStyles}>
			<h1 class={h1Styles}>Line Chart, Explained</h1>
		</div>
		<div class={divStyles}>
			<p class={pStyles}>First, let's take a look at how the data comes from NOAA's <Link props={noaaLink} /> Portal.
			</p>
		</div>
		<DataTable />
		<Fig text={fig1.text} number={fig1.number}/>
		<div class={divStyles}>
			<p class={pStyles}>
				NOAA makes predicitons for every high tide and low tide for each <GlossaryLink term={'tide station'} />. The data table has three columns: T, V, and Type. T refers to the predicted time, V to the predicted water level (in feet from sea level), and Type to the type of tide (high or low). 
			</p>
		
			<p class={pStyles}>
				
			</p>
		</div>
  </div>
</div>