import { EventEmitter } from "events";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { ProcessPool } from "./processPool.js";

// Variation 0 (The issue): algorithm is synchronous and will block the event loop
export class SubsetSum extends EventEmitter {
  constructor(sum, set) {
    super();
    this.sum = sum;
    this.set = set;
    this.totalSubsets = 0;
  }

  // _combine() method is completely synchronous. It recursively generates
  // every possible subset without ever giving back control to the event loop
  _combine(set, subset) {
    for (let i = 0; i < set.length; i++) {
      const newSubset = subset.concat(set[i]);
      this._combine(set.slice(i + 1), newSubset);
      this._processSubset(newSubset);
    }
  }

  //   The _processSubset() method is responsible for verifying that the sum of
  // the elements of the given subset is equal to the number we are looking for:
  _processSubset(subset) {
    console.log("Subset", ++this.totalSubsets, subset);
    const res = subset.reduce((prev, item) => prev + item, 0);
    if (res === this.sum) {
      this.emit("match", subset);
    }
  }

  // start method is responsible for starting the process of generating subsets
  start() {
    this._combine(this.set, []);
    this.emit("end");
  }
}

// Variation 1: Interleaving with setImmediate()
class InterleavingSubsetSum extends EventEmitter {
  constructor(sum, set) {
    super();
    this.sum = sum;
    this.set = set;
    this.totalSubsets = 0;
  }

  // _combine() method is completely synchronous. It recursively generates
  // every possible subset without ever giving back control to the event loop
  _combine(set, subset) {
    this.runningCombine++;
    setImmediate(() => {
      this._combine(set, subset);
      if (--this.runningCombine === 0) {
        this.emit("end");
      }
    });
  }

  //   The _processSubset() method is responsible for verifying that the sum of
  // the elements of the given subset is equal to the number we are looking for:
  _processSubset(subset) {
    console.log("Subset", ++this.totalSubsets, subset);
    const res = subset.reduce((prev, item) => prev + item, 0);
    if (res === this.sum) {
      this.emit("match", subset);
    }
  }

  // start method is responsible for starting the process of generating subsets
  start() {
    this._combine(this.set, []);
    this.emit("end");
  }
}

// Variation 2: spawning external child process
const __dirname = dirname(fileURLToPath(import.meta.url));
const workerFile = join(__dirname, "workers", "subsetSumProcessWorker.js");
const workers = new ProcessPool(workerFile, 2);
export class ExternalProcessSubsetSum extends EventEmitter {
  constructor(sum, set) {
    super();
    this.sum = sum;
    this.set = set;
  }

  async start() {
    const worker = await workers.acquire();
    worker.send({ sum: this.sum, set: this.set });
    const onMessage = (msg) => {
      if (msg.event === "end") {
        worker.removeListener("message", onMessage);
        workers.release(worker);
      }
      this.emit(msg.event, msg.data);
    };
    worker.on("message", onMessage);
  }
}

// expose through http server
const server = createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");

  if (url.pathname !== "/subsetSum") {
    res.writeHead(200);
    res.end("I am still alive");
    console.log("replying with alive");
    return;
  }

  const data = JSON.parse(url.searchParams.get("data"));
  const sum = JSON.parse(url.searchParams.get("sum"));
  res.writeHead(200);
  //   const subsetSum = new SubsetSum(sum, data);
  //   const subsetSum = new InterleavingSubsetSum(sum, data);
  const subsetSum = new ExternalProcessSubsetSum(sum, data);
  subsetSum.on("match", (match) => {
    res.write(`Match: ${JSON.stringify(match)}\n`);
  });
  subsetSum.on("end", () => res.end());
  subsetSum.start();
});

server.listen(8000, () => console.log("Server listening on port 8000"));
