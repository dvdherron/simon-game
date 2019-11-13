let order = []; // randomly generated list/array by the computer.
let playerOrder = []; // order that the player is pessing the pffffff in
let flash; // integer. Number of flashes that have appeared in the game
let turn; // keep track of what turn we are on
let good; // boolean. wheter the player is doing good or not.
let compTurn; // boolean. keeps track of which players turn it is
let intervalId; 
let strict = true; // hard mode
let noise = true; // basically lets sound play if true.
let on = true; // power button for game
let win; // tells u if u win the game

// querySelector lets you take any CSS element and inject it in to your js code.
// here we are creating variables that will be shortcut for their value.
const turnCounter = document.querySelector("#turn");
const padOne = document.querySelector("#pad--one");

const padTwo = document.querySelector("#pad--two");
const padThree = document.querySelector("#pad--three");
const padFour = document.querySelector("#pad--four");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

// Button interface

// HARD-MODE button
// we create event listener for the button that says "strict"
strictButton.addEventListener('change', (event) => {
    // since strictButton is a checkbox (in html)
    // we can check if it's true or false/checked or unchecked, like so:
    if (strictButton.checked == true) {
        // this will turn on "hard-mode".
        strict = true;
    } else {
        // and this will turn off "hard-mode".
        strict = false;
    }
})

// ON button
onButton.addEventListener('click', (event) => {
    if (on) {
      on == false;
      turnCounter.innerHTML = "";
    } else {
      on = true;
      turnCounter.innerHTML = "--";
      
    }
    // if (onButton.checked == true) {
    //     on = true;
    //     // emulates turning on a hardware Simons Game. 
    //     // I.e adds a dash in the turn counter below the start button.
    //     turnCounter.innerHTML = "-";
    // } else {
    //     // turns off the game.
    //     on = false;
    //     turnCounter.innerHTML = "";
    //     // purges stored data (see functions declared below)
    //     clearColor();
    //     clearInterval(intervalId);
    // }
})

// START button
startButton.addEventListener('click', (event) => {
    // plays the game!
    // if on or win is true.
    if (on || win) {
        play();
    }
})

// PLAY button
function play() {
    win = false;
    order = []; // purges rand generated sequence.
    playerOrder = []; // purges user sequence
    flash = 0; 
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    // good checks if you missed any  pffffffs. 
    good = true;

    // heres where the sequence is generated.
    // it creates 20 digits from 1 - 4 and places them in the order list.
    for (var i = 0; i < 20; i++) {
        // gets a random number between 1 and 4.
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    // compTurn checks if its the computers turn or the users turn.
    compTurn = true;
    // makes pffffff flash every 0.8 seconds.
    // see setInterval() function below.
    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    // turn "on" variable to false, since its the computers turn to generate a sequence
    // which means you cannot press anything.
    on = false;
    // match flash array length with turn length. turn increments after every won turn.
    // see clear() function below, it will make more sense.
    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            // checks the list/array, calls functions one() to four()
            // depending on which number in the array matches.
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            // advances flash until it reaches same length as the var named turn.
            flash++;
        }, 200);
    }
}

function one() {
    if (noise) {
        let audio = document.getElementById("clip1");
        audio.play();
    }
    noise = true;
    padOne.style.fill = "var(--TL-flash)";
    padOne.style.stroke = "yellow";
    padOne.style.strokeWidth = 2;
}

function two() {
    if (noise) {
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    padTwo.style.fill = "var(--TR-flash)";
    padTwo.style.stroke = "yellow";
    padTwo.style.strokeWidth = 2;
}

function three() {
    if (noise) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    padThree.style.fill = "var(--BL-flash)";
    padThree.style.stroke = "yellow";
    padThree.style.strokeWidth = 2;
}

function four() {
    if (noise) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    padFour.style.fill = "var(--BR-flash)";
    padFour.style.stroke = "yellow";
    padFour.style.strokeWidth = 2;
}

// this function makes all the colors revert back to its original color.
function clearColor() {
  padOne.style.fill = "var(--TL-color)";
  padOne.style.stroke = "none";
  padOne.style.strokeWidth = 0;  
  padTwo.style.fill = "var(--TR-color";
  padTwo.style.strokeWidth = 0;
  padTwo.style.stroke = "none";
  padThree.style.fill = "var(--BL-color)";
  padThree.style.strokeWidth = 0;
  padThree.style.stroke = "none";
  padFour.style.fill = "var(--BR-color)";
  padFour.style.strokeWidth = 0;
  padFour.style.stroke = "none";
}

// flash color to pffffffer. this is what causes the boxes to appear as they are blinking.
function flashColor() {
  padOne.style.fill = "var(--TL-flash)";  
  padTwo.style.fill = "var(--TR-flash)";
  padThree.style.fill = "var(--BL-flash)";
  padFour.style.fill = "var(--BR-flash)";
}

// player clickable stuff
padOne.addEventListener('click', (event) => {
    if (on) {
        // playerOrder.push adds the user interaction to the array.
        playerOrder.push(1);
        // checks if input is correct
        check();
        one();
        // if incorrect it will do this. vvvvv
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

padTwo.addEventListener('click', (event) => {
    if (on) {
        // playerOrder.push adds the user interaction to the array.
        playerOrder.push(2);
        // checks if input is correct
        check();
        two();
        // if incorrect it will do this. vvvvv
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

padThree.addEventListener('click', (event) => {
    if (on) {
        // playerOrder.push adds the user interaction to the array.
        playerOrder.push(3);
        // checks if input is correct
        check();
        three();
        // if incorrect it will do this. vvvvv
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

padFour.addEventListener('click', (event) => {
    if (on) {
        // playerOrder.push adds the user interaction to the array.
        playerOrder.push(4);
        // checks if input is correct
        check();
        four();
        // if incorrect it will do this. vvvvv
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

function check() {
    // if the user sequence doesn't match, do this
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) 
        good = false;

    // if you've completed 20 rounds, without any mistakes you call the win() func.
    if (playerOrder.length == 20 && good) {
        winGame();
    }
    
    // If you miss, do this.
    if (good == false) {
        flashColor();
        turnCounter.innerHTML = "xxx";
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor();

            if (strict) {
                play();
            } else {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);

        noise = false;
    }

    // next round
    if (turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}

function winGame() {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    on = false;
    win = true;
}