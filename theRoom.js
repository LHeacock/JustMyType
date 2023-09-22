const $promptContainer = $("#prompt-container");
const $keyboardUpper = $("#keyboard-upper-container");
const $keyboardLower = $("#keyboard-lower-container");
const $feedback = $("#feedback");
const $sentence = $("#sentence");
const $letter = $("#target-letter");
const $yellow = $("#yellow-block");


let numberOfWords = 0;
let numberOfMistakes = 0;


const yellowStartingPx = '15px';



$keyboardUpper.hide()

$("body").on("keydown", function (e) {
    if (e.which === 16) {
        $keyboardLower.hide()
        $keyboardUpper.show()
    }
    if (e.shiftKey == true) {
        let letter = $("#" + e.keyCode);
        letter.css("background-color", "yellow");
    }
    else {
        let letter = $("#" + (e.keyCode + 32))
        letter.css("background-color", "yellow");
    }

});

$("body").on("keyup", function (e) {
    $("#" + e.key).css("background-color", "");
    if (e.which === 16) {
        $keyboardUpper.hide()
        $keyboardLower.show()
    }
    if (e.shiftKey == true) {
        $("#" + e.keyCode).css("background-color", "");
    }
    else {
        $("#" + (e.keyCode + 32)).css("background-color", "");
    }
});

let mark = ["Oh hi Mark!", "I did not hit her, I did not"];


let inCorrectCount = 0;
let whereIsTheSentence = 0;
let whereIsTheLetter = 0;
let currentSentence = mark[whereIsTheSentence];
let currentLetter = currentSentence[whereIsTheLetter];

$sentence.append(currentSentence);
$letter.append(currentLetter);

$("body").on("keypress", function (e) {
    if (!currentLetter) {
        updateFeedbackForms();
    }
    const $keyEntry = $("#" + e.keyCode);
    let letterGuess = $keyEntry.text();
    if (letterGuess == "Space") {
        letterGuess = " ";
    }
    if (letterGuess == currentLetter) {
        let $correctDiv = $("<div style = 'display: inline-block;' class='glyphicon-ok'></div>");
        $feedback.append($correctDiv);
    }
    else {
        const $wrongDiv = $("<div style = 'display: inline-block;' class='glyphicon-remove'></div>");
        $feedback.append($wrongDiv);
    }
    whereIsTheLetter++;
    currentLetter = currentSentence[whereIsTheLetter];
    if (whereIsTheLetter > currentSentence.length) {
        updateFeedbackForms();
    }

    progressGame();
});


function updateFeedbackForms() {
    whereIsTheSentence++;
    if (whereIsTheSentence > mark.length) {
        endGame();
    }
    currentSentence = mark[whereIsTheSentence];
    $sentence.text("");
    $sentence.append(currentSentence);
    whereIsTheLetter = 0;
    currentLetter = currentSentence[whereIsTheLetter];
    $feedback.text("");
    $yellow.css("left", yellowStartingPx);
}

function endGame() {
    $feedback.text('');
    $feedback.append("You're accuracy was " + (numberOfWords / numberOfMistakes))
}

function progressGame(){
    $letter.text('');
    if(currentLetter == " ")
    {
        $letter.append("");
    }
    else{
        $letter.append(currentLetter);
    }
    
    let currentPositionText = $yellow.css("left").replace('px', '');
    let currentPositionNumber = parseInt(currentPositionText);

    $yellow.css("left", (currentPositionNumber + 15) + 'px')
}

