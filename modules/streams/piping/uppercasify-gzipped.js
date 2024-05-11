import { createGzip, createGunzip } from "zlib";
import { pipeline, Transform } from "stream";

const toUpperCaseStream = new Transform({
  transform(chunk, _, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

pipeline(
  process.stdin,
  createGunzip(),
  toUpperCaseStream,
  createGzip(),
  process.stdout,
  (err) => {
    console.log("error occurred during pipeline: ", err);
    process.exit(1);
  }
);
