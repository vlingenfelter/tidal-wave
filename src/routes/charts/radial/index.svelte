<script>
	import Radial from '../../../components/Radial.svelte';
	import { theme, today } from '../../../stores';

	$: backgroundStyles = `bg-${$theme}-background`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl text-center`;

</script>

<svelte:head>
	<title>Radial | Tidal Waves</title>
</svelte:head>

<h1 class={h1Styles}>The Radial Line Chart</h1>
<Radial />