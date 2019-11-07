<script>
	import { onMount } from 'svelte';
	import { today, lastDay } from '../stores';
	import { get } from 'svelte/store';
	import GlyphChart from './GlyphChart.svelte';
  import { nest } from 'd3-collection';

	let url = '';
  let data = [];
  let loaded = false;

  onMount(() => {
  	url = `https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=${get(today)}&end_date=${get(lastDay)}&datum=MLLW&station=9413616&time_zone=lst_ldt&units=english&interval=hilo&format=json`;

  	fetch(url)
  		.then(response => response.json())
  		.then(json => {
  			let temp = json.predictions.map(d => {
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

        data = nest()
          .key(function(d) { return d.date; })
          .entries(temp);

  			loaded = true;
  		});
  });

</script>

{#if loaded}
<div class='flex justify-center'>
  <div class='flex flex-wrap max-w-3xl p-2 lg:p-6'>
    {#each data as d}
    <div class='flex flex-col p-2 lg:p-4'>
      <!-- <h1>{d.key}</h1> -->
      <GlyphChart data={d.values} />
    </div>
    {/each}
  </div>
</div>
{:else}
	<h2>Loading...</h2>
{/if}
