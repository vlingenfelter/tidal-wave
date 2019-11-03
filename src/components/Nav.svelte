<script>
	import { theme } from '../stores';
	import DarkTheme from './DarkTheme.svelte';

	export let segment;

  let hidden = '';
  let w;

	$: navStyles = `font-mono flex items-center justify-between flex-wrap bg-${$theme}-nav py-6 px-16`;
	$: titleStyles = `font-extrabold text-3xl text-${$theme}-h1 tracking-wider`;
	$: anchorStyles = `block mt-4 lg:inline-block lg:mt-0 text-${$theme}-p hover:underline ${hidden}`;
  $: buttonStyles = `flex items-center px-3 py-2 border rounded text-${$theme}-h1 border-${$theme}-h1 hover:text-${$theme}-p hover:border-${$theme}-p`;
  $: darkThemeStyes = `lg:mt-0 mt-4 ${hidden}`;

  $: {
    if (w < 1023) {
      hidden = 'hidden';
    } else {
      hidden = '';
    }
  }

  const onClick = () => {
    if (hidden == '') {
      hidden = 'hidden';
    } else {
      hidden = '';
    }
  }
</script>

<nav class={navStyles} bind:clientWidth={w}>
	<div class="flex items-center flex-shrink-0 text-white mr-6">
    <span class={titleStyles}>Tidal Waves</span>
  </div>
  <div class="block lg:hidden">
    <button class={buttonStyles} on:click={onClick}>
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
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
    <div class={darkThemeStyes}>
      <DarkTheme />
    </div>
  </div>
</nav>