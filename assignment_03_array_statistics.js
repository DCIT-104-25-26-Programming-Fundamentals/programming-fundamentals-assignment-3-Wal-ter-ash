// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 3
// =============================================================================
//
// TASK: Array Statistics Calculator
//
// Write a JavaScript program that reads a collection of numbers from the user
// and computes key statistical values using separate functions.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_03_array_statistics.js
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT / OUTPUT EXAMPLE
// -----------------------------------------------------------------------------
//
//   How many numbers? 5
//   Enter number 1: 4
//   Enter number 2: 7
//   Enter number 3: 2
//   Enter number 4: 9
//   Enter number 5: 1
//
//   Results:
//   Sum:     23
//   Average: 4.6
//   Maximum: 9
//   Minimum: 1
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - You MUST implement each calculation in its own function (see scaffold).
// - You may NOT use JavaScript's built-in array methods like reduce(),
//   Math.max(), or Math.min(). Implement the logic yourself using loops.
// - N must be a positive integer. If the user enters 0 or a negative number,
//   print an error message and stop.
//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require("readline-sync");

function calculateSum(numbers) {
  let total = 0;

  for (let i = 0; i < numbers.length; i += 1) {
    total += numbers[i];
  }

  return total;
}

function calculateAverage(numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  const sum = calculateSum(numbers);
  return sum / numbers.length;
}

function findMaximum(numbers) {
  let max = numbers[0];

  for (let i = 1; i < numbers.length; i += 1) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }

  return max;
}

function findMinimum(numbers) {
  let min = numbers[0];

  for (let i = 1; i < numbers.length; i += 1) {
    if (numbers[i] < min) {
      min = numbers[i];
    }
  }

  return min;
}

function main() {
  const count = readlineSync.questionInt("How many numbers? ");

  if (count <= 0) {
    console.log("Error: Number of values must be a positive integer.");
    return;
  }

  const numbers = [];

  for (let i = 0; i < count; i += 1) {
    const value = readlineSync.questionInt(`Enter number ${i + 1}: `);
    numbers.push(value);
  }

  console.log("\nResults:");
  console.log(`Sum:     ${calculateSum(numbers)}`);
  console.log(`Average: ${calculateAverage(numbers)}`);
  console.log(`Maximum: ${findMaximum(numbers)}`);
  console.log(`Minimum: ${findMinimum(numbers)}`);
}

main();
