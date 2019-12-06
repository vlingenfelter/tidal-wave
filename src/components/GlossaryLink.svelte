<script>
  import Link from './Link.svelte';

  export let term = 'tide';

  let slug = term.toString().toLowerCase()
    .replace(/\s+/g, '-') 
    .replace(/&/g, '-and-') 
    .replace(/[^\w\-]+/g, '') 
    .replace(/\-\-+/g, '-') 
    .replace(/^-+/, '') 
    .replace(/-+$/, '');

  let props = {
    text: term.toString(),
    href: `glossary#${slug}`,
  }
  
</script>

<Link {props}/>