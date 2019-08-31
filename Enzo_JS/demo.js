const urlStates = "https://api.usa.gov/crime/fbi/sapi/api/agencies?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv";

// Fetch the JSON data and console log it
d3.json(urlStates).then(function(dataStates) {
  console.log(dataStates);
});


