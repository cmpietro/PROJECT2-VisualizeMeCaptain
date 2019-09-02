// Map setup
var width = 1080,
    height = 500,
    active = d3.select(null);
    previous = d3.select(null);

var margin = {top: 60, right: 30, bottom: 60, left: 80};

var projection = d3.geoAlbersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]);

var path = d3.geoPath()
    .projection(projection);

var svg = d3.select("#map");

// Set up tooltips for map hover events
var tooltip_state = d3.select("body")
	.append("div")
  .attr("class", "tooltip")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("opacity", 0.0);

var tooltip_county = d3.select("body")
	.append("div")
  .attr("class", "tooltip")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("opacity", 0.0);

var tooltip_shooting = d3.select("body")
	.append("div")
  .attr("class", "tooltipShooting")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("opacity", 0.0);

// Stepped slider functionality adapted from the following: https://bl.ocks.org/shashank2104/d7051d80e43098bf9a48e9b6d3e10e73
var sliderMargin = {left: 30, right: 30},
    range = [2000, 2016],
    step = 2;

var slider = d3.select("#slider")
  .append('g')
  .classed('slider', true)
  .attr('transform', 'translate(' + (margin.left) +', '+ 10 + ')');

var xScale = d3.scaleLinear()
  .domain(range)
  .range([0, 840])
  .clamp(true);

var rangeValues = d3.range(range[0], range[1], step || 1)
  .concat(range[1]);
var xAxis = d3.axisBottom(xScale)
  .tickValues(rangeValues)
  .tickFormat(function (d) {
    return d;});

xScale.clamp(true);
// drag behavior initialization
var drag = d3.drag()
  .on('start.interrupt', function () {
    slider.interrupt();})
  .on('start drag', function () {
    dragged(d3.event.x);});

var track = slider.append('line').attr('class', 'track')
  .attr('x1', xScale.range()[0])
  .attr('x2', xScale.range()[1]);

var trackInset = d3.select(slider.node().appendChild(track.node().cloneNode()))   .attr('class', 'track-inset');

var ticks = slider.append('g').attr('class', 'ticks').attr('transform', 'translate(0, 4)')
  .call(xAxis);

// drag handle
var handle = slider.append('circle').classed('handle', true)
  .attr('r', 8);

var trackOverlay = d3.select(slider.node().appendChild(track.node().cloneNode())) .attr('class', 'track-overlay')
.call(drag);

function dragged(value) {
  var x = xScale.invert(value), index = null, midPoint, cx, xVal;
  if(step) {
    // if step has a value, compute the midpoint based on range values and reposition the slider based on the mouse position
    for (var i = 0; i < rangeValues.length - 1; i++) {
      if (x >= rangeValues[i] && x <= rangeValues[i + 1]) {
        index = i;
        break;
      }
    }
    midPoint = (rangeValues[index] + rangeValues[index + 1]) / 2;
    if (x < midPoint) {
      cx = xScale(rangeValues[index]);
      xVal = rangeValues[index];
    } else {
      cx = xScale(rangeValues[index + 1]);
      xVal = rangeValues[index + 1];
    }
  } else {
    // if step is null or 0, return the drag value as is
    cx = xScale(x);
    xVal = x.toFixed(3);
  }
  // use xVal as drag value
  handle.attr('cx', cx);
  // text.text('Value: ' + xVal);
  updateStates(xVal);
}

// Establish map elements, including state and county boundaries and mass shooting location points.
svg.append("rect")
    .attr("class", "background")
    .attr("fill","none")
    .attr("width", width)
    .attr("height", height)
    .on("click", reset);

var statePaths = svg.append("g")
    .style("stroke-width", "1.5px");

var countyPaths = svg.append("g")
    .style("stroke-width", "1.5px");

var shootingPoints = svg.append("g");
var pointScale = d3.scaleLinear().range([6,30]);

// Set starting year for map time slider
var year = '2000';

// Color scale for counties
var color = d3.scaleSequential(d3.interpolateReds).domain([0.0,30.0]);

// Variables to hold map data
var deathRates = {};
var counties;
var states;
var shootings;

// Initialize gun death category, state filter, and map scaling
var dType = 'Assault';
var stateFilter = 'National';
var scaleFactor = 1;

// Set up color gradient for legend
var legendSvg = d3.select('#legend-svg')
    .attr('width', 110)
    .attr('height', 210)
    .append('g')
    .attr('transform', 'translate(' + 0 + ',' +
    0 + ')');

var defs = legendSvg.append("defs");

var linearGradient = defs.append("linearGradient")
    .attr("id", "linear-gradient")
    .attr("gradientTransform", "rotate(90)");

linearGradient.selectAll("stop")
  .data(color.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: color(t) })))
  .enter().append("stop")
  .attr("offset", d => d.offset)
  .attr("stop-color", d => d.color);

legendSvg.append('g')
    .attr("transform", `translate(0,5)`)
    .append("rect")
    .attr('transform', `translate(0,5)`)
	.attr("width", 50)
	.attr("height", 200)
	.style("fill", "url(#linear-gradient)");

var legendscale = d3.scaleLinear()
    .range([5, 200])
    .domain(color.domain());

var legendaxis = d3.axisRight()
    .scale(legendscale)
    .tickSize(6)
    .ticks(8);

legendSvg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + (52) + "," + (5) + ")")
    .call(legendaxis);

d3.select("#massShootingLegend")
  .enter().append("circle")
  .attr("class","shootings")
  .attr("r",6);

// Establish queue for data loading and proceed when everything is complete
d3.queue()
  .defer(d3.json, './data/Counties_by_Year_by_Cat.json')
  .defer(d3.json, './data/US_Census_Counties_20180719.json')
  .defer(d3.json, './data/States_by_Year_by_Cat.json')
  .defer(d3.json, './data/US_Census_States_20m.json')
  .defer(d3.json, './data/mass_shooting_events.json')
  .await(ready);

function ready(error,deaths,county_features,state_deaths,state_features,shooting_events) {
  if(error) throw error;

  deathRates = deaths;
  counties = county_features;
  stateRates = state_deaths;
  states = state_features;
  shootings = shooting_events;
  // console.log(stateRates);
  // console.log(states);
  // console.log(shootings.features);

  // Create paths for county boundaries, bind data, and establish tooltip functionality
  countyPaths.selectAll("path")
    .data(counties.features)
    .enter().append("path")
    .attr("d", path)
    .attr("class", "counties")
    .on("click", reset)
    .on("mouseover", function(d){
      var rate;
      var msg;
      try{
        rate = deathRates[d.properties.County_Code][dType][year]['Death_Rate'];
        msg = parseFloat(rate).toFixed(3)+" per 100,000 population";
      }
      catch(err){
        rate = 0;
        msg = "Fewer than 10 deaths recorded"
      };
      return tooltip_county.style("opacity",0.85).html("County: "
      +d.properties.NAME+"<br>Year: "+year+"<br>Death Rate: "+msg);})
    .on("mousemove", function(){return tooltip_county.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltip_county.style("opacity", 0.0);});

  // Create paths for state boundaries, bind data, and establish tooltip functionality
  statePaths.selectAll("path")
    .data(states.features)
    .enter().append("path")
    .attr("d", path)
    .attr("name", function(d){
    return d.properties.NAME;})
    .attr("class", "feature")
    .on("click", clicked)
    .on("mouseover", function(d){
      var rate;
      var msg;
      try{
        rate = stateRates[d.properties.NAME][dType][year]['Death_Rate'];
        msg = parseFloat(rate).toFixed(3)+" per 100,000 population";
      }
      catch(err){
        rate = 0;
        msg = "Fewer than 10 deaths recorded"
      };
      return tooltip_state.style("opacity",0.85).html("State: "
      +d.properties.NAME+"<br>Year: "+year+"<br>Death Rate: "+msg);})
    .on("mousemove", function(){return tooltip_state.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltip_state.style("opacity", 0.0);});

  // Calculate domain for mass shooting point size scale
  var min = 3;
  var max = 0;
  for(i=0; i<shootings.features.length; i++){
    if(shootings.features[i].properties.Fatalities > max){
      max = shootings.features[i].properties.Fatalities;
    };
  };
  pointScale.domain([min,max]);

  // Add mass shooting points to map, bind data, and establish tooltip and time slider functionality
  shootingPoints.selectAll("circle")
    .data(shootings.features)
    .enter().append("circle")
    .attr("class","shootings")
    .attr("cx", function(d){return projection(d.geometry.coordinates)[0];})
    .attr("cy", function(d){return projection(d.geometry.coordinates)[1];})
    .attr("r", 0)
    // Bin shooting data into 2-year increments to match the state and county death data timeline
    .style("opacity",function(d){
      if(d.properties.Year == year){
        return 0.7;
      }
      else if(d.properties.Year == (year - 1)){
        return 0.7;
      }
      else{
        return 0.0;
      };})
    .style("pointer-events",function(d){
      if(d.properties.Year == year){
        return "auto";
      }
      else if(d.properties.Year == (year - 1)){
        return "auto";
      }
      else{
        return "none";
      };})
    .on("mouseover", function(d){
      return tooltip_shooting.style("opacity",0.85).html("Incident: "+d.properties.Case+"<br>Date: "+d.properties.Date+"<br>Location: "+d.properties.Location+"<br>Fatalities: "+d.properties.Fatalities);})
    .on("mousemove", function(){return tooltip_shooting.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltip_shooting.style("opacity", 0.0);});;

  shootingPoints.selectAll("circle")
    .transition().duration(750)
    .attr("r", function(d){return pointScale(d.properties.Fatalities)/scaleFactor;});

  // Create toggle to show/hide mass shooting points.
  d3.select('#showShootings').on("change",shootVis);
  shootVis();

  updateStates(year);

}

// Function to show and hide mass shooting points based on user input
function shootVis(){
  if(d3.select('#showShootings').property("checked")){
    shootingPoints.selectAll("circle")
    .transition().duration(750)
    .attr("r", function(d){
      return pointScale(d.properties.Fatalities)/scaleFactor;
    });
  }
  else{
    shootingPoints.selectAll("circle")
    // .style("opacity",0)
    .transition().duration(750)
    .attr("r", 0);
  };
}

// Function to update state, county, and shooting point data based on the year selected in the time slider.
function updateStates(x) {
  year = x.toString();

  countyPaths.selectAll(".counties")
    .data(counties.features)
    .style("fill", function(d){
    try{
      return color(deathRates[d.properties.County_Code][dType][year]['Death_Rate']);}
    catch(error){return 0;}
  });

  shootingPoints.selectAll(".shootings")
    .style("opacity",function(d){
      if(d.properties.Year == year){
        return 0.7;
      }
      else if(d.properties.Year == (year - 1)){
        return 0.7;
      }
      else{
        return 0.0;
      };
    })
    .style("pointer-events",function(d){
      if(d.properties.Year == year){
        return "auto";
      }
      else if(d.properties.Year == (year - 1)){
        return "auto";
      }
      else{
        return "none";
      };
    });
};

statePaths.raise();
shootingPoints.raise();

// Function to govern zoom behavior
function clicked(d) {
  if (active.node() === this) {
    stateFilter = 'National';
    // console.log(stateFilter);
    return reset();
  };
  statePaths.selectAll(".feature").style("fill","rgba(255,255,255,0.8)");

  active.classed("active", false);
  previous.style("fill","rgba(255,255,255,0.8)").style("pointer-events","auto");
  active = d3.select(this).classed("active", true).style("fill","rgba(255,255,255,0.01)").style("pointer-events","none");
  previous = active;
  stateFilter = this.getAttribute('name');

  var bounds = path.bounds(d),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = (bounds[0][0] + bounds[1][0]) / 2,
      y = (bounds[0][1] + bounds[1][1]) / 2,
      scale = .9 / Math.max(dx / width, dy / height),
      translate = [width / 2 - scale * x, height / 2 - scale * y];

  scaleFactor = scale;

  statePaths.transition()
      .duration(750)
      .style("stroke-width", 1.5 / scale + "px")
      .attr("transform", "translate(" + translate + ")scale(" + scale + ")");

  countyPaths.transition()
      .duration(750)
      .style("stroke-width", 1.5 / scale + "px")
      .attr("transform", "translate(" + translate + ")scale(" + scale + ")");

  shootingPoints.transition()
      .duration(750)
      .attr("transform", "translate(" + translate + ")scale(" + scale + ")");

  statePaths.selectAll(".feature")
    .transition().duration(750);

  countyPaths.selectAll(".counties")
    .transition().duration(750)
    .style("stroke-width",1/scale+"px");

  shootingPoints.selectAll(".shootings")
    .transition().duration(750)
    .attr("r",function(d){return pointScale(d.properties.Fatalities)/scaleFactor});

}

// Function to reset map view to national scale
function reset() {
  active.classed("active", false);
  active = d3.select(null);
  previous.style("pointer-events","auto");

  scaleFactor = 1;

  statePaths.transition()
      .duration(750)
      .style("stroke-width", "1px")
      .attr("transform", "");

  countyPaths.transition()
      .duration(750)
      .attr("transform", "");

  shootingPoints.transition()
      .duration(750)
      .attr("transform", "");

  statePaths.selectAll(".feature")
    .transition().duration(750)
    .style("fill","rgba(255,255,255,0.01)");

  countyPaths.selectAll(".counties")
      .transition().duration(750)
      .style("stroke-width", "0px");

  shootingPoints.selectAll(".shootings")
    .transition().duration(750)
    .attr("r",function(d){return pointScale(d.properties.Fatalities)/scaleFactor;});

}

// Filter death rate data based on death type selection from dropdown menu (Assault, Suicide, or Accident)
d3.select('#deathType')
  .on("change", function(){
  var sect = document.getElementById("deathType");
  dType = sect.options[sect.selectedIndex].value;
  updateStates(year);
  });
