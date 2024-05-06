import fs, { mkdir } from "fs";
import path from "path";
import superagent from "superagent";
import { mkdirp } from "mkdirp";
import { urlToFilename } from "../../utils";

export function spider(url, cb) {
  const filename = urlToFilename(url);
  fs.access(filename, (err) => {
    if (!err || err.code !== "ENOENT") {
      // (1)
      return cb(null, filename, false);
    }
    download(url, filename, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, filename, true);
    });
  });
}

function saveFile(filename, contents, cb) {
  mkdirp(path.dirname(filename), { fs: fs })
    .then((made) => {
      console.log(
        made ? `New directory created: ${made}` : "Directory already exists"
      );
      fs.writeFile(filename, contents, (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return cb(err);
        }
        cb(null);
      });
    })
    .catch((err) => {
      console.error("Error creating directory:", err);
      cb(err);
    });
}

function download(url, filename, cb) {
  console.log(`Downloading ${url}`);
  superagent.get(url).end((err, res) => {
    if (err) {
      return cb(err);
    }
    saveFile(filename, res.text, (err) => {
      if (err) {
        return cb(err);
      }
      console.log(`Downloaded and saved: ${url}`);
      cb(null, res.text);
    });
  });
}
