<script>
	import { theme } from '../stores';
	import DarkTheme from './DarkTheme.svelte';

	export let segment;

	$: navStyles = `font-mono flex items-center justify-between flex-wrap bg-${$theme}-nav p-6`;
	$: titleStyles = `font-extrabold text-3xl text-${$theme}-h1 tracking-wider`;
	$: anchorStyles = `block mt-4 lg:inline-block lg:mt-0 text-${$theme}-p hover:underline`;

</script>

<nav class={navStyles}>
	<div class="flex items-center flex-shrink-0 text-white mr-6">
    <span class={titleStyles}>Tidal Waves</span>
  </div>
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
      <span class={anchorStyles}>
      	<a class='{segment === undefined ? "selected" : ""}' href='.'>home</a>
      </span>
      <span class={anchorStyles}>
      	<a class='{segment === "about" ? "selected" : ""}' href='about'>about</a>
      </span>
    </div>
    <div>
      <DarkTheme />
    </div>
  </div>
</nav>