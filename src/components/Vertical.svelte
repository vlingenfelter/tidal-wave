<script>
	import { onMount } from 'svelte';
	import { today, lastDay, theme } from '../stores';
	import { get } from 'svelte/store';
	import VerticalChart from './VerticalChart.svelte';
  import Fig from './Fig.svelte'

	let url = '';
  let data = [];
  let loaded = false;

  const text = 'This chart shows tidal high/low projections for Moss Landing for the next 30 days. Each line is is a day, where the height of the line represents the extent of the local sea-level that day. Today is on the left. The circles represent tidal predictions. The size and color of the circles represent the time of day that the tidal high or low is expected to occur, and the height of the circle represents the local sea-level at that time.'

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
  		})
      .catch(err => {
        alert(err);

        data = predictions.predictions.map(d => {
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
	<VerticalChart data={data} />
  <Fig {text} />
{:else}
	<h2 class={pStyles}>Loading...</h2>
{/if}
