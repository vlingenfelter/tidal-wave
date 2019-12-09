<script>
	import { onMount } from 'svelte';
	import { theme, today, lastDay } from '../stores';
	import { get } from 'svelte/store';
	import * as d3 from 'd3';
	import Tooltip from './Tooltip.svelte';

	export let data;

	const max = d3.max(data.map(d => d.v));
  const min = d3.min(data.map(d => d.v));
  let minDate = d3.min(data.map(d => d.date));
  let maxDate = d3.max(data.map(d => d.date));

	let dataByDate = d3.nest()
  	.key(function(d) { return d.date; })
  	.entries(data);

  let days = dataByDate.map(d => d.key);
  let n = days.length;

  // let d0 = dataByDate.slice(0,n);
  // console.log(d0);

  let hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

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

	const margin = { top: 90, right: 20, bottom: 20, left: 50 };

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
    let h = (maxWidth()/1.63);
    if (h < 500) {
      return 500;
    } else {
      return h;
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
    //   .call(d3.axisBottom(xScale))
    //   .call(g => g.selectAll('.tick')
    //     .selectAll('line')
    //     .attr('stroke', legendColor(get(theme))))
    //   .call(g => g.select('.domain')
    //     .attr('stroke', legendColor(get(theme))))
    //   .selectAll('text') 
    //     .attr('fill', legendColor(get(theme)))
    //     .style('font-size', '1.25em')
    //     .style('font-family', 'monospace');

    // svg.selectAll('.hour')
    //   .data(hours)
    //   .enter()
    //   .append('rect')
    //     .attr('class', 'hour')
    //     .attr('x', d => xScale(d))
    //     .attr('y', 0 - margin.top)
    //     .attr('width', 1.5)
    //     .attr('height', height + margin.top)
    //     .attr('fill', lineStroke(get(theme)))
    //     .attr('stroke', 'none')
    //     .style('opacity', 0.3);

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

     // svg.selectAll('.y-label')
     //  .data(d0)
     //  .enter()
     //  .append("text")
     //    .attr("transform", function(d){return("translate(0," + (yName(d.key)-80) +")" )})
     //    .attr('class', d => `line date-${d.key}`)
     //    .datum(d => d.values)
     //    .attr("fill", legendColor(get(theme)))
     //    .attr('y', d => yScale(d[0].v))
     //    .attr('x', 0 - margin.left)
     //    .style('text-anchor', 'left')
     //    .style('font-family', 'monospace')
     //    .text(d => formatter(d[0].date));


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
          let thisDate = formatter(d[0].date);
          tooltipX = d3.event.pageX - margin.right;
          tooltipY = d3.event.pageY - ((height - margin.top - margin.bottom)/2);

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
    d3.selectAll('.hour').transition().attr('fill', lineStroke($theme));
	}

</script>


<div bind:clientWidth={w} bind:clientHeight={h} class='flex justify-center'>
	<svg bind:this={el}></svg>
	<Tooltip {tooltipX} {tooltipY} {visible} {text} />
</div>