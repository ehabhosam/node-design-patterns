import EventEmitter from "events";

export default function Ticker(num, callback) {
  const emitter = new EventEmitter();
  let ticks = 0;

  emitter.on("error", () => {
    console.log("ERROR", "timestamp is divisible by 5");
  });

  emitter.on("tick", () => {
    const timestamp = Date.now();
    if (timestamp % 5 === 0) {
      emitter.emit("error");
      return;
    }

    ticks++;
    console.log("tick", ticks);
    num -= 50;
    if (num < 0) {
      emitter.emit("done");
    } else {
      setTimeout(() => {
        emitter.emit("tick");
      }, 50);
    }
  });

  emitter.on("done", () => {
    callback(ticks);
  });

  emitter.emit("tick");

  return emitter;
}

// uncomment this to run
// Ticker(500);
