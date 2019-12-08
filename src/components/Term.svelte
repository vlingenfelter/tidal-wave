<script>
  import { theme } from '../stores';
  import GlossaryLink from './GlossaryLink.svelte';

  export let term = {
    term: 'Glossary',
    def: 'A dictionary but different',
    links: [
      {
        term: 'Tide',
      }
    ],
  }

  let slug = term.term.toString().toLowerCase()
    .replace(/\s+/g, '-') 
    .replace(/&/g, '-and-') 
    .replace(/[^\w\-]+/g, '') 
    .replace(/\-\-+/g, '-') 
    .replace(/^-+/, '') 
    .replace(/-+$/, '');

  $: termStyles = `font-mono text-${$theme}-h2 leading-relaxed text-lg lg:text-xl pb-2`
  $: pStyles = `font-mono text-${$theme}-p leading-relaxed lg:text-lg xl:text-lg`;
</script>

<div class='pb-8'>
  <p class={termStyles} id={slug}>{term.term}</p>
  <p class={pStyles}>{term.def}
    {#if (term.links.length > 1)}
    See also: 
      {#each term.links as link, i}
        {#if (i+1 < term.links.length)}
          <GlossaryLink term={link.term} />,&nbsp 
        {:else}
          <GlossaryLink term={link.term} />
        {/if}
      {/each}
    {:else if (term.links.length == 1)}
    See also: <GlossaryLink term={term.links[0].term} />
    {/if}
  </p>
</div>