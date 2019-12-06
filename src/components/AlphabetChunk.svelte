<script>
  import { theme } from '../stores';
  import Term from './Term.svelte';

  export let terms;
  export let letter = 'A';

  $: divStyles = `border-t-2 border-${$theme}-h1 border-dashed py-4`;
  $: h2Styles = `font-mono text-${$theme}-h1 text-2xl py-8`;

</script>

<h2 class={h2Styles} id={letter}>{letter}</h2>
<div class={divStyles}>
  {#each terms as term}
    <Term {term} />
  {/each}
</div>