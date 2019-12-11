<script>
	import { theme } from '../../../stores';
	import DataTable from '../../../components/DataTable.svelte';
	import Fig from '../../../components/Fig.svelte';
	import Link from '../../../components/Link.svelte';
	import GlossaryLink from '../../../components/GlossaryLink.svelte';
	
	$: pStyles = `font-mono text-${$theme}-p py-4 leading-relaxed lg:text-lg xl:text-lg`;
  $: h1Styles = `font-mono text-${$theme}-h1 text-center text-3xl pb-4`;
  $: h2Styles = `font-mono text-${$theme}-h1 text-2xl py-8`;

  $: img1 = `radial-chart-y-${$theme}.png`;
  $: img2 = `radial-chart-finished-${$theme}.png`;

  const divStyles = 'py-2 lg:py-4';
  const imgStyles = 'p-2 lg:p-4';

  const noaaLink = {
    href: 'https://tidesandcurrents.noaa.gov/tide_predictions',
    text: 'Tides and Currents Tidal Predictions portal'
  }

  const lineLink = {
    href: '/charts/line',
    text: 'line chart'
  }

  const lineExplainedLink = {
    href: '/charts/line/explained',
    text: 'how the line chart was made'
  }

  const radialLink = {
    href: '/charts/radial',
    text: 'live radial chart'
  }

  const layeredLink = {
    href: '/charts/layered-line',
    text: 'next chart in the series'
  }

  const fig1 = {
		text: 'A table showing data from November 8, 2019 and November 9, 2019 showing tidal high/low projections for Moss Landing, Ocean Pier station.',
		number: 1,
	}
</script>

<svelte:head>
	<title>Radial, Explained | Tidal Waves</title>
	<meta name='description' content="An explanation of the radial chart, a chart depicting tidal high/low predictions, and a part of tidal wave, a visual exploration of NOAA's high/low tidal projections">
</svelte:head>

<div class='flex justify-center'>
  <div class='max-w-4xl p-1 lg:p-6'>
    <div class={divStyles}>
			<h1 class={h1Styles}>Radial Chart, Explained</h1>
		</div>
		<div class={divStyles}>
			
			<h2 class={h2Styles}>About the data</h2>

			<p class={pStyles}>
				NOAA makes predicitons for every high tide and low tide for each <GlossaryLink term={'tide station'} />. The data table has three columns: T, V, and Type. T refers to the predicted time, V to the predicted water level (in feet from <GlossaryLink term={'bench mark (BM)'} text={'bench mark'}/>), and Type to the type of tide (high or low). This data comes from NOAA's <Link props={noaaLink} />.
			</p>
		</div>
		<DataTable />
		<Fig text={fig1.text} number={fig1.number}/>
		<div class={divStyles}>
			<h2 class={h2Styles}>Making the radial chart</h2>

			<p class={pStyles}>
				One way to visualize this data is with a <Link props={lineLink} />. Because this chart was directly inspired by the line chart, it might be helpful to look at <Link props={lineExplainedLink} /> before reading this section. 
			</p>

			<p class={pStyles}>
				The radial chart is very similar to a line chart, but instead of moving from left to right represent date and time (T from the table), we move in a circle. That means the predicted water level (V from the table) will be represented as the distance from the center of the circle. We can add markers to make this more apparent:
			</p>

			<img class={imgStyles} alt='The y axis of the radial chart' src={img1}>

			<p class={pStyles}>
				The smallest circle is a foot below sea level. The largest circle is six feet above sea level. Now we can add our data, starting from the top of the circle with the data closest to now, and moving clockwise as the predictions get further into the future.
			</p>

			<img class={imgStyles} alt='The finished radial chart.' src={img2}>

			<p class={pStyles}>
				And voila! The finished chart. Now you can go back to the <Link props={radialLink} />, or see <Link props={layeredLink} />.
			</p>

		</div>
  </div>
</div>