function calculateAverage(arr) {
  const sum = arr.reduce((acc, curr) => acc + curr, 0);
  if (arr.length === 0) return 0;
  return sum / arr.length;
}

module.exports = calculateAverage;
