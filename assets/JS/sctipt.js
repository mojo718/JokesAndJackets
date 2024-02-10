var gifContainer=document.getElementById("getGif")
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


// BELOW IS ORIGINAL CODE FOR GIPHY STUFF...GOING TO DELETE, BUT WAITING TO SEE IF I NEED TO KEEP ANYTHING - BEFORE MERGING TO MAIN!
// function getGif()
// // needs to call file folder: GIF


// {
//   // research how to call img folder from desktop in JS within API
//   const getGif=gif[0].gif
// }
// // Display the gif
// const gif = document.getElementById(getGif);



// function displayRandomGif() {
//   // Array of URLs for your GIFs
//   const gifUrls = [
//     //PATH TO IMAGES IN PROJECT FOLDER GOES HERE - NO UNDERSCORES IN GIF NAMES, PLEASE, IE GIF1, GIF2//
//     'https://media0.giphy.com/media/QuGHBsYciDZzG/200.webp?cid=790b7611yaj92aff9n9wf7l4sbgqgz1opjthuiii20wt4p26&ep=v1_gifs_search&rid=200.webp&ct=g',
//     'https://media0.giphy.com/media/l0MYOJCCE8yTfcwSY/giphy.webp?cid=790b7611h6cllupwe1pqdy1hzk0j58korc7hsssejtk2yq6b&ep=v1_gifs_search&rid=giphy.webp&ct=g',
//     'https://media2.giphy.com/media/8xY1YYpEZ4dws/200.webp?cid=ecf05e47tovjbiz4gpzr2t0y8gsbqzejufpy2w2hjobiughb&ep=v1_gifs_search&rid=200.webp&ct=g',
//     // Add more URLs as needed
//   ];


//   // Get a random index within the range of the gifUrls array
//   const randomIndex = Math.floor(Math.random() * gifUrls.length);


// //h2 element to call in the front:
// const gif = document.getElementById('getGif');
// gif.innerHTML = `
//   <h2>getGif</h2>
//   <p>${getGif}</p>
// `;

//   // Get the random GIF URL
//   const randomGifUrl = gifUrls[randomIndex];


//   // Display the GIF on the page
//   const gifDiv = document.getElementById('jokeGif');
//   gifDiv.innerHTML = `
//     <img src="${randomGifUrl}" alt="Random GIF">
//   `;
// }



