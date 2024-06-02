export class ContextLogger {
  constructor(loggingStrategy) {
    this.loggingStrategy = loggingStrategy;
  }

  log(message) {
    this.loggingStrategy.log(message);
  }

  debug(message) {
    this.loggingStrategy.debug(message);
  }

  warn(message) {
    this.loggingStrategy.warn(message);
  }

  error(message) {
    this.loggingStrategy.error(message);
  }

  info(message) {
    this.loggingStrategy.info(message);
  }
}
