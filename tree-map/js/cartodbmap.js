function main() {
       cartodb.createVis('map', 'https://gsimardmoore.cartodb.com/api/v2/viz/9421a668-eb9f-11e5-93a0-0ef7f98ade21/viz.json', {
           shareable: true,
           title: true,
           description: true,
           search: true,
           tiles_loader: true,
           infowindow: true,
           center_lat: 41.7334,
           center_lon: -74.0873,
           zoom: 17,
       })

       var infowindow = layer.getSubLayer(0).infowindow;
       infowindow.set('template_type', 'underscore');
       infowindow.set('template', $('#infowindow_template').html())

       .done(function(vis, layers) {
         // layer 0 is the base layer, layer 1 is cartodb layer
         // setInteraction is disabled by default
         layers[1].setInteraction(true);
         layers[1].on('featureOver', function(e, latlng, pos, data) {
           cartodb.log.log(e, latlng, pos, data);
         });
         // you can get the native map to work with it
         var map = vis.getNativeMap();
         // now, perform any operations you need
         // map.setZoom(3);
         // map.panTo([50.5, 30.5]);
       })

       .error(function(err) {
         console.log(err);
       });
     }
     window.onload = main;

     var densityLegend = new cdb.geo.ui.Legend.Density({
         		title:   "<a href='http://www.fbi.gov/about-us/cjis/ucr/ucr'>Data From FBI Crime Reporting 2013</a>",
            	left: "Low", right: "High", colors: [ "#FFFFB2", "#FED976", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C", "#B10026"  ]
            });
            $('#map').append(densityLegend.render().el);
            // Hide the legend for Violent crimes by default
            $(densityLegend.render().el).hide()
		    var densityLegendNon = new cdb.geo.ui.Legend.Density({
                title: "Data From FBI Crime Reporting 2013",
                left: "Low", right: "High", colors: [ "#FFFFCC", "#C7E9B4", "#7FCDBB", "#41B6C4", "#1D91C0", "#225EA8", "#0C2C84" ]
            });
            $('#map').append(densityLegendNon.render().el);


      cartodb.createLayer('map','https://gsimardmoore.cartodb.com/api/v2/viz/9421a668-eb9f-11e5-93a0-0ef7f98ade21/viz.json')
            .addTo(map)
            .done(function(layer) {
              $("li").on('click', function(e) {
                var num = +$(e.target).attr('data');
                createSelector(layer,num,$(e.target).hasClass('vio'));
              });
            })


  // Create layer selector
          function createSelector(layer,num,violent) {
           for (var i = 0; i < layer.getSubLayerCount(); i++) {
            if (i === num) {
              layer.getSubLayer(i).show();
            } else {
              layer.getSubLayer(i).hide();
            }
           }
           if (violent){
              $(densityLegendNon.render().el).hide()
              $(densityLegend.render().el).show()
           } else {
              $(densityLegend.render().el).hide()
              $(densityLegendNon.render().el).show()
           }
          }
