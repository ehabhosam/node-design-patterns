// build custom require function that loads a module
// and runs its content in separate scope
// require("./modules/custom-require");

// exports & module.exports
// const result = require("./modules/_exports");
// console.log(result.get_var());
// result.set_var("im not ehab hosam");
// console.log(result.get_var());

// console.log("global", my_var);

// calc module example
// const calc = require("./modules/calc");
// console.log("sum: ", calc.sum(1, 2));
// console.log("sub: ", calc.sub(1, 2));
// console.log("mul: ", calc.mul(1, 2));
// console.log("div: ", calc.div(1, 2));
// console.log("eval: ", calc("1+2"));

// logger module example
// const Logger = require("./modules/factory/logger");
// const logger = new Logger("MODESTE");
// logger.log("This is a log message");
// logger.info("This is an information about something");
// logger.verbose("This is a verbose information about something");

// child logger module example (instance of logger)
// import "./modules/factory/monkey-patch"; // monkey patch the factory
// const childLogger = require("./modules/factory/child-logger");
// childLogger.log("This is a log message");
// childLogger.info("This is an information about something");
// childLogger.monkey("message");

// observer design pattern
// import "./modules/observer";

// ticker exersise
// import Ticker from "./modules/ch3-exercise/ticker";
// Ticker(500, (ticks) => {
//   console.log("event emitted", ticks, "ticks");
// });

// import gzipBuffer from "./modules/streams/gzip/buffer";
// import gzipStream from "./modules/streams/gzip/stream";

// gzipStream("fileA.txt");
// import "./modules/streams/index";

// Builder design pattern
// import { UrlBuilder } from "./modules/builder/url";

// const myurl = new UrlBuilder()
//   .setProtocol("https")
//   .setCredentials("user", "pass")
//   .setHostname("example.com")
//   .build();

// console.log(myurl.toString());

// revealling constructor design pattern
import { ImmutableBuffer } from "./modules/revealing-constructor/immutable-buffer";

const word = "ehab hosam";
const buffer = new ImmutableBuffer(word.length, (props) => {
  const { write, swap, fill } = props; // can access modifiers here
  write(word);
});

console.log(String.fromCharCode(buffer.readInt8(0)));
