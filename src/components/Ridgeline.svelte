<script>
	import { onMount } from 'svelte';
	import { theme } from '../stores';
	import { get } from 'svelte/store';
	import * as d3 from 'd3';
	import Tooltip from './Tooltip.svelte';

	export let data;

	console.log(data);

	const max = d3.max(data.map(d => d.v));
  const min = d3.min(data.map(d => d.v));
  let minDate = d3.min(data.map(d => d.date));
  let maxDate = d3.max(data.map(d => d.date));

	let dataByDate = d3.nest()
  	.key(function(d) { return d.date; })
  	.entries(data);

  console.log(dataByDate);

  let days = dataByDate.map(d => d.key);
  let n = days.length;

	let el;
	let w;
	let width;
	let height;
	let xScale;
	let yScale;
  let xAxis;
  let yName;
	let line;
	let svg;

	let visible = false;
	let tooltipX;
	let tooltipY;
	let text = '';

	const margin = { top: 90, right: 20, bottom: 20, left: 20 };

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

	onMount(() => {
    console.log(w);
    svg = d3.select(el)
    	.attr('height', 500)
    	.attr('width',  maxWidth())
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    width = maxWidth() - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;

    xScale = d3.scaleLinear()
      .domain([0, 24]) 
      .range([0, width]); 

    yScale = d3.scaleLinear()
      .domain([min, max]) // input 
      .range([80, 0]); // output 

    yName = d3.scaleBand()
      .domain(days)
      .range([0, height])
      .paddingInner(1);

    // svg.append('g')
    //   .call(d3.axisLeft(yName));

    line = d3.line()
          .curve(d3.curveBasis)
          .x(function(d) { return xScale(d.timeDec); })
          .y(function(d) { return yScale(d.v); });

    // svg.append('g')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(d3.axisBottom(xScale));

    svg.selectAll('area')
      .data(dataByDate)
      .enter()
      .append("path")
        .attr("transform", function(d){return("translate(0," + (yName(d.key)-80) +")" )})
        .attr('class', d => `line date-${d.key}`)
        .datum(d => d.values)
        .attr("fill", 'none')
        .attr("stroke", lineStroke(get(theme)))
        .attr("stroke-width", 2)
        .attr("d", line);

    svg.selectAll('.invisible')
      .data(dataByDate)
      .enter()
      .append("path")
        .attr("transform", function(d){return("translate(0," + (yName(d.key)-80) +")" )})
        .datum(d => d.values)
        .attr("fill", 'none')
        .attr("stroke", 'white')
        .style('opacity', 0)
        .attr("stroke-width", 15)
        .attr("d", line)
        .on('mousemove', d => {
          let thisDate = d[0].date;
          tooltipX = d3.event.pageX;
          tooltipY = d3.event.pageY - (height/2);
          visible = true;
          text = thisDate;
        })
        .on('mouseout', d => { 
          visible = false; 
          text = '';
        });

  });


  $: {
  	d3.selectAll('.line').transition().attr('stroke', lineStroke($theme));
	}

</script>


<div bind:clientWidth={w} class='flex justify-center'>
	<svg bind:this={el}></svg>
	<Tooltip {tooltipX} {tooltipY} {visible} {text} />
</div>