var locations = [
  {lat: 28.656473, lng: 77.242943},
  {lat: 28.5245, lng: 77.1855},
  {lat: 28.6129, lng: 77.2295},
  {lat: 28.5535, lng: 77.2588},
  {lat: 28.6127, lng: 77.2773},
  {lat: 28.5933, lng: 77.2507}
];

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

var titles = ["Red Fort",
"Qutub Minar",
"India Gate",
"Lotus Temple",
"Akshardham",
"Humanyun\'s Tomb"];

var map;
var centerLoc;

function initMap(){

  centerLoc = {lat: latmean(), lng: lngmean()};
  map = new google.maps.Map(document.getElementById("map"),
  {center:centerLoc, zoom: 11});

  for (var i=0; i< locations.length; i++){
    addMarker(i);
  }

}

function addMarker(i) {
  var marker =  new google.maps.Marker({
    position: locations[i],
    map: map,
    title: "click to zoom"
  });

  var infoWindow = new google.maps.InfoWindow({
    content: '<h5>' + titles[i] + '</h5>' + '<p><i>lat: ' + locations[i].lat.toString() +
    '<br>lng: ' + locations[i].lng.toString() + '</i></p>'
  });

  clickListener(marker, infoWindow);
}

function clickListener(marker, infoWindow){
  marker.addListener('click', function () {
    map.setCenter(marker.getPosition());
    map.setZoom(15);
  });

  marker.addListener('mouseover', function (){
    infoWindow.open(map, marker);
  });

  marker.addListener('mouseout', function () {
    infoWindow.close();
  });

  document.getElementById('jumbo').addEventListener('click', function () {
    map.setCenter(centerLoc);
    map.setZoom(11);
  });
}
