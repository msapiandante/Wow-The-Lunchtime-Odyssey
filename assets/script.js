/*api document said that variable should be empty, i.e. 'var city;' however since we have a dropdown that users will be choosing from- should it be passed through as an object such as below? */
let categories = {
  arts_and_literature : "Arts and Literature",
  film_and_tv : "Film & TV",
  food_and_drink :"Food & Drink",
  general_knowledge :"General Knowledge",
  geography : "Geography",
  history : "History", 
  music: "Music", 
  science : "Science",
  society_and_culture :"Society & Culture",  
  sport_and_leisure : "Sport & Leisure"};
  //api call. with the api URL, I chose limit 10 questions since we discussed having 10 question limit. Was this the right move? I wasn't sure if the limit would need to be entered another way. 

var queryURL = "https://the-trivia-api.com/api/questions?limit=10?q=" + categories;


/*var getQuestions = function (categories) {
      var apiUrl = 'https://the-trivia-api.com/api/questions?limit=10?q=' + categories;
    
      fetch(apiUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayQuestions(data.items, categories);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      });
    };
    document.getElementById("dropdown").addEventListener("click", function(event){
      event.preventDefault()
    });
    getQuestions();
displayQuestions() //this on Elva's section? */