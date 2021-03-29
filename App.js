
const apiKey = "fa38783c441f410b96b34219212203";
const button = document.getElementById("button");
const displayTemp = document.getElementById("Temperature");
const displayLoc = document.getElementById("coordinates");
const googleAPI = "AIzaSyAOMi8iUGXW3wEonKUyn5pfo02bv6V6FV0";
const pin = document.getElementById("pin");
button.addEventListener('click',getLocation)
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    displayTemp.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    var Latitude = position.coords.latitude;
    var Longitude = position.coords.longitude;
    fetchWeatherInfo(Latitude,Longitude);
    initMap(Latitude,Longitude)
    console.log("lat",Latitude,"Long",Longitude);

 
}
let map;

function initMap(Latitude,Longitude) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: Latitude, lng: Longitude },
    zoom: 18,
  });
}
async function fetchWeatherInfo(Latitude,Longitude){
    
     console.log("check");
     const apiCall = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${Latitude},${Longitude}&aqi=yes`)
     //const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&units=Metric&appid=${apiKey}`)
    const response = await apiCall.json();
    const currentTemp = response.current.temp_c;
    const city = response.location.name;
    console.log("currentTemp",currentTemp);
    console.log("City Name",city);
    displayLoc.innerHTML = city;
    displayTemp.innerHTML = "Current Temperature is approx. " + currentTemp+"C";
    pin.innerHTML = "You are Here!!";
  }






