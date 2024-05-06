const Logger = require("./logger");
const childLogger = new Logger("CHILD");

module.exports = childLogger;
