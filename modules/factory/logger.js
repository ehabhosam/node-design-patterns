// Description: A factory function that returns a new instance of Logger.

function Logger(name) {
  // if the function is called without new keyword
  // it will return a new instance of Logger
  if (!(this instanceof Logger)) return new Logger(name);

  this.name = name;
}

Logger.prototype.log = function (msg) {
  console.log(`[${this.name}] ${msg}`);
};

Logger.prototype.info = function (message) {
  this.log("info: " + message);
};

Logger.prototype.verbose = function (message) {
  this.log("verbose: " + message);
};

module.exports = Logger;
