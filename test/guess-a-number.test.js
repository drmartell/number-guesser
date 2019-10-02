// IMPORT MODULES under test here:
// import example from '../src/example.js';

import { compareNumbers } from '../app.js/';

const test = QUnit.test;

test('should return 0 if userInput is equal to the default value of 7', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const userNumber = 7;
    const correctNumber = 7;
    //Act 
    // Call the function you're testing and set the result to a const
    const result = compareNumbers(userNumber, correctNumber);
    //Assert
    // Make assertions about what is expected valid result
    assert.equal(result, 0);
});

test('should return 1 if userInput is greater than twenty', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const userNumber = 21;
    const correctNumber = 7;
    //Act 
    // Call the function you're testing and set the result to a const
    const result = compareNumbers(userNumber, correctNumber);
    //Assert
    // Make assertions about what is expected valid result
    assert.equal(result, 1);
});

test('should return -1 if userInput is less than zero', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const userNumber = -1;
    const correctNumber = 7;
    //Act 
    // Call the function you're testing and set the result to a const
    const result = compareNumbers(userNumber, correctNumber);
    //Assert
    // Make assertions about what is expected valid result
    assert.equal(result, -1);
});