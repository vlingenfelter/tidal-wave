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

  $: img1 = `line-chart-x-${$theme}.png`;
  $: img2 = `line-chart-y-${$theme}.png`;
  $: img3 = `line-chart-dots-${$theme}.png`;
  $: img4 = `line-chart-line-${$theme}.png`;
  $: img5 = `line-chart-finished-${$theme}.png`;

  const divStyles = 'py-2 lg:py-4';
  const imgStyles = 'p-2 lg:p-4';

  const noaaLink = {
    href: 'https://tidesandcurrents.noaa.gov/tide_predictions',
    text: 'Tides and Currents Tidal Predictions portal'
  }

  const lineLink = {
    href: '/charts/line',
    text: 'live line chart'
  }

  const radialLink = {
    href: '/charts/radial',
    text: 'next chart in the series'
  }

  const fig1 = {
		text: 'A table showing data from November 8, 2019 and November 9, 2019 showing tidal high/low projections for Moss Landing, Ocean Pier station.',
		number: 1,
	}

</script>

<svelte:head>
	<title>Line, Explained | Tidal Waves</title>
	<meta name='description' content="Explanation of the line chart, a chart depicting tidal high/low predictions, and a part of tidal wave, a visual exploration of NOAA's high/low tidal projections">
</svelte:head>

<div class='flex justify-center'>
  <div class='max-w-4xl p-1 lg:p-6'>
    <div class={divStyles}>
			<h1 class={h1Styles}>Line Chart, Explained</h1>
		</div>
		<div class={divStyles}>
			<p class={pStyles}>First, let's take a look at how the data comes from NOAA's <Link props={noaaLink} />.
			</p>
		</div>
		<DataTable />
		<Fig text={fig1.text} number={fig1.number}/>
		<div class={divStyles}>
			<p class={pStyles}>
				NOAA makes predicitons for every high tide and low tide for each <GlossaryLink term={'tide station'} />. The data table has three columns: T, V, and Type. T refers to the predicted time, V to the predicted water level (in feet from sea level), and Type to the type of tide (high or low). 
			</p>

			<h2 class={h2Styles}>Making the line chart</h2>

			<p class={pStyles}>
				One way to visualize this data is with a line chart. We can plot the date and time (T from the table) for the predictions on the x axis, so that the time closest to now is on the left, and we get farther into the future as we move to the right. That looks like this:
			</p>

			<img class={imgStyles} alt='The x axis of the line chart' src={img1}>

			<p class={pStyles}>
				We can add a y axis next. On the y axis, we are going to plot the predicted water level (V from the table). That looks like this:
			</p>

			<img class={imgStyles} alt='The y axis has been added to the line chart' src={img2}>

			<p class={pStyles}>
				Now we can add each row from our dataset, mapping the T to the corresponding place on the x axis, and the V to the corresponding place on the y axis. We can represent those values as circles for now. 
			</p>

			<img class={imgStyles} alt='A dot has been added for each data point' src={img3}>

			<p class={pStyles}>
				To make this easier to follow, we can connect the dots.
			</p>

			<img class={imgStyles} alt='A line has been drawn to connect all the dots.' src={img4}>

			<p class={pStyles}>
				We can clean it up a little bit, removing some pieces that add visual clutter and adding some labels. We can also add a line to represent the <GlossaryLink term='bench mark (bm)' text='bench mark sea level'/> for the station.
			</p>

			<img class={imgStyles} alt='Finished line chart' src={img5}>

			<p class={pStyles}>
				And voila! The finished chart. Now you can go back to the <Link props={lineLink} />, or see <Link props={radialLink} />.
			</p>

		</div>
  </div>
</div>