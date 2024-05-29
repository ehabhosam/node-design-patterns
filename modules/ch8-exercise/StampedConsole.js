// decorator pattern

export function StampedConsole(console) {
  return new Proxy(console, {
    get(target, prop) {
      if (["log", "warn", "error"].includes(prop)) {
        return function (...args) {
          target[prop](new Date().toISOString(), ...args);
        };
      }
    },
  });
}
