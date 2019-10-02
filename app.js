// TDD a compareNumbers function that:
// Has two parameters: guess and correctNumber
// Returns one of the following values:
// 0 - the numbers are identical
// -1 - the guessed number is too low
// 1 - the guessed number is too high
export const compareNumbers = (guess, correctNumber = 7) => {
    //guess === correctNumber ? 0 : guess > correctNumber ? 1 : -1;
    if (guess > correctNumber) return 1;
    if (guess < correctNumber) return -1;
    return 0; // guess === correctNumber
};

//export const compareNumbers = (guess, correctNumber) => 7;

// adapted from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export const generateRandom20 = () => Math.floor(Math.random() * Math.floor(20)) + 1;

// const submitButton = document.getElementById('submit-button');
// console.log(submitButton);
// submitButton.addEventListener('click', () => {
//     alert('You clicked submit');
// });

const triesRemaining = document.getElementById('tries-remaining');
const numTable = document.getElementById('numbers-table');
const rawUserGuess = document.getElementById('user-guess');
const submitButton = document.getElementById('make-guess');
const playAgainButton = document.getElementById('play-again');
const notifier = document.getElementById('notifier');
const tooHighSpan = document.getElementById('too-high');
const tooLowSpan = document.getElementById('too-low');

const hiddenNumber = generateRandom20();
console.log(hiddenNumber);
//let triesRemaining = 4;
//let userGuess = rawUserGuess.value;
let tooHigh = '';
let tooLow = '';

triesRemaining.innerText = 4;

submitButton.addEventListener('click', () => updateTable(rawUserGuess.value));

function updateTable(numGuessed) {
    console.log(numGuessed, '@updateTable');
    // numGuessed ISN'T LOGGING
    document.getElementById("num" + numGuessed).click();
}

// reload syntax from here: https://stackoverflow.com/questions/10839989/why-cant-i-pass-window-location-reload-as-an-argument-to-settimeout
playAgainButton.addEventListener('click', () => {
    console.log('reloading');
    playAgainButton.classname = "play-again";
    window.location.reload();
});
// adapted from https://stackoverflow.com/questions/21033368/javascript-onclick-event-html-table and http://jsfiddle.net/8A37s/5/
// save table object to a variable
// table.addEventListener('click', () => function () {
//     console.log('you clicked on the table')
// });

// check that table exists
if (numTable !== null) {
    // iterate over table rows using length property to stop loop
    for (let i = 0; i < numTable.rows.length; i++) {
        // iterate over cells within each row (cells.length indicates the number of cells)
        for (let j = 0; j < numTable.rows[i].cells.length; j++) {
            //numTable.rows[i].cells[j].addEventListener('click', function() {
            // console.log(numTable.rows[i].cells[j].id);
            //numTable.rows[i].cells[j].addEventListener('click', function() {
            document.getElementById(numTable.rows[i].cells[j].id).addEventListener('click', function() {
                //alert(this.innerHTML);
                // console.log(this);
                // console.log(this.class);
                // console.log(typeof this);
                //this.class = "chosen";
                // decrement tries remaining if until exhausted
                //triesRemaining = triesRemaining.innerText;
                // reference for how to break an if statement: https://stackoverflow.com/questions/4851657/call-break-in-nested-if-statements
                breakable: if (triesRemaining.innerText > 0) {
                    // prevent multiple selections of the same number
                    if (this.className === "chosen") break breakable;

                    this.className = "chosen";
                    triesRemaining.innerText -= 1;
                    let numUserClicked = this.innerText;
                    if (compareNumbers(numUserClicked, hiddenNumber) === 1) {
                        tooHigh += tooHigh.length > 0 ? ' and ' + numUserClicked : numUserClicked;
                        tooHighSpan.innerText = `These numbers were too high: ${tooHigh}.`;
                        //if (triesRemaining.innerText == 0) youLost();
                    }
                    else if (compareNumbers(numUserClicked, hiddenNumber) === -1) {
                        tooLow += tooLow.length > 0 ? ' and ' + numUserClicked : numUserClicked;
                        tooLowSpan.innerText = `These numbers were too low: ${tooLow}.`;
                        //if (triesRemaining.innerText == 0) youLost();
                    }
                    else {
                        notifier.innerText = `OMG, you WON on your ${(4 - triesRemaining.innerText) === 4 ? '4th' :  (4 - triesRemaining.innerText) === 3 ? '3rd' : (4 - triesRemaining.innerText) === 2 ? '2nd' : '1st'} try!`;                        triesRemaining.innerText = -1;
                        notifier.className = "winner-text";
                        this.className = "winner";
                        playAgainButton.className = "visible";
                    }
                    //console.log(hiddenNumber);
                }
                // game over if tries gets to zero
                if (triesRemaining.innerText == 0) {
                    //setTimeout( function() {
                        notifier.innerText = `SO sorry, ya LOST - it was ${hiddenNumber}!`;
                        notifier.className = "loser-text";
                        playAgainButton.className = "visible";
                      //}, 250);
                }
                // this.$forceUpdate();
                //tableText(this);

            });
        }
    }
}

// function youLost() {
//     //setTimeout( function() {
//         console.log('you lost');
//         notifier.innerText = `SO sorry, ya LOST ;)`;
//         notifier.className = "loser-text";
//         playAgainButton.className = "hidden";
//         //}, 250);
// }
// function tableText(tableCell) {
//     alert(tableCell.innerHTML);
// }