// exported functions made public by module

// main module functionality
module.exports = function (message) {
  return eval(message);
};

module.exports.sum = function (a, b) {
  return a + b;
};

module.exports.sub = function (a, b) {
  return a - b;
};

module.exports.mul = function (a, b) {
  return a * b;
};

module.exports.div = function (a, b) {
  if (b === 0) {
    return "Error: Division by zero";
  }
  return a / b;
};
