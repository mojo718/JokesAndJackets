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