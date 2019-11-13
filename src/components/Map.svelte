<script>
	import { onMount } from 'svelte';
	import { theme } from '../stores';
	import states from '../states';
	import { get } from 'svelte/store';
	import * as d3 from 'd3';

	let w;
	let el;
	let width;
	let height;
	let projection;
	let path;
	let svg;

	const california = states.features.filter(d => d.properties['NAME'] == 'California')[0];

	let margin = { top: 10, right: 10, bottom: 10, left: 10 };

	const maxWidth = () => {
    if (w > 500) {
      return 500
    } else {
      return w;
    }
  }

  const maxHeight = () => {
    if (maxWidth() > 700) {
      return maxWidth()/2;
    } else {
      return 350;
    }
  }

  const lineStroke = (theme) => {
		if (theme == 'light') {
			return '#6a65d8';
		} else {
			return '#ffcdcd';
		}
	}

	onMount(() => {
	    svg = d3.select(el)
	    	.attr('height', maxHeight())
	    	.attr('width',  maxWidth())
	      .append('g')
	      .attr('transform', `translate(${margin.left}, ${margin.top})`);

	    width = maxWidth() - margin.left - margin.right;
	    height = maxHeight() - margin.top - margin.bottom;

	    projection = d3.geoAlbers()
	    	.rotate([120, 0])
	    	.fitExtent([[margin.left, margin.top], [width, height]], california);

			path = d3.geoPath().projection(projection);

	    svg.append('path')
	    	.attr('class', 'california')
      	.attr('d', path(california))
      	.attr('fill', 'none')
      	.attr('stroke', lineStroke(get(theme)));

      svg.append('circle')
      	.attr('class', 'moss-landing')
      	.attr('r', '3px')
        .attr('cx', projection([-121.7900, 36.8017])[0])
        .attr('cy', projection([-121.7900, 36.8017])[1])
        .attr('fill', d => get(theme) == 'light' ? '#000' : '#fff');
	  });

	$: {
		d3.selectAll('.california').transition().attr('stroke', lineStroke($theme));
		d3.selectAll('.moss-landing').transition().attr('fill', d => $theme == 'light' ? '#000' : '#fff');
	}
</script>

<div bind:clientWidth={w} class='flex'>
	<svg bind:this={el}></svg>
</div>