<script>
	import { onMount } from 'svelte';
	import { theme, today, lastDay } from '../stores';
	import { get } from 'svelte/store';
	import * as d3 from 'd3';
	import Tooltip from './Tooltip.svelte';

	export let data;

	const max = d3.max(data.map(d => d.v));
  const min = d3.min(data.map(d => d.v));
  let date = d3.min(data.map(d => d.date));

  // let n = data.length;
  let hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  let n = hours.length;

  let minCircle = hours.map(d => { return {timeDec: d, v: min}; });
  let maxCircle = hours.map(d => { return {timeDec: d, v: max}; });

  let innerRadius = 60;
  let outerRadius = 500;

	let el;
	let w;
  let h;
	let width;
	let height;
	let xScale;
	let yScale;
  let xAxis;
  let yAxis;
  let yName;
	let line;
  let line2;
  let line3;
	let svg;

	const margin = { top: 10, right: 10, bottom: 10, left: 10 };

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

  const maxWidth = () => {
    return 100;
  }

  const maxHeight = () => {
    return maxWidth()
  }

	onMount(() => {
    svg = d3.select(el)
      .attr('viewBox', `${-maxWidth() / 2} ${-maxHeight() / 2} ${maxWidth()} ${maxHeight()}`)
      .attr('height', maxHeight())
      .attr('width',  maxWidth());

    width = maxWidth() - margin.left - margin.right;
    height = maxHeight() - margin.top - margin.bottom;
    outerRadius = (maxWidth() - margin.top - margin.bottom) / 2;
    innerRadius = maxWidth() / 4;

    xScale = d3.scaleBand()
      .domain(hours)
      .range([0, 2 * Math.PI])
      .align(0);

    xAxis = (g) => g
      .attr('text-anchor', 'middle')
      .attr('font-family', 'monospace')
      .attr('font-size', 10)
      .call(g => g.selectAll('g')
        .data(data.map((d,i) => i))
        .join('g')
          .attr('transform', (d, i) => `
            rotate(${((xScale(d) + xScale.bandwidth() / 2) * 180 / Math.PI - 90)})
            translate(${innerRadius},0)
          `)
        // .call(g => g.append("line")
        //     .attr("x2", -5)
        //     .attr("stroke", "#000"))
        .call(g => g.append('text')
            .attr('class', 'x-axis')
            .attr('fill', lineStroke(get(theme)))
            .attr('transform', (d,i) => (xScale(d) + xScale.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                ? 'rotate(90)translate(0,16)'
                : 'rotate(-90)translate(0,-9)')
            .text((d,i) => i)));

    yScale = d3.scaleLinear()
      .domain([min, max]) // input 
      .range([innerRadius, outerRadius]); // output 

    yAxis = (g) => g
      .attr('text-anchor', 'middle')
      .attr('font-family', 'monospace')
      .attr('font-size', 10)
      .call(g => g.selectAll('g')
        .data(yScale.ticks().reverse())
        .join('g')
          .attr('fill', 'none')
          .call(g => g.append('circle')
              .attr('class', 'y-axis')
              .attr('stroke', lineStroke(get(theme)))
              .attr('stroke-opacity', 0.2)
              .attr('r', yScale))
          .call(g => g.append("text")
              .attr('class', 'y-axis-label')
              .attr('y', d => -yScale(d))
              .attr('dy', '0.35em')
              .attr('stroke', background(get(theme)))
              .attr('stroke-width', 5)
              .text((x, i) => `${x.toFixed(0)}${i ? '' : 'ft'}`)
            .clone(true)
              .attr('y', d => yScale(d))
            .selectAll(function() { return [this, this.previousSibling]; })
            .clone(true)
              .attr('class', 'y-axis-text')
              .attr("fill", lineStroke(get(theme)))
              .attr("stroke", "none")));

    // line = d3.line()
    //   .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    //   .y(function(d) { return yScale(d.v); }) // set the y values for the line generator 
    //   .curve(d3.curveMonotoneX)

    // svg.append('g')
    //   .call(xAxis);

    line = d3.lineRadial()
      .curve(d3.curveCardinalClosed)
      .angle((d,i) => xScale(parseInt(d.timeDec)))
      .radius(d => yScale(d.v));

    line2 = d3.lineRadial()
      .curve(d3.curveBasisClosed)
      .angle((d,i) => xScale(parseInt(d.timeDec)))
      .radius(d => yScale(d.v));

    line3 = d3.lineRadial()
      .curve(d3.curveCatmullRomClosed.alpha(0))
      .angle((d,i) => xScale(parseInt(d.timeDec)))
      .radius(d => yScale(d.v));

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr("fill", 'none')
      .attr("stroke", lineStroke(get(theme)))
      .attr("stroke-width", 2)
      .attr("d", line);

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr("fill", 'none')
      .attr("stroke", lineStroke(get(theme)))
      .attr("stroke-width", 2)
      .attr("d", line2);

    // svg.append('path')
    //   .datum(data)
    //   .attr('class', 'line')
    //   .attr("fill", 'none')
    //   .attr("stroke", lineStroke(get(theme)))
    //   .attr("stroke-width", 2)
    //   .attr("d", line3);
    // svg.append('g')
    //   .call(yAxis);

    // svg.append('path')
    //   .datum(minCircle)
    //   .attr('class', 'line')
    //   .attr("fill", 'none')
    //   .attr("stroke", lineStroke(get(theme)))
    //   .attr("stroke-width", 2)
    //   .attr("d", line);

    svg.append('path')
      .datum(maxCircle)
      .attr('class', 'line')
      .attr("fill", 'none')
      .attr("stroke", lineStroke(get(theme)))
      .attr("stroke-width", 2)
      .attr("d", line);

  });


  $: {
    d3.selectAll('.y-axis-label').attr('stroke', background($theme)).attr('fill', lineStroke($theme));
    d3.selectAll('.y-axis').transition().attr('stroke', lineStroke($theme));
    d3.selectAll('.y-axis-text').transition().attr('fill', lineStroke($theme));
    d3.selectAll('.x-axis').transition().attr('fill', lineStroke($theme));
    d3.selectAll('.line').transition().attr('stroke', lineStroke($theme));
  }

</script>


<div bind:clientWidth={w} bind:clientHeight={h} class='flex justify-center'>
	<svg bind:this={el}></svg>
<!-- 	<Tooltip {tooltipX} {tooltipY} {visible} {text} /> -->
</div>