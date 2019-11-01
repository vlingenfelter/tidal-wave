<script>
import * as d3 from 'd3';
import { onMount } from 'svelte';
import { theme } from '../stores';

export let visible;
export let tooltipX;
export let tooltipY;
export let text = 'Tooltip!'; 

let el;
let div;
let mounted = false;

$: styles = `absolute font-mono text-center w-auto h-auto p-1 text-sm bg-${$theme}-nav border-${$theme}-h1 border-solid border-2 text-${$theme}-p`;

onMount(() => {
  div = d3.select(el);
  mounted = true;
})

$: if (visible && mounted) {
  // make the tooltip appear
  div.transition()
    .duration(250)
    .style('opacity', 1);

  div.style('left', `${tooltipX}px`)
    .style('top', `${tooltipY}px`);
} else if (mounted) {
  div.transition()
    .duration(100)
    .style('opacity', 0);
}

</script>

<div class={styles} bind:this={el}>
  <div>
    <b class='inline-block'>{text}</b>
  </div>
</div>