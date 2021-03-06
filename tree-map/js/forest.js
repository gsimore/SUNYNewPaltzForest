//fixed/scrolling navar

var navbar;

$(document).ready(function($) {

    // Fixa nav ao ultrapassa-lo
        navbar = $('#navbar-main'),
    		distance = navbar.offset().top,
        $window = $(window);

    $window.scroll(function() {
        if ($window.scrollTop() >= distance) {
            navbar.removeClass('navbar-fixed-top').addClass('navbar-fixed-top');
          	$("body").css("padding-top", "70px");
        } else {
            navbar.removeClass('navbar-fixed-top');
            $("body").css("padding-top", "0px");
        }
    });
});

$(document).ready(function() {

  $("navbar a").click(function(evn){
    evn.preventDefault();
    $('html, body').scrollTo(this.hash, this.hash);
  });

var aChildren = $("navbar li").children();
var aArray = [];
for (var i=0; i < aChildren.length; i++) {
    var aChild = aChildren[i];
    var ahref = $(aChild).attr('href');
    aArray.push(ahref);
}

$(window).scroll(function(){
       var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
       var windowHeight = $(window).height(); // get the height of the window
       var docHeight = $(document).height();

       for (var i=0; i < aArray.length; i++) {
           var theID = aArray[i];
           var divPos = $(theID).offset().top; // get the offset of the div from the top of page
           var divHeight = $(theID).height(); // get the height of the div in question
           if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
               $("a[href='" + theID + "']").addClass("nav-active");
           } else {
               $("a[href='" + theID + "']").removeClass("nav-active");
           }
       }
       if(windowPos + windowHeight == docHeight) {
                  if (!$("navbar li:last-child a").hasClass("nav-active")) {
                      var navActiveCurrent = $(".nav-active").attr("href");
                      $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                      $("navbar li:last-child a").addClass("nav-active");
                  }
              }
    });
});



//jquery slide up map info
$("#flip").click(function(){
    $("#map-info").slideToggle();
});

Highcharts.createElement('link', {
   href: 'http://fonts.googleapis.com/css?family=Signika:400,700',
   rel: 'stylesheet',
   type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

// Add the background image to the container

Highcharts.wrap(Highcharts.Chart.prototype, 'getContainer', function (proceed) {
   proceed.call(this);
   this.container.style.background = 'url(http://www.highcharts.com/samples/graphics/sand.png)';
});



Highcharts.theme = {
   colors: ["#BB3C1E", "#392E46", "#1F223A", "#2D4A34", "#AFD14C", "#D33614", "#395340",
      "#336400", "#653323", "#7798BF", "#93D14C"],
   chart: {
      backgroundColor: null,
      style: {
         fontFamily: "Signika, serif"
      }
   },
   title: {
      style: {
         color: '#1F223A',
         fontSize: '16px',
         fontWeight: 'bold'
      }
   },
   subtitle: {
      style: {
         color: 'black'
      }
   },
   tooltip: {
      borderWidth: 0
   },
   legend: {
      itemStyle: {
         fontWeight: 'bold',
         fontSize: '13px'
      }
   },
   xAxis: {
      labels: {
         style: {
            color: '#6e6e70'
         }
      }
   },
   yAxis: {
      labels: {
         style: {
            color: '#6e6e70'
         }
      }
   },
   plotOptions: {
      series: {
         shadow: true
      },
      candlestick: {
         lineColor: '#404048'
      },
      map: {
         shadow: false
      }
   },

   // Highstock specific
   navigator: {
      xAxis: {
         gridLineColor: '#D0D0D8'
      }
   },
   rangeSelector: {
      buttonTheme: {
         fill: 'white',
         stroke: '#C0C0C8',
         'stroke-width': 1,
         states: {
            select: {
               fill: '#D0D0D8'
            }
         }
      }
   },
   scrollbar: {
      trackBorderColor: '#C0C0C8'
   },

   // General
   background2: '#E0E0E8'

};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);


//carbon pi chart:
$(function () {

    var colors = Highcharts.getOptions().colors,
        categories = ['Forest Carbon', 'Campus Trees'],
        data = [{
            y: 98.67,
            color: colors[0],
            drilldown: {
                name: 'Carbon from Forest',
                categories: ['American beech','ostrya', 'carpinus', 'witch-hazel', 'black oak', 'juneberry', 'red maple', 'sugar maple', 'eastern hemlock', 'American elm', 'sweet birch', 'red oak', 'unknown', 'white oak', 'white ash', 'basswood', 'pignut hickory', 'sassafrass', 'swamp oak', 'bigtooth aspen', 'butternut', 'chestnut oak', 'quaking aspen', 'shagbark hickory'
								],
                data: [9.60,	3.31,	0.16,	0.09,	34.71,	0.50,	2.09,	0.10,	13.54,	0.40,	8.08,	17.14,	0.02,	3.78,	0.14,	0.73,	2.48,	0.63,	0.12,	0.30,	1.07,	0.00,	0.03,	0.99,],
                color: colors[3]
            }
        }, {
            y: 1.33,
            color: colors[2],
            drilldown: {
                name: 'Carbon from Campus Trees',
                categories: ['Trees on Campus'],
                data: [1.33],
                color: colors[1]
            }
        }],

        browserData = [],
        versionsData = [],
        i,
        j,
        dataLen = data.length,
        drillDataLen,
        brightness;


    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

        // add browser data
        browserData.push({
            name: categories[i],
            y: data[i].y,
            color: data[i].color
        });

        // add version data
        drillDataLen = data[i].drilldown.data.length;
        for (j = 0; j < drillDataLen; j += 1) {
            brightness = 0.2 - (j / drillDataLen) / 5;
            versionsData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.Color(data[i].color).brighten(brightness).get()
            });
        }
    }

    // Create the chart
    $('#carbChart').highcharts({
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Carbon By Tree Species'
        },
        subtitle: {
            text: 'Campus Trees vs. Forest Trees'
        },
        yAxis: {
            title: {
                text: 'Percent Carbon'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['51%', '49%']
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: 'Carbon',
            data: browserData,
            size: '60%',
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: '#ffffff',
                distance: -30
            }
        }, {
            name: 'Carbon by species',
            data: versionsData,
            size: '80%',
            innerSize: '60%',
            dataLabels: {
                formatter: function () {
                    // display only if larger than 1
                    return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                }
            }
        }]
    });
});


var totals_chart = $("#forest-chart");
var edge_chart = $("#forest-chart-edge");
var interior_chart = $("#forest-chart-interior");

function totals_button() {
  totals_chart.show("#forest-chart");
  edge_chart.hide("#forest-chart-edge");
  interior_chart.hide("#forest-chart-interior");
};

function edge_button() {
  totals_chart.hide("#forest-chart");
  edge_chart.show("#forest-chart-edge");
  interior_chart.hide("#forest-chart-interior");
};

function interior_button() {
  totals_chart.hide("#forest-chart");
  edge_chart.hide("#forest-chart-edge");
  interior_chart.show("#forest-chart-interior");
};

//total
var tree_data = document.getElementById('tree-data').innerHTML;
var tree_data_edge = document.getElementById('tree-data-edge').innerHTML;
var tree_data_interior = document.getElementById('tree-data-interior').innerHTML;

function lineChart(csv) {
  $('#forest-chart').highcharts({
    data: {
      csv: csv,
    },
    title: {
      text: 'Ranked Species Abundance'
    },
    subtitle: {
            text: 'Of South Forest',
    },
    yAxis: {
      title: {
        text: 'Relative Abundance'
      }
    }
  });
};

//edge
function lineChartEdge(csv) {
  $('#forest-chart-edge').highcharts({
    data: {
      csv: csv
    },
    title: {
      text: 'Ranked Species Abundance'
    },
    subtitle: {
            text: 'Of the South Forest Edge',
    },
    yAxis: {
      title: {
        text: 'Relative Abundance'
      }
    }
  });
};

//interior
function lineChartInterior(csv) {
  $('#forest-chart-interior').highcharts({
    data: {
      csv: csv
    },
    title: {
      text: 'Ranked Species Abundance'
    },
    subtitle: {
            text: 'Of the South Forest Interior',
    },
    yAxis: {
      title: {
        text: 'Relative Abundance'
      },
    },
  });
};

lineChart(tree_data);
lineChartEdge(tree_data_edge);
lineChartInterior(tree_data_interior);

//edge bar charts
var Density = $("#density-bar-chart");
var Carbon = $("#carbon-bar-chart");
var Basal_Area = $("#basal-bar-chart");

function carbon_button() {
  Density.hide("#density-bar-chart");
  Carbon.show("#carbon-bar-chart");
  Basal_Area.hide("#basal-bar-chart");
};

function density_button() {
  Density.show("#density-bar-chart");
  Carbon.hide("#carbon-bar-chart");
  Basal_Area.hide("#basal-bar-chart");
};

function basal_button() {
  Density.hide("#density-bar-chart");
  Carbon.hide("#carbon-bar-chart");
  Basal_Area.show("#basal-bar-chart");
};

var bar_density = document.getElementById('density-bar-data').innerHTML;
var bar_BA = document.getElementById('basal-bar-data').innerHTML;
var bar_Carbon = document.getElementById('carbon-bar-data').innerHTML;

function DensityBarChart(csv) {
  $('#density-bar-chart').highcharts({
    chart: {
      type: 'column'
    },
    data: {
      csv: csv,
    },
    title: {
      text: 'Tree Density'
    },
    subtitle: {
            text: 'South Forest Edge vs. Interior',
    },
    yAxis: {
      title: {
        text: 'Density (Trees/Ha)'
      },
    },
    //plotOptions: {
      //column:{
        //color: '#8085e9',
      //},
    //},
  });
};

//edge
function BasalBarChart(csv) {
  $('#basal-bar-chart').highcharts({
    chart: {
      type: 'column'
    },
    data: {
      csv: csv
    },
    title: {
      text: 'Basal Area'
    },
    subtitle: {
            text: 'South Forest Edge vs. Interior',
    },
    yAxis: {
      title: {
        text: 'Basal Area (sqm/Ha)'
      }
    }
  });
};

//interior
function CarbonBarChart(csv) {
  $('#carbon-bar-chart').highcharts({
    chart: {
      type: 'column'
    },
    data: {
      csv: csv
    },
    title: {
      text: 'Carbon',
    },
    subtitle: {
            text: 'South Forest Edge vs. Interior',
    },
    yAxis: {
      title: {
        text: 'Carbon density (kg/sqm)'
      },
    },
  });
};

DensityBarChart(bar_density);
BasalBarChart(bar_BA);
CarbonBarChart(bar_Carbon);

var hist_density = $("#historic-density-line-chart");
var hist_basal_area = $("#historic-basal-area-line-chart");

function hist_density_button() {
  hist_density.show("#historic-density-line-chart");
  hist_basal_area.hide("#historic-basal-area-line-chart");
};

function hist_ba_button() {
  hist_density.hide("#historic-density-line-chart");
  hist_basal_area.show("#historic-basal-area-line-chart");
};

var historic_density = document.getElementById('historic-density-line-data').innerHTML;
var historic_basal = document.getElementById('historic-basal-area-line-data').innerHTML;

//density chart
function HistoricDensityLineChart(csv) {
  $('#historic-density-line-chart').highcharts({
    data: {
      csv: csv,
    },
    title: {
      text: 'Tree Density from 1972-present'
    },
    subtitle: {
            text: 'South Forest',
    },
    yAxis: {
      title: {
        text: 'Density (sqm/Ha)'
      }
    }
  });
};

//basal area chart
function HistoricBasalLineChart(csv) {
  $('#historic-basal-area-line-chart').highcharts({
    data: {
      csv: csv
    },
    title: {
      text: 'Basal Area (1972-present)'
    },
    subtitle: {
            text: 'South Forest',
    },
    yAxis: {
      title: {
        text: 'Relative Abundance'
      }
    }
  });
};

HistoricDensityLineChart(historic_density);
HistoricBasalLineChart(historic_basal);
