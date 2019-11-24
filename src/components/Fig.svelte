<script>
	import { theme } from '../stores';
  import Link from './Link.svelte';

	export let text;
  export let number = 1;
  export let link = '';
  export let linkText = '';

	$: bolder = `font-bold font-mono text-${$theme}-h2 leading-relaxed text-sm`;
	$: pStyles = `font-mono text-${$theme}-p leading-relaxed text-sm`;

  let props = {
    href: link,
    text: linkText
  }
</script>

<div class='flex justify-center max-w-lg mx-auto'>
	<p class={pStyles}><span class={bolder}>Figure {number}:</span> {text} 
    {#if link != ''}
      <Link {props} />
    {/if}
  </p>
</div>