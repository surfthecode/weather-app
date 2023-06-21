const apiKey = "47de525c8b6e8be1118dc5ace4b3687a";
const inputField = document.querySelector(".userInput");
const inputBtn = document.querySelector(".userInputBtn");
const geolocationBtn = document.querySelector(".get-location-btn");
let city = "";
let id = "";

// get user location coords by geolocation
geolocationBtn.addEventListener("click", (e) => {
  e.preventDefault();

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const source = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    getData(source);
  }

  function error() {
    alert("Unable to retrieve your location");
  }

  navigator.geolocation.getCurrentPosition(success, error);
});

// get user input on button click
inputBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const pattern = /^[a-zA-Z][a-zA-Z ]*$/;

  if (inputField.value.match(pattern)) {
    city = inputField.value;
    const source = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&exclude=hourly&appid=${apiKey}`;

    getData(source);
  } else {
    alert("Please provide a valid city name..");
  }
});

// get user input on press Enter
inputBtn.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    city = inputField.value;
    const source = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&exclude=hourly&appid=${apiKey}`;
    getData(source);
  }
});

const getData = async function (source) {
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
      let currentDate = new Date(data.list[0].dt * 1000).toLocaleString(
        "en-GB",
        {
          weekday: "short",
          day: "numeric",
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
        }
      );
      console.log(currentDate);

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

      // get weather description codes
      switch (currentWeatherDescription) {
        case "few clouds":
          document.querySelector(".main-container").style.backgroundImage =
            'url("./assets/img/few-clouds-slate.jpg")';
          break;
        case "broken clouds":
          document.querySelector(".main-container").style.backgroundImage =
            'url("./assets/img/broken-clouds-slate.jpg")';
          break;
        case "scattered clouds":
          document.querySelector(".main-container").style.backgroundImage =
            'url("./assets/img/scattered-clouds-slate.jpg")';
          break;
        case "overcast clouds":
          document.querySelector(".main-container").style.backgroundImage =
            'url("./assets/img/overcast-clouds-sahara.jpg")';
          break;
        case "clear sky":
          document.querySelector(".main-container").style.backgroundImage =
            'url("./assets/img/clear-sky-slate.jpg")';
          break;
        case "light rain":
          document.querySelector(".main-container").style.backgroundImage =
            'url("./assets/img/light-rain-2.jpg")';
          break;
        case "rain":
          document.querySelector(".main-container").style.backgroundImage =
            'url("./assets/img/rain-slate.jpg")';
          break;
        case "moderate rain":
          document.querySelector(".main-container").style.backgroundImage =
            'url("./assets/img/rain-slate.jpg")';
          break;
        case "shower rain":
          document.querySelector(".main-container").style.backgroundImage =
            'url("./assets/img/shower-rain-slate.jpg")';
          break;
        case "mist":
          document.querySelector(".main-container").style.backgroundImage =
            'url("./assets/img/mist-slate.jpg")';
          break;
        case "snow":
          document.querySelector(".main-container").style.backgroundImage =
            'url("./assets/img/snow-slate.jpg")';
          break;
        case "thunderstorm":
          document.querySelector(".main-container").style.backgroundImage =
            'url("./assets/img/thunderstorm-slate.jpg")';
          break;
        default:
          document.querySelector(".main-container").style.backgroundImage =
            'url("./assets/img/clear-sky-slate.jpg")';
      }

      // get all forecast dates
      data.list.forEach((obj) => {
        const dates = new Date(obj.dt * 1000).toLocaleString("en-GB", {
          weekday: "short",
          day: "numeric",
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
        });

        console.log(dates);
      });
    } else {
      console.log("Server error:", response.status, response.statusText);
    }
  } catch (error) {
    console.log("Fetch error:", error);
  }
};
