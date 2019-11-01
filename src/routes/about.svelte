<script>
	import { theme } from '../stores';

	$: pStyles = `font-mono text-${$theme}-p`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl`;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<h1 class={h1Styles}>About this site</h1>

<p class={pStyles}>This is the 'about' page. There's not much here.</p>