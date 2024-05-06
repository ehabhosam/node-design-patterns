// iterable: such an array
// callback: that receive each item of iterable, can can return a promise or simple value
// concurrency: how many items in iterable can be processed by callback at a time

// NOTE: THIS IS MY CUSTOM IMPLEMENTAION THAT MAY HAVE ISSUES/BUGS
// SO IF YOU FIND ANY PLEASE, LET ME KNOW

export default async function mapAsync(iterable, callback, concurrency) {
  return await new Promise(async (resolve, reject) => {
    const elements = Array.from(iterable);
    const results = new Array(elements.length).fill();
    let remaining = elements.length;

    function next() {
      if (elements.length === 0) return;
      const element = elements.pop();
      const index = elements.length;
      Promise.resolve(callback(element))
        .then((result) => {
          remaining--;
          results[index] = result;
          if (remaining === 0) resolve(results);
          next();
        })
        .catch((err) => {
          remaining--;
          results[index] = err;
          if (remaining === 0) reject(results);
          next();
        });
    }

    for (let i = 0; i < concurrency; i++) {
      next();
    }
  });
}
