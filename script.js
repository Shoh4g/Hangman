var wordList = [ "DOG", "CAT", "CHICKEN" ];
var currentWordIndex = -1;
var word;
var words = document.getElementById("words");
var spanList;
var correctCount;
var hangman = document.getElementById("hangman");
var hangmanStep = 1;

function initGame() {
    getNextWord();
    document.querySelectorAll("li").forEach(function(btn) {
        btn.addEventListener("click", onButtonClick);
    });
}

function onButtonClick(event) {
    //alert(event.target.innerHTML);
    
    checkLetter(event.target);
}

function checkLetter(button) {
    //console.log(letter);
    button.className = "wrong";

    words.childNodes.forEach(function(eachLetter) {
        //console.log(eachLetter);
        if (eachLetter.getAttribute("data-letter") == button.innerHTML) {
            eachLetter.innerHTML = button.innerHTML;
            button.className = "correct";
            correctCount++;
        }
    });


    if (button.className == "wrong") {
        hangmanStep++;

        if (hangmanStep < 9) {
            hangman.setAttribute("src", "/resources/hangman0" + hangmanStep + ".png");
        }
        else if (hangmanStep >= 9) {
            hangmanStep = 9;
            hangman.setAttribute("src", "/resources/hangman09.png");

            setTimeout(function() {
                alert("You lose! Try again.");

                restartGame();
            }, 250);
        }
    }
    if (correctCount == word.length) {
        hangman.setAttribute("src", "/resources/hangman10.png");

        setTimeout(function() {
            alert("Correct! Let's try the next word.");

            getNextWord();
        }, 250);
    }
}

function getNextWord() {
    correctCount = 0;

    restartGame();
    
    currentWordIndex++;
    if (currentWordIndex >= wordList.length) {
        currentWordIndex = 0;
    }

    word = wordList[currentWordIndex];
    //console.log(word);

    createLetters();
}

function createLetters() {
    words.innerHTML = "";

    for (var i = 0; i < word.length; i++) {
        var span = document.createElement("span");
        span.setAttribute("data-letter", word[i]);
        //span.innerText = word[i];

        words.appendChild(span);
    }
}

function restartGame() {
    hangmanStep = 1;
    hangman.setAttribute("src", "/resources/hangman0" + hangmanStep + ".png");

    document.querySelectorAll("li").forEach(function(btn) {
        btn.className = "";
    });
}

initGame();








