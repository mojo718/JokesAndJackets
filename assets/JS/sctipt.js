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
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  