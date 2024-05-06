// monkey patching the factory module
// to add more functionality to the logger

const Logger = require("./logger");
Logger.prototype.monkey = function (message) {
  this.log("This is a monkey patch: " + message);
};
