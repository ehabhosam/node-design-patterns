import fs, { write } from "fs";

export const ConsoleStrategy = {
  log: (message) => console.log(message),
  debug: (message) => console.debug(message),
  warn: (message) => console.warn(message),
  error: (message) => console.error(message),
  info: (message) => console.info(message),
};

export class FileStrategy {
  constructor(filePath) {
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
