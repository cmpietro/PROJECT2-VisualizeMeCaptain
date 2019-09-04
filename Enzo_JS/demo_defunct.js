// use JSON format to extract list of states
const urlStates = "https://api.usa.gov/crime/fbi/sapi/api/agencies?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv";

// Fetch the JSON data and console log it
d3.json(urlStates).then(function(dataStates) {
  console.log(dataStates);
});



// use JSON format to extract list of regions
const apiRegions = "https://api.usa.gov/crime/fbi/sapi/api/regions?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv";

// Fetch the JSON data and console log it
d3.json(apiRegions).then(function(regions) {
  console.log(regions);

  var regionNames = [];

for (var i = 0; i < regions.results.region_name.length; i++) {
    regionNames.push.apply(regionNames, regions.results.region_name.length[i]);
}
});


