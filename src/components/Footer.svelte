<script>
	import { theme } from '../stores';

	$: footerStyles = `font-mono flex items-center justify-center flex-wrap bg-${$theme}-nav py-6 px-16`;
  $: pStyles = `font-mono text-${$theme}-p text-center`;
  $: anchorStyles = `text-${$theme}-p hover:underline`;
</script>

<footer class={footerStyles}>
  <p class={pStyles}>Made with ❤️ in Boston, MA.
    <br >
    Powered by <a href='https://svelte.dev' class={anchorStyles}>Svelte</a>
  </p>
</footer>