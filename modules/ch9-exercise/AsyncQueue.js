export class AsyncQueue {
  #queue = [];
  #stopped = false;

  constructor() {
    this.#queue = [];
    this.#stopped = false;
  }

  async enqueue(task) {
    if (this.#stopped) {
      throw new Error("Queue has stopped accepting tasks.");
    }

    return new Promise((resolve, reject) => {
      this.#queue.push({ task, resolve, reject });
    });
  }

  async dequeue() {
    if (this.#queue.length > 0) {
      const { task, resolve, reject } = this.#queue.shift();
      try {
        const result = await task();
        resolve(result);
        return result;
      } catch (err) {
        reject(err);
        throw err;
      }
    }
    return null;
  }

  async *[Symbol.asyncIterator]() {
    while (this.#queue.length > 0) {
      const item = await this.dequeue();
      if (item !== null) {
        yield item;
      }
    }
  }

  done() {
    this.#stopped = true;
  }
}
