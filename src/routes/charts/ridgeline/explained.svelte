<script>
	import { theme } from '../../../stores';
	import DataTable from '../../../components/DataTable.svelte';
  import Fig from '../../../components/Fig.svelte';
  import Link from '../../../components/Link.svelte';
  import GlossaryLink from '../../../components/GlossaryLink.svelte';

	$: pStyles = `font-mono text-${$theme}-p py-4 leading-relaxed lg:text-lg xl:text-lg`;
  $: h1Styles = `font-mono text-${$theme}-h1 text-center text-3xl pb-4`;
  $: h2Styles = `font-mono text-${$theme}-h1 text-2xl py-8`;

  $: img1 = `layered-chart-x-${$theme}.png`;
  $: img2 = `ridgeline-hours-${$theme}.png`;
  $: img3 = `ridgeline-1-${$theme}.png`;
  $: img4 = `ridgeline-2-${$theme}.png`;
  $: img5 = `ridgeline-30-${$theme}.png`;
  $: img6 = `ridgeline-finished-${$theme}.png`;

  const divStyles = 'py-2 lg:py-4';
  const imgStyles = 'p-2 lg:p-4';

  const noaaLink = {
    href: 'https://tidesandcurrents.noaa.gov/tide_predictions',
    text: 'Tides and Currents Tidal Predictions portal'
  }

  const layeredLink = {
    href: '/charts/layered-line',
    text: 'layered line chart'
  }

  const layeredExplainedLink = {
    href: '/charts/layered-line/explained',
    text: 'how the layered line chart was made'
  }

  const ridgelineLink = {
    href: '/charts/ridgeline',
    text: 'live ridgeline chart'
  }

  const verticalLunarLink = {
    href: '/charts/vertical-lunar',
    text: 'next chart in the series'
  }

  const fig1 = {
    text: 'A table showing data from November 8, 2019 and November 9, 2019 showing tidal high/low projections for Moss Landing, Ocean Pier station.',
    number: 1,
  }
</script>

<svelte:head>
	<title>Ridgeline, Explained | Tidal Waves</title>
</svelte:head>

<div class='flex justify-center'>
  <div class='max-w-4xl p-1 lg:p-6'>
    <div class={divStyles}>
      <h1 class={h1Styles}>Ridgeline Chart, Explained</h1>
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

      <h2 class={h2Styles}>Making the ridgeline chart</h2>

      <p class={pStyles}>
        One way to visualize this data is with a <Link props={layeredLink} />. It might be helpful to look at <Link props={layeredExplainedLink} /> before reading this section. 
      </p>

      <p class={pStyles}>
        The ridgeline chart is a variation of the layered line chart. The layered line chart shows the predicitons for each day layered on each other. The ridgeline chart shows the predictions for each day stacked, with the prediction closest to now at the top of the chart. So first we have to make an x axis that is 24 hours long:
      </p>

      <img class={imgStyles} alt='The x axis of the layerd line chart' src={img1}>

      <p class={pStyles}>
        To make things a little easier to follow, we can add a vertical line at each hour. This will make it easier to comare the ridgelines later on. 
      </p>

      <img class={imgStyles} alt='A vertical line to show each hour has been added' src={img2}>

      <p class={pStyles}>
        Now we can add our first line, showing the predicted water level over the course of one day. We can label this line to make it easier to follow. 
      </p>

      <img class={imgStyles} alt='The first line has been added' src={img3}>

      <p class={pStyles}>
        Now we can add our second line, showing the predicted water level over the course of the following day, directly below the first day: 
      </p>

      <img class={imgStyles} alt='The second line has been added' src={img4}>

      <p class={pStyles}>
        We can add all of the days that we have. Now our labels are a bit cramped, and the visual is cluttered.
      </p>

      <img class={imgStyles} alt='All lines have been added' src={img5}>

      <p class={pStyles}>
        We can remove some of that clutter so we can see the patterns more easily:
      </p>

      <img class={imgStyles} alt='The finished layered line chart' src={img6}>

      <p class={pStyles}>
        And voila! The finished chart. Now you can go back to the <Link props={ridgelineLink} />, or see <Link props={verticalLunarLink} />.
      </p>

    </div>
  </div>
</div>