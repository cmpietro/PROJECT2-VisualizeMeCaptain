// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its total_victims
function markerSize(total_victims) {
  return total_victims * 3000;
}

// Each city object contains the city's name, location and total_victims
var shootings = [
  {
    "case": "Dayton entertainment district shooting",
    total_victims: 36,
    "coordinates": [
      39.757312,
      -84.184947
    ]
  },
  {
    "case": "El Paso Walmart mass shooting",
    total_victims: 48,
    "coordinates": [
      31.771068,
      -106.375655
    ]
  },
  {
    "case": "Gilroy garlic festival shooting",
    total_victims: 15,
    "coordinates": [
      36.997191,
      -121.584819
    ]
  },
  {
    "case": "Virginia Beach municipal building shooting",
    total_victims: 16,
    "coordinates": [
      36.75442,
      -76.060378
    ]
  },
  {
    "case": "Harry Pratt Co. warehouse shooting",
    total_victims: 11,
    "coordinates": [
      41.753725,
      -88.331057
    ]
  },
  {
    "case": "Pennsylvania hotel bar shooting",
    total_victims: 4,
    "coordinates": [
      40.785142,
      -77.839411
    ]
  },
  {
    "case": "SunTrust bank shooting",
    total_victims: 5,
    "coordinates": [
      27.471043,
      -81.45847
    ]
  },
  {
    "case": "Mercy Hospital shooting",
    total_victims: 3,
    "coordinates": [
      41.847667,
      -87.622009
    ]
  },
  {
    "case": "Thousand Oaks nightclub shooting",
    total_victims: 34,
    "coordinates": [
      34.176946,
      -118.874793
    ]
  },
  {
    "case": "Tree of Life synagogue shooting",
    total_victims: 17,
    "coordinates": [
      40.443898,
      -79.921398
    ]
  },
  {
    "case": "Rite Aid warehouse shooting",
    total_victims: 6,
    "coordinates": [
      39.455658,
      -76.208485
    ]
  },
  {
    "case": "T&T Trucking shooting",
    total_victims: 5,
    "coordinates": [
      35.349388,
      -118.916335
    ]
  },
  {
    "case": "Fifth Third Center shooting",
    total_victims: 5,
    "coordinates": [
      39.101981,
      -84.511782
    ]
  },
  {
    "case": "Capital Gazette shooting",
    total_victims: 7,
    "coordinates": [
      38.994548,
      -76.543657
    ]
  },
  {
    "case": "Santa Fe High School shooting",
    total_victims: 23,
    "coordinates": [
      29.392825,
      -95.141972
    ]
  },
  {
    "case": "Waffle House shooting",
    total_victims: 8,
    "coordinates": [
      36.052521,
      -86.616944
    ]
  },
  {
    "case": "Yountville veterans home shooting",
    total_victims: 3,
    "coordinates": [
      38.392496,
      -122.366528
    ]
  },
  {
    "case": "Marjory Stoneman Douglas High School shooting",
    total_victims: 34,
    "coordinates": [
      26.30483,
      -80.269511
    ]
  },
  {
    "case": "Pennsylvania carwash shooting",
    total_victims: 5,
    "coordinates": [
      40.052151,
      -79.389166
    ]
  },
  {
    "case": "Rancho Tehama shooting spree",
    total_victims: 15,
    "coordinates": [
      40.018759,
      -122.393089
    ]
  },
  {
    "case": "Texas First Baptist Church massacre",
    total_victims: 46,
    "coordinates": [
      29.273282,
      -98.056488
    ]
  },
  {
    "case": "Walmart shooting in suburban Denver",
    total_victims: 3,
    "coordinates": [
      39.876374,
      -104.986132
    ]
  },
  {
    "case": "Edgewood businees park shooting",
    total_victims: 6,
    "coordinates": [
      39.452189,
      -76.309988
    ]
  },
  {
    "case": "Las Vegas Strip massacre*",
    total_victims: 58,
    "coordinates": [
      36.095739,
      -115.171544
    ]
  },
  {
    "case": "San Francisco UPS shooting",
    total_victims: 5,
    "coordinates": [
      37.765947,
      -122.406087
    ]
  },
  {
    "case": "Pennsylvania supermarket shooting",
    total_victims: 3,
    "coordinates": [
      41.529546,
      -75.94722
    ]
  },
  {
    "case": "Florida awning manufacturer shooting",
    total_victims: 5,
    "coordinates": [
      28.580295,
      -81.294086
    ]
  },
  {
    "case": "Rural Ohio nursing home shooting",
    total_victims: 3,
    "coordinates": [
      39.959034,
      -82.596508
    ]
  },
  {
    "case": "Fresno downtown shooting",
    total_victims: 3,
    "coordinates": [
      36.746378,
      -119.800319
    ]
  },
  {
    "case": "Fort Lauderdale airport shooting",
    total_victims: 11,
    "coordinates": [
      26.072751,
      -80.143382
    ]
  },
  {
    "case": "Cascade Mall shooting",
    total_victims: 5,
    "coordinates": [
      48.461367,
      -122.337918
    ]
  },
  {
    "case": "Baton Rouge police shooting",
    total_victims: 6,
    "coordinates": [
      30.433601,
      -91.081403
    ]
  },
  {
    "case": "Dallas police shooting",
    total_victims: 16,
    "coordinates": [
      32.7801052,
      -96.8000082
    ]
  },
  {
    "case": "Orlando nightclub massacre",
    total_victims: 102,
    "coordinates": [
      28.519718,
      -81.376777
    ]
  },
  {
    "case": "Excel Industries mass shooting",
    total_victims: 17,
    "coordinates": [
      38.135992,
      -97.425145
    ]
  },
  {
    "case": "Kalamazoo shooting spree",
    total_victims: 8,
    "coordinates": [
      42.236689,
      -85.674795
    ]
  },
  {
    "case": "San Bernardino mass shooting",
    total_victims: 35,
    "coordinates": [
      34.075961,
      -117.27789
    ]
  },
  {
    "case": "Planned Parenthood clinic",
    total_victims: 12,
    "coordinates": [
      38.881031,
      -104.849057
    ]
  },
  {
    "case": "Colorado Springs shooting rampage",
    total_victims: 3,
    "coordinates": [
      38.83755,
      -104.814251
    ]
  },
  {
    "case": "Umpqua Community College shooting",
    total_victims: 18,
    "coordinates": [
      43.289538,
      -123.333193
    ]
  },
  {
    "case": "Chattanooga military recruitment center",
    total_victims: 7,
    "coordinates": [
      35.047157,
      -85.311819
    ]
  },
  {
    "case": "Charleston Church Shooting",
    total_victims: 10,
    "coordinates": [
      32.788387,
      -79.933143
    ]
  },
  {
    "case": "Trestle Trail bridge shooting",
    total_victims: 4,
    "coordinates": [
      44.204124,
      -88.467541
    ]
  },
  {
    "case": "Marysville-Pilchuck High School shooting",
    total_victims: 6,
    "coordinates": [
      48.050824,
      -122.176918
    ]
  },
  {
    "case": "Isla Vista mass murder",
    total_victims: 19,
    "coordinates": [
      34.436283,
      -119.8714406
    ]
  },
  {
    "case": "Fort Hood shooting 2",
    total_victims: 15,
    "coordinates": [
      31.141716,
      -97.777559
    ]
  },
  {
    "case": "Alturas tribal shooting",
    total_victims: 6,
    "coordinates": [
      41.487104,
      -120.542237
    ]
  },
  {
    "case": "Washington Navy Yard shooting",
    total_victims: 20,
    "coordinates": [
      38.874981,
      -76.99453
    ]
  },
  {
    "case": "Hialeah apartment shooting",
    total_victims: 7,
    "coordinates": [
      25.864338,
      -80.311775
    ]
  },
  {
    "case": "Santa Monica rampage",
    total_victims: 9,
    "coordinates": [
      34.008617,
      -118.494754
    ]
  },
  {
    "case": "Pinewood Village Apartment shooting",
    total_victims: 5,
    "coordinates": [
      47.3129607,
      -122.3393665
    ]
  },
  {
    "case": "Mohawk Valley shootings",
    total_victims: 7,
    "coordinates": [
      43.045601,
      -74.984891
    ]
  },
  {
    "case": "Sandy Hook Elementary massacre",
    total_victims: 29,
    "coordinates": [
      41.4123225,
      -73.31142358
    ]
  },
  {
    "case": "Accent Signage Systems shooting",
    total_victims: 8,
    "coordinates": [
      44.977425,
      -93.310408
    ]
  },
  {
    "case": "Sikh temple shooting",
    total_victims: 10,
    "coordinates": [
      42.8858503,
      -87.8631362
    ]
  },
  {
    "case": "Aurora theater shooting",
    total_victims: 82,
    "coordinates": [
      39.706038,
      -104.820594
    ]
  },
  {
    "case": "Seattle cafe shooting",
    total_victims: 7,
    "coordinates": [
      47.6038321,
      -122.3300624
    ]
  },
  {
    "case": "Oikos University killings",
    total_victims: 10,
    "coordinates": [
      37.8043808,
      -122.2708166
    ]
  },
  {
    "case": "Su Jung Health Sauna shooting",
    total_victims: 5,
    "coordinates": [
      33.9412127,
      -84.2135309
    ]
  },
  {
    "case": "Seal Beach shooting",
    total_victims: 9,
    "coordinates": [
      33.741176,
      -118.1046356
    ]
  },
  {
    "case": "IHOP shooting",
    total_victims: 12,
    "coordinates": [
      39.1637984,
      -119.7674034
    ]
  },
  {
    "case": "Tucson shooting",
    total_victims: 19,
    "coordinates": [
      32.335941,
      -110.975132
    ]
  },
  {
    "case": "Hartford Beer Distributor shooting",
    total_victims: 11,
    "coordinates": [
      41.798764,
      -72.570068
    ]
  },
  {
    "case": "Coffee shop police killings",
    total_victims: 5,
    "coordinates": [
      47.15277,
      -122.467308
    ]
  },
  {
    "case": "Fort Hood massacre",
    total_victims: 43,
    "coordinates": [
      31.135557,
      -97.783664
    ]
  },
  {
    "case": "Binghamton shootings",
    total_victims: 18,
    "coordinates": [
      42.099802,
      -75.917723
    ]
  },
  {
    "case": "Carthage nursing home shooting",
    total_victims: 11,
    "coordinates": [
      35.333434,
      -79.414592
    ]
  },
  {
    "case": "Atlantis Plastics shooting",
    total_victims: 7,
    "coordinates": [
      37.76721,
      -87.5573742
    ]
  },
  {
    "case": "Northern Illinois University shooting",
    total_victims: 26,
    "coordinates": [
      41.9294736,
      -88.7503647
    ]
  },
  {
    "case": "Kirkwood City Council shooting",
    total_victims: 8,
    "coordinates": [
      38.580093,
      -90.40691
    ]
  },
  {
    "case": "Westroads Mall shooting",
    total_victims: 13,
    "coordinates": [
      41.265719,
      -96.067495
    ]
  },
  {
    "case": "Crandon shooting",
    total_victims: 7,
    "coordinates": [
      45.5719072,
      -88.9028922
    ]
  },
  {
    "case": "Virginia Tech massacre",
    total_victims: 55,
    "coordinates": [
      37.2295733,
      -80.4139393
    ]
  },
  {
    "case": "Trolley Square shooting",
    total_victims: 10,
    "coordinates": [
      40.7606467,
      -111.89109
    ]
  },
  {
    "case": "Amish school shooting",
    total_victims: 11,
    "coordinates": [
      39.9589,
      -76.0806
    ]
  },
  {
    "case": "Capitol Hill massacre",
    total_victims: 9,
    "coordinates": [
      47.6229,
      -122.3165
    ]
  },
  {
    "case": "Goleta postal shootings",
    total_victims: 8,
    "coordinates": [
      34.425571,
      -119.866069
    ]
  },
  {
    "case": "Red Lake massacre",
    total_victims: 15,
    "coordinates": [
      47.876346,
      -95.0169401
    ]
  },
  {
    "case": "Living Church of God shooting",
    total_victims: 11,
    "coordinates": [
      43.0605671,
      -88.1064787
    ]
  },
  {
    "case": "Damageplan show shooting",
    total_victims: 12,
    "coordinates": [
      39.9622601,
      -83.0007065
    ]
  },
  {
    "case": "Lockheed Martin shooting",
    total_victims: 15,
    "coordinates": [
      32.410842,
      -88.634539
    ]
  },
  {
    "case": "Navistar shooting",
    total_victims: 9,
    "coordinates": [
      41.908163,
      -87.879908
    ]
  },
  {
    "case": "Wakefield massacre",
    total_victims: 7,
    "coordinates": [
      42.500429,
      -71.075913
    ]
  },
  {
    "case": "Hotel shooting",
    total_victims: 8,
    "coordinates": [
      27.966479,
      -82.570586
    ]
  },
  {
    "case": "Xerox killings",
    total_victims: 7,
    "coordinates": [
      21.320063,
      -157.876462
    ]
  },
  {
    "case": "Wedgwood Baptist Church shooting",
    total_victims: 15,
    "coordinates": [
      32.664511,
      -97.384246
    ]
  },
  {
    "case": "Atlanta day trading spree killings",
    total_victims: 22,
    "coordinates": [
      33.850116,
      -84.377839
    ]
  },
  {
    "case": "Columbine High School massacre",
    total_victims: 37,
    "coordinates": [
      39.604034,
      -105.074103
    ]
  },
  {
    "case": "Thurston High School shooting",
    total_victims: 29,
    "coordinates": [
      44.0462362,
      -123.0220289
    ]
  },
  {
    "case": "Westside Middle School killings",
    total_victims: 15,
    "coordinates": [
      35.8209895,
      -90.6682606
    ]
  },
  {
    "case": "Connecticut Lottery shooting",
    total_victims: 6,
    "coordinates": [
      41.6856325,
      -72.72983827
    ]
  },
  {
    "case": "Caltrans maintenance yard shooting",
    total_victims: 7,
    "coordinates": [
      33.7877944,
      -117.8531119
    ]
  },
  {
    "case": "R.E. Phelon Company shooting",
    total_victims: 7,
    "coordinates": [
      33.5598586,
      -81.721952
    ]
  },
  {
    "case": "Fort Lauderdale revenge shooting",
    total_victims: 7,
    "coordinates": [
      26.119269,
      -80.104119
    ]
  },
  {
    "case": "Walter Rossler Company massacre",
    total_victims: 6,
    "coordinates": [
      27.828025,
      -97.548198
    ]
  },
  {
    "case": "Air Force base shooting",
    total_victims: 28,
    "coordinates": [
      47.61864486,
      -117.6483587
    ]
  },
  {
    "case": "Chuck E. Cheese's killings",
    total_victims: 5,
    "coordinates": [
      39.675599,
      -104.844845
    ]
  },
  {
    "case": "Long Island Rail Road massacre",
    total_victims: 25,
    "coordinates": [
      40.7267682,
      -73.6342955
    ]
  },
  {
    "case": "Luigi's shooting",
    total_victims: 12,
    "coordinates": [
      35.0529931,
      -78.8787058
    ]
  },
  {
    "case": "101 California Street shootings",
    total_victims: 15,
    "coordinates": [
      37.792968,
      -122.397973
    ]
  },
  {
    "case": "Watkins Glen killings",
    total_victims: 5,
    "coordinates": [
      42.3810555,
      -76.8705777
    ]
  },
  {
    "case": "Lindhurst High School shooting",
    total_victims: 14,
    "coordinates": [
      39.07868761,
      -121.5475762
    ]
  },
  {
    "case": "Royal Oak postal shootings",
    total_victims: 10,
    "coordinates": [
      42.4894801,
      -83.1446485
    ]
  },
  {
    "case": "University of Iowa shooting",
    total_victims: 7,
    "coordinates": [
      41.6606893,
      -91.5302214
    ]
  },
  {
    "case": "Luby's massacre",
    total_victims: 44,
    "coordinates": [
      31.1171194,
      -97.7277959
    ]
  },
  {
    "case": "GMAC massacre",
    total_victims: 14,
    "coordinates": [
      30.3321838,
      -81.655651
    ]
  },
  {
    "case": "Standard Gravure shooting",
    total_victims: 21,
    "coordinates": [
      38.2542376,
      -85.759407
    ]
  },
  {
    "case": "Stockton schoolyard shooting",
    total_victims: 35,
    "coordinates": [
      37.9577016,
      -121.2907796
    ]
  },
  {
    "case": "ESL shooting",
    total_victims: 11,
    "coordinates": [
      37.3688301,
      -122.0363496
    ]
  },
  {
    "case": "Shopping centers spree killings",
    total_victims: 20,
    "coordinates": [
      28.0331886,
      -80.6429695
    ]
  },
  {
    "case": "United States Postal Service shooting",
    total_victims: 21,
    "coordinates": [
      35.6672015,
      -97.42937037
    ]
  },
  {
    "case": "San Ysidro McDonald's massacre",
    total_victims: 41,
    "coordinates": [
      32.5520013,
      -117.0430813
    ]
  },
  {
    "case": "Dallas nightclub shooting",
    total_victims: 7,
    "coordinates": [
      32.925166,
      -96.838676
    ]
  },
  {
    "case": "Welding shop shooting",
    total_victims: 11,
    "coordinates": [
      25.796491,
      -80.226683
    ]
  }
]

// Loop through the shootings array and create one marker for each city object
for (var i = 0; i < shootings.length; i++) {
  L.circle(shootings[i].coordinates, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: "blue",
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its total_victims
    radius: markerSize(shootings[i].total_victims)
  }).bindPopup("<h1>" + shootings[i].case + "</h1> <hr> <h3>Total Victims: " + shootings[i].total_victims + "</h3>").addTo(myMap);
}
