// iterable matrix
// implements the [Symbole.iterator] method

export class Matrix {
  constructor(inMatrix) {
    this.data = inMatrix;
  }

  get(row, col) {
    if (row >= this.data.length || column >= this.data[row].length) {
      throw new RangeError("Out of bounds");
    }
    return this.data[row][col];
  }

  set(row, col, value) {
    if (row >= this.data.length || column >= this.data[row].length) {
      throw new RangeError("Out of bounds");
    }
    this.data[row][col] = value;
  }

  // normal implementation
  // [Symbol.iterator]() {
  //   let nextRow = 0;
  //   let nextCol = 0;
  //   return {
  //     next: () => {
  //       if (nextRow === this.data.length) {
  //         return { done: true };
  //       }

  //       const currentValue = this.data[nextRow][nextCol];

  //       if (nextCol === this.data[nextRow].length - 1) {
  //         nextRow++;
  //         nextCol = 0;
  //       } else {
  //         nextCol++;
  //       }

  //       return { value: currentValue, done: false };
  //     },
  //   };
  // }

  // generator implementation
  *[Symbol.iterator]() {
    let nextRow = 0;
    let nextCol = 0;

    while (nextRow !== this.data.length) {
      yield this.data[nextRow][nextCol];
      if (nextCol === this.data[nextRow].length - 1) {
        nextRow++;
        nextCol = 0;
      } else {
        nextCol++;
      }
    }
  }
}
