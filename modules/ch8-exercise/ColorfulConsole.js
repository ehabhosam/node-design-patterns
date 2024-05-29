// decorator design pattern (using monkey patching / object augmentaion)

export function ColorfulConsole(console) {
  console.red = function (...args) {
    console.log("\x1b[31m", ...args, "\x1b[0m");
  };
  console.green = function (...args) {
    console.log("\x1b[32m", ...args, "\x1b[0m");
  };
  console.yellow = function (...args) {
    console.log("\x1b[33m", ...args, "\x1b[0m");
  };

  return console;
}
