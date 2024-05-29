export function createLazyBuffer(size) {
  let buffer = null;
  let firstWrite = true;

  return new Proxy(
    {},
    {
      get(target, prop) {
        if (prop === "write" && firstWrite) {
          buffer = Buffer.alloc(size);
          firstWrite = false;
        }
        return buffer ? buffer[prop].bind(buffer) : undefined;
      },
      set(target, prop, value) {
        if (buffer) {
          buffer[prop] = value;
          return true;
        }
        return false;
      },
    }
  );
}
