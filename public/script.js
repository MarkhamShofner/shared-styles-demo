//////////////////////////////////////////////////////////
///////       API CALL AND DOM MANIPULATION      /////////
//////////////////////////////////////////////////////////
$(document).ready(function() {
    console.log( "ready!" );
});

var styles = {
  mule: {
  },
  retrieve: function() {
    var self = this;
    var site = self.getUrlVar('site');
    $.ajax({
      // call to url with site id extractive from URL. Use site 422 if no site id in URL.
      url: "https://opendatadev.arcgis.com/api/v2/sites/" + (site ? site : "422")
    }).done(function(data) {
      console.log(data);
      self.extract(data);
      self.apply(data);
    });
  },
  extract: function(data) {
    this.mule.stylesheet = data.data.attributes.stylesheets.opendata.current;
    console.log(this.mule.stylesheet);
  },
  apply: function () {
    $('body').css('display', 'block');
    $('head').append('<link rel="stylesheet" href=' + this.mule.stylesheet + ' type="text/css" />');
  },
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return this.getUrlVars()[name];
  }
};

styles.retrieve();






//////////////////////////////////////////////////////////
//////////////////       LEAFLET     /////////////////////
//////////////////////////////////////////////////////////
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'shiftyshofner.okh88o37',
  accessToken: 'pk.eyJ1Ijoic2hpZnR5c2hvZm5lciIsImEiOiJjaW95amQ2eGowMXZudWZtNGh1dnZ0Z3F3In0.hsRaBxa8sODVT3Sl50E6cQ'
}).addTo(mymap);

//////////////////////////////////////////////////////////
///////////////////////    d3     ////////////////////////
//////////////////////////////////////////////////////////
var lineData = [{
  x: 1,
  y: 5
}, {
  x: 20,
  y: 20
}, {
  x: 40,
  y: 10
}, {
  x: 60,
  y: 40
}, {
  x: 80,
  y: 5
}, {
  x: 100,
  y: 60
}];

var vis = d3.select('#visualisation'),
  WIDTH = 500,
  HEIGHT = 200,
  MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  },
  xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function(d) {
    return d.x;
  }), d3.max(lineData, function(d) {
    return d.x;
  })]),
  yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function(d) {
    return d.y;
  }), d3.max(lineData, function(d) {
    return d.y;
  })]),
  xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(5)
  .tickSubdivide(true),
  yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(5)
  .orient('left')
  .tickSubdivide(true);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
  .call(xAxis);

vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
  .call(yAxis);

var lineFunc = d3.svg.line()
  .x(function(d) {
    return xRange(d.x);
  })
  .y(function(d) {
    return yRange(d.y);
  })
  .interpolate('linear');

vis.append('svg:path')
  .attr('d', lineFunc(lineData))
  .attr('stroke', 'blue')
  .attr('stroke-width', 2)
  .attr('fill', 'none');
