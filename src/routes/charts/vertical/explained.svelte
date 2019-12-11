<script>
	import { theme } from '../../../stores';
	import DataTable from '../../../components/DataTable.svelte';
	import Fig from '../../../components/Fig.svelte';
	import Link from '../../../components/Link.svelte';
	import GlossaryLink from '../../../components/GlossaryLink.svelte';
	
	$: pStyles = `font-mono text-${$theme}-p py-4 leading-relaxed lg:text-lg xl:text-lg`;
  $: h1Styles = `font-mono text-${$theme}-h1 text-center text-3xl pb-4`;
  $: h2Styles = `font-mono text-${$theme}-h1 text-2xl py-8`;

  $: img1 = `vertical-y-${$theme}.png`;
  $: img2 = `vertical-line-${$theme}.png`;
  $: img3 = `vertical-dots-${$theme}.png`;
  $: img4 = `vertical-color-${$theme}.png`;
  $: img5 = `vertical-radius-${$theme}.png`;
  $: img6 = `vertical-legend-${$theme}.png`;
  $: img7 = `vertical-finished-${$theme}.png`;


  const divStyles = 'py-2 lg:py-4';
  const imgStyles = 'p-2 lg:p-4';

  const noaaLink = {
    href: 'https://tidesandcurrents.noaa.gov/tide_predictions',
    text: 'Tides and Currents Tidal Predictions portal'
  }

  const moonLink = {
    href: 'http://www.ben-daglish.net/moon.shtml',
    text: 'Ben Daglish Moon Phase Calculators'
  }

  const lineLink = {
    href: '/charts/line',
    text: 'line chart'
  }

  const lineExplainedLink = {
    href: '/charts/line/explained',
    text: 'how the line chart was made'
  }

  const verticalLink = {
    href: '/charts/vertical',
    text: 'live vertical chart'
  }

  const nextLink = {
    href: '/charts/line',
    text: 'next chart in the series'
  }

  const fig1 = {
		text: 'A table showing data from November 8, 2019 and November 9, 2019 showing tidal high/low projections for Moss Landing, Ocean Pier station.',
		number: 1,
	}
</script>

<svelte:head>
	<title>Vertical, Explained | Tidal Waves</title>
		<meta name='description' content="An explanation of the vertical lunar chart, a chart depicting tidal high/low predictions, and a part of tidal wave, a visual exploration of NOAA's high/low tidal projections">
</svelte:head>

<div class='flex justify-center'>
  <div class='max-w-4xl p-1 lg:p-6'>
    <div class={divStyles}>
			<h1 class={h1Styles}>Vertical Chart, Explained</h1>
		</div>
		<div class={divStyles}>
			<p class={pStyles}>
        This is the most visually complex chart in the series. It is meant to show how the tides correspond to the lunar dar, which is slightly longer than the solar day, by showing how the time of the predicted high and low tides shift as the Moon ages. 
      </p>

      <h2 class={h2Styles}>About the data</h2>

      <p class={pStyles}>
        NOAA makes predicitons for every high tide and low tide for each <GlossaryLink term={'tide station'} />. The data table has three columns: T, V, and Type. T refers to the predicted time, V to the predicted water level (in feet from <GlossaryLink term={'bench mark (BM)'} text={'bench mark'}/>), and Type to the type of tide (high or low). This data comes from NOAA's <Link props={noaaLink} />.
      </p>
		</div>
		<DataTable />
		<Fig text={fig1.text} number={fig1.number}/>
		<div class={divStyles}>

			<h2 class={h2Styles}>Making the vertical chart</h2>

			<p class={pStyles}>
				The vertical chart visualizes the <GlossaryLink term='range of tide' /> for each day, as well as the time of day for each <GlossaryLink term='high tide' /> and <GlossaryLink term='low tide' />. We can start by putting a horizontal line to show the water level <GlossaryLink term='Bench Mark (BM)' text='bench mark' /> for the Moss Landing station:
			</p>

			<img class={imgStyles} alt='The y axis and sea level' src={img1}>

			<p class={pStyles}>
				Now we can add a line for every day, where the line starts at the highest high tide and ends at the lowest low tide. The range closest to now is on the left, and as they move to the left, they get further into the future:
			</p>

			<img class={imgStyles} alt='There is now a line for each day showing the range of tide.' src={img2}>

			<p class={pStyles}>
				Now we can add each tidal prediction for each day. We can visualize these predictions as circles. Each circle's height corresponds to the predicted water level (V in the table). Each circle is on the line that corresponds to its date (T in the table): 
			</p>

			<img class={imgStyles} alt='There is now a dot at each data point.' src={img3}>

			<p class={pStyles}>
				We can sort of see a pattern emerging amongst the circles. We can make the circles a bit bigger, so they are easier to see, and we can also vary the color based on the time of day of the prediction. Dark circles will be predictions that occur between 6 p.m. and 5:59 a.m., and light circles will be predictions that occur between 6 a.m. and 5:59 p.m.:
			</p>

			<img class={imgStyles} alt='Now half the dots are light, and half the dots are dark.' src={img4}>

			<p class={pStyles}>
				Now we can vary the size of the circles depending when the predicted time. Dark dots will peak in size at midnight, and light dots will peak in size at noon:
			</p>

			<img class={imgStyles} alt='Now the dots are of varying size' src={img5}>

			<p class={pStyles}>
				We can add a legend to the chart, and clean it up a bit:
			</p>

			<img class={imgStyles} alt='Finished vertical chart' src={img7}>

			<p class={pStyles}>
				And voila! The finished chart. Now you can go back to the <Link props={verticalLink} />, or see <Link props={nextLink} />.
			</p>

		</div>
  </div>
</div>