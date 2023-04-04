









































































var placeholderCategory //need to get this variable from melanie's code from start page
getGameQuestions(placeholderCategory) //function needs to be called when play button is clicked 

//Function gets 
function getGameQuestions(category) {
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


//Function to display game questions and game board 
function displayGameContainer() {





}

