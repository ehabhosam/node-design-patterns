import { ColorConsole } from "./color-console";

export class RedConsole extends ColorConsole {
  log(string) {
    console.log("\x1b[31m", string);
  }
}

export class BlueConsole extends ColorConsole {
  log(string) {
    console.log("\x1b[34m", string);
  }
}
export class GreenConsole extends ColorConsole {
  log(string) {
    console.log("\x1b[32m", string);
  }
}
