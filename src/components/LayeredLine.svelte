<script>
	import { onMount } from 'svelte';
	import { today, lastDay , theme} from '../stores';
	import { get } from 'svelte/store';
	import LayeredLineChart from './LayeredLineChart.svelte';

	let url = '';
  let data = [];
  let loaded = false;

  onMount(() => {
  	url = `https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=${get(today)}&end_date=${get(lastDay)}&datum=MLLW&station=9413616&time_zone=lst_ldt&units=english&interval=hilo&format=json`;

  	fetch(url)
  		.then(response => response.json())
  		.then(json => {
  			data = json.predictions.map(d => {
  				let date = d.t.split(' ')[0];
  				let time = d.t.split(' ')[1];
  				let decimal = (parseInt(time.split(':')[1])/60) + parseInt(time.split(':')[0]);
          let am = (decimal >= 12) ? 'pm' : 'am';
  				return {
  					t: d.t,
  					date: date,
  					time: time,
  					timeDec: decimal,
  					type: d.type,
            am: am, 
  					v: parseFloat(d.v),
  				}
  			});
  			loaded = true;
  		});
  });

  $: pStyles = `font-mono text-${$theme}-p pb-4`;

</script>

{#if loaded}
	<LayeredLineChart data={data} />
{:else}
	<h2 class={pStyles}>Loading...</h2>
{/if}
