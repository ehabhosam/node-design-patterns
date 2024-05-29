export function CachedAxios(axios, options = {}) {
  const cache = new Map();
  const defaultOptions = {
    ttl: 60000, // time to live
  };
  const finalOptions = { ...defaultOptions, ...options };

  return new Proxy(axios, {
    get(target, prop) {
      if (["get", "post", "put", "delete", "patch"].includes(prop)) {
        return async function (url, ...args) {
          const key = `${prop}:${url}:${JSON.stringify(args)}`;
          const cachedResponse = cache.get(key);

          if (
            cachedResponse &&
            Date.now() - cachedResponse.timestamp < finalOptions.ttl
          ) {
            console.log("Response from cache");
            return cachedResponse.response;
          }

          const response = await target[prop](url, ...args);
          cache.set(key, { response, timestamp: Date.now() });
          return response;
        };
      }
      return target[prop];
    },
  });
}
