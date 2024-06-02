// Exercise 9.1 Logging with Strategy: Implement a logging component having
// at least the following methods: debug(), info(), warn(), and error(). The
// logging component should also accept a strategy that defines where the log
// messages are sent. For example, we might have a ConsoleStrategy to send
// the messages to the console, or a FileStrategy to save the log messages
// to a file.

// import { ConsoleStrategy, FileStrategy } from "./LoggingStrategies.js";
// import { ContextLogger } from "./ContextLogger.js";

// const consoleLogger = new ContextLogger(ConsoleStrategy);
// consoleLogger.debug("Debug message");
// consoleLogger.info("Info message");
// consoleLogger.warn("Warn message");
// consoleLogger.error("Error message");

// const fileStrategy = new FileStrategy("log.txt");
// const fileLogger = new ContextLogger(fileStrategy);
// fileLogger.debug("Debug message");
// fileLogger.info("Info message");
// fileLogger.warn("Warn message");
// fileLogger.error("Error message");

// Exercise 9.2 Logging with Template: Implement the same logging
// component we defined in the previous exercise, but this time using the
// Template pattern. We would then obtain a ConsoleLogger class to log to
// the console or FileLogger class to log to a file. Appreciate the differences
// between the Template and the Strategy approaches.

// import { ConsoleLogger, FileLogger } from "./LoggingConcretes.js";

// const consoleLogger = new ConsoleLogger();
// consoleLogger.debug("Debug message");
// consoleLogger.info("Info message");
// consoleLogger.warn("Warn message");
// consoleLogger.error("Error message");

// const fileLogger = new FileLogger("template-logs.txt");
// fileLogger.debug("Debug message");
// fileLogger.info("Info message");
// fileLogger.warn("Warn message");
// fileLogger.error("Error message");

// Exercise 9.3 Warehouse item: Imagine we are working on a warehouse
// management program. Our next task is to create a class to model a
// warehouse item and help track it. Such a WarehouseItem class has a
// constructor, which accepts an id and the initial state of the item (which can
// be one of arriving, stored, or delivered). It has three public methods:
// • store(locationId) moves the item into the stored state and records
// the locationId where it's stored.
// • deliver(address) changes the state of the item to delivered, sets the
// delivery address, and clears the locationId.
// • describe() returns a string representation of the current state of the
// item (for example, "Item 5821 is on its way to the warehouse," or
// "Item 3647 is stored in location 1ZH3," or "Item 3452 was delivered to
// John Smith, 1st Avenue, New York."
// The arriving state can be set only when the object is created as it cannot be
// transitioned to from the other states. An item can't move back to the arriving
// state once it's stored or delivered, it cannot be moved back to stored once
// it's delivered, and it cannot be delivered if it's not stored first. Use the State
// pattern to implement the WarehouseItem class.

// import { WarehouseItem } from "./WarehouseItem.js";

// const item = new WarehouseItem(1, "arriving");
// console.log(item.describe());
// item.store("1ZH3");
// console.log(item.describe());
// item.deliver("John Smith, 1st Avenue, New York");
// console.log(item.describe());

// Exercise 9.4 Logging with Middleware: Rewrite the logging component
// you implemented for exercises 9.1 and 9.2, but this time use the Middleware
// pattern to postprocess each log message allowing different middlewares to
// customize how to handle the messages and how to output them. We could,
// for example, add a serialize() middleware to convert the log messages to
// a string representation ready to be sent over the wire or saved somewhere.
// Then, we could add a saveToFile() middleware that saves each message
// to a file. This exercise should highlight the flexibility and universality of
// the Middleware pattern.

import {
  LoggerWithMiddleware,
  serializeMessage,
  writeToFile,
} from "./LoggingMiddleware.js";

const logger = new LoggerWithMiddleware(console);
logger.use(serializeMessage);
logger.use((message) => writeToFile(message, "middleware-logs.txt"));

logger.debug("Debug message");
logger.info("Info message");
logger.warn("Warn message");
logger.error("Error message");
