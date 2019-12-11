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
  $: img2 = `layered-chart-y-${$theme}.png`;
  $: img3 = `layered-chart-1-${$theme}.png`;
  $: img4 = `layered-chart-2-${$theme}.png`;
  $: img5 = `layered-chart-finished-${$theme}.png`;

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

  const layeredLink = {
    href: '/charts/layered-line',
    text: 'live layered line chart'
  }

  const ridgelineLink = {
    href: '/charts/ridgeline',
    text: 'next chart in the series'
  }

  const adrienLink = {
    href: 'https://www.adriensegal.com/tidal-datum',
    text: "Adrien Segal's Tidal Datum"
  }

  const fig1 = {
    text: 'A table showing data from November 8, 2019 and November 9, 2019 showing tidal high/low projections for Moss Landing, Ocean Pier station.',
    number: 1,
  }
</script>

<svelte:head>
	<title>Layered Line, Explained | Tidal Waves</title>
  <meta name='description' content="Explanation of the layered line chart, a chart depicting tidal high/low predictions, and a part of tidal wave, a visual exploration of NOAA's high/low tidal projections">
</svelte:head>

<div class='flex justify-center'>
  <div class='max-w-4xl p-1 lg:p-6'>
    <div class={divStyles}>
      <h1 class={h1Styles}>Layered Line Chart, Explained</h1>
    </div>
    <div class={divStyles}>
      <p class={pStyles}>Layering tidal predictions for each day makes it possible to see hourly trends in the tide across the month. This chart was directly inspired by <Link props={adrienLink} />.</p>

      <h2 class={h2Styles}>About the data</h2>

      <p class={pStyles}>
        NOAA makes predicitons for every high tide and low tide for each <GlossaryLink term={'tide station'} />. The data table has three columns: T, V, and Type. T refers to the predicted time, V to the predicted water level (in feet from <GlossaryLink term={'bench mark (BM)'} text={'bench mark'}/>), and Type to the type of tide (high or low). This data comes from NOAA's <Link props={noaaLink} />.
      </p>
    </div>
    <DataTable />
    <Fig text={fig1.text} number={fig1.number}/>
    <div class={divStyles}>

      <h2 class={h2Styles}>Making the layered line chart</h2>

      <p class={pStyles}>
        One way to visualize this data is with a <Link props={lineLink} />. It might be helpful to look at <Link props={lineExplainedLink} /> before reading this section. 
      </p>

      <p class={pStyles}>
        The layered line chart is a variation of the line chart. The line chart shows each data point in succession, whereas the layered line chart has a separate line for each day. So first we have to make an x axis that is 24 hours long:
      </p>

      <img class={imgStyles} alt='The x axis of the layerd line chart' src={img1}>

      <p class={pStyles}>
        We can add a y axis next. On the y axis, we are going to plot the predicted water level (V from the table). That looks like this: 
      </p>

      <img class={imgStyles} alt='The y axis of the layered line chart' src={img2}>

      <p class={pStyles}>
        Now we can add our first line, showing the predicted water level over the course of one day: 
      </p>

      <img class={imgStyles} alt='The first line has been added' src={img3}>

      <p class={pStyles}>
        Now we can add our second line, showing the predicted water level over the course of the following day: 
      </p>

      <img class={imgStyles} alt='The second line has been added' src={img4}>

      <p class={pStyles}>
        And we can do this for every day in the dataset. We can also clean up some of the visual clutter, add a line to represent the <GlossaryLink term='bench mark (bm)' text='bench mark sea level'/> for the station, and add some labels:
      </p>

      <img class={imgStyles} alt='The finished layered line chart' src={img5}>

      <p class={pStyles}>
        And voila! The finished chart. Now you can go back to the <Link props={layeredLink} />, or see <Link props={ridgelineLink} />.
      </p>

    </div>
  </div>
</div>