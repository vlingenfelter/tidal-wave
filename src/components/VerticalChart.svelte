<script>
	import { onMount } from 'svelte';
	import { theme, today, lastDay } from '../stores';
	import { get } from 'svelte/store';
	import * as d3 from 'd3';
	import Tooltip from './Tooltip.svelte';

	export let data;

	console.log(data);

	const max = d3.max(data.map(d => d.v));
  console.log(max);
  const min = d3.min(data.map(d => d.v));
  console.log(min);
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
  let h;
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

	const margin = { top: 20, right: 20, bottom: 20, left: 20 };

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
    let h = (maxWidth()/1.63);
    if (h < 500) {
      return 500;
    } else {
      return h;
    }
  }

	onMount(() => {
    console.log(w);
    svg = d3.select(el)
    	.attr('height', maxHeight())
    	.attr('width',  maxWidth())
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    width = maxWidth() - margin.left - margin.right;
    height = maxHeight() - margin.top - margin.bottom;

    xScale = d3.scaleBand()
      .domain(days)
      .range([0, width])
      .paddingInner(1);

    yScale = d3.scaleLinear()
      .domain([min, max]) // input 
      .range([height, 0]); // output 

    yName = d3.scaleBand()
      .domain(days)
      .range([0, height])
      .padding(1);

    // svg.append('g')
    //   .call(d3.axisLeft(yScale));

    line = d3.line()
          .x(function(d) { return xScale(d.date); })
          .y(function(d) { return yScale(d.v); });

    // svg.append('g')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(d3.axisBottom(xScale));

    svg.selectAll('area')
      .data(dataByDate)
      .enter()
      .append('path')
        // .attr("transform", function(d){return("translate(0," + (yName(d.key)) +")" )})
        .attr('class', d => `line date-${d.key}`)
        .datum(d => d.values)
        .attr("fill", 'none')
        .attr("stroke", lineStroke(get(theme)))
        .attr("stroke-width", 2)
        .attr("d", line);

    svg.selectAll('.circle')
      .data(data)
      .enter()
      .append('circle')
        .attr('class', d => `circle date-${d.key}`)
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yScale(d.v))
        .attr('r', 3)
        .attr('fill', lineStroke(get(theme)))
        .on('mousemove', d => {
          let thisDate = d.v;
          tooltipX = d3.event.pageX;
          tooltipY = d3.event.pageY;
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
    d3.selectAll('.circle').transition().attr('fill', lineStroke($theme));
	}

</script>


<div bind:clientWidth={w} bind:clientHeight={h} class='flex justify-center'>
	<svg bind:this={el}></svg>
	<Tooltip {tooltipX} {tooltipY} {visible} {text} />
</div>