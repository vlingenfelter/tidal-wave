<script>
	import { theme } from '../stores';
  import { get } from 'svelte/store';

  let toggle = (get(theme) === 'dark')

	$: if (toggle) {
		theme.set('dark')
	} else {
		theme.set('light')
	}

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