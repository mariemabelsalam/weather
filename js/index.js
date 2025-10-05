"use strict";

let searchInput = document.getElementById("search");
const apiKey = "40cf4636b04e481bb1d191617240412";


//today
let dayName = document.getElementById("dayName");
let month = document.getElementById("monthName");
let cityName = document.getElementById("cityName");
let todayTemp = document.getElementById("temp");
let icon = document.getElementById("icon");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("windDirection");
let waetherStatus = document.getElementById("status");


//tommorow
let displayTomorowName = document.getElementById("displayTomorowName");
let tommorowImage = document.getElementById("tommorowImage");
let tommorowMaxTemp = document.getElementById("tommorowMaxTemp");
let tommorowMinTemp = document.getElementById("tommorowMinTemp");
let tommorowStatus = document.getElementById("tommorowStatus");


//dayAfterTommorow
let displayDayAfterTommorowName = document.getElementById(
  "displayDayAfterTommorowName"
);
let dayAfterTommorowImage = document.getElementById("dayAfterTommorowImage");
let dayAfterTommorowMaxTemp = document.getElementById(
  "dayAfterTommorowMaxTemp"
);
let dayAfterTommorowMinTemp = document.getElementById(
  "dayAfterTommorowMinTemp"
);
let dayAfterTommorowStatus = document.getElementById("dayAfterTommorowStatus");



navigator.geolocation.getCurrentPosition((position) => {
  console.log(position.coords);
  let myLatitude = position.coords.latitude;
  let myLongitude = position.coords.longitude;
  getWeatherData(`${myLatitude},${myLongitude}`);
});


searchInput.addEventListener("input", function () {
  let city = searchInput.value;
  getWeatherData(city);
});

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`
    );

    if (response.ok) {
      const data = await response.json();
      displayWeatherData(data);
      displayTommorowData(data);
      displayDayAfterTommorowData(data);
    }
  } catch (error) {
    console.error("Error fetching weather data", error);
  }
}


function displayWeatherData(data) {
  let todayDate = data.current.last_updated;
  let myDateName = new Date(todayDate);
  let todayName = myDateName.toLocaleString("en-us", { weekday: "long" });
  let todayMonth = myDateName.toLocaleString("en-us", { month: "long" });
  let todayDay = myDateName.toLocaleString("en-us", { day: "numeric" });
  dayName.innerHTML = todayName;
  month.innerHTML = todayDay + todayMonth;
  cityName.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c;
  waetherStatus.innerHTML = data.current.condition.text;
  icon.setAttribute("src", data.current.condition.icon);
  humidity.innerHTML = data.current.humidity;
  wind.innerHTML = data.current.wind_kph;
  windDirection.innerHTML = data.current.wind_dir;
}


function displayTommorowData(data) {
  let tommorowDate = data.forecast.forecastday[1].date;
  let myTommoroweName = new Date(tommorowDate);
  console.log(myTommoroweName);
  let tommorowName = myTommoroweName.toLocaleString("en-us", {
    weekday: "long",
  });
  let todayMonth = myTommoroweName.toLocaleString("en-us", { month: "long" });
  let tommorowDay = myTommoroweName.toLocaleString("en-us", { day: "numeric" });
  displayTomorowName.innerHTML = tommorowName;
  month.innerHTML = tommorowDay + todayMonth;
  tommorowMaxTemp.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
  tommorowMinTemp.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
  tommorowImage.setAttribute(
    "src",
    data.forecast.forecastday[1].day.condition.icon
  );
  tommorowStatus.innerHTML = data.forecast.forecastday[1].day.condition.text;
}


function displayDayAfterTommorowData(data) {
  let dayAfterTommorowData = data.forecast.forecastday[2].date;
  let myTAfterTommorowDataName = new Date(dayAfterTommorowData);

  let tommorowName = myTAfterTommorowDataName.toLocaleString("en-us", {
    weekday: "long",
  });

  let todayMonth = myTAfterTommorowDataName.toLocaleString("en-us", {
    month: "long",
  });

  let tommorowDay = myTAfterTommorowDataName.toLocaleString("en-us", {
    day: "numeric",
  });
  displayDayAfterTommorowName.innerHTML = tommorowName;
  month.innerHTML = tommorowDay + todayMonth;
  dayAfterTommorowMaxTemp.innerHTML =
    data.forecast.forecastday[2].day.maxtemp_c;
  dayAfterTommorowMinTemp.innerHTML =
    data.forecast.forecastday[2].day.mintemp_c;
  dayAfterTommorowImage.setAttribute(
    "src",
    data.forecast.forecastday[2].day.condition.icon
  );
  dayAfterTommorowStatus.innerHTML =
    data.forecast.forecastday[2].day.condition.text;
}
