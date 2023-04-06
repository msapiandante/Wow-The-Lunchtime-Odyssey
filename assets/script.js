var categoryForm = document.getElementById("user-category")
var dropdown = document.getElementById("categories")
var audioEl = document.getElementById("audio")
var startPage = document.getElementById("start-page")
var gamePage = document.getElementById("game-page-container")
var triviaQuestion = document.getElementById("question")
var choiceOne = document.getElementById("choice-one")
var choiceTwo = document.getElementById("choice-two")
var choiceThree = document.getElementById("choice-three")
var choiceFour = document.getElementById("choice-four")
var owenHead = document.getElementById("owen-heads")
var finalScore = document.getElementById("final-score")
var submitButton = document.getElementById("submit")
var initialInput = document.getElementById("initials")
var scoreList = document.getElementById("scores-list")
var playAgain = document.getElementById("replay")
var gameDonePage = document.getElementById("game-done-container")
var triviaBoard = document.getElementById("trivia-board")
var rightAnswer = document.getElementById("right-answer")

var owenPosition = 0
var index = 0

categoryForm.addEventListener("submit", function (event) {
  event.preventDefault()
  var selectedCategory = dropdown.value
  getGameQuestions(selectedCategory)
})

//Function called to get game questions from trivia API
function getGameQuestions(category) {

  var queryURL = "https://the-trivia-api.com/api/questions?categories=" + category + "&limit=15"

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

  if (index >= data.length || owenPosition >= 25) {
    //call finished game function here 
    gameOver()
    console.log("end game")
    return
  } 

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

//Function to compare right answers, move Owen based on answer, and play audio for right answer
function moveOwen(event, triviaData) {
    event.preventDefault()
    event.stopImmediatePropagation()

    var buttonClicked = event.target
    
    fetch("https://owen-wilson-wow-api.onrender.com/wows/random")
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        console.log(data)
        var wowAudio = data[0].audio
        console.log(wowAudio)
        

        if (buttonClicked.textContent === triviaData[index].correctAnswer) {
          console.log("correct")
          playAudio(wowAudio)
          owenPosition += 5
          owenHead.setAttribute("style", `bottom: ${owenPosition}rem; height:140px; width:210px; z-index: 1`)
          console.log(owenPosition)
          
        } else {
          console.log("incorrect")
          if (owenPosition >= 5) {
            owenPosition -= 5
            owenHead.setAttribute("style", `bottom: ${owenPosition}rem; height:140px; width:210px; z-index: 1`)
          }
        }

        rightAnswer.textContent = triviaData[index].correctAnswer

        index++
        console.log(index)

        if (index < triviaData.length || owenPosition < 25) {
          displayGameContainer(triviaData)
        }
 
        console.log(event)
        console.log(triviaData)
      })
  }

  //Function to show final score 
  function gameOver() {

    gameDonePage.setAttribute("style", "display: block")
    startPage.setAttribute("style", "display:none")
    gamePage.setAttribute("style", "display:none")
    triviaBoard.setAttribute("style", "display:none")

    var score = index

    finalScore.textContent = "Your final score is: " + score

    submitButton.addEventListener("click", scoreBoard)

  }

  //Function to display past scores and set scores to local storage
  function scoreBoard(event) {
    event.preventDefault()

    var gamerScore = {
      initials: initialInput.value.trim(),
      score: index,
    }

    var storedScores = JSON.parse(localStorage.getItem("gamerScore")) || []

    storedScores.push(gamerScore)
    console.log(storedScores)

    for (var i = 0; i < storedScores.length; i++) {
      var li = document.createElement("li")
      li.textContent = storedScores[i].initials + ": " + storedScores[i].score
      li.setAttribute("style", "list-type: none")
      console.log(li)
      scoreList.appendChild(li)
    }

    localStorage.setItem("gamerScore", JSON.stringify(storedScores))
  }

  //Listens for clicks on play again button 
  playAgain.addEventListener("click", function () {
    location.reload()
  })


