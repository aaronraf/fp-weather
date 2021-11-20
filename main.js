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
    currIcon = "./Images/ic_snow 1.svg";
  } else if (currWeather.weather_state_abbr == "lc") {
    currIcon = "./Images/ic_weather_1.svg";
  } else if (currWeather.weather_state_abbr == "sl") {
    currIcon = "./Images/ic_weather_4.svg";
  } else if (currWeather.weather_state_abbr == "h") {
    currIcon = "./Images/ic_weather_43.svg";
  } else if (currWeather.weather_state_abbr == "t") {
    currIcon = "./Images/ic_weather_16.svg";
  } else if (currWeather.weather_state_abbr == "hr") {
    currIcon = "./Images/ic_weather_8.svg";
  } else if (currWeather.weather_state_abbr == "lr") {
    currIcon = "./Images/ic_weather_31.svg";
  } else if (currWeather.weather_state_abbr == "s") {
    currIcon = "./Images/ic_weather_32.svg";
  } else if (currWeather.weather_state_abbr == "hc") {
    currIcon = "./Images/ic_sky.svg";
  } else {
    currIcon = "./Images/ic_sun_1.svg";
  }

  console.log(forecast.weather_state_name);

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
      let forecastIcon = "";
      if (forecast.weather_state_abbr == "sn") {
        forecastIcon = "./Images/ic_snow 1.svg";
      } else if (forecast.weather_state_abbr == "ln") {
        forecastIcon = "./Images/ic_weather_1.svg";
      } else if (forecast.weather_state_abbr == "sl") {
        forecastIcon = "./Images/ic_weather_4.svg";
      } else if (forecast.weather_state_abbr == "h") {
        forecastIcon = "./Images/ic_weather_43.svg";
      } else if (forecast.weather_state_abbr == "t") {
        forecastIcon = "./Images/ic_weather_16.svg";
      } else if (forecast.weather_state_abbr == "hr") {
        forecastIcon = "./Images/ic_weather_8.svg";
      } else if (forecast.weather_state_abbr == "lr") {
        forecastIcon = "./Images/ic_weather_31.svg";
      } else if (forecast.weather_state_abbr == "s") {
        forecastIcon = "./Images/ic_weather_32.svg";
      } else if (forecast.weather_state_abbr == "hc") {
        forecastIcon = "./Images/ic_sky.svg";
      } else {
        forecastIcon = "./Images/ic_sun_1.svg";
      }
      return `
        <div class="card text-center align-content-center justify-content-center p-2" id="forecastCard">
              <p id="weatherDate">${forecast.applicable_date}</p>
              <img id="forecastIcon" src="${forecastIcon}" alt="">
              <p class="card-text m-0" id="fdforecastDesc">${forecast.weather_state_name}</p>
              <p class="card-text" id="forecastDesc" {
                ">${forecast.predictability}%</p>
        </div>
        `;
    })
    .join("");
};

document.addEventListener("DOMContentLoaded", async () => {
  information();
});
