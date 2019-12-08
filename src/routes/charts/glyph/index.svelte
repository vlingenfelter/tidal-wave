<script>
	import Glyph from '../../../components/Glyph.svelte';
	import { theme, today } from '../../../stores';

	$: backgroundStyles = `bg-${$theme}-background`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl text-center`;

</script>

<svelte:head>
	<title>Lunar Chart | Tidal Waves</title>
</svelte:head>

<h1 class={h1Styles}>The Lunar Chart</h1>
<Glyph />