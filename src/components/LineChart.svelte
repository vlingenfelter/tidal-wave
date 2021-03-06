<script>
	import { onMount } from 'svelte';
	import { theme } from '../stores';
	import { get } from 'svelte/store';
	import * as d3 from 'd3';
	import Tooltip from './Tooltip.svelte';

	export let data;

	let max = d3.max(data.map(d => d.v));
  let min = d3.min(data.map(d => d.v));
  let n = data.length;

  console.log(data);

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

	let margin = { top: 30, right: 30, bottom: 30, left: 60 };
	
  const lineStroke = (theme) => {
		if (theme == 'light') {
			return '#6a65d8';
		} else {
			return '#ffcdcd';
		}
	}

  const legendColor = (theme) => {
    if (theme == 'light') {
      return '#000';
    } else {
      return '#fff';
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
    if (maxWidth() > 700) {
      return maxWidth()/2;
    } else {
      return 350;
    }
  }

  const formatter = (date) => {
    const arr = date.split('-');
    return `${arr[1]}-${arr[2]}`;
  }

	onMount(() => {
    svg = d3.select(el)
    	.attr('height', maxHeight())
    	.attr('width',  maxWidth())
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    if (maxWidth() < 450) {
      margin = { top: 30, right: 5, bottom: 30, left: 50 };
      n = parseInt(data.length/2);
    }

    width = maxWidth() - margin.left - margin.right;
    height = maxHeight() - margin.top - margin.bottom;

    xScale = d3.scaleTime()
    	.domain([new Date(data[0].t), new Date(data[n-1].t)]) 
    	.range([0, width - margin.right]); 

    yScale = d3.scaleLinear()
    	.domain([min, max]) // input 
    	.range([height, 0]); // output 

    line = d3.line()
    	.x(function(d, i) { return xScale(new Date(d.t)); }) // set the x values for the line generator
    	.y(function(d) { return yScale(d.v); }) // set the y values for the line generator 
    	.curve(d3.curveMonotoneX)

    // svg.append('g')
    // 	.attr('transform', `translate(0,${height})`)
    // 	.call(d3.axisBottom(xScale)
    //     .tickFormat(d3.timeFormat('%m/%d'))
    //     .ticks(d3.timeDay.every(1)))
    //   .call(g => g.select('.domain')
    //     .attr('stroke', legendColor(get(theme))))
    //   .call(g => g.selectAll('.tick')
    //     .selectAll('line')
    //     .attr('stroke', legendColor(get(theme))))
    //   .selectAll('text') 
    //     .style('text-anchor', 'end')
    //     .attr('fill', legendColor(get(theme)))
    //     .style('font-size', '1.25em')
    //     .attr("dx", "-.8em")
    //     .attr("dy", ".15em")
    //     .style('font-family', 'monospace')
    //     .attr("transform", "rotate(-65)");

    svg.append('rect')
      .attr('class', 'sea-level')
      .attr('x', xScale(new Date(data[0].t)))
      .attr('y', yScale(0))
      .attr('width', width - margin.right)
      .attr('height', 1.5)
      .attr('fill', lineStroke(get(theme)))
      .attr('stroke', 'none');

    svg.append('g')
    	.call(d3.axisLeft(yScale).tickFormat(t => `${t}ft`))
      .call(g => g.select('.domain')
        .remove())
      .call(g => g.selectAll('.tick')
        .selectAll('line')
        .remove())
      .call(g => g.selectAll('.tick')
        .selectAll('text')
        .attr('fill', legendColor(get(theme)))
        .style('font-size', '1.25em')
        .style('text-anchor', 'right')
        .style('font-family', 'monospace'));

     svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('class', 'axis-label')
      .attr('y', 0 - margin.left + 10)
      .attr('x', 0 - (height / 2))
      .style('text-anchor', 'middle')
      .style('font-family', 'monospace')
      .attr('fill', legendColor(get(theme)))
      .text('Predicted water level'); 

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
    	.attr('cx', function(d, i) { return xScale(new Date(d.t)) })
    	.attr('cy', function(d) { return yScale(d.v) })
      // .attr('fill', lineStroke(get(theme)))
      // .attr('stroke', lineStroke(get(theme)))
    	.attr('r', 5)
    	.style('opacity', 0)
      .on('mouseover', (d) => {
      	tooltipX = d3.event.pageX - margin.right;
        tooltipY = d3.event.pageY - ((height - margin.top - margin.bottom)/2);
      	visible = true;
        text = `${d.v} ft at ${d.time} on ${formatter(d.date)}`;
      })
      .on('mouseout', (d) => { visible = false; });
  });


  $: {
  	d3.selectAll('.line').transition().attr('stroke', lineStroke($theme));
    d3.selectAll('.sea-level').transition().attr('fill', lineStroke($theme));
    d3.selectAll('.tick').selectAll('text').transition().attr('fill', legendColor($theme));
    d3.selectAll('.axis-label').transition().attr('fill', legendColor($theme));
	}

</script>


<div bind:clientWidth={w} class='flex justify-center'>
	<svg bind:this={el}></svg>
	<Tooltip {tooltipX} {tooltipY} {visible} {text} />
</div>