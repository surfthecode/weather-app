const apiKey = "47de525c8b6e8be1118dc5ace4b3687a";
const inputField = document.querySelector(".userInput");
const inputBtn = document.querySelector(".userInputBtn");
const geolocationBtn = document.querySelector(".get-location-btn");
let city = "";
let id = "";
let dateMinTempObj = {};
let dateMaxTempObj = {};
let dateWeatherDescriptionObj = {};
let resultObj = {};
let currentDate;

// get user location coords by geolocation
if (geolocationBtn) {
  geolocationBtn.addEventListener("click", (e) => {
    e.preventDefault();

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const source = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

      getData(source);
    }

    function error() {
      alert("Unable to retrieve your location");
    }

    navigator.geolocation.getCurrentPosition(success, error);
  });
}

// get user input on button click
inputBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const pattern = /^[a-zA-Z][a-zA-Z ]*$/;

  if (inputField.value.match(pattern)) {
    city = inputField.value;
    const source = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&exclude=hourly&appid=${apiKey}`;

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
    const source = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&exclude=hourly&appid=${apiKey}`;
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
      currentDate = new Date().toLocaleString("en-GB", {
        weekday: "short",
        day: "numeric",
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
      });
      console.log(currentDate);

      // Add date and time
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
          day: "numeric",
          hour12: false,
          hour: "numeric",
          minute: "2-digit",
        });

        // get weather description, man temp, max temp from API
        const weatherDesc = obj.weather[0].description;
        const minTemp = obj.main.temp_min;
        const maxTemp = obj.main.temp_max;

        // add each fate with its description, min/max temps to each top level object
        dateMinTempObj[dates] = minTemp;
        dateMaxTempObj[dates] = maxTemp;
        dateWeatherDescriptionObj[dates] = weatherDesc;
      });

      // define today, tomorrow, and 2 days after
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfterTomorrow = new Date(today);
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
      const dayAfterDayAfterTomorrow = new Date(today);
      dayAfterDayAfterTomorrow.setDate(dayAfterDayAfterTomorrow.getDate() + 3);

      // create today + 3 next days array
      const dates = [
        today.getDate(),
        tomorrow.getDate(),
        dayAfterTomorrow.getDate(),
        dayAfterDayAfterTomorrow.getDate(),
      ];

      // loop through dates array and populate top level objects with key-value pairs for each day (today + 3 next days)
      for (const date of dates) {
        let minTempSum = 0;
        let maxTempSum = 0;
        let weatherDescription = "";

        let count = 0;

        for (const key in dateMinTempObj) {
          if (count >= 8) break;

          const [day, hour] = key.split(", ");

          // reasign values for each key with api data
          if (Number(day) === date) {
            minTempSum += Number(dateMinTempObj[key]);
            maxTempSum += Number(dateMaxTempObj[key]);
            weatherDescription = dateWeatherDescriptionObj[key];
            count++;
          }
        }

        // add everything to final object and calc averages for min/max temps for each day
        resultObj[date] = {
          dailyAverageMinTemp: Math.floor(minTempSum / count),
          dailyAverageMaxTemp: Math.round(maxTempSum / count),
          weatherDescription,
        };
      }

      console.log(resultObj);

      // prepare data to display in weather cards
      const day1 = Object.keys(resultObj)[1];
      const day2 = Object.keys(resultObj)[2];
      const day3 = Object.keys(resultObj)[3];

      const day1Day = tomorrow.toLocaleDateString("en-GB", {
        weekday: "short",
      });
      const day2Day = dayAfterTomorrow.toLocaleDateString("en-GB", {
        weekday: "short",
      });
      const day3Day = dayAfterDayAfterTomorrow.toLocaleDateString("en-GB", {
        weekday: "short",
      });

      const day1Values = Object.values(resultObj)[1];
      const day2Values = Object.values(resultObj)[2];
      const day3Values = Object.values(resultObj)[3];

      // Add forecast day names
      document.querySelector(".day1").innerHTML = day1Day;
      document.querySelector(".day2").innerHTML = day2Day;
      document.querySelector(".day3").innerHTML = day3Day;

      // Add forecast weather description
      document.querySelector(".forecast-weather-description1").innerHTML =
        day1Values.weatherDescription;
      document.querySelector(".forecast-weather-description2").innerHTML =
        day2Values.weatherDescription;
      document.querySelector(".forecast-weather-description3").innerHTML =
        day3Values.weatherDescription;

      // Add forecast weather icons
      switch (day1Values.weatherDescription) {
        case "clear sky":
          document.querySelector(
            ".day1-icon"
          ).src = `https://openweathermap.org/img/wn/01d@2x.png`;
          break;
        case "few clouds":
          document.querySelector(
            ".day1-icon"
          ).src = `https://openweathermap.org/img/wn/02d@2x.png`;
          break;
        case "overcast clouds":
          document.querySelector(
            ".day1-icon"
          ).src = `https://openweathermap.org/img/wn/04d@2x.png`;
          break;
        case "scattered clouds":
          document.querySelector(
            ".day1-icon"
          ).src = `https://openweathermap.org/img/wn/03d@2x.png`;
          break;

        case "broken clouds":
          document.querySelector(
            ".day1-icon"
          ).src = `https://openweathermap.org/img/wn/04d@2x.png`;
          break;
        case "shower rain":
          document.querySelector(
            ".day1-icon"
          ).src = `https://openweathermap.org/img/wn/09d@2x.png`;
          break;
        case "rain":
          document.querySelector(
            ".day1-icon"
          ).src = `https://openweathermap.org/img/wn/10d@2x.png`;
          break;
        case "thunderstorm":
          document.querySelector(
            ".day1-icon"
          ).src = `https://openweathermap.org/img/wn/11d@2x.png`;
          break;
        case "snow":
          document.querySelector(
            ".day1-icon"
          ).src = `https://openweathermap.org/img/wn/13d@2x.png`;
          break;
        case "mist":
          document.querySelector(
            ".day1-icon"
          ).src = `https://openweathermap.org/img/wn/50d@2x.png`;
          break;
        case "light rain":
          document.querySelector(
            ".day1-icon"
          ).src = `https://openweathermap.org/img/wn/10d@2x.png`;
          break;
        default:
          document.querySelector(
            ".day1-icon"
          ).src = `https://openweathermap.org/img/wn/01d@2x.png`;
      }

      switch (day2Values.weatherDescription) {
        case "clear sky":
          document.querySelector(
            ".day2-icon"
          ).src = `https://openweathermap.org/img/wn/01d@2x.png`;
          break;
        case "few clouds":
          document.querySelector(
            ".day2-icon"
          ).src = `https://openweathermap.org/img/wn/02d@2x.png`;
          break;
        case "overcast clouds":
          document.querySelector(
            ".day2-icon"
          ).src = `https://openweathermap.org/img/wn/04d@2x.png`;
          break;
        case "scattered clouds":
          document.querySelector(
            ".day2-icon"
          ).src = `https://openweathermap.org/img/wn/03d@2x.png`;
          break;

        case "broken clouds":
          document.querySelector(
            ".day2-icon"
          ).src = `https://openweathermap.org/img/wn/04d@2x.png`;
          break;
        case "shower rain":
          document.querySelector(
            ".day2-icon"
          ).src = `https://openweathermap.org/img/wn/09d@2x.png`;
          break;
        case "rain":
          document.querySelector(
            ".day2-icon"
          ).src = `https://openweathermap.org/img/wn/10d@2x.png`;
          break;
        case "thunderstorm":
          document.querySelector(
            ".day2-icon"
          ).src = `https://openweathermap.org/img/wn/11d@2x.png`;
          break;
        case "snow":
          document.querySelector(
            ".day2-icon"
          ).src = `https://openweathermap.org/img/wn/13d@2x.png`;
          break;
        case "mist":
          document.querySelector(
            ".day2-icon"
          ).src = `https://openweathermap.org/img/wn/50d@2x.png`;
          break;
        case "light rain":
          document.querySelector(
            ".day2-icon"
          ).src = `https://openweathermap.org/img/wn/10d@2x.png`;
          break;
        default:
          document.querySelector(
            ".day2-icon"
          ).src = `https://openweathermap.org/img/wn/01d@2x.png`;
      }

      switch (day3Values.weatherDescription) {
        case "clear sky":
          document.querySelector(
            ".day3-icon"
          ).src = `https://openweathermap.org/img/wn/01d@2x.png`;
          break;
        case "few clouds":
          document.querySelector(
            ".day3-icon"
          ).src = `https://openweathermap.org/img/wn/02d@2x.png`;
          break;
        case "overcast clouds":
          document.querySelector(
            ".day3-icon"
          ).src = `https://openweathermap.org/img/wn/04d@2x.png`;
          break;
        case "scattered clouds":
          document.querySelector(
            ".day3-icon"
          ).src = `https://openweathermap.org/img/wn/03d@2x.png`;
          break;

        case "broken clouds":
          document.querySelector(
            ".day3-icon"
          ).src = `https://openweathermap.org/img/wn/04d@2x.png`;
          break;
        case "shower rain":
          document.querySelector(
            ".day3-icon"
          ).src = `https://openweathermap.org/img/wn/09d@2x.png`;
          break;
        case "light rain":
          document.querySelector(
            ".day3-icon"
          ).src = `https://openweathermap.org/img/wn/10d@2x.png`;
          break;
        case "rain":
          document.querySelector(
            ".day3-icon"
          ).src = `https://openweathermap.org/img/wn/10d@2x.png`;
          break;
        case "thunderstorm":
          document.querySelector(
            ".day3-icon"
          ).src = `https://openweathermap.org/img/wn/11d@2x.png`;
          break;
        case "snow":
          document.querySelector(
            ".day3-icon"
          ).src = `https://openweathermap.org/img/wn/13d@2x.png`;
          break;
        case "mist":
          document.querySelector(
            ".day3-icon"
          ).src = `https://openweathermap.org/img/wn/50d@2x.png`;
          break;
        default:
          document.querySelector(
            ".day3-icon"
          ).src = `https://openweathermap.org/img/wn/01d@2x.png`;
      }

      // Add forecast day max temp
      document.querySelector(".forecast-max-temp-value1").innerHTML =
        day1Values.dailyAverageMaxTemp + "°C";
      document.querySelector(".forecast-max-temp-value2").innerHTML =
        day2Values.dailyAverageMaxTemp + "°C";
      document.querySelector(".forecast-max-temp-value3").innerHTML =
        day3Values.dailyAverageMaxTemp + "°C";

      // Add forecast day min temp
      document.querySelector(".forecast-min-temp-value1").innerHTML =
        day1Values.dailyAverageMinTemp + "°C";
      document.querySelector(".forecast-min-temp-value2").innerHTML =
        day2Values.dailyAverageMinTemp + "°C";
      document.querySelector(".forecast-min-temp-value3").innerHTML =
        day3Values.dailyAverageMinTemp + "°C";
    } else {
      console.log("Server error:", response.status, response.statusText);
    }
  } catch (error) {
    console.log("Fetch error:", error);
  }
};

// Contact page random weather pun
const jokes = [
  "What do you call a snowman with a six-pack? An abdominal snowman.",
  "Why did the sun go to school? To get brighter!",
  "What do you call a snowman with a sunburn? A puddle.",
  "What do you call a bear in the rain? A drizzly bear.",
  "Why don't scientists trust atoms? Because they make up everything.",
  "Why did the man put his money in the freezer? He wanted cold hard cash!",
  "Why did the tomato turn red? Because it saw the salad dressing!",
  "Suntimes you win, suntimes you lose.",
  "The rain of Queen Elizabeth II.",
  "Lightning storms can be very striking.",
  "Cloud games are thunder-way.",
  "Perhaps I can shed some lightning on the matter.",
  "Q: What did the clouds get as a consolation prize?\nA: A certificate of precipitation.",
  "Q: Why did the cloud stay at home?\nA: It was feeling under the weather.",
  "Q: What is the opposite of a cold front?\nA: A warm back.",
  "Q: What do you call dangerous precipitation?\nA: A rain of terror!",
];

const jokeButton = document.getElementById("jokeButton");
const jokeList = document.getElementById("jokeList");

jokeButton.addEventListener("click", () => {
  // Hide previous joke
  if (jokeList.children.length > 0) {
    jokeList.removeChild(jokeList.children[0]);
  }

  // Show new joke
  const randomIndex = Math.floor(Math.random() * jokes.length);
  const randomJoke = jokes[randomIndex];
  const randomJokeElement = document.createElement("li");
  randomJokeElement.innerText = randomJoke;
  jokeList.appendChild(randomJokeElement);
});
