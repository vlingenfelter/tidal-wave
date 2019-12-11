<script>
	import { theme } from '../../../stores';
	import DataTable from '../../../components/DataTable.svelte';
	import Fig from '../../../components/Fig.svelte';
	import Link from '../../../components/Link.svelte';
	import GlossaryLink from '../../../components/GlossaryLink.svelte';
	
	$: pStyles = `font-mono text-${$theme}-p py-4 leading-relaxed lg:text-lg xl:text-lg`;
  $: h1Styles = `font-mono text-${$theme}-h1 text-center text-3xl pb-4`;
  $: h2Styles = `font-mono text-${$theme}-h1 text-2xl py-8`;

  $: img1 = `vertical-lunar-x-${$theme}.png`;
  $: img2 = `vertical-lunar-y-${$theme}.png`;
  $: img3 = `vertical-lunar-line-${$theme}.png`;
  $: img4 = `vertical-lunar-moon-${$theme}.png`;
  $: img5 = `vertical-lunar-finished-${$theme}.png`;

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

  const verticalLunarLink = {
    href: '/charts/vertical-lunar',
    text: 'live vertical lunar chart'
  }

  const verticalLink = {
    href: '/charts/vertical',
    text: 'next chart in the series'
  }

  const fig1 = {
		text: 'A table showing data from November 8, 2019 and November 9, 2019 showing tidal high/low projections for Moss Landing, Ocean Pier station.',
		number: 1,
	}
</script>

<svelte:head>
	<title>Vertical Lunar, Explained | Tidal Waves</title>
	<meta name='description' content='The step by step process of creating the vertical lunar chart, a chart depicting tidal high/low predictions and lunar phase.'>
</svelte:head>

<div class='flex justify-center'>
  <div class='max-w-4xl p-1 lg:p-6'>
    <div class={divStyles}>
			<h1 class={h1Styles}>Vertical Lunar Chart, Explained</h1>
		</div>
		<div class={divStyles}>
			<p class={pStyles}>As a reminder, here's what the data looks like when it comes from NOAA's <Link props={noaaLink} />.
			</p>
		</div>
		<DataTable />
		<Fig text={fig1.text} number={fig1.number}/>
		<div class={divStyles}>
			<p class={pStyles}>
				NOAA makes predicitons for every high tide and low tide for each <GlossaryLink term={'tide station'} />. The data table has three columns: T, V, and Type. T refers to the predicted time, V to the predicted water level (in feet from sea level), and Type to the type of tide (high or low). 
			</p>

			<p class={pStyles}>
				For this chart we also have <GlossaryLink term='age of moon' /> data. That comes from the simple version of <Link props={moonLink} />. I use the 'simple' method of moon phase calculation for this visualization.  
			</p>

			<h2 class={h2Styles}>Making the vertical lunar chart</h2>

			<p class={pStyles}>
				The vertical lunar chart visualizes the <GlossaryLink term='range of tide' /> for each day, as well as that day's  <GlossaryLink term='age of moon' />. So to start, we will need to have a spot for each day:
			</p>

			<img class={imgStyles} alt='Labels for each day' src={img1}>

			<p class={pStyles}>
				Now we need to add our y-axis. Because we are looking at the predicted range of tide, as opposed to the predicted water level, we will not have any negative values.  We can calculate the range of tide for each day by taking the lowest <GlossaryLink term={'low tide'}/> and subtracting it from the <GlossaryLink term={'High Tide'} text='high tide'/>. 
			</p>

			<img class={imgStyles} alt='The y-axis for the chart' src={img2}>

			<p class={pStyles}>
				Now we can add our daily tidal ranges as vertical lines:
			</p>

			<img class={imgStyles} alt='Each day has a vertical line corresponding to the tidal range.' src={img3}>

			<p class={pStyles}>
				Because <GlossaryLink term={'Tide'} text={'tide'}/> tide corresponds to the age of the moon, it might be intersting to add the phase of the moon on top of the vertical line for each day's range:
			</p>

			<img class={imgStyles} alt='A moon graphic is now added to each line' src={img4}>

			<p class={pStyles}>
				Now we can remove the y axis to get rid of visual clutter:
			</p>

			<img class={imgStyles} alt='The finished vertical lunar chart.' src={img5}>

			<p class={pStyles}>
				And voila! The finished chart. Now you can go back to the <Link props={verticalLunarLink} />, or see <Link props={verticalLink} />.
			</p>

		</div>
  </div>
</div>