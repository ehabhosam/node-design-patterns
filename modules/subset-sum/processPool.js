import { fork } from "child_process";

export class ProcessPool {
  constructor(file, poolMax) {
    this.file = file;
    this.poolMax = poolMax;
    this.pool = [];
    this.active = [];
    this.waiting = [];
  }

  acquire() {
    return new Promise((resolve, reject) => {
      let worker;
      if (this.pool.length > 0) {
        worker = this.pool.pop();
        this.active.push(worker);
        return resolve(worker);
      }

      if (this.active.length >= this.poolMax) {
        this.waiting.push({ resolve, reject });
      }

      worker = fork(this.file);
      worker.once("message", (message) => {
        console.log("message received at worker", message);
        if (message === "ready") {
          this.active.push(worker);
          return resolve(worker);
        }
        // worker.kill();
        // reject(new Error("Improper process start"));
      });

      worker.once("exit", (code) => {
        console.log("Worker exited:", code);
        this.active = this.active.filter((w) => w !== worker);
        this.pool = this.pool.filter((w) => w !== worker);
      });
    });
  }

  release(worker) {
    if (this.waiting.length > 0) {
      const { resolve } = this.waiting.shift();
      return resolve(worker);
    }
    this.active = this.active.filter((w) => w !== worker);
    this.pool.push(worker);
  }
}
