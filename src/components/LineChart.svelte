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

	const margin = { top: 20, right: 20, bottom: 20, left: 20 };
	const lineStroke = (theme) => {
		if (theme == 'light') {
			return '#6a65d8';
		} else {
			return '#ffcdcd';
		}
	}

	onMount(() => {
    svg = d3.select(el)
    	.attr('height', 500)
    	.attr('width',  w);

    width = w - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;

    xScale = d3.scaleLinear()
    	.domain([0, data.length]) 
    	.range([0, width]); 

    yScale = d3.scaleLinear()
    	.domain([0, max]) // input 
    	.range([height, 0]); // output 

    line = d3.line()
    	.x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    	.y(function(d) { return yScale(d.v); }) // set the y values for the line generator 
    	.curve(d3.curveMonotoneX)

    svg.append('g')
    	.attr('transform', `translate(0,${height})`)
    	.call(d3.axisBottom(xScale));

    svg.append('g')
    	.call(d3.axisLeft(yScale));

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


<div bind:clientWidth={w}>
	<svg bind:this={el}></svg>
	<Tooltip {tooltipX} {tooltipY} {visible} {text} />
</div>