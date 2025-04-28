let inputValue = document.querySelector(".searchBox input");
let button = document.querySelector(".searchBox button");
let imges = document.querySelector(".imges");

let apiKey = 'c7671374c44bc18459c7d1591fa7f0a0';

async function getWeather(cityname) {
  let fetchDat = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}`);
  let respons = await fetchDat.json();
  console.log(respons);

  document.querySelector(".temp").innerHTML = Math.floor(respons.main.temp - 273.15) + "℃";
  document.querySelector(".country").innerHTML = respons.name;
  document.querySelector(".wind h3").innerHTML = `${respons.wind.speed} Km/h`;
  document.querySelector(".humidity h3").innerHTML = `${respons.main.humidity} %`;

  if (respons.weather[0].main === "Clouds") {
    imges.src = "images/clouds.png";
  } else if (respons.weather[0].main === "Clear") {
    imges.src = "images/clear.png";
  } else if (respons.weather[0].main === "Rain") {
    imges.src = "images/rain.png"; 
  } else if (respons.weather[0].main === "Mist") {
    imges.src = "images/mist.png"; 
  } else if (respons.weather[0].main === "Snow") {
    imges.src = "images/snow.png"; 
  } else if (respons.weather[0].main === "Drizzle") {
    imges.src = "images/drizzle.png"; 
  }
}

button.addEventListener("click", () => {
  let cityName = inputValue.value;
  getWeather(cityName);
  localStorage.setItem("lastCity", cityName);  // <<< هنا بنخزن اسم المدينة
});

window.addEventListener("load" ,()=> {
 if (localStorage.getItem("lastCity")) {
    getWeather(localStorage.getItem("lastCity"))
 } else {
    getWeather("new york")
 }
})