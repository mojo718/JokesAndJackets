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

$(document).ready(function() {
    // API Query Paramaters
    var baseUrl = 'https://api-ninjas.com/api/dadjokes';
    var API = "rEJQDvZhoRkHeGUuNv/8Lw==wykGgqxEBWyA81NE";

    // init local storage array holding the variable
    var jokes = [];
    var limit = 1; 
    
    $('#getJokeButton').click(function() { 
        getJoke();
    }); 

    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/dadjokes?limit=1' + limit, 
        headers: { 'X-Api-Key': 'rEJQDvZhoRkHeGUuNv/8Lw==wykGgqxEBWyA81NE'},
        contentType: 'application/json',
        success: function(result) {
            console.log(result);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });

})


// *** HOW TO HAVE MULTIPLE FUNCTIONS PER EVENT-LISTENER BUTTON *** //
// Function 1
// function function1() {
//     console.log("Function 1 executed");
//   }
  
  // Function 2
//   function function2() {
//     console.log("Function 2 executed");
//   }
  
  // New function that calls both functions
//   function renderTwoFunctions() {
//     function1();
//     function2();
//   }
  
  // Assign the new function as the event listener
//   const button = document.getElementById("myButton");
//   button.addEventListener("click", renderTwoFunctions);