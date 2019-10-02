// TDD a compareNumbers function that:
// Has two parameters: guess and correctNumber
// Returns one of the following values:
// 0 - the numbers are identical
// -1 - the guessed number is too low
// 1 - the guessed number is too high

export const compareNumbers = (guess, correctNumber = 7) => {
    //guess === correctNumber ? 0 : guess > correctNumber ? 1 : -1;
    if (guess === correctNumber) return 0;
    if (guess > correctNumber) return 1;
    return -1; // guess < correctNumber
};

//export const compareNumbers = (guess, correctNumber) => 7;

// adapted from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export const generateRandom20 = () => Math.floor(Math.random() * Math.floor(20));

// adapted from https://stackoverflow.com/questions/21033368/javascript-onclick-event-html-table and http://jsfiddle.net/8A37s/5/
// save table object to a variable
const table = document.getElementById('numbers-table');
// check that table exists
if (table !== null) {
    // iterate over table rows using length property to stop loop
    for (let i = 0; i < table.rows.length; i++) {
        // iterate over cells within each row (cells.length indicates the number of cells)
        for (let j = 0; j < table.rows[i].cells.length; j++)
            table.rows[i].cells[j].addEventListener = function () {
                tableText(this);
            };
    }
}

function tableText(tableCell) {
    alert(tableCell.innerHTML);
}