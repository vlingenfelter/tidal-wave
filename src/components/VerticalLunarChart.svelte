<script>
	import { onMount } from 'svelte';
	import { theme, today, lastDay, lunar } from '../stores';
	import { get } from 'svelte/store';
	import * as d3 from 'd3';

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
  let radius = 7;

  // get all the days in question
  let days = dataByDate.map(d => d.key);
  let n = days.length;

  // variables for svg creation
	let el; // bound to the svg
	let w; // bound to the width of the svg container
  let h; // bound to the height of the svg container
	let width; // will be the adjusted width for the svg
	let height; 
  let circle;
  let projection;
  let path;
	let xScale;
	let yScale;
  let xAxis;
  let yName;
	let line;
	let svg;
  let lunarData;

	let margin = { top: 30, right: 30, bottom: 40, left: 30 };

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
    let h = (maxWidth()/2);
    if (h < 500) {
      return 500;
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

 const pathColor = (theme) => {
    if (theme == 'light') {
      return '#fff0f3';
    } else {
      return '#ffcdcd';
    }
  }

  const circleColor = (theme) => {
    if (theme == 'light') {
      return '#6a65d8';
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

  const outlineColor = (theme) => {
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

  const offsetPhase = (phase) => {
    let p = parseInt(phase);
    let diameter = 12;
    let n1 = 0;
    return 0;
  }

	onMount(() => {
    svg = d3.select(el)
    	.attr('height', maxHeight())
    	.attr('width',  maxWidth())
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    width = maxWidth() - margin.left - margin.right;
    height = maxHeight() - margin.top - margin.bottom;

    lunarData = get(lunar);

    if (maxWidth() < 450) {
      margin = { top: 30, right: 5, bottom: 40, left: 50 };
      n = parseInt(days.length/2);
      days = days.slice(0, n);
      dataByDate = dataByDate.filter(d => days.indexOf(d.key) >= 0);
      data = data.filter(d => days.indexOf(d.date) >= 0);

      lunarData = lunarData.slice(0,n);
      ranges = ranges.slice(0,n);
    }

    if (w > 1200) {
      radius = 9;
    }

    circle = d3.geoCircle();

    projection = d3.geoOrthographic()
          .scale(radius)
          .translate([0, 0]);

    path = d3.geoPath()
          .projection(projection);

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

    svg.selectAll('area')
      .data(ranges)
      .enter()
      .append('path')
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', lineStroke(get(theme)))
        .attr('stroke-width', 2)
        .attr('d', line);

    svg.selectAll('.label')
      .data(lunarData)
      .enter()
      .append('g')
        .attr('class', 'label')
        .attr('transform', d => `translate(${[xScale(d.date), height + (margin.bottom/2)]})`)
      .append('text')
        .attr('transform', d => 'rotate(-45)')
        .style('text-anchor', 'middle')
        .style('font-family', 'monospace')
        .attr('fill', legendColor(get(theme)))
        .text(d => formatter(d.date)); 

    let moons = svg.selectAll('.moon')
      .data(lunarData)
      .enter()
      .append('g')
        .attr('class', 'moon')
        .attr('transform', (d, i) => `translate(${[xScale(d.date), yScale(ranges[i][1].v) - (radius + 4)]})`);
    
    moons.append('circle')
      .attr('class', 'circle')
      .attr('fill', circleColor(get(theme)))
      .attr('r', radius)
      .attr('stroke', outlineColor(get(theme)))
      .attr('stroke-width', 2);

    moons.append('path')
      .attr('class', 'path')
      .attr('fill', pathColor(get(theme)))
      .attr('d', function (d){
        return path(circle.center([parseFloat(d.phase), 0])());
      });

  });
  
  // listen for theme change
  $: {
    // update the chart components
  	d3.selectAll('.line').transition().attr('stroke', lineStroke($theme));
    d3.selectAll('.circle').transition().attr('fill', circleColor($theme)).attr('stroke', outlineColor($theme));
    d3.selectAll('.path').transition().attr('fill', pathColor(get(theme)));
    d3.selectAll('.label').selectAll('text').transition().attr('fill', legendColor($theme))
	}

</script>


<div bind:clientWidth={w} bind:clientHeight={h} class='flex justify-center'>
	<svg bind:this={el}></svg>
</div>