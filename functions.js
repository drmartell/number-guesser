// TDD a compareNumbers function that:
// Has two parameters: guess and correctNumber
// Returns one of the following values:
// 0 - the numbers are identical
// -1 - the guessed number is too low
// 1 - the guessed number is too high
export const compareNumbers = (guess, correctNumber = 7) => {
    if (isNaN(guess) || Number(guess) < 1 || Number(guess) >= 21)
        return 'num-error';
    const sanitizedGuess = parseInt(guess);
    if (sanitizedGuess > correctNumber) return 1;
    if (sanitizedGuess < correctNumber) return -1;
    return 0; // guess === correctNumber
};
