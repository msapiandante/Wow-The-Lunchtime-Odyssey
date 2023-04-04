









































































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
                    displayGameContainer(data)
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

//Function to display game questions and game board 
function displayGameContainer(data) {
    //game page should get shown here?

    answerArr = []
    answerArr.push(data[index].incorrectAnswers)
    answerArr.push(data[index].correctAnswer)
    console.log(answerArr)

    for (var i=0; i < data.length; i ++) {
        triviaQuestion.textContent = data[index].question 
        choiceOne.textContent = Math.floor(Math.random() * answerArr.length)
    }






}