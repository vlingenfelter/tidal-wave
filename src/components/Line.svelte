<script>
	import { onMount } from 'svelte';
	import { today, lastDay , theme} from '../stores';
	import { get } from 'svelte/store';
	import LineChart from './LineChart.svelte';
  import Link from './Link.svelte';

	let url = '';
  let data = [];
  let loaded = false;

  const props = {
    href: '/charts/line/explained',
    text: 'See how this chart was made',
  }

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

  $: pStyles = `font-mono text-${$theme}-p py-4 text-center`;

</script>

{#if loaded}
<div class='flex flex-col justify-center'>
	<LineChart data={data} />
</div>
{:else}
	<h2 class={pStyles}>Loading...</h2>
{/if}
