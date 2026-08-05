// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require("readline-sync");

function readDimensions(title) {
  console.log(title);
  const rows = readlineSync.questionInt("Enter number of rows: ");
  const cols = readlineSync.questionInt("Enter number of columns: ");

  if (rows <= 0 || cols <= 0) {
    console.log("Error: Number of rows and columns must be positive integers.");
    process.exit(1);
  }

  return { rows, cols };
}

function readMatrix(rows, cols) {
  const matrix = [];

  for (let i = 0; i < rows; i += 1) {
    const rowInput = readlineSync.question(`Enter row ${i + 1}: `);
    const row = rowInput.trim().split(/\s+/).map(Number);

    if (row.length !== cols) {
      console.log(`Error: Row ${i + 1} must contain exactly ${cols} values.`);
      process.exit(1);
    }

    matrix.push(row);
  }

  return matrix;
}

function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let j = 0; j < cols; j += 1) {
    const newRow = [];

    for (let i = 0; i < rows; i += 1) {
      newRow.push(matrix[i][j]);
    }

    result.push(newRow);
  }

  return result;
}

function addMatrices(matrixA, matrixB) {
  const rows = matrixA.length;
  const cols = matrixA[0].length;
  const result = [];

  for (let i = 0; i < rows; i += 1) {
    const newRow = [];

    for (let j = 0; j < cols; j += 1) {
      newRow.push(matrixA[i][j] + matrixB[i][j]);
    }

    result.push(newRow);
  }

  return result;
}

function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const colsB = matrixB[0].length;
  const result = [];

  for (let i = 0; i < rowsA; i += 1) {
    const newRow = [];

    for (let j = 0; j < colsB; j += 1) {
      let sum = 0;

      for (let k = 0; k < colsA; k += 1) {
        sum += matrixA[i][k] * matrixB[k][j];
      }

      newRow.push(sum);
    }

    result.push(newRow);
  }

  return result;
}

function formatMatrix(matrix) {
  const width = matrix.reduce((maxWidth, row) => {
    return row.reduce((rowMax, value) => {
      const length = String(value).length;
      return length > rowMax ? length : rowMax;
    }, maxWidth);
  }, 0);

  return matrix
    .map((row) => row.map((value) => String(value).padStart(width)).join(" "))
    .join("\n");
}

function main() {
  const dimsA = readDimensions("Part A — Transpose a Matrix");
  const matrixA = readMatrix(dimsA.rows, dimsA.cols);
  const transposed = transposeMatrix(matrixA);

  console.log("\nOriginal Matrix:");
  console.log(formatMatrix(matrixA));
  console.log("\nTransposed Matrix:");
  console.log(formatMatrix(transposed));

  const dimsB = readDimensions("\nPart B — Add Two Matrices");
  console.log("Enter values for Matrix 1:");
  const matrixB1 = readMatrix(dimsB.rows, dimsB.cols);
  console.log("Enter values for Matrix 2:");
  const matrixB2 = readMatrix(dimsB.rows, dimsB.cols);
  const sumMatrix = addMatrices(matrixB1, matrixB2);

  console.log("\nMatrix 1:");
  console.log(formatMatrix(matrixB1));
  console.log("\nMatrix 2:");
  console.log(formatMatrix(matrixB2));
  console.log("\nSum Matrix:");
  console.log(formatMatrix(sumMatrix));

  console.log("\nPart C — Multiply Two Matrices");
  const dimsC1 = readDimensions("Matrix A");
  const matrixC1 = readMatrix(dimsC1.rows, dimsC1.cols);
  const dimsC2 = readDimensions("Matrix B");

  if (dimsC1.cols !== dimsC2.rows) {
    console.log(
      "Error: Number of columns in Matrix A must equal number of rows in Matrix B.",
    );
    process.exit(1);
  }

  const matrixC2 = readMatrix(dimsC2.rows, dimsC2.cols);
  const productMatrix = multiplyMatrices(matrixC1, matrixC2);

  console.log("\nMatrix A:");
  console.log(formatMatrix(matrixC1));
  console.log("\nMatrix B:");
  console.log(formatMatrix(matrixC2));
  console.log("\nProduct Matrix:");
  console.log(formatMatrix(productMatrix));
}

main();
