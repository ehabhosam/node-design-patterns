import { EventEmitter } from "events";
import { readFile } from "fs";

class FindRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    // Emit the start event with the list of input files
    this.emit("start", this.files);

    // Iterate through each file asynchronously
    this.files.forEach((file) => {
      // Read each file asynchronously
      readFile(file, "utf8", (err, content) => {
        if (err) {
          // If there's an error, emit the error event
          this.emit("error", err);
        } else {
          // Emit the 'fileread' event for each file
          this.emit("fileread", file);

          // Perform the regex match
          const match = content.match(this.regex);
          if (match) {
            // If there's a match, emit the 'found' event for each match
            match.forEach((elem) => this.emit("found", file, elem));
          }
        }
      });
    });

    return this;
  }
}
