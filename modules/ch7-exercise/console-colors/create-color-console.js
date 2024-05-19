import { BlueConsole, GreenConsole, RedConsole } from "./color-consoles";

// factory function

export function createColorConsole(color) {
  switch (color) {
    case "red":
      return new RedConsole();
    case "blue":
      return new BlueConsole();
    case "green":
      return new GreenConsole();
    default:
      throw new Error("No color provided to init logger.");
  }
}
