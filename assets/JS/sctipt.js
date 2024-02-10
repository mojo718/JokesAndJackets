document.getElementById('weatherForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the zip code entered by the user
  const zipCode = document.getElementById('zipCode').value.trim();

  // Make API call to Zip Code Geocoding API
  fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=e75149958ade77779ccbeec46ce0a566`)
    .then(response => response.json())
    .then(data => {
      // Extract latitude and longitude from the response
      const { lat, lon } = data;

      // Make API call to Current Weather Data API using latitude and longitude
      return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=e75149958ade77779ccbeec46ce0a566`);
    })
    .then(response => response.json())
    .then(weatherData => {
      // Display weather information
      const weatherInfoDiv = document.getElementById('weatherInfo');
      weatherInfoDiv.innerHTML = `
        <h2>Current Weather</h2>
        <p>Location: ${
weatherData.name
}</p>
        <p>Temperature: ${weatherData.main.temp}°F</p>
        <p>Weather: ${
weatherData.weather
[0].description}</p>
      `;

      // Call function to get dad joke
      getDadJoke();
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

function getDadJoke() {
  fetch('https://api.api-ninjas.com/v1/dadjokes?limit=1', {
    headers: {
      'X-Api-Key': 'rEJQDvZhoRkHeGUuNv/8Lw==wykGgqxEBWyA81NE'
    }
  })
  .then(response => response.json())
  .then(data => {
    // Get the dad joke text
    const jokeText = data[0].joke;

    // Display the dad joke on the page
    const dadJokeDiv = document.getElementById('dadJoke');
    dadJokeDiv.innerHTML = `
      <h2>Dad Joke</h2>
      <p>${jokeText}</p>
    `;
  })
  
  .catch(error => {
    console.error('Error:', error);
  });
} 



function getGif()
// needs to call file folder: GIF


{
  // research how to call img folder from desktop in JS within API
  const getGif=gif[0].gif
}
// Display the gif
const gif = document.getElementById(getGif);




function displayRandomGif() {
  // Array of URLs for your GIFs
  const gifUrls = [
    //PATH TO IMAGES IN PROJECT FOLDER GOES HERE - NO UNDERSCORES IN GIF NAMES, PLEASE, IE GIF1, GIF2//
    'url_to_gif_1',
    'url_to_gif_2',
    'url_to_gif_3',
    // Add more URLs as needed
  ];


  // Get a random index within the range of the gifUrls array
  const randomIndex = Math.floor(Math.random() * gifUrls.length);


//h2 element to call in the front:
const gif = document.getElementById('getGif');
gif.innerHTML = `
  <h2>getGif</h2>
  <p>${getGif}</p>
`;

  // Get the random GIF URL
  const randomGifUrl = gifUrls[randomIndex];


  // Display the GIF on the page
  const gifDiv = document.getElementById('jokeGif');
  gifDiv.innerHTML = `
    <img src="${randomGifUrl}" alt="Random GIF">
  `;
}



