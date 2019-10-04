import { compareNumbers } from './functions.js';

// adapted from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export const generateRandom20 = () => Math.floor(Math.random() * Math.floor(20)) + 1;

// get DOM elements
const triesRemaining = document.getElementById('tries-remaining');
const numTable = document.getElementById('numbers-table');
const rawUserGuess = document.getElementById('user-guess-id');
const submitButton = document.getElementById('make-guess');
const playAgainButton = document.getElementById('play-again');
const notifier = document.getElementById('notifier');
const tooHighSpan = document.getElementById('too-high');
const tooLowSpan = document.getElementById('too-low');

// generate the secret number
const secretNumber = generateRandom20();
let tooHigh = '';
let tooLow = '';

// set initial user message of number of tries
triesRemaining.innerText = 4;

// add event listeners
    // submitButton gets number from html number element
//submitButton.addEventListener('click', () => updateTable(rawUserGuess.value));
submitButton.addEventListener('click', () => updateTable(rawUserGuess.value));
    
    // reload syntax from here: https://stackoverflow.com/questions/10839989/why-cant-i-pass-window-location-reload-as-an-argument-to-settimeout
playAgainButton.addEventListener('click', () => resetGame());

// declare helper functions
function updateTable(numGuessed) {
    document.getElementById('num' + numGuessed).click();
}

function resetGame() {
    // reset button to invisible
    playAgainButton.classname = 'play-again';
    // reload window for new game
    window.location.reload();
}

// adapted from https://stackoverflow.com/questions/21033368/javascript-onclick-event-html-table and http://jsfiddle.net/8A37s/5/
// check that table exists
if (numTable !== null) {
    // iterate over table rows using length property to stop loop
    for (let i = 0; i < numTable.rows.length; i++) {
        // iterate over cells within each row (cells.length indicates the number of cells)
        for (let j = 0; j < numTable.rows[i].cells.length; j++) {
            document.getElementById(numTable.rows[i].cells[j].id).addEventListener('click', function() {
                // decrement tries remaining if until exhausted
                // reference for how to break an if statement: https://stackoverflow.com/questions/4851657/call-break-in-nested-if-statements
                breakable: if (triesRemaining.innerText > 0) {
                    // prevent multiple selections of the same number by breaking out of if statement
                    if (this.className === 'chosen') break breakable;
                    // update UI to indicate user selection
                    this.className = 'chosen';
                    triesRemaining.innerText -= 1;
                    let numUserClicked = this.innerText;
                    if (compareNumbers(numUserClicked, secretNumber) === 1) {
                        updateTooHigh(numUserClicked); 
                    } else if (compareNumbers(numUserClicked, secretNumber) === -1) {
                        updateTooLow(numUserClicked);
                    } else {
                        doWin()
                }
                // game over if tries gets to zero
                if (parseInt(triesRemaining.innerText) === 0) {
                    doLoss()
                };
            };
        }
    }
}
        
    
function doLoss() {
    notifier.innerText = `SO sorry, ya LOST - it was ${secretNumber}!`;
    notifier.className = 'loser-text';
    playAgainButton.className = 'visible';
};
    
function doWin() {
    notifier.innerText = `OMG, you WON on your ${(4 - triesRemaining.innerText) === 4 ? '4th' :  (4 - triesRemaining.innerText) === 3 ? '3rd' : (4 - triesRemaining.innerText) === 2 ? '2nd' : '1st'} try!`; triesRemaining.innerText = -1;
    notifier.className = 'winner-text';
    this.className = 'winner';
    playAgainButton.className = 'visible';
};

function updateTooLow(userSelection) {
    tooLow += tooLow.length > 0 ? ' and ' + userSelection : userSelection;
    tooLowSpan.innerText = `These numbers were too low: ${tooLow}.`;
}

function updateTooHigh(userSelection) {
    tooHigh += tooHigh.length > 0 ? ' and ' + userSelection : userSelection;
    tooHighSpan.innerText = `These numbers were too high: ${tooHigh}.`
};
