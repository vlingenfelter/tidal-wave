<script>
	import { onMount } from 'svelte';
	import { theme, today, lastDay } from '../stores';
	import { get } from 'svelte/store';
	import * as d3 from 'd3';
	import Tooltip from './Tooltip.svelte';

	export let data; // the dataset to be visualized

  const legendData = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]; // top row of legend
  const legendData2 = [19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5]; // bottom row of legend

  // statistics for making chart
	const max = d3.max(data.map(d => d.v));
  const min = d3.min(data.map(d => d.v));
  const minDate = d3.min(data.map(d => d.date));
  const maxDate = d3.max(data.map(d => d.date));

  // reformat data to be suitable for this chart
	let dataByDate = d3.nest()
  	.key(function(d) { return d.date; })
  	.entries(data);

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
  let legend;
  let legendScale;
  let legendScale2;
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

  // formatter for the legend (turns int to readable times)
  const legendFormat = (t) => {
    if (t == 12) {
      return `${t}p`;
    } else if (t==0) {
      return `12a`;
    } else if (t >12) {
      return `${t - 12}p`;
    } else {
      return `${t}a`;
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

  const legendColor = (theme) => {
    if (theme == 'light') {
      return '#000';
    } else {
      return '#fff';
    }
  }

  // update the circles based on theme and data circle represents
  const circleFill = (theme, timeDec) => {
    let day = (timeDec >= 6) && (timeDec <= 18);
    let light = (theme == 'light');
    if (day) { 
      if (light) {
        return '#fff0f3'; // light theme background color
      } else {
        return '#ffcdcd'; // dark theme stroke color
      }
    } else {
      if (light) {
        return '#6a65d8'; // light theme stroke color
      } else {
        return '#353941'; // dark theme background color
      }
    }
  } 

  const circleStroke = (theme, timeDec) => {
    let day = (timeDec >= 6) && (timeDec <= 18);
    let light = (theme == 'light');
    if (day) {
      if (light) {
        return '#6a65d8'; // light theme stroke color
      } else {
        return '#353941'; // dark theme background color
      }
    } else {
      if (light) {
        return '#fff0f3'; // light theme background color
      } else {
        return '#ffcdcd'; // dark theme stroke color
      }
    }
  }

  let circleRadius = (timeDec) => {
    const day = (timeDec >= 6) && (timeDec <= 18);
    const add = (maxWidth() == 1000) ? 4 : 0;
    if (day) {
      if (timeDec > 12) {
        return parseInt(21 - timeDec) + add; 
      } else {
        return parseInt(timeDec - 3) + add;
      }
    } else {
      if (timeDec < 6) {
        return parseInt(9 - timeDec) + add;
      } else {
        return parseInt(timeDec - 15) + add;
      }
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

    legendScale = d3.scaleBand()
      .domain(legendData)
      .range([0, legendWidth()])
      .padding(1);

    legendScale2 = d3.scaleBand()
      .domain(legendData2)
      .range([0, legendWidth()])
      .padding(1);

    yScale = d3.scaleLinear()
      .domain([min, max]) // input 
      .range([height, 0]); // output 

    yName = d3.scaleBand()
      .domain(days)
      .range([0, height])
      .padding(1);

    line = d3.line()
          .x(function(d) { return xScale(d.date); })
          .y(function(d) { return yScale(d.v); });

    // svg.append('g')
    //   .call(d3.axisLeft(yScale).tickFormat(t => `${t}ft`))
    //   .call(g => g.select('.domain')
    //     .attr('stroke', legendColor(get(theme))))
    //     //.remove())
    //   .call(g => g.selectAll('.tick')
    //     .selectAll('line')
    //     .attr('stroke', legendColor(get(theme))))
    //     //.remove())
    //   .call(g => g.selectAll('.tick')
    //     .selectAll('text')
    //     .attr('fill', legendColor(get(theme)))
    //     .style('font-size', '1.25em')
    //     .style('text-anchor', 'right')
    //     .style('font-family', 'monospace'));

    svg.append('rect')
      .attr('class', 'sea-level')
      .attr('x', xScale(0))
      .attr('y', yScale(0))
      .attr('width', width)
      .attr('height', 1.5)
      .attr('fill', lineStroke(get(theme)))
      .attr('stroke', 'none');

    svg.selectAll('area')
      .data(dataByDate)
      .enter()
      .append('path')
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
        .attr('r', d => circleRadius(d.timeDec))
        .attr('fill', d => circleFill(get(theme), d.timeDec))
        .attr('stroke', d => circleStroke(get(theme), d.timeDec))
        .attr('stroke-width', 2)
        .on('mousemove', d => {
          let thisDate = `${d.v} ft at ${d.time} on ${formatter(d.date)}`;
          tooltipX = d3.event.pageX - margin.right;
          tooltipY = d3.event.pageY - ((height - margin.top - margin.bottom)/2);
          visible = true;
          text = thisDate;
        })
        .on('mouseout', d => { 
          visible = false; 
          text = '';
        });

    legend = svg.append('g')
      .attr('transform', `translate(0,${height + 60})`);

    legend.append('rect')
      .attr('class', 'legend-rect')
      .attr('x', width/2 - legendWidth()/2)
      .attr('y', 0-margin.top-5)
      .attr('width', legendWidth())
      .attr('height', margin.top * 5 + 5)
      .attr('fill', 'none')
      .attr('stroke', lineStroke(get(theme)))
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '15 5');

    legend.append('text')
      .attr('class', 'legend title')
      .attr('x', width / 2)
      .attr('y', 0-(margin.top/ 2))
      .attr('text-anchor', 'middle')
      .style('font-family', 'monospace')
      .attr('fill', legendColor(get(theme)))
      .text('Legend');

    legend.append('g')
      .attr('transform', `translate(${width/2 - legendWidth()/2}, ${margin.top})`)
      .call(d3.axisBottom(legendScale).tickFormat(legendFormat))
      .call(g => g.select('.domain')
        .remove())
      .call(g => g.selectAll('.tick')
        .selectAll('line')
        .remove())
      .call(g => g.selectAll('.tick')
        .selectAll('text')
        .attr('fill', legendColor(get(theme)))
        .style('font-family', 'monospace'));

     legend.append('g')
      .attr('transform', `translate(${width/2 - legendWidth()/2}, ${margin.top * 2})`)
      .selectAll('.circle-legend')
        .data(legendData)
        .enter()
        .append('circle')
        .attr('class', 'circle-legend')
        .attr('cx', d => legendScale(d))
        .attr('cy', 0 - margin.top - 20)
        .attr('fill', d => circleFill(get(theme), d))
        .attr('stroke', d => circleStroke(get(theme), d))
        .attr('stroke-width', 2)
        .attr('r', d => circleRadius(d));

    legend.append('g')
      .attr('transform', `translate(${width/2 - legendWidth()/2}, ${margin.top * 3})`)
      .call(d3.axisBottom(legendScale2).tickFormat(legendFormat))
      .call(g => g.select('.domain')
        .remove())
      .call(g => g.selectAll('.tick')
        .selectAll('line')
        .remove())
      .call(g => g.selectAll('.tick')
        .selectAll('text')
        .attr('fill', legendColor(get(theme)))
        .style('font-family', 'monospace'));

     legend.append('g')
      .attr('transform', `translate(${width/2 - legendWidth()/2}, ${margin.top * 4})`)
      .selectAll('.circle-legend')
        .data(legendData2)
        .enter()
        .append('circle')
        .attr('class', 'circle-legend')
        .attr('cx', d => legendScale2(d))
        .attr('cy', 0 - margin.top - 20)
        .attr('fill', d => circleFill(get(theme), d))
        .attr('stroke', d => circleStroke(get(theme), d))
        .attr('stroke-width', 2)
        .attr('r', d => circleRadius(d));
  });
  
  // listen for theme change
  $: {
    // update the chart components
  	d3.selectAll('.line').transition().attr('stroke', lineStroke($theme));
    d3.selectAll('.sea-level').transition().attr('fill', lineStroke($theme));
    d3.selectAll('.circle').transition().attr('fill', d => circleFill(get(theme), d.timeDec))
      .attr('stroke', d => circleStroke(get(theme), d.timeDec));
    // update the legend components
    d3.selectAll('.circle-legend').transition()
      .attr('fill', d => circleFill(get(theme), d))
      .attr('stroke', d => circleStroke(get(theme), d));
    d3.selectAll('.legend-rect').transition().attr('stroke', lineStroke($theme));
    d3.selectAll('.legend.title').transition().attr('fill', legendColor($theme));
    d3.selectAll('.tick').selectAll('text').transition().attr('fill', legendColor($theme));
	}

</script>


<div bind:clientWidth={w} bind:clientHeight={h} class='flex justify-center'>
	<svg bind:this={el}></svg>
  <Tooltip {tooltipX} {tooltipY} {visible} {text} />
</div>