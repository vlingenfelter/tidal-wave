<script>
	import { onMount } from 'svelte';
	import { theme } from '../stores';
	import { get } from 'svelte/store';
	import * as d3 from 'd3';
	import Tooltip from './Tooltip.svelte';

	export let data;

	console.log(data);

	let max = d3.max(data.map(d => d.v));

	let dataByDate = d3.nest()
  	.key(function(d) { return d.date; })
  	.entries(data);

  console.log(dataByDate);

	let el;
	let w;
	let width;
	let height;
	let xScale;
	let yScale;
	let line;
	let svg;

	let visible = false;
	let tooltipX;
	let tooltipY;
	let text = '';

	const margin = { top: 30, right: 30, bottom: 30, left: 30 };
	
  const lineStroke = (theme) => {
		if (theme == 'light') {
			return '#6a65d8';
		} else {
			return '#ffcdcd';
		}
	}

  const maxWidth = () => {
    if (w > 1000) {
      return 1000
    } else {
      return w;
    }
  }

  const maxHeight = () => {
    return maxWidth()/2;
  }

	onMount(() => {
    svg = d3.select(el)
    	.attr('height', maxHeight())
    	.attr('width',  maxWidth())
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    width = maxWidth() - margin.left - margin.right;
    height = maxHeight() - margin.top - margin.bottom;

    xScale = d3.scaleLinear()
    	.domain([0, data.length]) 
    	.range([0, width - 60]); 

    yScale = d3.scaleLinear()
    	.domain([0, max]) // input 
    	.range([height - 60, 0]); // output 

    line = d3.line()
    	.x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    	.y(function(d) { return yScale(d.v); }) // set the y values for the line generator 
    	.curve(d3.curveMonotoneX)

    // svg.append('g')
    // 	.attr('transform', `translate(0,${height})`)
    // 	.call(d3.axisBottom(xScale));

    // svg.append('g')
    // 	.call(d3.axisLeft(yScale));

    svg.append('path')
    	.datum(data) // 10. Binds data to the line 
    	.attr('class', 'line') // Assign a class for styling 
    	.attr('d', line)
    	.attr('fill', 'none')
    	.attr('stroke', lineStroke(get(theme)))
    	.attr('stroke-width', 2);

    svg.selectAll('.dot')
    	.data(data)
  		.enter().append('circle') // Uses the enter().append() method
    	.attr('class', 'dot') // Assign a class for styling
    	.attr('cx', function(d, i) { return xScale(i) })
    	.attr('cy', function(d) { return yScale(d.v) })
    	.attr('r', 5)
    	.style('opacity', 0)
      .on('mouseover', (d) => {
      	tooltipX = d3.event.pageX;
      	tooltipY = d3.event.pageY - (height/2);
      	visible = true;
      })
      .on('mouseout', (d) => { visible = false; });
  });


  $: {
  	d3.selectAll('.line').transition().attr('stroke', lineStroke($theme));
	}

</script>


<div bind:clientWidth={w} class='flex justify-center'>
	<svg bind:this={el}></svg>
	<Tooltip {tooltipX} {tooltipY} {visible} {text} />
</div>