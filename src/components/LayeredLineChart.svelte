<script>
	import { onMount } from 'svelte';
	import { theme } from '../stores';
	import { get } from 'svelte/store';
	import * as d3 from 'd3';

	export let data;

  let dataByDate = d3.nest()
    .key(function(d) { return d.date; })
    .entries(data);

  let max = d3.max(data.map(d => d.v));
  let min = d3.min(data.map(d => d.v));
  let n = 24;

  let prev = [];
  let future = [];

  for (let i=0; i<dataByDate.length; i++) {
    let yesterday = dataByDate[i-1];
    if (yesterday !== undefined) {
      let y = yesterday.values.slice(-1)[0];
      prev.push({ timeDec: y.timeDec - 24, v: y.v })
    } else {
      prev.push(undefined);
    }

    let tomorrow = dataByDate[i+1];
    if (tomorrow !== undefined) {
      let t = tomorrow.values.slice(0,1)[0];
      future.push({ timeDec: t.timeDec + 24, v: t.v })
    } else {
      future.push(undefined);
    }
  }

  for (let i=0; i<dataByDate.length; i++){
    if (prev[i] !== undefined) {
      dataByDate[i].values.unshift(prev[i]);
    }
    if (future[i] !== undefined) {
      dataByDate[i].values.push(future[i]);
    }
  }

  // console.log(prev);
  // console.log(future);

  console.log(dataByDate);

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

	onMount(() => {
    svg = d3.select(el)
    	.attr('height', maxHeight())
    	.attr('width',  maxWidth())
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    if (maxWidth() < 450) {
      margin = { top: 30, right: 5, bottom: 30, left: 50 };
    }

    width = maxWidth() - margin.left - margin.right;
    height = maxHeight() - margin.top - margin.bottom;

    xScale = d3.scaleLinear()
    	.domain([0, n]) 
    	.range([0, width - margin.right]); 

    yScale = d3.scaleLinear()
    	.domain([min, max]) // input 
    	.range([height, 0]); // output 

    line = d3.line()
    	.x(function(d, i) { return xScale(d.timeDec); }) // set the x values for the line generator
    	.y(function(d) { return yScale(d.v); }) // set the y values for the line generator 
    	.curve(d3.curveMonotoneX)

    // svg.append('g')
    // 	.attr('transform', `translate(0,${height})`)
    // 	.call(d3.axisBottom(xScale))
    //   .call(g => g.selectAll('.tick')
    //     .selectAll('line')
    //     .attr('stroke', legendColor(get(theme))))
    //   .call(g => g.select('.domain')
    //     .attr('stroke', legendColor(get(theme))))
    //   .selectAll('text') 
    //     .attr('fill', legendColor(get(theme)))
    //     .style('font-size', '1.25em')
    //     .style('font-family', 'monospace');

    svg.append('rect')
      .attr('class', 'sea-level')
      .attr('x', xScale(0))
      .attr('y', yScale(0))
      .attr('width', width - margin.right)
      .attr('height', 1.5)
      .attr('fill', lineStroke(get(theme)))
      .attr('stroke', 'none');

    svg.append('g')
    	.call(d3.axisLeft(yScale).tickFormat(t => `${t}ft`))
      .call(g => g.select('.domain')
        // .attr('stroke', legendColor(get(theme))))
        .remove())
      .call(g => g.selectAll('.tick')
        .selectAll('line')
        // .attr('stroke', legendColor(get(theme))))
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

    svg.append("clipPath")
      .attr('id', 'clip')
      .append('rect')
      .attr("x", 0)            // position the x-centre
      .attr("y", 0)            // position the y-centre
      .attr('width', width - margin.right)
      .attr('height', height);

    svg.selectAll('path')
      .data(dataByDate)
      .enter()
      .append('path')
      	.datum(d => d.values) // 10. Binds data to the line 
        .attr("clip-path","url(#clip)")
      	.attr('class', 'line') // Assign a class for styling 
      	.attr('d', line)
      	.attr('fill', 'none')
      	.attr('stroke', lineStroke(get(theme)))
      	.attr('stroke-width', 1.25);
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
</div>