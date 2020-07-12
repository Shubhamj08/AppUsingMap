
var lat;
var lng;
var locOn;

window.onload = function(){
  if(navigator.geolocation){
    if (navigator.geolocation) {
      locOn = true;
      navigator.geolocation.getCurrentPosition(findPosition, getErr);
    } else {
      locOn = false;
    }
  }
};

function getErr() {
  locOn = false;
}

function findPosition(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
}

var rF = 'The Red Fort is a historic fort in the city of Delhi in India that served as the main residence of the Mughal Emperors. Emperor Shah Jahan commissioned reconstruction of the Red Fort on 12 May 1638, when he decided to shift his capital from Agra to Delhi. Originally red and white,its design is credited to architect it was reconstructed between May 1639 and April 1648.'+
'On 15 August 1947, the first prime minister of India, Jawaharlal Nehru, raised the Indian national flag above the Lahori Gate. Every year on India\'s Independence Day (15 August), the prime minister hoists the Indian "tricolour flag" at the fort\'s main gate and delivers a nationally broadcast speech from its ramparts.';

var qM = 'The Qutb Minar, also spelled as Qutub Minar and Qutab Minar, is a minaret and "victory tower" that forms part of the Qutb complex, a UNESCO World Heritage Site in the Mehrauli area of Delhi, India. The height of Qutub Minar is 72.5 meters, making it the tallest minaret in the world built of bricks. The tower tapers, and has a 14.3 metres (47 feet) base diameter, reducing to 2.7 metres (9 feet) at the top of the peak. It contains a spiral staircase of 379 steps.';

var iG = 'The India Gate (originally the All India War Memorial) is a war memorial located astride the Rajpath, on the eastern edge of the "ceremonial axis" of New Delhi, formerly called Kingsway. It stands as a memorial to 70,000 soldiers of the British Indian Army who died in between 1914–1921 in the First World War, in France, Flanders, Mesopotamia, Persia, East Africa, Gallipoli and elsewhere in the Near and the Far East, and the third Anglo-Afghan War. 13,300 servicemen\'s names,'+ 'including some soldiers and officers from the United Kingdom, are inscribed on the gate. Designed by Sir Edwin Lutyens, the gate evokes the architectural style of the triumphal arch such as the Arch of Constantine, in Rome, and is often compared to the Arc de Triomphe in Paris, and the Gateway of India in Mumbai.';

var aD = 'Swaminarayan Akshardham (New Delhi) is a Hindu temple, and a spiritual-cultural campus in New Delhi, India. Also referred to as Akshardham Temple or Delhi Akshardham, the complex displays millennia of traditional Hindu and Indian culture, spirituality, and architecture. Inspired by Yogiji Maharaj and created by Pramukh Swami Maharaj, it was constructed by BAPS.'+
'The temple was officially opened on 6 November 2005 by Pramukh Swami Maharaj in the presence of Dr. A. P. J. Abdul Kalam, Manmohan Singh, L.K Advani and B.L Joshi. The temple, at the centre of the complex, was built according to the Vastu shastra and Pancharatra shastra.';

var lT = 'The Lotus Temple, located in Delhi, India, is a Baháʼí House of Worship that was dedicated in December 1986. Notable for its flowerlike shape, it has become a prominent attraction in the city. Like all Baháʼí Houses of Worship, the Lotus Temple is open to all, regardless of religion or any other qualification. The building is composed of 27 free-standing marble-clad "petals" arranged in clusters of three to form nine sides, with nine doors opening onto a central hall with a'+ 'height of slightly over 34.27 metres and a capacity of 2,500 people. The Lotus Temple has won numerous architectural awards and has been featured in many newspaper and magazine articles. A 2001 CNN report referred to it as the most visited building in the world.';

var hT = 'Humayun\'s tomb (Hindustani: Maqbara-i Humayun) is the tomb of the Mughal Emperor Humayun in Delhi, India. The tomb was commissioned by Humayun\'s first wife and chief consort, Empress Bega Begum (also known as Haji Begum), in 1569-70, and designed by Mirak Mirza Ghiyas and his son, Sayyid Muhammad, Persian architects chosen by her. It was the first garden-tomb on the Indian subcontinent, and is located in Nizamuddin East, Delhi, India, close to the' +
'Dina-panah Citadel, also known as Purana Qila (Old Fort), that Humayun found in 1533. It was also the first structure to use red sandstone at such a scale.';

//instance of all card elements
var card = document.getElementsByClassName("card");

var i;

for(i=0; i<card.length; i++){
  chooseCard(i);
}

//function to select which card is chosen
function chooseCard(i){
  card[i].addEventListener('click', function(){selectId(i);});
}

var text;
var focusedId;
var heading;

function selectId(i){
  switch(i){
    case 0: focusedId = rF;
    heading = "Red Fort";
    break;

    case 1: focusedId = qM;
    heading = "Qutub Minar";
    break;

    case 2: focusedId = iG;
    heading = "India Gate";
    break;

    case 3: focusedId = lT;
    heading = "Lotus Temple";
    break;

    case 4: focusedId = aD;
    heading = "Akshardham";
    break;

    case 5: focusedId = hT;
    heading = "Humanyun\'s Tomb";
    break;
  }
  //show info about the place
  showInfo();
  //get the zoom on the coordinates of clicked card
  setZoom(i);

  //distance from user's locations
  measureDistance(i);
}

function showInfo(){
  document.getElementById('header').innerHTML = "<h4>" + heading + "</h4>";
  document.getElementById('info').innerHTML = "<i>" + focusedId + "</i>";
}

function setZoom(i){
  map.setCenter(locations[i]);
  map.setZoom(15);
}

function measureDistance(i){
  var R = 6371e3; // metres
  var φ1 = lat * Math.PI/180; // φ, λ in radians
  var φ2 = locations[i].lat * Math.PI/180;
  var Δφ = (lat-locations[i].lat) * Math.PI/180;
  var Δλ = (lng-locations[i].lng) * Math.PI/180;

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
  Math.cos(φ1) * Math.cos(φ2) *
  Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var distance = (R * c)/1000; // in metres

  showDistance(distance, i);
}

function showDistance(distance, i){
  if(locOn){
    document.getElementById('latlng').innerHTML = 'lat: ' + locations[i].lat.toString() + ' lng: ' + locations[i].lng.toString() +
    '<br>Distance from your location: ' + distance.toFixed(2) + ' km';
  }else{
    document.getElementById('latlng').innerHTML = 'lat: ' + locations[i].lat.toString() + ' lng: ' + locations[i].lng.toString() +
    '<br>Please reload and provide location access to show distance from your location to place';
  }
}
