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
        <p>Location: ${weatherData.name}</p>
        <p>Temperature: ${weatherData.main.temp}°F</p>
        <p>Weather: ${weatherData.weather[0].description}</p>
      `;

      // Display attire suggestion based on weather condition
      displayAttireSuggestion(weatherData.weather[0].description);

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

//ATTIRE FUNCTION
// needs to be tested : weather objects from json API call need to be reviewed and listed below, and then put div id tag on html page, ie div id=""

// function suggestAttire(weatherCondition) {
//   const attireDiv = document.getElementById('attire');
//   if (weatherCondition.toLowerCase().includes('rain')) {
//     attireDiv.textContent = "It's rainy! Don't forget your umbrella and raincoat!";
//   } else if (weatherCondition.toLowerCase().includes('clearSky')) {
//     attireDiv.textContent = "Don't forget your shades!";
//   } else if (weatherCondition.toLowerCase().includes('sun')) {
//     attireDiv.textContent = "It's sunny! Remember to wear sunscreen and sunglasses!";
//   } else {
//     attireDiv.textContent = "Consider checking the weather forecast for attire suggestions.";
//   }
 


