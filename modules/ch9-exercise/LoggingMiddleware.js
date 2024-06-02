import fs from "fs";

// this logger supports only postprocess middleware.

export class LoggerWithMiddleware {
  constructor(logger) {
    this.logger = logger;
    this.middleWares = [];
  }

  use(middleWare) {
    this.middleWares.push(middleWare);
  }

  #runMiddleWarePipeline(message) {
    for (const middleWare of this.middleWares) {
      message = middleWare(message);
    }
  }

  log(message) {
    this.logger.log(message);
    this.#runMiddleWarePipeline(message);
  }

  debug(message) {
    this.logger.debug(message);
    this.#runMiddleWarePipeline(message);
  }

  warn(message) {
    this.logger.warn(message);
    this.#runMiddleWarePipeline(message);
  }

  error(message) {
    this.logger.error(message);
    this.#runMiddleWarePipeline(message);
  }

  info(message) {
    this.logger.info(message);
    this.#runMiddleWarePipeline(message);
  }
}

// sample middleware

export function serializeMessage(message) {
  return JSON.stringify(message);
}

export function writeToFile(message, filePath) {
  fs.appendFile(filePath, message + "\n", (err) => {
    if (err) {
      console.error(err);
    }
  });
}
