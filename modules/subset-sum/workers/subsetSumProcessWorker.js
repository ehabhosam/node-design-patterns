import { EventEmitter } from "events";

class SubsetSum extends EventEmitter {
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

process.on("message", (message) => {
  const subsetSum = new SubsetSum(message.sum, message.set);

  subsetSum.on("match", (data) => {
    process.send({ event: "match", data });
  });
  subsetSum.on("end", (data) => {
    process.send({ event: "end", data });
  });

  subsetSum.start();
});

process.send("ready");
