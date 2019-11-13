<script>
	import { theme } from '../stores';
  import Map from '../components/Map.svelte';

	$: pStyles = `font-mono text-${$theme}-p pb-4`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl pb-8`;
  $: h1Styles2 = `font-mono text-${$theme}-h1 text-2xl py-8`;
  $: anchorStyles = `hover:underline`
</script>

<svelte:head>
	<title>About Tidal Wave</title>
</svelte:head>

<div class='pl-8'>
  <h1 class={h1Styles}>About this site</h1>

  <p class={pStyles}>
  	This is the 'about' page. There's not much here.
  </p>

  <Map />

  <h1 class={h1Styles2}>About me</h1>

  <p class={pStyles}>
  	You can check out <a class={anchorStyles} href='https://violetlingenfelter.com'>my personal website</a> to see more of my projects. 
  </p>
</div>