// revealling constructor pattern acts like a proxy by wrapping an object functionailities
// to prevent them from being used unless we are at object creation time

// here we wrap the Buffer object to make the buffer immutable
const MODIFIER_NAMES = ["swap", "write", "fill"];
export class ImmutableBuffer {
  constructor(size, executor) {
    const buffer = Buffer.alloc(size);
    const modifiers = {};
    for (const prop in buffer) {
      if (typeof buffer[prop] !== "function") {
        continue;
      }
      // if the funciton modifies the buffer we bind it to modifiers
      if (MODIFIER_NAMES.some((m) => prop.startsWith(m))) {
        modifiers[prop] = buffer[prop].bind(buffer);
        // else we bind it to the new object instance so it's seen after creation normally
      } else {
        this[prop] = buffer[prop].bind(buffer);
      }
    }
    executor(modifiers);
  }
}
