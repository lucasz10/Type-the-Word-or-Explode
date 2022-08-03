var timerEl = document.getElementById('gameBrief');
// var mainEl = document.getElementById('Time');
// change or adder h2 header to add id = time
var message = "10 words"

function countdown() {
    var timeLeft = 10
    var name = getElementById('nickName')

    var timeInterval = setInterval(function () {
      if (timeLeft > 1) {
        timerEl.textContent = timeLeft + ' seconds remaining' + name ;
        timeLeft--;
      } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + ' second remaining' + name ;
        timeLeft--;
      } else {

        timerEl.textContent = '';
        clearInterval(timeInterval);
        displayMessage();
        console.log(name)

        //maybe look at timer ending in seperate function

      }
    }, 1000);
}
  
function displayMessage() { //Displaying the challenge words? Work off this code to display words. Don't need timer
    var wordCount = 0;
  
    var msgInterval = setInterval(function () {

      if (words[wordCount] === undefined) {
        clearInterval(msgInterval);
      } else {
        mainEl.textContent = words[wordCount];
        wordCount++;
      }
    }, 3000);
 }

element.addEventListener("click", countdown);

//Look at functions to include a change display of various sections on and off
//Jquery setAttribute() might help here significantly

 function landPage() {

    var lander = getElementById('landingPage')
 }

var wordsAPI = "https://random-words-api.herokuapp.com/w?n=10"; //Need to throw this call in beginning of gameStart function
fetch(wordsAPI)
.then(function (response) {
    return response.json();
})
.then (function (data) {
    console.log(data);
});

//Function that starts the game, sets display of landingPage to none
//Function should include timer, when ending criteria is met, set display of gameBrief to none

//Function for gameEnd. Button will trigger the landingPage to display

//Function for storing gameData locally

//Function for calling Giphy api, may be able to include in active game function


//Add eventListeners for return button and start button
