<script>
	import { theme } from '../stores';
	import { exampleData } from '../../static/exampleData';

	$: tableStyles = `font-mono w-full border-collapse table-auto`;
  $: thStyles = `text-${$theme}-h1 text-${$theme}-p text-left pb-2`
  $: tStyles = `border-b-2 border-t-2 border-r-2 border-${$theme}-table text-${$theme}-p p-2 text-sm xl:text-base`;
  $: vStyles = `border-2 border-${$theme}-table text-${$theme}-p p-2 text-sm xl:text-base`;
  $: typeStyles = `border-b-2 border-t-2 border-l-2 border-${$theme}-table text-${$theme}-p p-2 text-sm xl:text-base`;
</script>

<div class='flex justify-center'>
	<div class='max-w-3xl'>
		<table class={tableStyles}>
			<tr class='pb-2'>
				<th class={thStyles}>T</th>
				<th class={thStyles}>V</th>
				<th class={thStyles}>Type</th>
			</tr>
			{#each exampleData.predictions as prediction}
				<tr>
					<td class={tStyles}>{prediction.t}</td>
					<td class={vStyles}>{prediction.v}</td>
					<td class={typeStyles}>{prediction.type}</td>
				</tr>
			{/each}
		</table>
	</div>
</div>
