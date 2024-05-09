// 3 ways to implement this read-stdin

// 1) non-flowing mode
// process.stdin
//   .on("readable", () => {
//     let chunk;
//     console.log("New data available");
//     while ((chunk = process.stdin.read()) !== null) {
//       console.log(
//         `Chunk read (${chunk.length} bytes): "${chunk.toString().trim()}"`
//       );
//     }
//   })
//   .on("end", () => console.log("End of stream"));

// 2) flowing mode
process.stdin
  .on("data", (chunk) => {
    console.log("New data available");
    console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`);
  })
  .on("end", () => console.log("End of stream"));

// 3) async iterator (I think uses non-flowing mode as it's default)
// for await (const chunk of process.stdin) {
//   console.log("New data available");
//   console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`);
// }
// console.log("End of stream");
