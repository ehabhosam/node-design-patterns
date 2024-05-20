import { createWriteStream } from "fs";
import { createLoggingWritable } from "./logging-writable";

const writestream = createWriteStream("fileA.txt");
const loggedWriteStream = createLoggingWritable(writestream);

loggedWriteStream.write("First chunk");
loggedWriteStream.write("Second chunk");
writestream.write("This is not logged");
loggedWriteStream.end();
