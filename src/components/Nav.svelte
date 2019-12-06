<script>
	import { theme } from '../stores';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
	import DarkTheme from './DarkTheme.svelte';

	export let segment;

  let hidden = false;
  let w;

	$: navStyles = `font-mono flex items-center justify-between flex-wrap bg-${$theme}-nav py-6 px-8 lg:px-16`;
	$: titleStyles = `font-extrabold text-xl lg:text-3xl xl:text-4xl text-${$theme}-h1 tracking-wider hover:underline`;
	$: anchorStyles = `block mt-4 lg:inline-block lg:mt-0 text-${$theme}-p lg:border-b-2 lg:border-transparent lg:hover:border-${$theme}-h1 hover:underline lg:text-xl lg:hover:no-underline`;
  $: selected = `block mt-4 lg:inline-block lg:text-xl lg:mt-0 text-${$theme}-p lg:border-b-2 lg:border-dashed lg:border-${$theme}-h1 lg:hover:border-solid underline lg:no-underline`;
  $: buttonStyles = `flex items-center px-3 py-2 border rounded text-${$theme}-h1 border-${$theme}-h1 hover:text-${$theme}-p hover:border-${$theme}-p`;
  $: darkThemeStyles = `lg:mt-0 mt-4`;
  $: dropdownStyles = `w-full block flex-grow lg:flex lg:items-center lg:w-auto`;

  const onClick = () => {
    if (!hidden && w < 1024) {
      hidden = true;
    } else {
      hidden = false;
    }
  }

  const linkSelected = () => {
    if (w < 1024) {
      hidden = true;
    }
  }

  onMount(() => {
    if (w >= 1023) {
      hidden = false;
    } else {
      hidden = true;
    }
  });

</script>

<nav class={navStyles} bind:clientWidth={w}>
	<div class="flex items-center flex-shrink-0 text-white mr-6">
    <a class={titleStyles} rel='prefetch' href='.' on:click={linkSelected}>Tidal Wave</a>
  </div>
  <div class="block lg:hidden">
    <button class={buttonStyles} on:click={onClick}>
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  {#if (!hidden)}
  <div class={dropdownStyles} transition:slide>
    <div class="text-sm lg:flex-grow">
      <span class='px-2'>
        <a class={segment === "charts" ? selected : anchorStyles} rel='prefetch' href='charts' on:click={linkSelected}>charts</a>
      </span>
      <span class='px-2'>
        <a class={segment === "glossary" ? selected : anchorStyles} rel='prefetch' href='glossary' on:click={linkSelected}>glossary</a>
      </span>
    </div>
    <div class={darkThemeStyles}>
      <DarkTheme />
    </div>
  </div>
  {/if}
</nav>