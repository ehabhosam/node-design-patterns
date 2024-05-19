// revealling constructor class

export class TamperFreeQueue {
  #queue = [];
  #resolves = [];

  constructor(executor) {
    executor({ enqueue: this.#enqueue.bind(this) });
  }

  #enqueue(elem) {
    this.#queue.unshift(elem);
    if (this.#resolves.length > 0) {
      const resolve = this.#resolves.pop();
      resolve(this.#queue.pop());
    }
  }

  dequeue() {
    return new Promise((resolve, reject) => {
      if (this.#queue.length > 0) {
        setTimeout(() => resolve(this.#queue.pop()), 0);
      } else {
        this.#resolves.unshift(resolve);
      }
    });
  }
}
