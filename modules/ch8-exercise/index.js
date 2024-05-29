// import { StampedConsole } from "./StampedConsole";
// import { ColorfulConsole } from "./ColorfulConsole";

// const stampedConsole = StampedConsole(console);
// stampedConsole.log("hi!");
// stampedConsole.error("oh no!");

// const colorfulConsole = ColorfulConsole(console);
// colorfulConsole.red("red!");
// colorfulConsole.green("green!");
// colorfulConsole.yellow("yellow!");

import { createLazyBuffer } from "./createLazyBuffer";

const lazybuffer = createLazyBuffer(5);

lazybuffer.write("ehabs");
console.log(lazybuffer.toString()); // Output: ehab
