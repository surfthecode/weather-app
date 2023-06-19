const apiKey = "47de525c8b6e8be1118dc5ace4b3687a";
let city = "";
const inputField = document.querySelector(".input-field");
const inputBtn = document.querySelector(".input-btn");

inputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  city = inputField.value;

  getData();
});

inputBtn.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    city = inputField.value;
  }
  getData();
});

const getData = async function () {
  let source = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&exclude=hourly&appid=${apiKey}`;

  try {
    const response = await fetch(source);
    const data = await response.json();

    if (response.status === 400) {
      alert("Please provide a valid city name");
    } else if (response.ok) {
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

      // ADD sunrise, sunset:
      document.querySelector(".sunrise-value").innerHTML = sunrise;
      document.querySelector(".sunset-value").innerHTML = sunset;

      // get current date and time;

      let currentDate = new Date().toLocaleString("en-GB", {
        weekday: "short",
        day: "numeric",
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
      });

      // update date
      document.querySelector(".date-time").innerHTML = currentDate;

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
};
