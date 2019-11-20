<script>
	import { onMount } from 'svelte';
	import { theme, today, lastDay, lunar } from '../stores';
	import { get } from 'svelte/store';
	import * as d3 from 'd3';
	import Tooltip from './Tooltip.svelte';

	export let data; // the dataset to be visualized

  // statistics for making chart
	const max = d3.max(data.map(d => d.v));
  const min = d3.min(data.map(d => d.v));
  const absMax = Math.abs(max) + Math.abs(min);
  const minDate = d3.min(data.map(d => d.date));
  const maxDate = d3.max(data.map(d => d.date));

  // reformat data to be suitable for this chart
	let dataByDate = d3.nest()
  	.key(function(d) { return d.date; })
  	.entries(data);

  let ranges = [];

  for (let i=0; i<dataByDate.length; i++) {
    let y0 = d3.min(dataByDate[i].values.map(d => d.v));
    let y1 = d3.max(dataByDate[i].values.map(d => d.v));
    let date = dataByDate[i].key;
    ranges.push([
        { 
          date: date,
          v: 0,
        },
        {
          date: date,
          v: y1,
        }
      ]);
  }

  // console.log(ranges);
  console.log($lunar);

  // get all the days in question
  let days = dataByDate.map(d => d.key);
  let n = days.length;

  // variables for svg creation
	let el; // bound to the svg
	let w; // bound to the width of the svg container
  let h; // bound to the height of the svg container
	let width; // will be the adjusted width for the svg
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

	let margin = { top: 30, right: 30, bottom: 230, left: 30 };

  // calculate the width for the svg
  const maxWidth = () => {
    if (w > 1000) {
      return 1000
    } else {
      return w;
    }
  }

  // calculate the width for the legend
  const legendWidth = () => {
    if (w < 450) {
      return w;
    } else {
      return 450;
    }
  }

  // calculate the height for the svg
  const maxHeight = () => {
    let h = (maxWidth()/1.63);
    if (h < 700) {
      return 700;
    } else {
      return h;
    }
  }

  // update the color of the lines based on theme
	const lineStroke = (theme) => {
		if (theme == 'light') {
			return '#6a65d8';
		} else {
			return '#ffcdcd';
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

    width = maxWidth() - margin.left - margin.right;
    height = maxHeight() - margin.top - margin.bottom;

    if (maxWidth() < 450) {
      margin = { top: 30, right: 5, bottom: 30, left: 50 };
      n = parseInt(days.length/2);
      days = days.slice(0, n);
      dataByDate = dataByDate.filter(d => days.indexOf(d.key) >= 0);
      data = data.filter(d => days.indexOf(d.date) >= 0);
    }

    xScale = d3.scaleBand()
      .domain(days)
      .range([0, width])
      .paddingInner(1);

    yScale = d3.scaleLinear()
      .domain([0, absMax]) // input 
      .range([height, 0]); // output 

    yName = d3.scaleBand()
      .domain(days)
      .range([0, height])
      .padding(1);

    line = d3.line()
          .x(function(d) { return xScale(d.date); })
          .y(function(d) { return yScale(d.v); });

    svg.selectAll('area')
      .data(ranges)
      .enter()
      .append('path')
        .attr("fill", 'none')
        .attr("stroke", lineStroke(get(theme)))
        .attr("stroke-width", 2)
        .attr("d", line);

    svg.selectAll('.circle')
      .data(get(lunar))
      .enter()
      .append('circle')
        .attr('class', d => `circle date-${d.key}`)
        .attr('cx', d => xScale(d.date))
        .attr('cy', (d,i) => yScale(ranges[i][1].v) - 10)
        .attr('r', d => 6)
        .attr('fill', d => lineStroke(get(theme)))
        .attr('stroke', 'none')
        .attr('stroke-width', 0);
  });
  
  // listen for theme change
  $: {
    // update the chart components
  	d3.selectAll('.line')
      .transition()
      .attr('stroke', lineStroke($theme));
    d3.selectAll('.circle')
      .transition()
      .attr('fill', d => circleFill(get(theme), d.timeDec))
      .attr('stroke', d => circleStroke(get(theme), d.timeDec));
	}

</script>


<div bind:clientWidth={w} bind:clientHeight={h} class='flex justify-center'>
	<svg bind:this={el}></svg>
  <Tooltip {tooltipX} {tooltipY} {visible} {text} />
</div>