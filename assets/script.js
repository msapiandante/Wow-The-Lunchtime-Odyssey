//api document said that variable should be empty, i.e. 'var city;' however since we have a dropdown that users will be choosing from- should it be passed through as an object such as below? */
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

// var queryURL = "https://the-trivia-api.com/api/questions?limit=10?q=" + categories;


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










var placeholderCategory = history //need to get this variable from melanie's code from start page
getGameQuestions(placeholderCategory) //function needs to be called when play button is clicked 

//Function called to get game questions from trivia API
function getGameQuestions(category) {
    //start page should get set to display none here?

    var queryURL = "https://the-trivia-api.com/api/questions?categories=" + category + "&limit=10"

    fetch(queryURL)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayGameContainer(data, index)
                    console.log(data)
                })
            } else {
                console.log("Error " + response.statusText)
            }
        })
        .catch(function(error) {
            console.log("Unable to connect to Trivia API")
        })

}

var index = 0
var triviaQuestion = document.getElementById("question")
var choiceOne = document.getElementById("choice-one")
var choiceTwo = document.getElementById("choice-two")
var choiceThree = document.getElementById("choice-three")
var choiceFour = document.getElementById("choice-four")

//https://www.geeksforgeeks.org/how-to-shuffle-an-array-using-javascript/
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) { 
   
        // Generate random number 
        var j = Math.floor(Math.random() * (i + 1));
                   
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
       
    return array;
 }

//Function to display game questions and game board 
function displayGameContainer(data, index) {
    //game page should get shown here?

    answerArr = []
    answerArr = answerArr.concat(data[index].incorrectAnswers)
    answerArr.push(data[index].correctAnswer)

    var randomChoices = shuffleArray(answerArr)
    console.log(randomChoices)

    for (var i=0; i < data.length; i ++) {
        triviaQuestion.textContent = data[index].question 
        choiceOne.textContent = randomChoices[0]
        choiceTwo.textContent = randomChoices[1]
        choiceThree.textContent = randomChoices[2]
        choiceFour.textContent = randomChoices[3]
    }

    //TODO: put owen and road on the page here

    choiceOne.addEventListener("click", function(event) {
        console.log(data)
        moveOwen.call(this, event, data)
    }, false)

    choiceTwo.addEventListener("click", function(event) {
        console.log(data)
        moveOwen.call(this, event, data)
    }, false)

    choiceThree.addEventListener("click", function(event) {
        console.log(data)
        moveOwen.call(this, event, data)
    }, false)

    choiceFour.addEventListener("click", function(event) {
        console.log(data)
        moveOwen.call(this, event, data)
    }, false)

}

function moveOwen(event, data) {
    var buttonClicked = event.target

    if (buttonClicked.textContent === data[index].correctAnswer) {
        console.log("correct")
        //move owen one space forward 
    } else {
        console.log("incorrect")
        //move owen one space back
    }

    //play wow audio on click

    index++

    if (index < data.length) {
        displayGameContainer(data, index)
    } else {
        //call finished game function here 
        console.log("end game")
    }
    console.log(event)
    console.log(data)
}

