<script>
	import { onMount } from 'svelte';
	import { today, lastDay, theme } from '../stores';
	import { get } from 'svelte/store';
	import RidgelineChart from './RidgelineChart.svelte';
  import RidgelineHowTo from './RidgelineHowTo.svelte';
  import Fig from './Fig.svelte';

	let url = '';
  let data = [];
  let loaded = false;

  let text = 'This chart is based on the Line Chart. It shows tidal high/low projections for Moss Landing for the next 30 days, where each line is a day\'s data and time of day (midnight to 11:59 pm) is represented on the x-axis. Hover to see the date associated with each line. Today is at the top.';

  onMount(() => {
  	url = `https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=${get(today)}&end_date=${get(lastDay)}&datum=MLLW&station=9413616&time_zone=lst_ldt&units=english&interval=hilo&format=json`;

  	fetch(url)
  		.then(response => response.json())
  		.then(json => {
  			data = json.predictions.map(d => {
  				let date = d.t.split(' ')[0];
  				let time = d.t.split(' ')[1];
  				let decimal = (parseInt(time.split(':')[1])/60) + parseInt(time.split(':')[0]);
  				return {
  					t: d.t,
  					date: date,
  					time: time,
  					timeDec: decimal,
  					type: d.type,
  					v: parseFloat(d.v),
  				}
  			});
  			loaded = true;
  		});
  });

  $: pStyles = `font-mono text-${$theme}-p pb-4 leading-relaxed`;
</script>

{#if loaded}
	<RidgelineChart data={data} />
  <Fig {text} />
  <RidgelineHowTo />
{:else}
	<h2 class={pStyles}>Loading...</h2>
{/if}
