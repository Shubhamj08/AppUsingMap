
var latitude ;
var longtitude ;
x = document.getElementById("sometext");

window.onload = function (){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
  }else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
};



function showPosition(position) {
  latitude = position.coords.latitude ;
  longitude = position.coords.longitude;
  initMap(latitude, longitude);
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


function initMap(latitude, longitude){

  var myLoc = {lat: latitude, lng: longitude};
  var map = new google.maps.Map(document.getElementById("map"),
  {center:myLoc, zoom: 15});

  var marker = new google.maps.Marker({position:myLoc, map: map});

}
