<script>
	import { theme } from '../stores';
  import Link from './Link.svelte';

	$: footerStyles = `font-mono flex items-center justify-center flex-wrap bg-${$theme}-nav py-6 px-16`;
  $: pStyles = `font-mono text-${$theme}-p text-center`;

  const d3Link = {
    href: 'https://d3js.org',
    text: 'D3'
  }

  const svelteLink = {
    href: 'https://svelte.dev',
    text: 'Svelte'
  }

</script>

<footer class={footerStyles}>
  <p class={pStyles}>Made with ❤️ in Arlington, VA.
    <br >
    Powered by <Link props={svelteLink} /> and <Link props={d3Link} />
  </p>
</footer>