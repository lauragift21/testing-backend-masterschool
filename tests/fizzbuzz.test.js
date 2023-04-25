const fizzbuzz = require("../src/fizzbuzz");

describe("fizzbuzz", () => {
  it("returns FizzBuzz if the number is divisible by 3 and 5", () => {
    expect(fizzbuzz(15)).toBe("FizzBuzz");
  });
  it("returns Fizz if the number is divisible by 3", () => {
    expect(fizzbuzz(3)).toBe("Fizz");
  });
  it("returns Buzz if the number is divisible by 5", () => {
    expect(fizzbuzz(5)).toBe("Buzz");
  });
  it("returns the number if it is not divisible by 3 or 5", () => {
    expect(fizzbuzz(1)).toBe(1);
  });
});
