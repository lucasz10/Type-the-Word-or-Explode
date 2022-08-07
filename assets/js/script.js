//Section for defining global variables

var startTimerEl = document.getElementById('startTimer');
var timeLeft;
var startBtn = document.getElementById("nicknameBtn");
var endBtn = document.getElementById("returnHome");

var userName;

var gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];

//Section for defining functions
  
function callWordsAPI() {

  var wordsAPI = "https://random-words-api.herokuapp.com/w?n=10"; //Need to throw this call in beginning of gameStart function
  fetch(wordsAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      gameStart(data)
      console.log(data);
    });

};

function gameStart(words) {

  userName = document.getElementById('nickname').value;
  $('#nickname').val("");
  if(userName == 'Logan Garland') {
    $('#startingText').text("Giphy is pronounced with a HARD G, Logan. We've lost already.")
  } else {
    $('#startingText').text("Get ready, " + userName + "! It's about to begin!");
  }
 
  var startTimeLeft = 5;
  var guessWordsObj = []; //Creates a multidimensional array of guesswords with strings broken out into separate arrays

  for (i = 0; i < words.length; i++) {
    var guessWord = words[i].split("")
    guessWordsObj.push(guessWord);
  }

  gify('sweating' , 'startingGif');
  document.getElementById("landingPage").style.display = "none";
  document.getElementById("gameBrief").style.display = "flex";

  var timeInterval = setInterval(function () {
    
    if (startTimeLeft > -1) {
      startTimerEl.textContent = "Time to start: " + startTimeLeft ;
      startTimeLeft--;
    } else {
      startTimerEl.textContent = '';  
      clearInterval(timeInterval);  
      typingGame(guessWordsObj);        
    }
  }, 1000);
};


function typingGame(gameObjective) {

  document.getElementById("gameBrief").style.display = "none";
  document.getElementById("inGame").style.display = "flex";
  
  var i = 0;
  var j = 0;
  var successfulText = "";
  var correctWords = [];

  var timeLeft = 20;

  var timeInterval = setInterval(function () {
    
    if (timeLeft > -1) {
      $('#inGameTimer').text("Time Left: " + timeLeft)
      timeLeft--;
    } else {
      $('#inGameTimer').text("");  
      clearInterval(timeInterval);
      
      $(document).off();
      gify('explosion' , 'endingGif');
      $('#endingText').text("You failed! You buffoon!");
      gameEnd(userName , correctWords , timeLeft);       
    }
  }, 1000);

  $('#guessingWords').text(gameObjective[i].join(""));
  
  $(document).keypress(function(){
      
      event.preventDefault();
      
      if(event.key == gameObjective[i][j]) {
        successfulText += gameObjective[i][j];
        $('#typedWord').text(successfulText)
        
        j++;
        
        if(j == gameObjective[i].length){

          correctWords.unshift(successfulText);

          i++;
          $('#typedWord').text("")
          successfulText = "";

          if(i < gameObjective.length){
            $('#guessingWords').text(gameObjective[i].join(""));
            j = 0;
          } else {
            $(document).off();
            gify('celebration' , 'endingGif');
            $('#endingText').text("I can't believe you actually pulled it off.");
            $('#inGameTimer').text("");
            clearInterval(timeInterval);
            gameEnd(userName , correctWords , timeLeft);
          };
        }
        
      } else if(event.key !== gameObjective[i][j]){
        $(document).off();
        $('#typedWord').text("");

        gify('explosion' , 'endingGif');
        $('#endingText').text("You failed! You buffoon!");
        $('#inGameTimer').text("");
        clearInterval(timeInterval);
        gameEnd(userName , correctWords , timeLeft);  
      }  
    });
};

function gameEnd(userName , userWords , userTime) {

  document.getElementById("inGame").style.display = "none";
  document.getElementById("endGame").style.display = "flex";

  $('#userTimeLeft').text("Time Left: " + userTime);
  $('#userCorrectWords').text("Correct Words: " + userWords);

  var recentGame = {
    charName: userName,
    words: userWords,
    time: userTime,
  };
  
  gameHistory.push(recentGame);
  localStorage.setItem('gameHistory', JSON.stringify(recentGame));
  
console.log(gameHistory);


}

function returnHome() {

  document.getElementById("landingPage").style.display = "flex";
  document.getElementById("landingPage").style.flexDirection = "column";
  document.getElementById("endGame").style.display = "none";

  getGameHistory();

};


//Function for storing gameData locally

function getGameHistory() {

  $('#scoreBoardInput').empty(); //Clears history before reinserting
  
  if(gameHistory.length > 5){ //Limits history to 5 unique items
      gameHistory.pop();
  };

  for(let i = 0; i < gameHistory.length; i++) {
      $('#scoreboardInput').append("<tr><td>" + gameHistory[i].charName + "</td><td>" + gameHistory[i].words + "</td><td>" + gameHistory[i].time + "</td></tr>");
  }
};



//Function for calling Giphy api, may be able to include in active game function

let APIKEY = "ssS6qrhl6fvn3W4QEtQrYHXKJmdrveFI";

function gify(state , location) {


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

console.log(gameHistory)

//Add eventListeners for return button and start button

//Event Listeners will be listed below

startBtn.addEventListener("click", callWordsAPI);
endBtn.addEventListener("click", returnHome);

