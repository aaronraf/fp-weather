const apiKey = "fe56a60542229b2200d30dcf178d596d";
let search = document.getElementById("search");
let searchBar = document.getElementById("searchBar");

const getWeatherByCoordinates = async (lat, lon) => {
	// const data = await fetch(
	// 	`https://www.metaweather.com/api/location/search/?query=${query}`
	// )
	// 	.then(async (res) => await res.json())
	// 	.then(async (json) => await json);
	// return data;

	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		if (response.ok) {
			parseWeatherData(data);
			return data;
		} else {
			console.error("Error:", data.message);
		}
	} catch (error) {
		console.error("Error fetching weather data:", error);
	}
};

// const getWeatherByCity = {};

const parseWeatherData = (data) => {
	const cityName = data.name;
	const country = data.sys.country;
	const temperature = Math.round(data.main.temp - 273.15);
	const weatherDescription = data.weather[0].description;
	const windSpeed = data.wind.speed;
	const humidity = data.main.humidity;
	const tempMin = Math.round(data.main.temp_min - 273.15);
	const tempMax = Math.round(data.main.temp_max - 273.15);
	const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(); // Convert from UNIX timestamp
	const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString(); // Convert from UNIX timestamp

	// Now display the data as needed, for example:
	// console.log(`City: ${cityName}, ${country}`);
	// console.log(`Temperature: ${temperature}°C`);
	// console.log(`Weather: ${weatherDescription}`);
	// console.log(`Wind Speed: ${windSpeed} m/s`);
	// console.log(`Humidity: ${humidity}%`);
	// console.log(`Temp Min: ${tempMin}°C`);
	// console.log(`Temp Max: ${tempMax}°C`);
	// console.log(`Sunrise: ${sunrise}`);
	// console.log(`Sunset: ${sunset}`);

	return data;
};

// getWeather("Jakarta");

// const getWeather = async (woeid) => {
// 	const data = await fetch(`https://www.metaweather.com/api/location/${woeid}`)
// 		.then((res) => res.json())
// 		.then((json) => json);
// 	return data;
// };

const getUserPosition = () => {
	return new Promise((resolve, reject) => {
		window.navigator.geolocation.getCurrentPosition(
			(position) => {
				let latt = position.coords.latitude;
				let long = position.coords.longitude;
				console.log("lat: " + latt);
				console.log("lon: " + long);

				resolve({ lat: latt, lon: long });
			},
			(error) => {
				reject(error);
			}
		);
	});
};

const information = async () => {
	const location = await getUserPosition();
	// || document.getElementById("search").innerText;
	const weather = await getWeatherByCoordinates(location.lat, location.lon);

	console.log(weather);

	// const weather = weather.consolidated_weather[0];
	// const forecast = weather.consolidated_weather.slice(1);

	// DOM Manipulation
	// Greetings
	let today = new Date();
	let curHr = today.getHours();

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
	if (weather.weather_state_abbr == "sn") {
		currIcon = "./Images/ic_snow 1.svg";
	} else if (weather.weather_state_abbr == "lc") {
		currIcon = "./Images/ic_weather_1.svg";
	} else if (weather.weather_state_abbr == "sl") {
		currIcon = "./Images/ic_weather_4.svg";
	} else if (weather.weather_state_abbr == "h") {
		currIcon = "./Images/ic_weather_43.svg";
	} else if (weather.weather_state_abbr == "t") {
		currIcon = "./Images/ic_weather_16.svg";
	} else if (weather.weather_state_abbr == "hr") {
		currIcon = "./Images/ic_weather_8.svg";
	} else if (weather.weather_state_abbr == "lr") {
		currIcon = "./Images/ic_weather_31.svg";
	} else if (weather.weather_state_abbr == "s") {
		currIcon = "./Images/ic_weather_32.svg";
	} else if (weather.weather_state_abbr == "hc") {
		currIcon = "./Images/ic_sky.svg";
	} else {
		currIcon = "./Images/ic_sun_1.svg";
	}

	// console.log(forecast.weather_state_name);

	// Today's Forecast
	// Main Card
  let cityName = weather.name + ", " + weather.sys.country;
	document.querySelector("#nuCard").innerHTML = `
        <h3 class="card-title mx-auto my-0 pt-3" id="headingCity">${
					cityName
				}</h3>
        <p id="weatherDate">${today.getDate()}-${today.getMonth()}-${today.getFullYear()}</p>
        <img class="card-img-top" id="weatherIcon" src="${currIcon}" alt="">
        <h1 id="weatherTemp">${Math.round(weather.the_temp)}°C</h1>
    `;
	document.querySelector("#weatherDesc").innerHTML = `
        ${weather.weather_state_name}
    `;

	// Weather Details
	document.querySelector("#humidity").innerHTML = `
        <div>
            <p id="detailSubTitle">Humidity</p>
            <h4 class="card-title mx-auto" id="detailContent">${
							weather.humidity
						}%</h4>
        </div>
        <div class="card text-center" id="windSpeed">
            <div class="subContent">
                <p id="detailSubTitle">Wind Speed</p>
                <h4 class="card-title mx-auto" id="detailContent">${weather.wind_speed.toFixed(
									2
								)} mph</h4>
            </div>
            <div class="card text-center" id="chance">
                <p id="detailSubTitle">Predictability</p>
                <h4 class="card-title mx-auto" id="detailContent">${
									weather.predictability
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
