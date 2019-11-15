<script>
	import { onMount } from 'svelte';
	import { theme, today, lastDay } from '../stores';
	import { get } from 'svelte/store';
	import * as d3 from 'd3';

	export let data;

  data.sort((a,b) => a.t - b.t);

  let min = d3.min(data.map(d => d.v));
  let max = d3.max(data.map(d => d.v));

  let hoursLabels = [0,1,2,3,4,5,6,7,8,9,10,11];
  let hours = [];
  for (let i=0; i<24; i++) {
    hours.push(i/2);
  }
  let n = hours.length;

  let innerRadius = 60;
  let outerRadius = 500;

  let maxCircle;
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

	const margin = { top: 20, right: 20, bottom: 20, left: 20 };

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
    if (w > 700) {
      return 700;
    } else {
      return w;
    }
    
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

    maxCircle = hours.map(d => { return {timeDec: d, v: outerRadius}; });

    xScale = d3.scaleBand()
      .domain(hours)
      .range([0, 2 * Math.PI])
      .align(0);

    xAxis = (g) => g
      .attr('text-anchor', 'middle')
      .attr('font-family', 'monospace')
      .attr('font-size', 10)
      .call(g => g.selectAll('g')
        .data(hoursLabels.map((d,i) => i))
        .join('g')
          .attr('transform', (d, i) => `
            rotate(${((xScale(d) + xScale.bandwidth() / 2) * 180 / Math.PI - 90) - 7.5})
            translate(${outerRadius+20},0)
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
      .attr('font-size', '24px')
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

    // svg.append('g')
    //   .call(xAxis);

    line = d3.lineRadial()
      .curve(d3.curveLinear)
      .angle((d,i) => xScale((d.timeDec)))
      .radius(d => yScale(max));

    line2 = d3.lineRadial()
      .curve(d3.curveCardinalClosed)
      .angle((d,i) => xScale(d.timeDec))
      .radius(d => yScale(max));

    let path = svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr("fill", 'none')
      .attr("stroke", lineStroke(get(theme)))
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // svg.append('path')
    //   .datum(maxCircle)
    //   .attr('class', 'line')
    //   .attr("fill", 'none')
    //   .attr("stroke", lineStroke(get(theme)))
    //   .attr("stroke-width", 1)
    //   .attr("d", line2)
    //   .style('opacity', 0.4);

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
</div>