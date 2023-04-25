// Import the function to be tested
const calculateAverage = require('../src/average');

describe('calculateAverage', () => {
  it('should return the correct average for an array of numbers', () => {
    // Arrange
    const input = [2, 4, 6, 8];
    const expectedOutput = 5;

    // Act
    const result = calculateAverage(input);

    // Assert
    expect(result).toEqual(expectedOutput);
  });

  it('should return 0 if the input array is empty', () => {
    // Arrange
    const input = [];
    const expectedOutput = 0;

    // Act
    const result = calculateAverage(input);

    // Assert
    expect(result).toEqual(expectedOutput);
  });
});
