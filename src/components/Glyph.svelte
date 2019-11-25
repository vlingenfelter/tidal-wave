<script>
	import { onMount } from 'svelte';
	import { today, lastDay, theme, lunar } from '../stores';
	import { get } from 'svelte/store';
	import GlyphChart from './GlyphChart.svelte';
  import { nest } from 'd3-collection';
  import { max, min } from 'd3-array';

	let url = '';
  let data = [];
  let loaded = false;
  let yMax;
  let yMin;

  const formatter = (date) => {
    const arr = date.split('-');
    return `${arr[1]}-${arr[2]}`;
  }

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

        yMax = max(temp.map(d => d.v));
        yMin = min(temp.map(d => d.v));

        data = nest()
          .key(function(d) { return d.date; })
          .entries(temp);

        // let prev = [];
        // let future = [];

        // for (let i=0; i<data.length; i++) {
        //   let yesterday = data[i-1];
        //   if (yesterday !== undefined) {
        //     let y = yesterday.values.slice(-1)[0];
        //     prev.push({ timeDec: y.timeDec - 24, v: y.v })
        //   } else {
        //     prev.push(undefined);
        //   }

        //   let tomorrow = data[i+1];
        //   if (tomorrow !== undefined) {
        //     let t = tomorrow.values.slice(0,1)[0];
        //     future.push({ timeDec: t.timeDec + 24, v: t.v })
        //   } else {
        //     future.push(undefined);
        //   }
        // }

        // for (let i=0; i<data.length; i++){
        //   if (prev[i] !== undefined) {
        //     data[i].values.unshift(prev[i]);
        //   }
        //   if (future[i] !== undefined) {
        //     data[i].values.push(future[i]);
        //   }
        // }

  			loaded = true;
  		});
  });

  $: h3Styles = `font-mono text-${$theme}-p`;

</script>

{#if loaded}
<div class='flex justify-center'>
  <div class='flex flex-wrap max-w-3xl p-1 lg:p-6'>
    {#each data as d}
    <div class='flex flex-col items-center p-1 lg:p-4'>
      <h3 class={h3Styles}>{formatter(d.key)}</h3>
      <GlyphChart data={d.values} max={yMax} min={yMin}/>
    </div>
    {/each}
  </div>
</div>
{:else}
	<h2 class={h3Styles}>Loading...</h2>
{/if}
