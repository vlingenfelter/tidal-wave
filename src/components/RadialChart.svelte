<script>
  import { onMount } from 'svelte';
  import { theme } from '../stores';
  import { get } from 'svelte/store';
  import * as d3 from 'd3';
  import Tooltip from './Tooltip.svelte';

  export let data

  // statistics for making chart
  const max = d3.max(data.map(d => d.v));
  const min = d3.min(data.map(d => d.v));
  const minDate = d3.min(data.map(d => d.date));
  const maxDate = d3.max(data.map(d => d.date));


  let hours = [1,2,3,4,5,6,7,8,9,10,11,12];

  let innerRadius = 60;
  let outerRadius = 500;

  let el;
  let w;
  let width;
  let height;
  let xScale;
  let xAxis;
  let yScale;
  let yAxis;
  let svg;
  let line;

  let margin = { top: 20, right: 20, bottom: 20, left: 20 };
  
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

  const legendColor = (theme) => {
    if (theme == 'light') {
      return '#000';
    } else {
      return '#fff';
    }
  }

  const maxWidth = () => {
    if (w > 700) {
      return 700
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

    if (maxWidth < 450) {
      margin = { top: 5, right: 5, bottom: 5, left: 5 };
    }

    width = maxWidth() - margin.left - margin.right;
    height = maxHeight() - margin.top - margin.bottom;
    outerRadius = (maxWidth() - margin.top - margin.bottom) / 2;
    innerRadius = maxWidth() / 5;

    xScale = d3.scaleBand()
      .domain(data.map((d,i) => i))
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
            .attr('fill', legendColor(get(theme)))
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
              .attr('stroke-width', 3)
              .text((x, i) => `${x.toFixed(0)}${i ? '' : 'ft'}`)
            .clone(true)
              .attr('y', d => yScale(d))
            .selectAll(function() { return [this, this.previousSibling]; })
            .clone(true)
              .attr('class', 'y-axis-text')
              .attr("fill", legendColor(get(theme)))
              .attr("stroke", "none")));

    // line = d3.line()
    //   .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    //   .y(function(d) { return yScale(d.v); }) // set the y values for the line generator 
    //   .curve(d3.curveMonotoneX)

    // svg.append('g')
    //   .call(xAxis);

    line = d3.lineRadial()
      .curve(d3.curveNatural)
      .angle((d,i) => xScale(i))
      .radius(d => yScale(d.v));

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr("fill", 'none')
      .attr("stroke", lineStroke(get(theme)))
      .attr("stroke-width", 2)
      .attr("d", line);

    svg.append('g')
      .call(yAxis);

    // svg.selectAll('area')
    //   .data(data)
    //   .enter()
    //   .append('path')
    //     .attr('class', d => `line date-${d.key}`)
    //     .datum(d => d.values)
    //     .attr("fill", 'none')
    //     .attr("stroke", lineStroke(get(theme)))
    //     .attr("stroke-width", 2)
    //     .attr("d", line);
  });


  $: {
    d3.selectAll('.y-axis-label').attr('stroke', background($theme)).attr('fill', legendColor($theme));
    d3.selectAll('.y-axis').transition().attr('stroke', lineStroke($theme));
    d3.selectAll('.y-axis-text').transition().attr('fill', legendColor($theme));
    d3.selectAll('.x-axis').transition().attr('fill', lineStroke($theme));
    d3.selectAll('.line').transition().attr('stroke', lineStroke($theme));
  }

</script>


<div bind:clientWidth={w} class='flex justify-center'>
  <svg bind:this={el}></svg>
</div>