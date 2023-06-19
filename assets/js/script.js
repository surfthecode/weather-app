const API_KEY = "47de525c8b6e8be1118dc5ace4b3687a"; //should be private, but no server, nothing to hide btw.

const city = "Timisoara";
const source = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&exclude=hourly&appid=${API_KEY}`;

// fetch(source)
//   .then((x) => x.text())
//   .then((y) => (document.querySelector(".demo").innerHTML = y));
let id = "";
const iconURL = `https://openweathermap.org/img/wn/${id}@2x.png`;

async function getData() {
  try {
    const response = await fetch(source);
    const data = await response.json();

    if (response.ok) {
      console.log("Success:", data);

      // get city name
      const cityName = data.city.name;
      console.log(cityName);

      // get country code
      const country = data.city.country;
      console.log(country);

      // ADD city, country:
      document.querySelector(".city").innerHTML = cityName + ", " + country;

      // get current sunset time
      const dateSet = new Date(data.city.sunset * 1000);
      const sunset = dateSet.toLocaleString("en-GB", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      console.log(sunset);

      // get current sunrise time
      const dateRise = new Date(data.city.sunrise * 1000);
      const sunrise = dateRise.toLocaleString("en-GB", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      console.log(sunrise);

      // get current date and time
      const currentDate = new Date().toLocaleString("en-GB", {
        weekday: "short",
        day: "numeric",
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
      });

      //ADD date time:
      document.querySelector(".date-time").innerHTML = currentDate;

      console.log(currentDate);

      const currentDate2 = new Date().toISOString().slice(0, 10);
      console.log(currentDate2);

      // get current temp
      const currentTemp = Math.floor(data.list[0].main.temp);
      console.log(currentTemp);

      // ADD current temp:
      document.querySelector(".current-temp-value").innerHTML = currentTemp;

      // get current min temp
      const currentTempMin = Math.floor(data.list[0].main.temp_min);
      console.log(currentTempMin);

      // ADD current min temp:
      document.querySelector(".min-temp-value").innerHTML =
        currentTempMin + " °C";

      // get current max temp
      const currentTempMax = Math.floor(data.list[0].main.temp_max);
      console.log(currentTempMax);

      // ADD current max temp:
      document.querySelector(".max-temp-value").innerHTML =
        currentTempMax + " °C";

      // get current humidity
      const currentHumidity = data.list[0].main.humidity + "%";
      console.log(currentHumidity);

      // ADD current humidity:
      document.querySelector(".humidity-value").innerHTML = currentHumidity;

      // get current weather description
      const currentWeatherDescription = data.list[0].weather[0].description;
      console.log(currentWeatherDescription);

      // ADD current weather description:
      document.querySelector(".weather-status").innerHTML =
        currentWeatherDescription;

      // get current clouds
      const currentClouds = data.list[0].clouds.all + "%";
      console.log(currentClouds);

      // ADD current clouds:
      document.querySelector(".cloud-value").innerHTML = currentClouds;

      // get current weather icon code
      const currentWeatherIconCode = data.list[0].weather[0].icon;
      console.log(currentWeatherIconCode);

      // ADD current weather icon:
      document.querySelector(
        ".weather-icon-img"
      ).src = `https://openweathermap.org/img/wn/${currentWeatherIconCode}@2x.png`;
    } else {
      console.log("Server error:", response.status, response.statusText);
    }
  } catch (error) {
    console.log("Fetch error:", error);
  }
}

getData();
