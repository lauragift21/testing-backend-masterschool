// it returns a "FizzBuzz" for multiples of 3 and 5, 0R 15
//  it return "Fizz" for multiples of 3
//  it return "Buzz" for multiples of 5

const fizzbuzz = require("../src/fizzbuzz")

describe("Fizzbuzz function", () => {
  it("the number return Fizzbuzz if is divisible is 3 and 5", () => {
    expect(fizzbuzz(15)).toBe("FizzBuzz");
  })
  it("the number return Fizzbuzz if is divisible is 5", () => {
    expect(fizzbuzz(5)).toBe("Buzz");
  })
  it("the number return Fizzbuzz if is divisible is 3", () => {
    expect(fizzbuzz(3)).toBe("Fizz");
  })
  it("the number is not divisible by 15, 5, or 3, return the num", () => {
    expect(fizzbuzz(0)).toBe(0);
  })
})