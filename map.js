function initMap(){

  var locations = [
    {lat: 28.656473, lng: 77.242943},
    {lat: 28.5245, lng: 77.1855},
    {lat: 28.6129, lng: 77.2295},
    {lat: 28.5535, lng: 77.2588},
    {lat: 28.6127, lng: 77.2773},
    {lat: 28.5933, lng: 77.2507}
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

  var titles = ["Red Fort",
  "Qutub Minar",
  "India Gate",
  "Lotus Temple",
  "Akshardham",
  "Humanyun\'s Tomb"];

  function addMarker(location, i) {
    var marker =  new google.maps.Marker({
      position: location,
      map: map,
      title: "click to zoom"
    });

    var infoWindow = new google.maps.InfoWindow({
      content: '<h5>' + titles[i] + '</h5>' + '<p><i>lat: ' + location.lat.toString() + '<br>lng: ' + location.lng.toString() + '</i></p>'
    });

    clickListener(marker, map, infoWindow);

  }

  for (var i=0; i< locations.length; i++){
    var location = locations[i];

    addMarker(location, i);
  }

  function clickListener(marker, map, infoWindow){
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
  }

}
