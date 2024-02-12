
var gifContainer=document.getElementById("getGif")

document.getElementById('weatherForm').addEventListener('submit', function(event) {
  event.preventDefault();
// section to toogle header and Zip form on/off
  document.getElementById("weatherForm").style.display = "none"
  document.getElementById("header").style.display = "none"
  document.getElementById("weatherInfo").style.display = "block"
  document.getElementById("getGif").style.display = "block"
  document.getElementById("dadJoke").style.display = "block"

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

      console.log (weatherData.weather[0].description);
      getWeatherGifs(weatherData.weather[0].description);


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



// ***! added code using giphy API to get image, max 1 per return out of list of 3 conditional to weather response/object
function getWeatherGifs(weatherCondition) {
  var urlArr=[]
  
  // limit paramater below, "&limit..." changes giphy limit!! (currently have 3)!!
  var url = `https://api.giphy.com/v1/gifs/search?q=${weatherCondition}&limit=3&lang=en&api_key=DBjL2gtyGZ0vyqpWKwrloTELR86cp2TC`;
  fetch(url)
  .then(response => {
    // console.log(response)
    return response.json()
  })
  .then(answer => {
    gifContainer.innerHTML='';
    // console.log(answer)
    var array = answer.data
      console.log (array)
      const randomIndex = Math.floor(Math.random() * array.length)
      console.log(array[randomIndex].id)
      var giphyImg=document.createElement("img")
      // after images. --> you can change size of giphy using images keys url code
      giphyImg.setAttribute("src", array[randomIndex].images.original.url)
      gifContainer.appendChild(giphyImg)
  })
}

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


