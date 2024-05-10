import { Writable } from "stream";
import { promises as fs } from "fs";
import { mkdirp } from "mkdirp";
import { dirname } from "path";

export default class ToFileStream extends Writable {
  constructor(options) {
    super({ ...options, objectMode: true });
  }

  _write(chunk, encoding, callback) {
    mkdirp(dirname(chunk.path))
      .then(() => fs.writeFile(chunk.path, chunk.content))
      .then(() => callback())
      .catch(callback);
  }
}
