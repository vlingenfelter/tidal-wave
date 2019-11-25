<script>
	import { theme } from '../stores';

	export let chart = {
		img: '',
		title: '',
		blurb: '',
		href: '',
	}

	let hover = '';

	let img = 'h-16 w-16 lg:h-32 lg:w-32';
	const anchor = `flex flex-row items-center py-6`;
	const caption = 'flex flex-col pl-8';

	$: pStyles = `font-mono text-${$theme}-p pt-4 lg:text-lg xl:text-lg`;
	$: h1Styles = `font-mono text-${$theme}-h1 text-center text-2xl pb-8`;
	$: h2Styles = `font-mono text-${$theme}-h1 text-xl xl:text-2xl ${hover}`;

	const onMouseover = () => { 
		hover = 'underline';  
		// img = 'h-20 w-20 lg:h-40 lg:w-40';
	}
	const onMouseout = () => { 
		hover = ''; 
		// img = 'h-16 w-16 lg:h-32 lg:w-32';
	}

</script>

<div on:mouseover={onMouseover} on:mouseout={onMouseout}>
<a class={anchor} rel='prefetch' href={chart.href} >
	<img alt='Line' class={img} src={chart.img}>
	<div class={caption}>
		<h2 class={h2Styles}>{chart.title}</h2>
		<p class={pStyles}>{chart.blurb}</p>
	</div>
</a>
</div>
