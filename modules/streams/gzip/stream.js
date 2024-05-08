import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";

export default function gzipStream(filename) {
  createReadStream(filename)
    .pipe(createGzip())
    .pipe(createWriteStream(`${filename}.gz`))
    .on("finish", () => {
      console.log("File successfully compressed (using streaming pipeline)");
    });
}
