<script>
	import { onMount } from 'svelte';
	import { theme } from '../stores';
	import california from '../california';
	import { get } from 'svelte/store';
	import * as d3 from 'd3';

	let w;
	let el;
	let width;
	let height;
	let projection;
	let path;
	let svg;
  // let california;
  let mounted = false;

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

	const background = (theme) => {
    if (theme == 'light') {
      return '#fff0f3';
    } else {
      return '#353941';
    }
  }

	onMount(() => {
      // california = states.features.filter(d => d.properties['NAME'] == 'California')[0];

      // console.log(JSON.stringify(california));

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

      svg.append('text')
      	.attr('class', 'moss-landing-buffer')
        .attr('x', projection([-121.7900, 36.8017])[0])
        .attr('y', projection([-121.7900, 36.8017])[1] + (margin.top * 1.5))
        .style('text-anchor', 'start')
      	.style('font-family', 'monospace')
        .attr('stroke', background(get(theme)))
        .attr('stroke-width', 5)
        .text('Moss Landing');

      svg.append('text')
      	.attr('class', 'moss-landing-label')
        .attr('x', projection([-121.7900, 36.8017])[0])
        .attr('y', projection([-121.7900, 36.8017])[1] + (margin.top * 1.5))
        .style('text-anchor', 'start')
      	.style('font-family', 'monospace')
        .attr('fill', d => get(theme) == 'light' ? '#000' : '#fff')
        .text('Moss Landing');

      svg.append('circle')
      	.attr('class', 'moss-landing')
      	.attr('r', '3px')
        .attr('cx', projection([-121.7900, 36.8017])[0])
        .attr('cy', projection([-121.7900, 36.8017])[1])
        .attr('fill', d => get(theme) == 'light' ? '#000' : '#fff');

      mounted = true;
	  });

	$: if (mounted) {
		d3.selectAll('.california').transition().attr('stroke', lineStroke($theme));
		d3.selectAll('.moss-landing').transition().attr('fill', d => $theme == 'light' ? '#000' : '#fff');
		d3.selectAll('.moss-landing-buffer').transition().attr('stroke', background($theme));
		d3.selectAll('.moss-landing-label').transition().attr('fill', d => $theme == 'light' ? '#000' : '#fff');
	}
</script>

<div bind:clientWidth={w} class='flex'>
	<svg bind:this={el}></svg>
</div>