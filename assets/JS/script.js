$(document).foundation();

var gifContainer = document.getElementById("getGif");

// Initialize zip codes array from local storage or create an empty array
var zipCodes = JSON.parse(localStorage.getItem('zipCodes')) || [];

// event listener to show "enter zip"
$('#startButton').on('click', function () {
  $('#zipModal').foundation('open');
  console.log("Modal Launch");
});

// Function for Zip submission
$('#zipForm').on('submit', function (event) {
  event.preventDefault();

  // Get the zip code entered by the user
  const zipCode = document.getElementById('zipCode').value.trim();

  // Make sure the zip code is not empty
  if (zipCode.length === 0) {
    alert('Please enter a zip code.');
    return;
  }

  // Check if the zip code already exists in local storage
  if (!zipCodes.includes(zipCode)) {
    // Add the new zip code to the array
    zipCodes.push(zipCode);

    // Save the updated zip codes array to local storage
    localStorage.setItem('zipCodes', JSON.stringify(zipCodes));
  }

  // this closes Modal
  $('#zipModal').foundation('close');

  // Proceed with the rest of your code execution using the entered zip code
  fetchWeatherData(zipCode);
});

$(document).ready(function () {
  // Function to animate the flashing text
  function animateFlashingText() {
    $('.flash-text').fadeOut(1000).fadeIn(1000);
  }

  // Call the function at an interval for the flashing effect
  setInterval(animateFlashingText, 2000);
});

function fetchWeatherData(zipCode) {
  // added to show\hide various elements after submit
  $("#weatherForm").hide();
  $("#startButton").hide();
  $("#closet").hide();
  $("#header").hide();
  $("#weatherInfo").show();
  $("#getGif").show();
  $("#dadJoke").show();
  $("#weatherCondition").show();
  $("#footer").show();

  // Make API call to Zip Code Geocoding API
  fetch(`https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=e75149958ade77779ccbeec46ce0a566`)
    .then(response => response.json())
    .then(data => {
      // Your existing code
      // ...
      const { lat, lon } = data;

      // Make API call to Current Weather Data API using latitude and longitude
      return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=e75149958ade77779ccbeec46ce0a566`);
    })
    .then(response => response.json())
    .then(weatherData => {
      // Display weather information

      console.log(weatherData.weather[0].description);
      getWeatherGifs(weatherData.weather[0].description);


      const weatherInfoDiv = document.getElementById('weatherInfo');
      weatherInfoDiv.innerHTML = `
          <h2>Current Weather</h2>
          <p>Location: ${weatherData.name}</p>
          <p>Temperature: ${weatherData.main.temp}°F</p>
          <p>Weather: ${weatherData.weather[0].description}</p>
        `;

      // Display attire suggestion based on weather condition
      displayAttireSuggestion(weatherData.weather[0].description);

      // Display GIF
      getWeatherGifs(weatherData.weather[0].description);

      // Call function to get dad joke
      getDadJoke();
    })

    .catch(error => {
      console.error('Error:', error);
    });

  // Map weather conditions to attire suggestions
  const attireSuggestions = {
    'clear sky': 'Wear light clothing and sunglasses.',
    'few clouds': 'You might want to bring a light jacket or sweater.',
    'scattered clouds': 'Consider bringing an umbrella just in case.',
    'broken clouds': 'Wear layers for variable weather conditions.',
    'shower rain': 'Bring an umbrella and wear waterproof shoes.',
    'rain': 'Don\'t forget your raincoat and waterproof boots.',
    'thunderstorm': 'Stay indoors if possible. If not, dress for rain and wind.',
    'snow': 'Bundle up with a warm coat, gloves, and boots.',
    'mist': 'Wear layers and a light waterproof jacket.',
    'smoke': 'Avoid prolonged outdoor activities and wear a mask if needed.',
    'haze': 'Consider wearing a mask or scarf to protect your airways.',
    'fog': 'Be cautious while driving and wear reflective clothing if necessary.',
    'dust': 'Wear a mask and protect your eyes and airways.',
    'sand': 'Cover exposed skin and wear goggles to protect your eyes.',
    'ash': 'Wear a mask and protect your eyes and airways from ash particles.',
    'squall': 'Stay indoors if possible. If not, dress for strong winds and rain.',
    'tornado': 'Seek shelter immediately and avoid windows. Dress for safety and warmth.',
    'volcanic ash': 'Wear a mask and protect your eyes and airways from ash particles.',
    'overcast clouds': 'Wear layers and be prepared for potentially cool temperatures.'
    // Add more conditions and attire suggestions as needed
  };

  // Display attire suggestion based on weather condition
  function displayAttireSuggestion(weatherCondition) {
    const attireSuggestion = attireSuggestions[weatherCondition.toLowerCase()];
    if (attireSuggestion) {
      const weatherConditionDiv = document.getElementById('weatherCondition');
      weatherConditionDiv.innerHTML = `
        <h2>Attire Suggestion</h2>
        <p>${attireSuggestion}</p>
      `;
    } else {
      console.log('No attire suggestion available for this weather condition.');
    }
  };

  // ***! added code using giphy API to get image, max 1 per return out of list of 3 conditional to weather response/object
  function getWeatherGifs(weatherCondition) {
    var urlArr = []

    // limit paramater below, "&limit..." changes giphy limit!! (currently have 3)!!
    var url = `https://api.giphy.com/v1/gifs/search?q=${weatherCondition}&limit=3&lang=en&api_key=DBjL2gtyGZ0vyqpWKwrloTELR86cp2TC`;
    fetch(url)
      .then(response => {
        // console.log(response)
        return response.json()
      })
      .then(answer => {
        gifContainer.innerHTML = '';
        // console.log(answer)
        var array = answer.data
        console.log(array)
        const randomIndex = Math.floor(Math.random() * array.length)
        console.log(array[randomIndex].id)
        var giphyImg = document.createElement("img")
        // after images. --> you can change size of giphy using images keys url code
        giphyImg.setAttribute("src", array[randomIndex].images.original.url)
        gifContainer.appendChild(giphyImg)
      })
  };

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
  };
};



