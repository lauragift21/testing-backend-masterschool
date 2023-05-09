// write a function that calculates the average of an array of numbers
function calculateAverage(arr){
 const sum = arr.reduce((acc, curr) => acc + curr, 0);
 if (arr.length === 0) return 0;
 return sum / arr.length;
};

module.exports = calculateAverage;

// console.log(calculateAverage([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
