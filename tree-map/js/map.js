var map;
var layer;
var forestPlots;
var uniqueTrees;
var forestArea;
var tID;
var infoWindow;
var chart;
var query;
var data;
var optionsSet = false;


//create initial map

function initMap() {
  map = new google.maps.Map(document.getElementById('googleForestMap'), {
    center: {lat: 41.73281, lng: -74.08724},
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    heading: 90,
    tilt: 45
  });

  infoWindow = new google.maps.InfoWindow();

//uniquetrees
  document.getElementById("dendrometerTrees").checked = true;
	document.getElementById("uniqueSpp").checked = false;
	document.getElementById("checkForestArea").checked = false;
  document.getElementById("checkForestPlots").checked = false;

//add fusion tables layers
  layer = new google.maps.FusionTablesLayer({
    styleId: 2,
    templateId: 2,
    suppressInfoWindows:true,
    query: {
      select: '"diameter (cm)"',
      from: '1owAo1SdifnYY7hV6s6EqJWQ9k4u4Hv-A2mxRakqu',
    },
  });

  forestArea = new google.maps.FusionTablesLayer({
    styleId: 2,
    templateId: 2,
    suppressInfoWindows: false,
    query: {
      select: '"name"',
      from: '1j5feXhx_RB41-5wTnu_XbLZ5Ex1RuRbB2typVH4O',
    },
  });

  uniqueTrees = new google.maps.FusionTablesLayer({
    styleId: 2,
    templateId: 2,
    suppressInfoWindows: false,
    query: {
      select: '"id"',
      from: '112nV7QTQ0p-jmfres_qpaPna_CgR-QGMR7RBer4o',
    },
  });

  forestPlots = new google.maps.FusionTablesLayer({
    styleId: 2,
    templateId: 2,
    suppressInfoWindows: false,
    query: {
      select: '"plot_id"',
      from: '1TNY9gc81gvE-0tcXXb9HTeEwqOSTryELyXl2CQAR',
    },
  });

  dendroToggle = function(){
    if (document.getElementById('dendrometerTrees').checked)
    {layer.setMap(map);}
    else
    {layer.setMap(null);}
  };

  uniqueSppToggle = function(){
    if (document.getElementById('uniqueSpp').checked)
    {uniqueTrees.setMap(map);}
    else
    {uniqueTrees.setMap(null);}
  };

  forestAreaToggle = function(){
    if (document.getElementById('checkForestArea').checked)
    {forestArea.setMap(map);}
    else
    {forestArea.setMap(null);}
  };

  forestPlotsToggle = function(){
    if (document.getElementById('checkForestPlots').checked)
    {forestPlots.setMap(map);}
    else
    {forestPlots.setMap(null);}
  };

  google.maps.event.addListener(layer, "click", openIW);

  layer.setMap(map);
};


function openIW(FTevent) {

  lat = FTevent.row['Latitude'].value;
  lon = FTevent.row['Longitude'].value;
  tID = FTevent.row['TreeID'].value;

  infoWindow.setOptions({
    content: FTevent.infoWindowHtml + '<div class="map-info-window"><div id="infoWindowChart"></div></div>',
    position: FTevent.latLng,
    pixelOffset: FTevent.pixelOffset,

  });

  initializeChart(tID);
  infoWindow.open(map);

};

//create growth charts for infowindow

/*	Created by Michael Tingey on 2016-04-01.
	Updated on 2016-04-19.
	Copyright © 2016 SUNY New Paltz. All rights reserved. */

google.charts.load("current", {packages:['corechart', 'table']});
//google.charts.setOnLoadCallback(initializeChart);


//-----------------------------------------------------------------------------
// Creates and sends a Query to the Fusion Table.
//-----------------------------------------------------------------------------
function initializeChart(tree_id) {
	query = new google.visualization.Query("https://www.google.com/fusiontables/gvizdata?tq=");
  var query_string = "SELECT 'Date', '"+tree_id+"' FROM 1-UxIFELz001J7cR2JCWN8EJDf7nXTrstXKaSUb5t ORDER BY 'Date'";
	query.setQuery(query_string);

	query.send(handleQueryResponse);
}

//-----------------------------------------------------------------------------
// Processes the QueryResponse.
//-----------------------------------------------------------------------------
function handleQueryResponse(response)
{
	if (response.isError())
	{
		alert("Error in query: " + response.getMessage() + " " + response.getDetailedMessage());

		return;
	}

	data = response.getDataTable();

	//----------------------------------------------------------------------------
	// Create and draw the LineChart.
	//----------------------------------------------------------------------------
	chart = new google.visualization.LineChart(document.getElementById('infoWindowChart'));

	chart.draw(data, {
		"title": "Tree Growth/Time",
		"backgroundColor": "none",
		"hAxis": {
			title: "Date",
			titleTextStyle: {
				color: "#3C2323"
			},
			slantedText: true,
			slantedTextAngle: 45,
		},
		"vAxis": {
			title: "Diameter (cm)",
			titleTextStyle: {
				color: "#3C2323"
			},
		},
		"pointSize": 5,
    "legend": {
      position: 'top'
    },
    "colors": ['#144333', '#3C2323', '#391101']
	});
}

//----------------------------------------------------------------------------
// Initializes the chart customization options.
//----------------------------------------------------------------------------
function initializeOptions()
{
	var minDate = data.getValue(0, 0);
	var maxDate = data.getValue(data.getNumberOfRows() - 1, 0);

	var minDateMonth;
	var maxDateMonth;
	var minDateDay;
	var maxDateDay;

	var minDateISO;
	var maxDateISO;

	// Store the month and day values of the min and max dates
	minDateMonth = minDate.getMonth() + 1;
	maxDateMonth = maxDate.getMonth() + 1;
	minDateDay = minDate.getDate();
	maxDateDay = maxDate.getDate();

	// Ensure the month and day values are 2 digits.
	if (minDateMonth < 10)
		minDateMonth = "0" + minDateMonth;
	if (maxDateMonth < 10)
		maxDateMonth = "0" + maxDateMonth;
	if (minDateDay < 10)
		minDateDay = "0" + minDateDay;
	if (maxDateDay < 10)
		maxDateDay = "0" + maxDateDay;

	// Generate the ISO strings (YYYY-MM-DD) for the min and max dates
	minDateISO = minDate.getFullYear() + "-" + minDateMonth + "-" + minDateDay;
	maxDateISO = maxDate.getFullYear() + "-" + maxDateMonth + "-" + maxDateDay;

	// Set the proper attributes for the input fields
	document.getElementById("startDate").min = minDateISO;
	document.getElementById("startDate").max = maxDateISO;
	document.getElementById("startDate").value = minDateISO;
	document.getElementById("endDate").min = minDateISO;
	document.getElementById("endDate").max = maxDateISO;
	document.getElementById("endDate").value = maxDateISO;
}

//----------------------------------------------------------------------------
// Updates the LineChart according to the customization options.
//----------------------------------------------------------------------------
function updateChart()
{
	min = new Date(document.getElementById("startDate").value);
	max = new Date(document.getElementById("endDate").value);

	// Set the minString to midnight on minDate and the maxString to midnight on the day after maxDate
	var minString = min.getFullYear() + "." + (min.getMonth() + 1) + "." + (min.getDate() + 1);
	var maxString = max.getFullYear() + "." + (max.getMonth() + 1) + "." + (max.getDate() + 2);

	query.setQuery("SELECT 'Date', '3379' FROM 1-UxIFELz001J7cR2JCWN8EJDf7nXTrstXKaSUb5t WHERE 'Date' >= '"
	+ minString + "' AND 'Date' <= '" + maxString + "' ORDER BY 'Date'");

	query.send(handleQueryResponse);
}

function pageload() {

}
