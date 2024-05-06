import fs from "fs";
import EventEmitter from "events";

export default function concatFiles(...args) {
  const cb = args.pop();
  const dest = args.pop();
  const sources = args;

  const content = new Array(sources.length).fill("");

  const emitter = new EventEmitter();
  let done = 0;

  emitter.on("read", () => {
    if (++done === sources.length) {
      fs.writeFile(dest, content.join("\n"), (err) => {
        if (err) console.log(err);
        else {
          console.log("File written successfully");
          cb && cb();
        }
      });
    }
  });

  sources.forEach((src, index) => {
    fs.readFile("./" + src, (err, fileContent) => {
      if (err) {
        content[index] = "Error occurred reading, " + src;
        console.error(src, err);
      } else {
        content[index] = fileContent;
      }
      emitter.emit("read");
    });
  });
}
