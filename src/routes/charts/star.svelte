<script>
	import Star from '../../components/Star.svelte';
	import { theme, today } from '../../stores';

	$: backgroundStyles = `bg-${$theme}-background`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl text-center`;

</script>

<svelte:head>
	<title>Star | Tidal Waves</title>
</svelte:head>

<h1 class={h1Styles}>The Star Chart</h1>
<Star />