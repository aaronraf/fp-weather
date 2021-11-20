let search = document.getElementById("search");
let searchBar = document.getElementById("searchBar");

const getLocation = async (query) => {
  const data = await fetch(
    `https://www.metaweather.com/api/location/search/?query=${query}`
  )
    .then(async (res) => await res.json())
    .then(async (json) => await json);
  return data;
};

const getWeather = async (woeid) => {
  const data = await fetch(`https://www.metaweather.com/api/location/${woeid}`)
    .then((res) => res.json())
    .then((json) => json);
  return data;
};

const getUserPosition = () => {
  window.navigator.geolocation.getCurrentPosition((position) => {
    let latt = position.coords.latitude;
    let long = position.coords.longitude;

    const data = fetch(
      `https://www.metaweather.com/api/location/search/?lattlong=${
        (latt, long)
      }`
    )
      .then(async (res) => await res.json())
      .then(async (json) => await json);
    return data;
  });
};

const information = async () => {
  const location = await getLocation(
    "jakarta" || document.getElementById("search").innerText
  );
  const weather = await getWeather(location[0].woeid);

  const currWeather = weather.consolidated_weather[0];
  const forecast = weather.consolidated_weather.slice(1);
  console.log(forecast);

  // DOM Manipulation
  // Greetings
  var today = new Date();
  var curHr = today.getHours();

  if (curHr < 12) {
    document.querySelector("#greetings").innerHTML = `
        <h1 class="text-center" id="greetings">Good Morning!</h1>
        `;
  } else if (curHr < 18) {
    document.querySelector("#greetings").innerHTML = `
        <h1 class="text-center" id="greetings">Good Afternoon!</h1>
        `;
  } else {
    document.querySelector("#greetings").innerHTML = `
        <h1 class="text-center" id="greetings">Good Evening!</h1>
        `;
  }

  let currIcon = "";
  if (currWeather.weather_state_abbr == "sn") {
    currIcon = "./Images/UIFresh-weather-icons/svg/ic_snow 1.svg";
  } else if (currWeather.weather_state_abbr == "lc") {
    currIcon = "./Images/UIFresh-weather-icons/svg/ic_weather_1.svg";
  } else if (currWeather.weather_state_abbr == "sl") {
    currIcon = "./Images/UIFresh-weather-icons/svg/ic_weather_4.svg";
  } else if (currWeather.weather_state_abbr == "h") {
    currIcon = "./Images/UIFresh-weather-icons/svg/ic_weather_43.svg";
  } else if (currWeather.weather_state_abbr == "t") {
    currIcon = "./Images/UIFresh-weather-icons/svg/ic_weather_16.svg";
  } else if (currWeather.weather_state_abbr == "hr") {
    currIcon = "./Images/UIFresh-weather-icons/svg/ic_weather_8.svg";
  } else if (currWeather.weather_state_abbr == "lr") {
    currIcon = "./Images/UIFresh-weather-icons/svg/ic_weather_31.svg";
  } else if (currWeather.weather_state_abbr == "s") {
    currIcon = "./Images/UIFresh-weather-icons/svg/ic_weather_32.svg";
  } else if (currWeather.weather_state_abbr == "hc") {
    currIcon = "./Images/UIFresh-weather-icons/svg/ic_sky.svg";
  } else {
    currIcon = "./Images/UIFresh-weather-icons/svg/ic_sun_1.svg";
  }

  let forecastIcon = "";
  if (forecast.weather_state_name == "sn") {
    forecastIcon = "./Images/UIFresh-weather-icons/svg/ic_snow 1.svg";
  } else if (forecast.weather_state_name == "lc") {
    forecastIcon = "./Images/UIFresh-weather-icons/svg/ic_weather_1.svg";
  } else if (forecast.weather_state_name == "sl") {
    forecastIcon = "./Images/UIFresh-weather-icons/svg/ic_weather_4.svg";
  } else if (forecast.weather_state_name == "h") {
    forecastIcon = "./Images/UIFresh-weather-icons/svg/ic_weather_43.svg";
  } else if (forecast.weather_state_name == "t") {
    forecastIcon = "./Images/UIFresh-weather-icons/svg/ic_weather_16.svg";
  } else if (forecast.weather_state_name == "hr") {
    forecastIcon = "./Images/UIFresh-weather-icons/svg/ic_weather_8.svg";
  } else if (forecast.weather_state_name == "lr") {
    forecastIcon = "./Images/UIFresh-weather-icons/svg/ic_weather_31.svg";
  } else if (forecast.weather_state_name == "s") {
    forecastIcon = "./Images/UIFresh-weather-icons/svg/ic_weather_32.svg";
  } else if (forecast.weather_state_name == "hc") {
    forecastIcon = "./Images/UIFresh-weather-icons/svg/ic_sky.svg";
  } else {
    forecastIcon = "./Images/UIFresh-weather-icons/svg/ic_sun_1.svg";
  }

  // Today's Forecast
  // Main Card
  document.querySelector("#nuCard").innerHTML = `
        <h3 class="card-title mx-auto my-0 pt-3" id="headingCity">${
          weather.title
        }</h3>
        <p id="weatherDate">${currWeather.applicable_date}</p>
        <img class="card-img-top" id="weatherIcon" src="${currIcon}" alt="">
        <h1 id="weatherTemp">${Math.round(currWeather.the_temp)}°C</h1>
    `;
  document.querySelector("#weatherDesc").innerHTML = `
        ${currWeather.weather_state_name}
    `;

  // Weather Details
  document.querySelector("#humidity").innerHTML = `
        <div>
            <p id="detailSubTitle">Humidity</p>
            <h4 class="card-title mx-auto" id="detailContent">${
              currWeather.humidity
            }%</h4>
        </div>
        <div class="card text-center" id="windSpeed">
            <div class="subContent">
                <p id="detailSubTitle">Wind Speed</p>
                <h4 class="card-title mx-auto" id="detailContent">${currWeather.wind_speed.toFixed(
                  2
                )} mph</h4>
            </div>
            <div class="card text-center" id="chance">
                <p id="detailSubTitle">Predictability</p>
                <h4 class="card-title mx-auto" id="detailContent">${
                  currWeather.predictability
                }%</h4>
            </div>
        </div>
    `;

  // 5-Day Forecast
  document.querySelector("#five-days").innerHTML = forecast
    .map((forecast) => {
      return `
        <div class="card text-center align-content-center justify-content-center p-2" id="forecastCard">
              <p id="weatherDate">${forecast.applicable_date}</p>
              <img src="${forecastIcon}" alt="">
              <p class="card-text" id="forecastDesc">${forecast.predictability}%</p>
        </div>
        `;
    })
    .join("");
};

document.addEventListener("DOMContentLoaded", async () => {
  information();
});
