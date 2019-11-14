<script>
	import { theme } from '../stores';

	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl text-center`;

</script>

<svelte:head>
	<title>Tidal Wave</title>
</svelte:head>

<div class='flex justify-center'>
  <div class='max-w-3xl p-1 lg:p-6'>
		<h1 class={h1Styles}>Welcome to Tidal Wave.</h1>
	</div>
</div>
