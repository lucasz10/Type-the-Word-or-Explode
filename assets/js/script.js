//Section for defining global variables

var startTimerEl = document.getElementById('startTimer');
var timeLeft;
var startBtn = document.getElementById("nicknameBtn");
var endBtn = document.getElementById("returnHome");

var userName;

var nameHistory = JSON.parse(localStorage.getItem('nameHistory')) || [];
var wordHistory = JSON.parse(localStorage.getItem('wordHistory')) || [];
var timeHistory = JSON.parse(localStorage.getItem('timeHistory')) || [];

//Section for defining functions

function callWordsAPI() {

  var wordsAPI = "https://random-words-api.herokuapp.com/w?n=10"; // calling on the the API for words
  fetch(wordsAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      gameStart(data)
    });

};

//Function prepares the game by calling the words api and storing it. Handles the "gameBrief" element in the HTML document

function gameStart(words) {
  var startTimeLeft = 5;
  var guessWordsObj = []; //Creates a multidimensional array of guesswords with strings broken out into separate arrays

  userName = document.getElementById('nickname').value;//alowing user to enter their nickname for game.
  $('#nickname').val("");
  if (userName == 'Logan Garland') {
    $('#startingText').text("Giphy is pronounced with a HARD G, Logan. We've lost already.")//Easter egg when the name Logan Garland is typed in
  } else {
    $('#startingText').text("Get ready, " + userName + "! It's about to begin!");//Displays text. Get ready "userName"
  }


  for (i = 0; i < words.length; i++) {  //
    var guessWord = words[i].split("")
    guessWordsObj.push(guessWord);
  }

  gify('sweating', 'startingGif');
  document.getElementById("landingPage").style.display = "none";
  document.getElementById("gameBrief").style.display = "flex"; //Displays sweating gify in the gameBrief page

  var timeInterval = setInterval(function () {

    if (startTimeLeft > -1) {
      startTimerEl.textContent = "Time to start: " + startTimeLeft; // when timer count down finished  text will display "Time to start"
      startTimeLeft--;
    } else {
      startTimerEl.textContent = '';
      clearInterval(timeInterval);  //clearing the timeIterval
      typingGame(guessWordsObj);  //Words to type      
    }
  }, 1000);
};

//Function contains all elements of the game. Provides checks for failure and success
//also manages the words displaying on the screen while in game

function typingGame(gameObjective) {

  document.getElementById("gameBrief").style.display = "none";
  document.getElementById("inGame").style.display = "flex"; // will only display inGmae page 

  var i = 0;
  var j = 0;
  var successfulText = "";
  var correctWords = [];

  var timeLeft = 20; //time durning in game

  var timeInterval = setInterval(function () {

    if (timeLeft > -1) {
      $('#inGameTimer').text("Time Left: " + timeLeft)// displays time left in game
      timeLeft--;
    } else {
      $('#inGameTimer').text("");
      clearInterval(timeInterval);// clears the in game timer 

      $(document).off();
      gify('explosion', 'endingGif');
      $('#endingText').text("You failed! You buffoon!"); //Displays the fail gify and the fail text
      gameEnd(userName, correctWords, timeLeft);  //End game score     
    }
  }, 1000);

  $('#guessingWords').text(gameObjective[i].join(""));

  $(document).keypress(function () { //this will take the users keypress input

    event.preventDefault();

    if (event.key == gameObjective[i][j]) {
      successfulText += gameObjective[i][j];//checking the key press to see if its the correct key that needs to be pressed
      $('#typedWord').text(successfulText)

      j++;

      if (j == gameObjective[i].length) {

        correctWords.unshift(successfulText);

        i++;
        $('#typedWord').text("")
        successfulText = "";

        if (i < gameObjective.length) {
          $('#guessingWords').text(gameObjective[i].join(""));
          j = 0;
        } else {
          $(document).off();
          gify('celebration', 'endingGif'); // celebration gify dispays when finished successfully
          $('#endingText').text("I can't believe you actually pulled it off.");// when successfully finished game text will diplay "i cant belive you actually pulled it off"
          $('#inGameTimer').text("");
          clearInterval(timeInterval); //clears the timer 
          gameEnd(userName, correctWords, timeLeft); //Displays score 
        };
      }

    } else if (event.key !== gameObjective[i][j]) {
      $(document).off();
      $('#typedWord').text("");

      gify('explosion', 'endingGif'); //fail gify will display an eplosion 
      $('#endingText').text("You failed! You buffoon!");// fail text will display "you failed! You buffoon!"
      $('#inGameTimer').text("");
      clearInterval(timeInterval);// clears timer 
      gameEnd(userName, correctWords, timeLeft);  // Displays gameEnd score 
    }
  });
};

//Function stores user data locally

function gameEnd(userName, userWords, userTime) {

  document.getElementById("inGame").style.display = "none";
  document.getElementById("endGame").style.display = "flex";

  $('#userTimeLeft').text("Time Left: " + userTime);
  $('#userCorrectWords').text("Correct Words: " + userWords);

  nameHistory.unshift(userName);
  timeHistory.unshift(userTime);
  wordHistory.unshift(userWords);

  localStorage.setItem('nameHistory', JSON.stringify(nameHistory));
  localStorage.setItem('timeHistory', JSON.stringify(timeHistory));
  localStorage.setItem('wordHistory', JSON.stringify(wordHistory));



}

function returnHome() {

  document.getElementById("landingPage").style.display = "flex";
  document.getElementById("landingPage").style.flexDirection = "column";
  document.getElementById("endGame").style.display = "none";

  getGameHistory();

};


//Function for storing gameData locally and Adjusting score table on landing page

function getGameHistory() {

  $('#scoreboardInput').empty(); //Clears history before reinserting
  $('#wordStorage').empty();

  if (nameHistory.length > 5) { //Limits history to 5 unique items
    nameHistory.pop();
    wordHistory.pop();
    timeHistory.pop();
  };


  for (let i = 0; i < nameHistory.length; i++) {

    $('#scoreboardInput').append("<tr><td>" + nameHistory[i] + "</td><td>" + timeHistory[i] + "</td><td class='uk-flex'><button class='uk-button uk-button-default' type='button'>" + wordHistory[i].length + "</button><div uk-dropdown>" + wordHistory[i] + "</div></td></tr>");

  }
};



//Function for calling Giphy api, may be able to include in active game function

let APIKEY = "ssS6qrhl6fvn3W4QEtQrYHXKJmdrveFI";

function gify(state, location) {


  let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=` + state;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (content) {

      document.getElementById(location).src = content.data[0].images.downsized.url;
    });

}

getGameHistory();



//Add eventListeners for return button and start button

//Event Listeners will be listed below

startBtn.addEventListener("click", callWordsAPI);
endBtn.addEventListener("click", returnHome);

