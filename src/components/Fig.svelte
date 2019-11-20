<script>
	import { theme } from '../stores';

	export let text;

	$: bolder = `font-bold font-mono text-${$theme}-h2 leading-relaxed text-sm`;
	$: pStyles = `font-mono text-${$theme}-p leading-relaxed text-sm`;
</script>

<div class='flex justify-center max-w-lg mx-auto'>
	<p class={pStyles}><span class={bolder}>Figure 1:</span> {text}</p>
</div>