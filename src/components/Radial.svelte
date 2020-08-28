<script>
	import { onMount } from 'svelte';
	import { today, lastDay, theme, station } from '../stores';
	import { get } from 'svelte/store';
	import RadialChart from './RadialChart.svelte';

	let url = '';
  let data = [];
  let loaded = false;

  let text = 'This is very similar to the Line Chart, but wrapped into a circle. This shows tidal high/low projections for Moss Landing for the next 30 days, where sea level (in feet) is represented by the radius and time is represented by the angle.'

  onMount(() => {
    url = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=${get(today)}&end_date=${get(lastDay)}&datum=MLLW&station=${get(station)}&time_zone=lst_ldt&units=english&interval=hilo&format=json`;

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
	<RadialChart data={data} />
{:else}
	<h2 class={pStyles}>Loading...</h2>
{/if}
