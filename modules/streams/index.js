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

const mountains = [
  { name: "Everest", height: 8848 },
  { name: "K2", height: 8611 },
  { name: "Kangchenjunga", height: 8586 },
  { name: "Lhotse", height: 8516 },
  { name: "Makalu", height: 8481 },
];
const mountainsStream = Readable.from(mountains);
mountainsStream.on("data", (mountain) => {
  console.log(`${mountain.name.padStart(14)}\t${mountain.height}m`);
});
