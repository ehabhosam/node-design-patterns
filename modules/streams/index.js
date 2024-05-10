import { dirname } from "path";
import { Readable } from "stream";

// import RandomStream from "./readable/random-stream";

// const randomStream = new RandomStream();

// randomStream.on("data", (chunk) => {
//   console.log("Received Chunk:", chunk.toString());
// });

// const customStream = Readable({
//   read(size) {
//     const chunk = "🚨🚨 ehab hosam wrote this custom stream 🚨🚨";
//     this.push(chunk, "utf-8");
//     emittedBytes += chunk.length;
//   },
// });

// customStream.on("data", (chunk) => {
//   console.log(chunk.toString());
// });

// const mountains = [
//   { name: "Everest", height: 8848 },
//   { name: "K2", height: 8611 },
//   { name: "Kangchenjunga", height: 8586 },
//   { name: "Lhotse", height: 8516 },
//   { name: "Makalu", height: 8481 },
// ];
// const mountainsStream = Readable.from(mountains);
// mountainsStream.on("data", (mountain) => {
//   console.log(`${mountain.name.padStart(14)}\t${mountain.height}m`);
// });

// import ToFileStream from "./writable/to-file-stream";

// const toFileStream = new ToFileStream();

// toFileStream.write({
//   path: "fileA.txt",
//   content: "this is first content will be written from the stream.",
// });
// toFileStream.write({
//   path: "fileA.txt",
//   content: "this is second content will be written from the stream.",
// });
// toFileStream.end(
//   {
//     path: "fileA.txt",
//     content: "this is third(last) content will be written from the stream.",
//   },
//   () => {
//     console.log("done streaming");
//   }
// );

// simple writable stream
// import { Writable } from "stream";
// import { promises as fs } from "fs";
// import { mkdirp } from "mkdirp";

// const wtf = Writable({
//   objectMode: true,
//   write(chunk, encoding, callback) {
//     mkdirp(dirname(chunk.path))
//       .then(() => fs.writeFile(chunk.path, chunk.content))
//       .then(() => cb())
//       .catch(callback);
//   },
// });

// wtf.write({
//   path: "fileA.txt",
//   content: "this content will be streamed",
// });
