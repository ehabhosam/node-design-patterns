const A_CHAR_CODE = 65;
const Z_CHAR_CODE = 90;

export function* createAlphabetIterator() {
  let curr = A_CHAR_CODE;
  while (curr <= Z_CHAR_CODE) {
    yield String.fromCharCode(curr++);
  }
}
