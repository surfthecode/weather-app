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
  "Q: What did the clouds get as a consolation prize?\nA: certificate of precipitation.",
  "Q: Why did the cloud stay at home?\nA: It was feeling under the weather.",
  "Q: What is the opposite of a cold front?\nA: A warm back.",
  "Q: What do you call dangerous precipitation?\nA: A rain of terror!",
];

const jokeButton = document.getElementById("jokeButton");
const jokeParagraph = document.getElementById("jokeParagraph");

jokeButton.addEventListener("click", () => {
  // Hide all jokes
  jokes.forEach((joke) => {
    const jokeElement = document.createElement("li");
    jokeElement.innerText = joke;
    jokeElement.style.display = "none";
    jokeParagraph.appendChild(jokeElement);
  });

  // Show one random joke
  const randomIndex = Math.floor(Math.random() * jokes.length);
  const randomJoke = jokes[randomIndex];
  const randomJokeElement = document.createElement("li");
  randomJokeElement.innerText = randomJoke;
  randomJokeElement.style.display = "block";
  jokeParagraph.appendChild(randomJokeElement);
});
