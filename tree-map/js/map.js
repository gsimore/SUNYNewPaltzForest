
function initMap() {
  var map = new google.maps.Map(document.getElementById('googleForestMap'), {
    center: {lat: 41.73281, lng: -74.08724},
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    heading: 90,
    tilt: 45
  });

  var layer = new google.maps.FusionTablesLayer({
    query: {
      select: '"diameter (cm)"',
      from: '1owAo1SdifnYY7hV6s6EqJWQ9k4u4Hv-A2mxRakqu',
    },
      styles: [{
      where: '"diameter (cm)" > 30',
      markerOptions: {
        iconName: 'Itblu_blank',
      }
    }]
  });
  layer.setMap(map);
}
