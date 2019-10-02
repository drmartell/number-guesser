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