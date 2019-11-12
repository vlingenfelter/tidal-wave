<script>
	import { theme } from '../stores';
 
	 $: styles = `font-mono text-${$theme}-p`;
</script>

<div>
<p class={styles}>Loading...</p>
</div>