<script>
	import { theme } from '../../../stores';

	$: pStyles = `font-mono text-${$theme}-p py-4 leading-relaxed lg:text-lg xl:text-lg`;
  $: h1Styles = `font-mono text-${$theme}-h1 text-center text-3xl pb-4`;
  $: h2Styles = `font-mono text-${$theme}-h1 text-2xl py-8`;
</script>

<svelte:head>
	<title>Ridgeline, Explained | Tidal Waves</title>
</svelte:head>

<div class='flex justify-center'>
  <div class='max-w-4xl p-1 lg:p-6'>
    <h1 class={h1Styles}>Ridgeline Chart, Explained</h1>
  </div>
</div>