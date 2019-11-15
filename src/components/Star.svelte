<script>
	import { onMount } from 'svelte';
	import { today, lastDay, sevenDay, theme } from '../stores';
	import { get } from 'svelte/store';
  import StarChart from './StarChart.svelte';

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
          let decimal12 = (decimal >= 12) ? decimal - 12 : decimal;
          let roundDecimal = Math.ceil(decimal12*10/5)*5/10;
          let correctedDecimal = (roundDecimal > 11.5) ? 0 : roundDecimal;
          let am = (decimal > 12) ? 'pm' : 'am';
  				return {
  					t: d.t,
  					date: date,
  					time: time,
  					timeDec: correctedDecimal,
  					type: d.type,
  					v: parseFloat(d.v),
            am: am,
  				}
  			});

  			loaded = true;
  		});
  });

  $: pStyles = `font-mono text-${$theme}-p pb-4 leading-relaxed`;

</script>

{#if loaded}
	<!-- <RadialChart data={data} /> -->
  <StarChart data={data} />
{:else}
	<h2 class={pStyles}>Loading...</h2>
{/if}
