const API_KEY = "47de525c8b6e8be1118dc5ace4b3687a"; //should be private, but no server, nothing to hide btw.

const city = "Timisoara";
const source = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&exclude=hourly&appid=${API_KEY}`;

// fetch(source)
//   .then((x) => x.text())
//   .then((y) => (document.querySelector(".demo").innerHTML = y));

async function getData() {
  try {
    const data = await fetch(source);
    const result = await data.json();

    if (data.ok) {
      console.log("Success:", result);
    } else {
      console.log("Server error:", data.status, data.statusText);
    }
  } catch (error) {
    console.log("Fetch error:", error);
  }
}

getData();
