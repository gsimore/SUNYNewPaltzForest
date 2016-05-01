var map;
var layer;
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
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    heading: 90,
    tilt: 45
  });

  infoWindow = new google.maps.InfoWindow();
//add fusion tables layer
  layer = new google.maps.FusionTablesLayer({
    styleId: 2,
    templateId: 2,
    suppressInfoWindows:true,
    query: {
      select: '"diameter (cm)"',
      from: '1owAo1SdifnYY7hV6s6EqJWQ9k4u4Hv-A2mxRakqu',
    },
      styles: [{
      where: '"diameter (cm)" >30',
      markerOptions: {
        iconName: 'Itblu_blank',
      }
    }]
  });

  google.maps.event.addListener(layer, "click", openIW);

  layer.setMap(map);
};

function openIW(FTevent) {
    lat = FTevent.row['Latitude'].value;
    lon = FTevent.row['Longitude'].value;
    tID = FTevent.row['TreeID'].value;
  infoWindow.setOptions({
    content: FTevent.infoWindowHtml +
      '<div id="infoWindowChart" style="width:300px; height:200px"></div>',
      position: FTevent.latLng,
      pixelOffset: FTevent.pixelOffset
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
		"backgroundColor": "#EEE",
		"hAxis": {
			title: "Date",
			titleTextStyle: {
				color: "red"
			},
			slantedText: true,
			slantedTextAngle: 90
		},
		"vAxis": {
			title: "Diameter (cm)",
			titleTextStyle: {
				color: "red"
			},
		},
		"pointSize": 5
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
