<script>
  import { theme } from '../stores';

  export let term = {
    term: 'Glossary',
    def: 'A dictionary but different',
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
  <p class={pStyles}>{term.def}</p>
</div>