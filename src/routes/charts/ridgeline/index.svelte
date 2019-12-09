<script>
	import Ridgeline from '../../../components/Ridgeline.svelte';
	import { theme, today } from '../../../stores';
	import Link from '../../../components/Link.svelte';

	$: backgroundStyles = `bg-${$theme}-background`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-2xl text-center`;
	$: pStyles = `font-mono text-${$theme}-p py-4 text-center`;

	const props = {
    href: '/charts/ridgeline/explained',
    text: 'See how this chart was made',
  }

</script>

<svelte:head>
	<title>Ridgeline | Tidal Waves</title>
</svelte:head>

<h1 class={h1Styles}>The Ridgeline Chart</h1>
<Ridgeline />
<p class={pStyles}><Link props={props} /></p>