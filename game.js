var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function addNewColorToGamePatter(gamePattern, buttonColors) {
    var randomChosenColor = buttonColors[createRandomNumber(0, 3)];
    gamePattern.push(randomChosenColor);
    return gamePattern;
}

$("body").keypress(function () {
    if(level <= 0) {
        nextSequence();
    }
});

$(".btn").click(function (event) {
    if(level >= 1) {
        var userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);
        checkAnswer(level);
        animatePress(userChosenColor);
        playAudio(userChosenColor);
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
        
    }
});

function nextSequence() {
    userClickedPattern = [];
    addNewColorToGamePatter(gamePattern, buttonColors);
    $(`#${gamePattern[gamePattern.length-1]}`).fadeOut(100).fadeIn(100);
    //console.log(`gamePattern: ${gamePattern}`);
    level++;
    $("h1").text(`Level ${level}`);
}

function checkAnswer(level) {
    //console.log(`level: ${level}`);
    //console.log(`gamePattern: ${gamePattern}`);
    //console.log(`userClickedPattern: ${userClickedPattern}`);
    if (userClickedPattern[userClickedPattern.length-1] == gamePattern[userClickedPattern.length-1]) {
        //console.log("Success!");
    }
    else {
        wrongClicked();
        startOver(); 
    } 
}

function startOver() {
    buttonColors = ["red", "blue", "green", "yellow"];
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}

function wrongClicked() {
    //console.log("Wrong!");
        var wrong = new Audio('sounds/wrong.mp3');
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over! Game will restart.");
}

function createRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playAudio(currentColor) {
    switch (currentColor) {
        case "red":
            var red = new Audio('sounds/red.mp3');
            red.play();
            break;
        case "blue":
            var blue = new Audio('sounds/blue.mp3');
            blue.play();
            break;
        case "green":
            var green = new Audio('sounds/green.mp3');
            green.play();
            break;
        case "yellow":
            var yellow = new Audio('sounds/yellow.mp3');
            yellow.play();
            break;
        default:
            break;
    }
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function(){
        $(`#${currentColor}`).removeClass("pressed");
    }, 150);
}