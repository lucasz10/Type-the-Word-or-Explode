//Section for defining global variables

var timerEl = document.getElementById('gameBrief');
// var mainEl = document.getElementById('Time');
// change or adder h2 header to add id = time
var message = "10 words"
var startBtn = document.getElementById("nicknameBtn");


//Section for defining functions

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

function callWordsAPI() {

  var wordsAPI = "https://random-words-api.herokuapp.com/w?n=10"; //Need to throw this call in beginning of gameStart function
  fetch(wordsAPI)
  .then(function (response) {
      return response.json();
  })
  .then (function (data) {
      gameStart(data)
  });

};

function gameStart(words) {
  
  var guessWordsObj = []; //Creates a multidimensional array of guesswords with strings broken out into separate arrays

  for(i = 0; i < words.length ; i++) {
    var guessWord = words[i].split("")
    guessWordsObj.push(guessWord);
  }

  console.log(guessWordsObj);

  document.getElementById("landingPage").style.display = "none";
  document.getElementById("inGame").style.display = "none";
  document.getElementById("endGame").style.display = "none";

};
//Function that starts the game, sets display of landingPage to none
//Function should include timer, when ending criteria is met, set display of gameBrief to none

//Function for gameEnd. Button will trigger the landingPage to display

//Function for storing gameData locally

const saveState = {
  charName: 'nickName',
  results: 'endResults',
  words: "words",
};

const saveStateString = JSON.stringify(saveState);
localStorage.setItem('saveState', saveStateString);

const loadSaveStateString = localStorage.getItem('saveState');
const loadSaveState = JSON.parse(loadSaveStateString);

//Function for calling Giphy api, may be able to include in active game function

let APIKEY = "ssS6qrhl6fvn3W4QEtQrYHXKJmdrveFI";

function gify(state){


  let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=` + state;

    fetch(url)
  .then(function (response) {
      return response.json();
  })
  .then (function (content) {
      console.log(content);
      document.getElementById("test1").src=content.data[0].images.downsized.url;
  });

}
gify('sweating')
//Add eventListeners for return button and start button

//Event Listeners will be listed below

startBtn.addEventListener("click", callWordsAPI);