<script>
  import { theme } from '../stores';
  import { terms } from '../../static/glossary';
  import * as nest from 'd3-collection';
  import Link from '../components/Link.svelte';
  import AlphabetChunk from '../components/AlphabetChunk.svelte';

  $: pStyles = `font-mono text-${$theme}-p py-4 leading-relaxed lg:text-lg xl:text-lg`;
  $: h1Styles = `font-mono text-${$theme}-h1 text-center text-3xl pb-4`;
  $: h2Styles = `font-mono text-${$theme}-h1 text-2xl py-8`;

  const noaaLink = {
    href: 'https://tidesandcurrents.noaa.gov/glossary.html',
    text: 'Tides and Currents Glossary'
  }

  let alphabet = terms.sort((a,b) => { 
    var textA = a.term.toUpperCase();
    var textB = b.term.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });

  alphabet = nest.nest()
    .key(d => d.letter)
    .entries(alphabet);

  let letters = alphabet.map(d => {
    return {
      text: d.key,
      href: `glossary#${d.key}`,
    }
  });

</script>

<svelte:head>
  <title>Glossary | Tidal Wave</title>
  <meta name='description' content="Glossary of terms related to tides and tidal currents for Tidal Wave, a visual exploration of NOAA's high/low tidal projections.">
</svelte:head>

<div class='flex justify-center'>
  <div class='max-w-4xl p-1 lg:p-6'>
    <h1 class={h1Styles}>Useful terms</h1>

    <div class='flex flex-row justify-between'>
      {#each letters as letter}
        <Link props={letter} />
      {/each}
    </div>

    {#each alphabet as chunk}
      <AlphabetChunk terms={chunk.values} letter={chunk.key}/>
    {/each}
    
    <p class={pStyles}>All definitions are taken directly from NOAA via their <Link props={noaaLink}/>.</p>
  </div>
</div>