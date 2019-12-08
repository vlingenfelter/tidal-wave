<script>
	import { theme } from '../../../stores';
	import DataTable from '../../../components/DataTable.svelte';
  import Fig from '../../../components/Fig.svelte';
  import Link from '../../../components/Link.svelte';
  import GlossaryLink from '../../../components/GlossaryLink.svelte';

	$: pStyles = `font-mono text-${$theme}-p py-4 leading-relaxed lg:text-lg xl:text-lg`;
  $: h1Styles = `font-mono text-${$theme}-h1 text-center text-3xl pb-4`;
  $: h2Styles = `font-mono text-${$theme}-h1 text-2xl py-8`;

  const divStyles = 'py-2 lg:py-4';
</script>

<svelte:head>
	<title>Layered Line, Explained | Tidal Waves</title>
</svelte:head>

<div class='flex justify-center'>
  <div class='max-w-4xl p-1 lg:p-6'>
    <h1 class={h1Styles}>Layered Line Chart, Explained</h1>
  </div>
</div>