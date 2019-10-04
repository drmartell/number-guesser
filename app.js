import { compareNumbers } from './functions.js';

let tooHigh = '';
let tooLow = '';
const triesRemaining = document.getElementById('tries-remaining');
const numTable = document.getElementById('numbers-table');
const rawUserGuess = document.getElementById('user-guess-id');
const submitButton = document.getElementById('make-guess');
const playAgainButton = document.getElementById('play-again');
const notifier = document.getElementById('notifier');
const tooHighSpan = document.getElementById('too-high');
const tooLowSpan = document.getElementById('too-low');
const secretNumber = Math.ceil(Math.random() * 20);

triesRemaining.innerText = 4;

submitButton.addEventListener('click', () => updateTable(rawUserGuess.value));
playAgainButton.addEventListener('click', () => resetGame());

if (numTable !== null) {
    for (let i = 0; i < numTable.rows.length; i++) {
        for (let j = 0; j < numTable.rows[i].cells.length; j++) {
            document.getElementById(numTable.rows[i].cells[j].id).addEventListener('click', (event) => userState(event.target));
        }
    }
}

function resetGame() {
    playAgainButton.classname = 'play-again';
    window.location.reload();
}

function userState(thisCell) {
    breakable: if (triesRemaining.innerText > 0) {
        if (thisCell.className === 'chosen') break breakable;
        thisCell.className = 'chosen';
        triesRemaining.innerText -= 1;
        let numUserClicked = thisCell.innerText;
        if (compareNumbers(numUserClicked, secretNumber) === 1) {
            updateTooHigh(numUserClicked); 
        } else if (compareNumbers(numUserClicked, secretNumber) === -1) {
            updateTooLow(numUserClicked);
        } else {
            doWin(playAgainButton, thisCell);
        }
    }
    if (parseInt(triesRemaining.innerText) === 0) {
        doLoss(playAgainButton);
    }
} 

function updateTable(numGuessed) {
    document.getElementById('num' + numGuessed).click();
}
   
function doLoss(playButton) {
    notifier.innerText = `SO sorry, ya LOST - it was ${secretNumber}!`;
    notifier.className = 'loser-text';
    playButton.className = 'visible';
}
    
function doWin(playButton, clickedCell) {
    notifier.innerText = `OMG, you WON on your ${(4 - triesRemaining.innerText) === 4 ? '4th' :  (4 - triesRemaining.innerText) === 3 ? '3rd' : (4 - triesRemaining.innerText) === 2 ? '2nd' : '1st'} try!`; triesRemaining.innerText = -1;
    notifier.className = 'winner-text';
    clickedCell.className = 'winner';
    playButton.className = 'visible';
}

function updateTooLow(userSelection) {
    tooLow += tooLow.length > 0 ? ' and ' + userSelection : userSelection;
    tooLowSpan.innerText = `These numbers were too low: ${tooLow}.`;
}

function updateTooHigh(userSelection) {
    tooHigh += tooHigh.length > 0 ? ' and ' + userSelection : userSelection;
    tooHighSpan.innerText = `These numbers were too high: ${tooHigh}.`
}
