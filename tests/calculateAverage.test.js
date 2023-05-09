const calculateAverage = require('../src/calculateAverage');

describe('calculateAverage', () => {
  it('should return the average of an array of numbers', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = 5.5;
    expect(result).toEqual(calculateAverage(arr))
  });

  it('should return 0 if the array is empty', () => {
    expect(calculateAverage([])).toBe(0);
  });
});

