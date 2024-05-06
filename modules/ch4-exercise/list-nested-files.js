import path from "path";
import { readdir } from "fs";
import { EventEmitter } from "stream";

class TreeNode {
  constructor(val) {
    this.val = val;
    this.children = [];
  }

  appendChildren(values) {
    for (let val of values) {
      const node = new TreeNode(path.join(this.val, val));
      this.children.push(node);
    }
  }
}

export default function listNestedFiles(dir, cb) {
  const root = new TreeNode(dir);
  const emitter = new EventEmitter();
  let currentOpen = 0;
  emitter.on("open", (numberOfChildren) => {
    currentOpen += numberOfChildren - 1;
    if (currentOpen === 0) {
      console.log("finding process done");
      cb(root);
    }
  });

  rec(root, emitter);
}

function rec(node, emitter) {
  readdir(node.val, (err, files) => {
    if (err) {
      emitter.emit("open", 0);
      return;
    }
    node.appendChildren(files);
    node.children.forEach((childFile) => {
      rec(childFile, emitter);
    });
    emitter.emit("open", files.length);
  });
}
