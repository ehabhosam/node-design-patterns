export function createLoggingWritable(writable) {
  return new Proxy(writable, {
    get(target, prop, receiver) {
      if (prop === "write") {
        return function (...args) {
          const [chunk] = args;
          console.log("🚨 Writing: " + chunk);
          return writable.write(...args);
        };
      }
      return target[prop];
    },
  });
}
