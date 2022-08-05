//Section for defining global variables

var startTimerEl = document.getElementById('startTimer');
// var mainEl = document.getElementById('Time');
// change or adder h2 header to add id = time
var message = "10 words"
var startBtn = document.getElementById("nicknameBtn");
var endBtn = document.getElementById("returnHome");


var debugBtn = document.getElementById("debugBtn");

//Section for defining functions
  
function callWordsAPI() {

  var wordsAPI = "https://random-words-api.herokuapp.com/w?n=10"; //Need to throw this call in beginning of gameStart function
  fetch(wordsAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      gameStart(data)
    });

};

function gameStart(words) {
 
  var startTimeLeft = 5;
  var guessWordsObj = []; //Creates a multidimensional array of guesswords with strings broken out into separate arrays

  for (i = 0; i < words.length; i++) {
    var guessWord = words[i].split("")
    guessWordsObj.push(guessWord);
  }

  console.log(guessWordsObj);

  document.getElementById("landingPage").style.display = "none";
  document.getElementById("inGame").style.display = "none";
  document.getElementById("endGame").style.display = "none";


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

function returnHome() {
  document.getElementById("landingPage").style.display = "flex";
  document.getElementById("inGame").style.display = "none";
  document.getElementById("endGame").style.display = "none";

};

function typingGame(gameObjective) {
  
  document.getElementById("gameBrief").style.display = "none";
  document.getElementById("inGame").style.display = "flex";

  for(i=0 ; i < gameObjective.length ; i++) {
    $("#guessingWords").innerHTML = gameObjective[i][0]
    // $('#debugBtn').click(function() {
    //   i = i + 1;
    // })
  }
};

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

function gify(state) {


  let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=` + state;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (content) {
      console.log(content);
      document.getElementById("test1").src = content.data[0].images.downsized.url;
    });

}
gify('sweating')
//Add eventListeners for return button and start button

//Event Listeners will be listed below

startBtn.addEventListener("click", callWordsAPI);
endBtn.addEventListener("click", returnHome);