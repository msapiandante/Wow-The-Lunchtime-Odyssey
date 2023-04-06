var categoryForm = document.getElementById("user-category")

var dropdown = document.getElementById("categories")
var audioEl = document.getElementById("audio")

categoryForm.addEventListener("submit", function (event) {
  event.preventDefault()
  var selectedCategory = dropdown.value
  getGameQuestions(selectedCategory)
})

//Function called to get game questions from trivia API
function getGameQuestions(category) {
  //start page should get set to display none here?

  var queryURL = "https://the-trivia-api.com/api/questions?categories=" + category + "&limit=10"

  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayGameContainer(data)
          console.log(data)
        })
      } else {
        console.log("Error " + response.statusText)
      }
    })
    .catch(function (error) {
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
function displayGameContainer(data) {
  //game page should get shown here
  //start page gets display none

  console.log(index)

  answerArr = []
  answerArr = answerArr.concat(data[index].incorrectAnswers)
  answerArr.push(data[index].correctAnswer)

  var randomChoices = shuffleArray(answerArr)
  console.log(randomChoices)

  for (var i = 0; i < data.length; i++) {
    triviaQuestion.textContent = data[index].question
    choiceOne.textContent = randomChoices[0]
    choiceTwo.textContent = randomChoices[1]
    choiceThree.textContent = randomChoices[2]
    choiceFour.textContent = randomChoices[3]
  }

  choiceOne.addEventListener("click", function (event) {
    moveOwen.call(this, event, data)
  }, false)

  choiceTwo.addEventListener("click", function (event) {
    moveOwen.call(this, event, data)
  }, false)

  choiceThree.addEventListener("click", function (event) {
    moveOwen.call(this, event, data)
  }, false)

  choiceFour.addEventListener("click", function (event) {
    moveOwen.call(this, event, data)
  }, false)

}

//play wow audio on click
function playAudio(audio) {
  console.log(audio)
  audioEl.setAttribute("src", audio)
  audioEl.play()
}

  // var owenHead = getElementById("owen-heads")

function moveOwen(event, triviaData) {

    event.stopImmediatePropagation()

    var buttonClicked = event.target
    var owenPosition = 0

    fetch("https://owen-wilson-wow-api.onrender.com/wows/random")
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        console.log(data)
        var wowAudio = data[0].audio
        console.log(wowAudio)
        playAudio(wowAudio)

        if (buttonClicked.textContent === triviaData[index].correctAnswer) {
          console.log("correct")
          owenPosition += 110
          // owenHead.setAttribute("style", "bottom: " + owenPosition + "px")
        } else {
          console.log("incorrect")
          //move owen one space back
        }

        index++

        if (index < triviaData.length || owenPosition < 500) {
          displayGameContainer(triviaData)
        } else {
          //call finished game function here 
          gameOver()
          console.log("end game")
        }
        console.log(event)
        console.log(triviaData)
      })
  }

  var finalScore = document.getElementById("final-score")
  var submitButton = document.getElementById("submit")
  var initialInput = document.getElementById("initials")
  var scoreList = document.getElementById("scores-list")
  var playAgain = document.getElementById("replay")

  //Function to show final score 
  function gameOver() {
    //set game container to display none 
    //set game done container to display to show

    var score = index

    finalScore.textContent = "Your final score is: " + score

    submitButton.addEventListener("click", scoreBoard)

  }

  //Function to display past scores and set scores to local storage
  function scoreBoard(event) {
    event.preventDefault()

    var gamerScore = {
      intials: initialInput.value.trim(),
      score: index,
    }

    var storedScores = JSON.parse(localStorage.getItem("gamerScore")) || []

    storedScores.push(gamerScore)

    for (vari = 0; i < storedScores.length; i++) {
      var li = document.createElement("li")
      li.textContent = "Intials: " + storedScores[i].initials + "Score: " + storedScores[i].score
      li.setAttribute("style", "list-type: none")

      scoreList.appendChild("li")
    }

    localStorage.setItem("gamerScore", JSON.stringify(storedScores))
  }

  //Listens for clicks on play again button 
  playAgain.addEventListener("click", function () {
    location.reload()
  })


