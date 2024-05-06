import path from "path";
import { readFile, readdir } from "fs";
import { EventEmitter } from "stream";

// this implementation lacks the concurrency limit using TaskQueue
// also there is a bug that will be solved using the TaskQueue
// the results are not stable, sometimes events are sent before
// the operation is actually done. So, a TaskQueue seems to be not
// optional here. If you read this please tell me your thoughts.

export default function recursiveFind(dir, keyword, cb) {
  const result = [];
  const emitter = new EventEmitter();
  let currentOpen = 0;

  emitter.on("open", (numberOfChildren) => {
    currentOpen += numberOfChildren - 1;
    if (currentOpen === 0) {
      console.log("searching process done");
      cb(result);
    }
  });

  emitter.on("match", (filename) => {
    result.push(filename);
  });

  function rec(directory) {
    readdir(directory, (err, files) => {
      // error occurs when not a floder => it's a file
      if (err) {
        searchFile(directory);
        return;
      }
      files.forEach((file) => {
        rec(path.join(directory, file));
      });
      setImmediate(() => emitter.emit("open", files.length));
    });
  }

  function searchFile(filePath) {
    readFile(filePath, "utf8", (err, content) => {
      setImmediate(() => emitter.emit("open", 0));
      if (err) {
        return;
      }

      const match = content.includes(keyword);

      if (match) {
        emitter.emit("match", filePath);
      }
    });
  }

  rec(dir);
}
