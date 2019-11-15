<script>
	import { theme } from '../stores';
  import { get } from 'svelte/store';
  import { select } from 'd3-selection';
  import { onMount } from 'svelte';

  let toggle = (get(theme) === 'dark');
  let mounted = false;

	$: if (toggle) {
		theme.set('dark');
    if (mounted) { 
      select('body').attr('class', 'bg-dark-background'); 
      updateCookie('dark');
    }
	} else {
		theme.set('light');
    if (mounted) { 
      select('body').attr('class', 'bg-light-background'); 
      updateCookie('light');
    }
  }

  const updateCookie = (theme) => {
    document.cookie = `theme=${theme}`;
  }

  onMount(() => { 
    let cookie = document.cookie;
    
    mounted = true;

    if (cookie != '') {
      let t = cookie.split('=')[1];
      toggle = (t === 'dark');
    }
  });

  $: toggleLineStyles = `toggle__line w-10 h-4 bg-${$theme}-h1 rounded-full shadow-inner`;
  $: toggleDotStyles = `toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0`;
  $: textStyles = `font-mono ml-3 text-${$theme}-p font-medium`;
</script>

<style>
.toggle__dot {
  top: -.25rem;
  left: -.25rem;
  transition: all 0.3s ease-in-out;
}

input:checked ~ .toggle__dot {
  transform: translateX(100%);
  background-color: white;
}
</style>
 <label for="toogle" class="flex items-center cursor-pointer">
    <div class="relative">
      <input id="toogle" type="checkbox" class="hidden" bind:checked={toggle}/>
      <div class={toggleLineStyles}></div>
      <div class={toggleDotStyles}></div>
   </div>
    <div class={textStyles}>
      {$theme} theme
    </div>
  </label>