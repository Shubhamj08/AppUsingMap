
var latitude ;
var longtitude ;
x = document.getElementById("sometext");

window.onload = function (){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
};



function showPosition(position) {
  latitude = position.coords.latitude ;
  longitude = position.coords.longitude;
  //  x.innerHTML = position.coords.accuracy;
  initMap();
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
    x.innerHTML = "User denied the request for Geolocation.";
    break;
    case error.POSITION_UNAVAILABLE:
    x.innerHTML = "Location information is unavailable.";
    break;
    case error.TIMEOUT:
    x.innerHTML = "The request to get user location timed out.";
    break;
    case error.UNKNOWN_ERROR:
    x.innerHTML = "An unknown error occurred.";
    break;
  }
}


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
  {center:centerLoc, zoom: 12});

  var markers = locations.map(function (location){
    return new google.maps.Marker({
      position: location,
      map: map
    });
  });

}
//var marker = new google.maps.Marker({position:myLoc, map: map});
// var markerCluster = new MarkerClusterer(map, markers,
//   {imagePath: 'C:\Users\sj951\github\AppUsingMap\clustersImages\m1.png'});
//
// }

//{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
