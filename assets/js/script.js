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
      }
    }, 1000);
}
  
function displayMessage() {
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

 function landPage() {

    var lander = getElementById('scoreBoard' , 'startPoint')
 }

 var wordsAPI = "https://random-words-api.herokuapp.com/w?n=10";
fetch(wordsAPI)
.then(function (response) {
    return response.json();
})
.then (function (data) {
    console.log(data);
});