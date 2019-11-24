<script>
  import { theme } from '../stores';

  export let props; 

  $: anchorStyles = `underline text-${$theme}-h2 hover:text-${$theme}-h1`
</script>

<a class={anchorStyles} href={props.href} rel='prefetch'>{props.text}</a>