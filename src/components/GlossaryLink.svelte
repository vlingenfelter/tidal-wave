<script>
  import Link from './Link.svelte';

  export let term = 'tide';
  export let text = term;

  let slug = term.toString().toLowerCase()
    .replace(/\s+/g, '-') 
    .replace(/&/g, '-and-') 
    .replace(/[^\w\-]+/g, '') 
    .replace(/\-\-+/g, '-') 
    .replace(/^-+/, '') 
    .replace(/-+$/, '');

  let props = {
    text: text.toString(),
    href: `glossary#${slug}`,
  }
  
</script>

<Link {props}/>