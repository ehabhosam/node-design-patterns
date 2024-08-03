// 11.2 Batching and caching with callbacks: Implement batching and caching
// for the totalSales API examples using only callbacks, streams, and events
// (without using promises or async/await). Hint: Pay attention to Zalgo when
// returning cached values!

import level from "level";
import sublevel from "subleveldown";
import { EventEmitter } from "events";

const db = level("example-db");
const salesDb = sublevel(db, "sales", { valueEncoding: "json" });

export function totalSalesWithCB(product, instance, callbacks) {
  let sum = 0;

  const dbStream = salesDb.createValueStream();

  dbStream.on("data", (transaction) => {
    if (!product || transaction.product === product) {
      sum += transaction.amount;
    }
  });

  dbStream.on("end", () => {
    instance.emit("stream-end", product);
    callbacks.forEach((cb) => cb(instance, sum));
  });
}

const doneCB = (instance, sum) => {
  process.nextTick(() => {
    // Ensure async execution
    instance.emit("done", sum);
  });
};

class TotalSalesStream extends EventEmitter {
  constructor(totalSales) {
    super();
    this.running = new Map();
    this.cache = new Map();
    this.totalSales = totalSales;

    this.on("stream-end", (product) => {
      this.running.delete(product);
    });
  }

  getTotalSales(product) {
    if (this.cache.has(product)) {
      const sum = this.cache.get(product);
      process.nextTick(() => {
        // Ensure async execution
        this.emit("done", sum);
      });
      return this;
    }

    if (this.running.has(product)) {
      this.running.get(product).push(doneCB);
      return this;
    }

    const callbacks = [
      (instance, sum) => {
        this.cache.set(product, sum);
        doneCB(instance, sum);
      },
    ];

    this.totalSales(product, this, callbacks);
    this.running.set(product, callbacks);

    return this;
  }
}

// Sample usage

const totalSales = new TotalSalesStream(totalSalesWithCB);

totalSales.getTotalSales("app").on("done", (sum) => {
  console.log("sum of app is:", sum);
});
totalSales.getTotalSales("app").on("done", (sum) => {
  console.log("sum of app is:", sum);
});
totalSales.getTotalSales("app").on("done", (sum) => {
  console.log("sum of app is:", sum);
});
totalSales.getTotalSales("movie").on("done", (sum) => {
  console.log("sum of movie is:", sum);
});
totalSales.getTotalSales("game").on("done", (sum) => {
  console.log("sum of game is:", sum);
});
totalSales.getTotalSales("movie").on("done", (sum) => {
  console.log("sum of movie is:", sum);
});

totalSales.getTotalSales("song").on("done", (sum) => {
  console.log("sum of song is:", sum);
});

setTimeout(() => {
  totalSales.getTotalSales("song").on("done", (sum) => {
    console.log("sum of song is:", sum);
  });
  console.log(totalSales.cache);
}, 2000);
