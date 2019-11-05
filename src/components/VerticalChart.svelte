<script>
	import { onMount } from 'svelte';
	import { theme, today, lastDay } from '../stores';
	import { get } from 'svelte/store';
	import * as d3 from 'd3';
	import Tooltip from './Tooltip.svelte';

	export let data;

  let legendData = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

	const max = d3.max(data.map(d => d.v));
  const min = d3.min(data.map(d => d.v));
  let minDate = d3.min(data.map(d => d.date));
  let maxDate = d3.max(data.map(d => d.date));

	let dataByDate = d3.nest()
  	.key(function(d) { return d.date; })
  	.entries(data);

  let days = dataByDate.map(d => d.key);
  let n = days.length;

  console.log(dataByDate);

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
  let legend;
  let legendScale;

	let visible = false;
	let tooltipX;
	let tooltipY;
	let text = '';

	const margin = { top: 30, right: 30, bottom: 230, left: 30 };

  const maxWidth = () => {
    if (w > 1000) {
      return 1000
    } else {
      return w;
    }
  }

  const legendWidth = () => {
    if (w < 450) {
      return w;
    } else {
      return 450;
    }
  }

  const maxHeight = () => {
    let h = (maxWidth()/1.63);
    if (h < 700) {
      return 700;
    } else {
      return h;
    }
  }

  const legendFormat = (t) => {
    if (t == 12) {
      return `${t}p`;
    } else if (t >12) {
      return `${t - 12}p`;
    } else {
      return `${t}a`;
    }
  }

	const lineStroke = (theme) => {
		if (theme == 'light') {
			return '#6a65d8';
		} else {
			return '#ffcdcd';
		}
	}

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

	onMount(() => {
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

    legendScale = d3.scaleBand()
      .domain(legendData)
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
        .attr('r', d => circleRadius(d.timeDec))
        .attr('fill', d => circleFill(get(theme), d.timeDec))
        .attr('stroke', d => circleStroke(get(theme), d.timeDec))
        .attr('stroke-width', 2)
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

    // legend = svg.append('g')
    //   .attr('transform', `translate(0,${height + 30})`);

    // legend.append('text')
    //   .attr('class', 'legend title')
    //   .attr('x', width / 2)
    //   .attr('y', 0-(margin.top/ 2))
    //   .attr('text-anchor', 'middle')
    //   .style('font-family', 'monospace')
    //   .attr('fill', lineStroke(get(theme)))
    //   .text('Legend');

    // legend.append('g')
    //   .attr('transform', `translate(${width/2 - legendWidth()/2}, ${margin.top})`)
    //   .call(d3.axisBottom(legendScale).tickFormat(legendFormat))
    //   .call(g => g.select('.domain').remove())
    //   .call(g => g.selectAll('.tick').selectAll('line').remove())
    //   .call(g => g.selectAll('.tick').selectAll('text').style('font-family', 'monospace'));

    //  legend.append('g')
    //   .attr('transform', `translate(${width/2 - legendWidth()/2}, ${margin.top + margin.top})`)
    //   .selectAll('.circle')
    //     .data(legendData)
    //     .enter()
    //     .append('circle')
    //     .attr('class', 'circle')
    //     .attr('cx', d => legendScale(d))
    //     .attr('cy', 0 - margin.top - 20)
    //     .attr('fill', d => circleFill(get(theme), d))
    //     .attr('stroke', d => circleStroke(get(theme), d))
    //     .attr('stroke-width', 2)
    //     .attr('r', d => circleRadius(d));
  });

  $: {
  	d3.selectAll('.line')
      .transition()
      .attr('stroke', lineStroke($theme));

    d3.selectAll('.circle')
      .transition()
      .attr('fill', d => circleFill(get(theme), d.timeDec))
      .attr('stroke', d => circleStroke(get(theme), d.timeDec));

    d3.selectAll('.legend.title')
      .transition()
      .attr('fill', d => lineStroke($theme));
	}

</script>


<div bind:clientWidth={w} bind:clientHeight={h} class='flex justify-center'>
	<svg bind:this={el}></svg>
  <Tooltip {tooltipX} {tooltipY} {visible} {text} />
</div>