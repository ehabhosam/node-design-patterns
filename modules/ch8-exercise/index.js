import { StampedConsole } from "./StampedConsole";

const stampedConsole = StampedConsole(console);

stampedConsole.log("hi!");
stampedConsole.error("oh no!");
