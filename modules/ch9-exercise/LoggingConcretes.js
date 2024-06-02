import fs from "fs";
import { LoggerTemplate } from "./LoggerTemplate";

export class ConsoleLogger extends LoggerTemplate {
  log(message) {
    console.log(message);
  }
  debug(message) {
    console.debug(message);
  }
  warn(message) {
    console.warn(message);
  }
  error(message) {
    console.error(message);
  }
  info(message) {
    console.info(message);
  }
}

export class FileLogger extends LoggerTemplate {
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }

  #writeToFile(message) {
    fs.appendFile(this.filePath, message + "\n", (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  log(message) {
    this.#writeToFile(message);
  }

  debug(message) {
    this.#writeToFile(`DEBUG: ${message}`);
  }

  warn(message) {
    this.#writeToFile(`WARN: ${message}`);
  }

  error(message) {
    this.#writeToFile(`ERROR: ${message}`);
  }

  info(message) {
    this.#writeToFile(`INFO: ${message}`);
  }
}
