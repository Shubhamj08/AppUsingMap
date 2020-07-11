function initMap(){

  var locations = [
    {lat: 28.656473, lng: 77.242943},
    {lat: 28.5245, lng: 77.1855},
    {lat: 28.6129, lng: 77.2295},
    {lat: 28.5535, lng: 77.2588},
    {lat: 28.6127, lng: 77.2773},
  ];

  var total_locations = locations.length;

  function latmean(){
    var sum = 0;
    for(var i =0; i<locations.length; i++){
      sum += locations[i].lat ;
    }
    return sum/locations.length ;
  }

  function lngmean(){
    var sum = 0;
    for(var i =0; i<locations.length; i++){
      sum += locations[i].lng ;
    }
    return sum/locations.length ;
  }

  var centerLoc = {lat: latmean(), lng: lngmean()};
  var map = new google.maps.Map(document.getElementById("map"),
  {center:centerLoc, zoom: 11});

  function addMarker(location) {
    var marker =  new google.maps.Marker({
      position: location,
      map: map,
      title: "click to zoom"
    });

    marker.addListener('click', function () {
      map.setCenter(marker.getPosition());
      map.setZoom(15);
    });

  }

  for (var i=0; i< locations.length; i++){
    var location = locations[i];

    addMarker(location);
  }

  map.addListener('center_changed', function () {
    window.setTimeout(function () {
      map.panTo(map.position);
    }, 5000);
  });

}
//var marker = new google.maps.Marker({position:myLoc, map: map});
// var markerCluster = new MarkerClusterer(map, markers,
//   {imagePath: 'C:\Users\sj951\github\AppUsingMap\clustersImages\m1.png'});
//
// }

//{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
