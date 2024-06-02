// Exercise 9.1 Logging with Strategy: Implement a logging component having
// at least the following methods: debug(), info(), warn(), and error(). The
// logging component should also accept a strategy that defines where the log
// messages are sent. For example, we might have a ConsoleStrategy to send
// the messages to the console, or a FileStrategy to save the log messages
// to a file.
import { ConsoleStrategy, FileStrategy } from "./LoggingStrategies.js";
import { ContextLogger } from "./ContextLogger.js";

const consoleLogger = new ContextLogger(ConsoleStrategy);
consoleLogger.debug("Debug message");
consoleLogger.info("Info message");
consoleLogger.warn("Warn message");
consoleLogger.error("Error message");

const fileStrategy = new FileStrategy("log.txt");
const fileLogger = new ContextLogger(fileStrategy);
fileLogger.debug("Debug message");
fileLogger.info("Info message");
fileLogger.warn("Warn message");
fileLogger.error("Error message");
