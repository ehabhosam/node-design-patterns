// custom promise.all

export default function CustomPromiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const promises = Array.from(iterable);
    const results = [];
    let completedCount = 0;

    if (promises.length === 0) {
      resolve(results);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((result) => {
          results[index] = result;
          completedCount++;
          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}
